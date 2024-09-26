import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';

export default function Ticketing() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const movie = queryParams.get('movie');
    const theater = queryParams.get('theater');
    const date = queryParams.get('date');
    const time = queryParams.get('time');
    const floor = queryParams.get('floor');
    const poster = queryParams.get('poster');

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [regions, setRegions] = useState([]);
    const [activeRegion, setActiveRegion] = useState('서울');
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <div className='flex flex-col items-center'>
            <div id="etc" className='flex justify-end w-[996px] h-[74px] pt-[30px]'>
                <div className='flex w-[81px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")]'></div>
                <div className='flex w-[101px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-90px] ml-2'></div>
                <div className='flex w-[113px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-120px] ml-2' 
                    onClick={() => {
                        setSelectedMovie(null);
                        setSelectedTheater(null);
                        setSelectedDate(null);
                    }}
                ></div>
            </div>
            
            <div id="contents" className='flex bg-[#d4d3c9] w-[996px] h-[600px]'>
                
            </div>
            <div className='flex w-full bg-[#1d1d1c] h-[129px] justify-center items-center'>
                <div className='flex w-[996px] justify-between'>
                    <div className='flex items-center'>
                        <div className='flex relative h-[80px] w-[210px] pr-[2px]'>
                            <div className='flex'>
                                <div className='flex items-center'>
                                    <img src={poster} alt="Selected Movie Poster" className='w-[70px]' />
                                </div>
                                <div className="ml-2 text-[#cccccc] text-[14px] font-[500]">{movie}</div> {/* 포스터 오른쪽에 영화 제목 표시 */}
                            </div>
                        </div>
                        <div id='bottom' className='flex flex-col relative h-[80px] w-[210px] pr-[2px]'>
                            <div className='flex mt-[2px]'>
                                <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>극장</div>
                                <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'>CGV{theater}</div>
                            </div>
                            <div className='flex mt-[2px]'>
                                <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>일시</div>
                                <div className='flex w-[135px] ml-4'>
                                    <div id="dayList" className='mr-1 first-line:text-[#cccccc] text-[12px] font-[700]'>
                                        {date}
                                    </div>
                                    <div className='text-[#cccccc] text-[12px] font-[700]'>
                                    {time}
                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-[2px]'>
                                <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>상영관</div>
                                <div id="floorList" className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'>
                                    {floor}
                                </div>
                            </div>
                            <div className='flex mt-[2px]'>
                                <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>인원</div>
                                <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex relative h-[80px] w-[160px] pr-[2px] bg-[url("./images/tnbSteps.png")] bg-[10px_-185px] bg-no-repeat border-l-[1px] border-[#5b5b5b]'></div>
                    <div className='flex relative h-[80px] w-[130px] pr-[2px] bg-[url("./images/tnbSteps.png")] bg-[0px_-293px] bg-no-repeat'></div>
                    <div className='flex relative size-[106px] mr-[5px] bg-[url("./images/tnbButtons.png")] bg-[0px_-220px] bg-no-repeat'></div>
                </div>
            </div>
            <div className='flex w-[996px] m-[30px_0]'>
                <img src="img/ticketingAd.jpg" alt="ticketingAd" />
            </div>
        </div>
    );
}