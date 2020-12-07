import React from 'react';
import { render }from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
export const store =  ConfigureStore()
window.state = store;

render(<React.StrictMode key='1'>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>, document.getElementById("root"));
