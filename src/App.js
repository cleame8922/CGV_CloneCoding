import React, { useState } from "react";
import './index.css';
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
import Movie from "./pages/Movie";
import Payment from "./pages/Payment";
import MyPage from "./pages/MyPage";
import MovieDetail from "./pages/MovieDetail";
import Reservation from "./pages/Reservation";

function App() {
  // 선택한 티켓 정보를 상태로 관리
  const [selectedTicket, setSelectedTicket] = useState(null);

  // 티켓을 선택할 때 호출되는 함수
  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

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
          <Route path='/ticketing' element={<Ticketing onSelectTicket={handleSelectTicket} />} />
          <Route 
            path='/reservation' 
            element={<Reservation selectedTicket={selectedTicket} />} 
          />
          <Route path='/payment' element={<Payment />} />
          <Route path='/myPage' element={<MyPage />} />
        </Routes>
        <Click />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
