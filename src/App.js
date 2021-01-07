import logo from './logo.svg';
import './App.css';
import TabDrawer from './pages/TabDrawer.jsx';
import "antd/dist/antd.css";
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import './style.css';
import { connect } from 'react-redux';
import ChooseLocation from './pages/ChooseLocation';
import { Spin, Space } from 'antd';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { Route, Switch, Router, useHistory } from 'react-router-dom';
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
      return (
        <div>
          <ChooseLocation />
        </div>
      );
    }
    else {
      if (!props.isLoadingProduct && !props.isLoadingOrder && !props.isLoadingCustomer) {
        history.push('/checkout');

        return (
          <div>
            <Switch>
              <Route path="/checkout">
                <Checkout />
              </Route>
            </Switch>
          </div>
        )
      } else {
        return (
          <div style={{ textAlign: 'center', margin: '45vh' }}>
            <Space size='middle'>
              <Spin size='large' />
            </Space>
          </div>
        )
      }
    }
  } else {
    return (
      <div>
        <Login />
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
