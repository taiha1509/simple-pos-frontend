import React from 'react';
import { Drawer, Button, Empty, List } from 'antd';
import { useCookies } from 'react-cookie';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { logout } from '../actions/StaffAction';
import { connect } from 'react-redux';

const TabDrawer = (props) => {

  const [cookies, setCookies, removeCookies] = useCookies(['isLogin', 'staff']);

  const style = {
    "background-color": '#262a41',
    "color": 'white !important'
  };

  const onClose = () => {
    props.closeTabDrawer();
  };

  const data = [
    'Checkout',
    'Order History',
    'On-holds Orders',
    'Settings',
    'Logout',
  ];

  const handleLogout = () => {
    removeCookies('isLogin', { path: '/' });
    removeCookies('staff', { path: '/' });
    props.logout();
  }
  return (
    <div>
      <Drawer
        title="Simple POS"
        width={300}
        closable={false}
        onClose={onClose}
        visible={props.visible}
        key="left"
        placement="left"
        headerStyle={{color:'wheat', backgroundColor: '#262a41'}}
        drawerStyle={style}
      // footer={<h2>POS enterprise 4.11.9</h2>}
      >
        <a href='/checkout'>
          <h2 style={{color:'wheat'}}>Checkout</h2>
        </a>
        <a href='/checkout'>
          <h2 style={{color:'wheat'}}>Order History</h2>
        </a>
        <a href='/checkout'>
          <h2 style={{color:'wheat'}}>On-holds Orders</h2>
        </a>
        <a href='/checkout'>
          <h2 style={{color:'wheat'}}>Settings</h2>
        </a>
        <a onClick={handleLogout}>
          <h2 style={{color:'wheat'}}>Logout</h2>
        </a>
      </Drawer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(null, mapDispatchToProps)(TabDrawer);
