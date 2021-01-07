import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
import store, { persistor } from './store';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Space, Spin } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div style={{ textAlign: 'center', margin: '45vh' }}>
                              <Space size='middle'>
                                <Spin size='large' />
                              </Space>
                            </div>} persistor={persistor}>
        <BrowserRouter>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
