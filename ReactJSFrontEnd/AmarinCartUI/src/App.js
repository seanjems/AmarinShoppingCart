import logo from './logo.svg';
import './App.css';

import  Home from './components/Home';
import  Categories from './components/Categories';
import  Suppliers from './components/Suppliers';
import  Products from './components/Products';
import Navigation from './components/Navigation';
import Pages from './components/Pages';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h2 className='m-3 d-flex justify-content-center fw-bold'>Amarin Shopping Cart</h2>

      <Navigation/>
      <Switch>
        <Route path="/" component={Home} exact/>;
        <Route path="/categories" component={Categories} />;
        <Route path="/suppliers" component={Suppliers} />;
        <Route path="/products" component={Products} />;
        <Route path="/pages" component={Pages} />;
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
