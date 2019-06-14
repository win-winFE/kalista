import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import './index.less';

require('./favicon.ico');

const store = configureStore();

//弹框禁止背景滚动
window.ModalHelper = (function (bodyCls) {
  let scrollTop;
  return {
    afterOpen: function () {
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      if (scrollTop > 0) {
        document.documentElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
        //window.scrollTo(0,scrollTop)
      }
    }
  };
})('modal-open');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const AppRoot = require('./components/Root').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <AppRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
