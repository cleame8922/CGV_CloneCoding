import React from "react";
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Footer from "./components/Footer";
import Ticketing from "./pages/Ticketing";
import Click from "./components/Click";
import Movie from "./pages/Movie"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/movie' element={<Movie />} />
            <Route path='/ticketing' element={<Ticketing />} />
          </Routes>
          <Click />
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
