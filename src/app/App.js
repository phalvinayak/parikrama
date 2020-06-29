import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import store from './store';
import categoryActions from './actions/categoryActions';
import roleActions from './actions/roleActions';
import permissionActions from './actions/permissionActions';
import userActions from './actions/userActions';
import UnitActions from './actions/units';
import {connect} from 'react-redux'
import {addNotification} from './actions/notification'
import branchesActions from './actions/branchActions';

const mapStateToProps = state => ({
  auth : state['AUTH'],
  state
})
const mapActionToProps = {
}
class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      user : undefined
    }
  }
  componentDidMount() {
    store.dispatch(categoryActions.getAllCategories());
    store.dispatch(roleActions.getAllRoles());
    store.dispatch(permissionActions.getAllPermissions());
    store.dispatch(userActions.getUserInfo())
    store.dispatch(UnitActions.initialData())
    addNotification({
      title:'Welcome',
      message : 'Welcome to parikrama Inventory Management ',
      type:'success'
    })
    // store.dispatch(categoryActions.getAllCategories());
    // store.dispatch(roleActions.getAllRoles());
    // store.dispatch(permissionActions.getAllPermissions());
    // store.dispatch(thresholdActions.getAllThreshold());
    this.onRouteChanged();
  }
  render () {
    console.log(this.props.state)
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (

        <div className="container-scroller">
          <ReactNotification />
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

export default connect(mapStateToProps, mapActionToProps)(withRouter(App))
