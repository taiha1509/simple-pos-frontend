import React from 'react';
import { Drawer, Button, Empty, List } from 'antd';
import { useCookies } from 'react-cookie';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { logout } from '../actions/StaffAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        headerStyle={{ color: 'wheat', backgroundColor: '#262a41' }}
        drawerStyle={style}
      // footer={<h2>POS enterprise 4.11.9</h2>}
      >
        <Link to='/checkout'>
          <h2 style={{ color: 'wheat' }}>Checkout</h2>
        </Link>
        <Link to='/order-history'>
          <h2 style={{ color: 'wheat' }}>Order History</h2>
        </Link>
        <Link to='/checkout'>
          <h2 style={{ color: 'wheat' }}>On-holds Orders</h2>
        </Link>
        <Link to='/checkout'>
          <h2 style={{ color: 'wheat' }}>Settings</h2>
        </Link>
        <Link onClick={handleLogout}>
          <h2 style={{ color: 'wheat' }}>Logout</h2>
        </Link>
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
