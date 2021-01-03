import logo from './logo.svg';
import './App.css';
import TabDrawer from './pages/TabDrawer.jsx';
import "antd/dist/antd.css";
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import './style.css';
import { connect } from 'react-redux';
import { of } from 'rxjs';
import ChooseLocation from './pages/ChooseLocation';
import {Spin, Space} from 'antd';

function App(props) {
  if (props.isLogin) {
    if (!props.isChooseLocation)
      return (
        <div>
          <ChooseLocation />
        </div>
      );
    else {
      if(!props.isLoadingProduct && !props.isLoadingOrder && !props.isLoadingCustomer){
        return (
          <div>
            <Checkout />
          </div>
        )
      }else{
        return (
          <div style={{textAlign: 'center', margin: '45vh'}}>
            <Space size='middle'>
              <Spin size='large' />
            </Space>
          </div>
        )
      }
    }
  } else {
    return (<div>
      <Login />
    </div>)
  }
  
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.staff.isLogin,
    isChooseLocation: state.staff.isChooseLocation,
    isLoadingProduct: state.product.isLoadingProduct,
    isLoadingOrder: state.order.isLoadingOrder,
    isLoadingCustomer: state.customer.isLoadingCustomer
  }
}

export default connect(mapStateToProps)(App);
