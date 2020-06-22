import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const FontAwesome = lazy(() => import('./icons/FontAwesome'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

const BlankPage = lazy(() => import('./user-pages/BlankPage'));


const Reports = lazy(()=> import('./pages/reports'));
const Branch = lazy(() => import('./pages/Branches'))
const Products = lazy(()=> import('./pages/Products'))
const Inventory = lazy(()=>import('./pages/inventory'))
const Category = lazy(()=> import('./pages/Category'))
const Role = lazy(()=> import('./pages/Role'));
const User = lazy(()=> import('./pages/User'));
const Move = lazy(()=> import ('./pages/Move'));
const Transaction = lazy(()=> import ('./pages/Transaction'));

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />
          <Route path="/roles" component={ Role } />
          <Route path="/users" component={ User } />
        {/* {user.perm[cate] === true && */}
        {/* <> */}
          <Route path="/categories" component={ Category } />
          {/* <Route path="/category/:id" component={ ViewCategory } />  */}
        {/* </> */}
        {/* } */}
          {/* <Route path="/users" component={ Skeleton } /> */}
          <Route path="/icons/font-awesome" component={ FontAwesome } />

          <Route path="/charts/chart-js" component={ ChartJs } />

          <Route path="/branch/" component={ Branch } />
          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/user-pages/error-404" component={ Error404 } />
          <Route path="/user-pages/error-500" component={ Error500 } />

          <Route path="/user-pages/blank-page" component={ BlankPage } />
          <Route path="/products" component={ Products } />
          <Route path="/inventory/move" component={Move} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/reports" component ={ Reports } />
          <Route path="/transactions" component ={ Transaction } />
          <Redirect to="/dashboard" />

        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;