import React from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./App.css";
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route element={<NotFound />} />
          <Route exact path="/user/dashboard" element={<UserDashboard />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
