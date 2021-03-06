import './App.css';
import "antd/dist/antd.css";
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import './style.css';
import { connect } from 'react-redux';
import ChooseLocation from './pages/ChooseLocation';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Link, Router } from 'react-router-dom';
import OrderHistory from './pages/OrderHistory';
function App(props) {

  const [cookies, setCookies, removeCookies] = useCookies(['isLogin', 'staff']);

  const [isLogin, setIsLogin] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!(props.isLogin in window) && !(props.staff in window)) {
      setCookies('isLogin', props.isLogin, { path: '/' });
      setCookies('staff', props.staff, { path: '/' });
    }
  }, [props.isLogin, props.staff]);


  useEffect(() => {
    if (cookies.isLogin == 'true') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies.isLogin]);

  if (!(isLogin in window) && isLogin) {
    if (!props.isChooseLocation) {
      history.push('/chooseLocation');
      return (
        <div>
          <Switch>
            <Route path="/chooseLocation" component={ChooseLocation} exact />
          </Switch>
        </div>
      );
    }
    else {
      history.push('/checkout');

      return (
        <div>
          <Switch>
            <Route path="/checkout" component={Checkout} exact />
            <Route path="/order-history" component={OrderHistory} exact />
          </Switch>
        </div>
      )
    }
  } else {
    history.push('/login');
    return (
      <div>
        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    isLogin: state.staff.isLogin,
    isChooseLocation: state.staff.isChooseLocation,
    isLoadingProduct: state.product.isLoadingProduct,
    isLoadingOrder: state.order.isLoadingOrder,
    isLoadingCustomer: state.customer.isLoadingCustomer,
    staff: state.staff.staff,
  }
}

export default connect(mapStateToProps)(App);
