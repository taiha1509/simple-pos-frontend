import React from 'react';
import { Drawer, Button, Empty, List } from 'antd';

class TabDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  style = {
    "background-color": '#262a41',
    "color": 'white'
  };

  onClose = () => {
    this.props.closeTabDrawer();
  };

  data = [
    'Checkout',
    'Order History',
    'On-holds Orders',
    'Settings',
    'Logout',
  ];

  render() {
    return (
      <div>
        <Drawer
          title="Simple POS"
          width={300}
          closable={false}
          onClose={this.onClose}  
          visible={this.props.visible}
          key="left"
          placement="left"
          headerStyle={this.style}
          drawerStyle={this.style}
          // footer={<h2>POS enterprise 4.11.9</h2>}
        >
          <List
            size="large"
            dataSource={this.data}
            renderItem={item => <div>
              <a>
                <List.Item>
                  {/* <img src="checkout.png"></img>   */}
                  {item}
                </List.Item>
              </a>
            </div>}
          />
        </Drawer>
      </div>
    );
  }
}

export default TabDrawer;
