import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Products } from './features/product-list/products';
import Navbar from './features/navbar/navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Products/>
    </div>
  );
}

export default App;
