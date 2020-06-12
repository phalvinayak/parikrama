import React, { Component } from 'react';
import { withRouter,Redirect} from 'react-router-dom';

import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import store from './store';
import categoryActions from './actions/categoryActions';
import roleActions from './actions/roleActions';
import permissionActions from './actions/permissionActions';

console.log(roleActions, permissionActions);
store.dispatch(categoryActions.getAllCategories());
store.dispatch(roleActions.getAllRoles());
store.dispatch(permissionActions.getAllPermissions());

class App extends Component {

  
  constructor(props) {
    super(props)
    this.state={
      user : undefined
    }
  }
  componentDidMount() {
    // console.log('Loggin')
    this.onRouteChanged();
    // this.listener = this.props.firebase.onAuthUserListener(
    //   authUser => {
    //     if (!!authUser) {
    //       this.props.history.push('/user-pages/login-1');
    //     }
    //   },
    //   () => this.props.history.push('/user-pages/login-1'),
    // );
  }
  componentWillUnmount() {
    // this.listener()
  }
  render () {
    // if(!this.user) {
    //   console.log('redirect')
    //   // Redirect('/user-pages/login-1')
    // }
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      
        <div className="container-scroller">
          { navbarComponent }
          <div className="container-fluid page-body-wrapper">
            { sidebarComponent }
            <div className="main-panel">
              <div className="content-wrapper">
                <AppRoutes/>
              </div>
              { footerComponent }
            </div>
          </div>
        </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // console.log("ROUTE CHANGED");
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default withRouter(withFirebase(App));
