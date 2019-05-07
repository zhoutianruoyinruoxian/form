import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import route from './routes/route-index';
import 'src/style/index.scss';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store from 'src/redux';
import 'src/config/globalConfig';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');



const renderApp = () => {
  const Router = route();
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        {Router}
      </LocaleProvider>
    </Provider>
    , document.getElementById('root')
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

renderApp();
serviceWorker.unregister();
