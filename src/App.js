import React from 'react';

import { Routes, Route, Outlet } from 'react-router-dom';

import Header from './component/Header';

import Home from './pages/Home';
import NotFount from './pages/NotFount';
import Cart from './pages/Cart';

import './scss/app.scss';
import FullPizza from './pages/FullPizza';

export const SearchContext = React.createContext('')



function App() {
  const [searchVaalue, setSearchValue] = React.useState('')


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchVaalue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<FullPizza />} />
              <Route path="*" element={<NotFount />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
