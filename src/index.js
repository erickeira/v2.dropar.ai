import './index.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route as RouteContainer, Redirect, Link, withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import Login from './pages/login/login';
import CriarConta from './pages/criar-conta/criar-conta';
import RecuperarSenha from './pages/recuperar-senha/recupera-senha';
import MinhasLojas from './pages/minhas-lojas/minhas-lojas';
import Notificacoes from './pages/notificacoes/notificacoes';
import Indicacoes from './pages/indicacoes/indicacoes';
import Planos from './pages/planos/planos';
import Configuracoes from './pages/configuracoes/configuracoes';
import TermosUso from './pages/termos-uso.js/termos-uso';
import NotFound from './pages/not-found/not-found';
import Produtos from './pages/produtos/produtos';
import Users from './pages/users/users';
import Banners from './pages/banners/banners';
import History from './pages/history/history';
import DropReels from './pages/drop-reels/drop-reels';
import Extensao from './pages/extensao/extensao';

import { api, setApiToken } from './utils/api';
import { LinearProgress } from '@mui/material';
import { logout } from './utils/logout';

const PrivateRoute = withRouter(({ component: Component, levelRequired, ...rest }) => {

  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const [user, setUser] = useState({});

  const checkUser = async () => {
    try{
      const { data } = await api.get('/me')
      setUser(data.result)
      setIsAuthCheckComplete(true);
    }catch(error){
      rest?.history?.push("/entrar");
      setIsAuthCheckComplete(true);
    }
  }

  useEffect(() => {
    checkUser() 
  }, []);

  if (!isAuthCheckComplete) {
    return <LinearProgress style={{ backgroundColor: '#9643FF' }} />;
  }

  // if (levelRequired && infoUser.level !== levelRequired) {
  //   return <Redirect to="/entrar" />;
  // }

  return (
    <Route
      {...rest}
      render={props => <Component {...props} teste="teste"  infoUser={user} />}
    />
  );

});

const Route = withRouter(((props) => {
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const checkUser = async () => {
    try{
      const { data } = await api.get('/me')
      setIsAuthCheckComplete(true);
      props.history?.push("/minhas-lojas");
    }catch(error){
      setIsAuthCheckComplete(true);
    }
  }
  useEffect(() => {
    checkUser() 
  }, []);

  if (!isAuthCheckComplete) {
    return <LinearProgress style={{ backgroundColor: '#9643FF' }} />;
  }

  return (
    <RouteContainer
      {...props}
    />
  );
}));

const root = ReactDOM.createRoot(document.getElementById('root'));

const RedirectToHome = () => {
  return <Redirect to="/entrar" />;
};

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={RedirectToHome} />
      <Route path="/entrar" exact={true} component={Login} />
      <Route path="/criar-conta" exact={true} component={CriarConta} />
      <Route path="/recuperar-senha" exact={true} component={RecuperarSenha} />
      <PrivateRoute path="/minhas-lojas" exact={true} component={MinhasLojas} levelRequired="user" />
      <PrivateRoute path="/notificacoes" exact={true} component={Notificacoes} levelRequired="user" />
      <PrivateRoute path="/indicacoes" exact={true} component={Indicacoes}  levelRequired="user" />
      <PrivateRoute path="/planos" exact={true} component={Planos} levelRequired="user" />
      <PrivateRoute path="/drop-reels" exact={true} component={DropReels} levelRequired="user" />
      <PrivateRoute path="/extensao" exact={true} component={Extensao} levelRequired="user" />
      <PrivateRoute path="/configuracoes" exact={true} component={Configuracoes} levelRequired="user" />
      <PrivateRoute path="/termos-uso" exact={true} component={TermosUso} levelRequired="user" />
      <PrivateRoute path="/produtos" exact={true} component={Produtos} levelRequired="user" />
      <PrivateRoute path="/users" exact={true} component={Users} levelRequired="admin"  />
      <PrivateRoute path="/banners" exact={true} component={Banners} levelRequired="admin" />
      <PrivateRoute path="/history" exact={true} component={History} levelRequired="admin" />
      <Route path="/*" exact={true} component={NotFound} />
    </Switch>
  </ BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();