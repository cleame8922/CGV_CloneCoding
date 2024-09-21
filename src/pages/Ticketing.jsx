import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef } from 'react';

export default function Ticketing() {
    const movies = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        title: `베테랑2`,
        poster: 'img/moviePoster.jpg',
        reservationRate: '예매율: 50%',
    }));

    const [activeSort, setActiveSort] = useState('예매율순');

    const handleSortChange = (sortType) => {
        setActiveSort(sortType);
    };

    // 오늘부터 30일치 날짜 생성
    const generateDates = () => {
        const today = new Date();
        const dates = [];
        const dayNames = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
            const day = date.getDate();
            const dayOfWeek = dayNames[date.getDay()]; // 요일
            dates.push({ year, month, day, dayOfWeek });
        }
        return dates;
    };

    const dates = generateDates();

    // 월별로 그룹화한 날짜 데이터 생성
    const groupedDates = dates.reduce((acc, { year, month, day, dayOfWeek }) => {
        const monthYearKey = `${year}-${month < 10 ? '0' : ''}${month}`;
        if (!acc[monthYearKey]) {
            acc[monthYearKey] = [];
        }
        acc[monthYearKey].push({ day, dayOfWeek });
        return acc;
    }, {});

    return (
        <div className='flex flex-col items-center'>
            <div id="etc" className='flex justify-end w-[996px] h-[74px] pt-[30px]'>
                <div className='flex w-[81px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")]'></div>
                <div className='flex w-[101px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-90px] ml-2'></div>
                <div className='flex w-[113px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-120px] ml-2'></div>
            </div>
            <div id="contents" className='flex bg-[#d4d3c9] w-[996px] h-[600px]'>
                <div id="movie" className='flex flex-col items-center bg-[#f2f0e5] w-[284px] border-x-[2px] border-[#d4d3c9]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[284px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>영화</div>
                    <div className='flex w-[244px] justify-center p-[4px_3px_0px_3px]'>
                        <div className='flex justify-center w-[58px] text-[#333] text-[13px] mt-[10px] border-[2px] border-[#666666] p-[3px]'>전체</div>
                        <div className='flex justify-center w-[90px] text-[#333] text-[13px] mt-[10px] border-y-[2px] border-[#666666] p-[3px]'>아트하우스<IoIosArrowDown className='flex items-center mt-[3px] ml-1' /></div>
                        <div className='flex justify-center w-[88px] text-[#333] text-[13px] mt-[10px] border-[2px] border-[#666666] p-[3px]'>특별관<IoIosArrowDown className='flex items-center mt-[3px] ml-1' /></div>
                    </div>
                    <div className='flex w-[235px] mt-[2px] border-b-[0.6px] border-[#d4d3c9] relative'>
                        <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-[#d4d3c9] z-0`} />
                        <div
                            className={`flex justify-center items-center w-[60px] h-[32px] text-[13px] text-[#333] relative z-10 ${activeSort === '예매율순' ? 'bg-[url("./images/sortmenuBtnOn.png")] bg-[50%_100%] bg-no-repeat' : ''}`}
                            onClick={() => handleSortChange('예매율순')}
                        >
                            예매율순
                        </div>
                        <div
                            className={`flex justify-center items-center w-[60px] h-[32px] text-[13px] text-[#333] relative z-10 ${activeSort === '가나다순' ? 'bg-[url("./images/sortmenuBtnOn.png")] bg-[50%_100%] bg-no-repeat' : ''}`}
                            onClick={() => handleSortChange('가나다순')}
                        >
                            가나다순
                        </div>
                    </div>
                    <div className="flex flex-col w-[240px] h-[470px] p-1">
                        <div className='overflow-y-auto scrollbar-hide'>
                            {movies.map(movie => (
                            <div key={movie.id} className="flex items-center w-[230px] h-[35px] mb-[1px]">
                                <img src="img/15year.svg" alt="15year" className="mr-[6px]" />
                                <div className="font-bold text-[13px] pr-[5px]">{movie.title}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id="theater" className='flex flex-col items-center bg-[#f2f0e5] w-[284px] border-r-[2px] border-[#d4d3c9]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[265px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>극장</div>
                    <div className='flex w-[244px] justify-center p-[4px_3px_0px_3px]'>
                        <div className='flex justify-center w-[58px] text-[#333] text-[13px] mt-[10px] border-[2px] border-[#666666] p-[3px]'>전체</div>
                        <div className='flex justify-center w-[90px] text-[#333] text-[13px] mt-[10px] border-y-[2px] border-[#666666] p-[3px]'>아트하우스<IoIosArrowDown className='flex items-center mt-[3px] ml-1' /></div>
                        <div className='flex justify-center w-[88px] text-[#333] text-[13px] mt-[10px] border-[2px] border-[#666666] p-[3px]'>특별관<IoIosArrowDown className='flex items-center mt-[3px] ml-1' /></div>
                    </div>
                    <div>
                        <div id="leftContent"></div>
                        <div id="rightContent"></div>
                    </div>
                </div>
                <div id="day" className='flex flex-col items-center bg-[#f2f0e5] w-[284px] border-r-[2px] border-[#d4d3c9]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[91px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>날짜</div>
                        <div className='flex justify-center overflow-y-auto scrollbar-hide w-[91px] h-[550px] mt-[20px]'>
                            <ul className='flex flex-col'>
                                {Object.entries(groupedDates).map(([monthYear, days], index) => {
                                    const [year, month] = monthYear.split('-');
                                    return (
                                        <li key={index} className="flex flex-col items-center mb-3">
                                            <div className="font-bold text-[11px] text-[#666] mt-[12px]">{year}</div>
                                            <div className="font-bold text-[30px] text-[#666] mt-[3px]">{month}</div>
                                            {days.map(({ day, dayOfWeek }, dayIndex) => {
                                                const isWeekend = dayOfWeek === '토' || dayOfWeek === '일';
                                                return (
                                                    <div
                                                        key={dayIndex}
                                                        className={`flex items-center w-fit h-[35px] mb-[1px] ${dayOfWeek === '토' ? 'text-[#31597c]' : dayOfWeek === '일' ? 'text-[#ad2727]' : 'text-[#333]'} font-bold text-[13px] pr-[5px]`}
                                                    >
                                                        <div>{dayOfWeek}</div>
                                                        <div className="ml-2 text-sm">{day}</div>
                                                    </div>
                                                );
                                            })}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                </div>
                <div id="time" className='flex flex-col items-center w-[346px] bg-[#f2f0e5]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[346px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>시간</div>
                    <div className='flex flex-col w-[306px] mt-[18px] border-b-[2px] border-[#cfcdc3]'>
                        <div className='flex justify-between w-[95px] h-[22px]'>
                            <div className='flex items-center bg-[url("./images/iconMN.png")] bg-[1px_1px] bg-no-repeat h-[14px] pl-[20px]'>
                                <div className='flex text-[13px]'>모닝</div>
                            </div>
                            <div className='flex items-center bg-[url("./images/iconMN.png")] bg-[1px_-20px] bg-no-repeat h-[14px] pl-[20px]'>
                                <div className='flex text-[13px]'>심야</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center h-[416px] text-[#666] text-[13px]'>영화,극장,날짜를 선택해주세요.</div>
                </div>
            </div>
            <div className='w-full bg-[#1d1d1c] h-[129px]'>
                <div className='w-[996px]'>

                </div>
            </div>
            <div className='flex w-[996px] m-[30px_0]'>
                <img src="img/ticketingAd.jpg" alt="ticketingAd" />
            </div>
        </div>
    );
}
