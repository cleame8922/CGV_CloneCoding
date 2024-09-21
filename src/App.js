import React from "react";
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Login2 from "./pages/Login2";
import Login3 from "./pages/Login3";
import Join from "./pages/Join";
import Footer from "./components/Footer";
import Ticketing from "./pages/Ticketing";
import Click from "./components/Click";
import Movie from "./pages/Movie"
import MyPage from "./pages/MyPage"
import MovieDetail from "./pages/MovieDetail"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login2' element={<Login2 />} />
            <Route path='/login3' element={<Login3 />} />
            <Route path='/join' element={<Join />} />
            <Route path='/movie' element={<Movie />} />
            <Route path='/movieDetail' element={<MovieDetail />} />
            <Route path='/ticketing' element={<Ticketing />} />
            <Route path='/myPage' element={<MyPage />} />
          </Routes>
          <Click />
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
