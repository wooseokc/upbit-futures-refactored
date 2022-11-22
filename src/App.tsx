import React, { useState } from 'react';
import GlobalStyle from './styles/global'
import Header from './components/Header';
import Main from './components/InfoSector';
import store from './stores/coinStore';

import { Provider } from "react-redux";

function App() {
  return (
    <> 
      <GlobalStyle />
      <Provider store={store}>
        <Header />
        <Main/>
      </Provider>
    </>
  );
}

export default App;
