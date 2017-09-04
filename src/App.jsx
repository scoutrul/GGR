import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'components/routes/pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
      </Switch>
    </BrowserRouter>
  );
}
