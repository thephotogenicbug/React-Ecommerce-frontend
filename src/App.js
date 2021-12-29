import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/signin" element={<Signin />} />
          <Route element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
