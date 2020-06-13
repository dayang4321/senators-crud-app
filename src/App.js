import React,{useContext} from 'react';

import Senators from './components/Senators/Senators';
import Auth from './components/Auth'
import { AuthContext } from './context/authContext'
import "./App.css"

const App = props => {
  const authContext = useContext(AuthContext);

  let page = <Auth />;

  if (authContext.isAuth) {
    page=<Senators/>
  }

  return page;
};

export default App;
