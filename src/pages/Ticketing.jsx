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

    const ListItem = ({ item, justify, onClick, customClass }) => (
        <li
            className={`flex items-center mb-[1px] pl-[6px] pr-[8px] w-[110px] h-[31px] ${justify} text-[#333333] cursor-pointer ${customClass}`}
            onClick={onClick}
        >
            <div>{item}</div>
        </li>
    );
    
    const [activeSort, setActiveSort] = useState('예매율순');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [regions, setRegions] = useState([]);
    const [activeRegion, setActiveRegion] = useState('서울');
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const response = await fetch('/theaters.json');
                const data = await response.json();
                setRegions(data);
                console.log(data);
                console.log("Active Region:", activeRegion);
                
                // Set selected theater if 서울지역 exists
                const seoulRegion = data.find(region => region.region === '서울지역');
                if (seoulRegion) {
                    setActiveRegion('서울지역'); // Set active region
                    // Optionally set the selected theater to the first one in the list
                    setSelectedTheater(seoulRegion.theaters[0]);
                }
            } catch (error) {
                console.error('Error fetching theaters:', error);
            }
        };
        fetchTheaters();
    }, []);
    

    const handleSortChange = (sortType) => {
        setActiveSort(sortType);
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie); // 선택된 영화 정보 저장
    };

    const handleTheaterClick = (theater) => {
        setSelectedTheater(theater);
    };

    const handleDateSelect = (day, dayOfWeek) => {
        const formattedDate = `${new Date().getFullYear()}.${String(new Date().getMonth() + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}(${dayOfWeek})`;
        setSelectedDate(formattedDate);
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
                <div className='flex w-[113px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-120px] ml-2' 
                    onClick={() => setSelectedMovie(null)}
                ></div>
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
                                    <div className="font-bold text-[13px] pr-[5px] cursor-pointer"
                                        onClick={() => handleMovieClick(movie)} // 클릭 시 포스터 변경
                                    >
                                        {movie.title}
                                    </div>
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
                    <div className='flex mt-[10px] h-[490px]'>
                        <div id="leftContent" className='flex w-[110px]'>
                            <ul>
                                {regions.map((region) => (
                                    <ListItem 
                                        key={region.region} 
                                        item={region.region} 
                                        justify="justify-end" 
                                        onClick={() => {
                                            console.log("Clicked Region:", region.region);
                                            setActiveRegion(activeRegion === region.region ? null : region.region);
                                        }}
                                        customClass="bg-[#e6e4d9] text-[12px]"
                                    />
                                ))}
                            </ul>
                        </div>
                        <div id="rightContent" className='flex flex-col w-[114px] overflow-scroll scrollbar-hide'>
                            <div>
                                <ul>
                                    {activeRegion && regions.find(r => r.region === activeRegion)?.theaters.map((theater) => (
                                        <ListItem 
                                            key={theater} 
                                            item={theater} 
                                            justify="justify-start" 
                                            customClass="text-[13px] font-bold px-[7px]"
                                            onClick={() => handleTheaterClick(theater)} // 클릭 핸들러 추가
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="day" className='flex flex-col items-center bg-[#f2f0e5] w-[284px] border-r-[2px] border-[#d4d3c9]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[91px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>날짜</div>
                    <div className='flex justify-center overflow-y-auto scrollbar-hide w-[91px] h-[530px] mt-[20px]'>
                        <ul className='flex flex-col'>
                            {Object.entries(groupedDates).map(([monthYear, days], index) => {
                                const [year, month] = monthYear.split('-');
                                return (
                                    <li key={index} className="flex flex-col items-center mb-3">
                                        <div className="font-bold text-[11px] text-[#666] mt-[12px]">{year}</div>
                                        <div className="font-bold text-[30px] text-[#666] mt-[3px]">{month}</div>
                                        {days.map(({ day, dayOfWeek }, dayIndex) => (
                                            <div
                                                key={dayIndex}
                                                onClick={() => handleDateSelect(day, dayOfWeek)} // 날짜 선택 처리
                                                className={`flex items-center w-fit h-[35px] mb-[1px] ${dayOfWeek === '토' ? 'text-[#31597c]' : dayOfWeek === '일' ? 'text-[#ad2727]' : 'text-[#333]'} font-bold text-[13px] pr-[5px]`}
                                            >
                                                <div>{dayOfWeek}</div>
                                                <div className="ml-2 text-sm">{day}</div>
                                            </div>
                                        ))}
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
            <div className='flex w-full bg-[#1d1d1c] h-[129px] justify-center items-center'>
                <div className='flex w-[996px] justify-between'>
                    <div className='flex items-center'>
                        <div className='flex relative h-[80px] w-[210px] pr-[2px]'>
                            {/* 선택된 영화 포스터 및 제목 표시 영역 */}
                            {selectedMovie ? (
                                <div className='flex'>
                                    <div className='flex items-center'>
                                        <img src={selectedMovie.poster} alt="Selected Movie Poster" className='w-[70px]' />
                                    </div>
                                    <div className="ml-2 text-[#cccccc] text-[14px] font-[500]">{selectedMovie.title}</div> {/* 포스터 오른쪽에 영화 제목 표시 */}
                                </div>
                            ) : (
                                <div className='bg-[url("./images/tnbSteps.png")] bg-[30px_25px] bg-no-repeat w-full h-full'></div> // 배경 표시 (선택된 영화 없을 때)
                            )}
                        </div>
                        <div className='flex relative h-[80px] w-[210px] pr-[2px]'>
                            {/* 선택된 극장 표시 영역 */}
                            {selectedTheater ? (
                                <div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>극장</div>
                                        <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'>CGV{selectedTheater}</div>
                                    </div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>일시</div>
                                        <div id="dayList" className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'>{selectedDate}</div>
                                    </div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>상영관</div>
                                        <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'></div>
                                    </div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>인원</div>
                                        <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'></div>
                                    </div>
                                </div>
                                
                            ) : (
                                <div className='w-[210px] bg-[url("./images/tnbSteps.png")] h-[80px] bg-[30px_25px] bg-no-repeat border-l-[1px] border-[#5b5b5b]'></div> // 배경 표시 (선택된 극장이 없을 때)
                            )}
                        </div>
                        <div className='flex relative h-[80px] w-[160px] pr-[2px] bg-[url("./images/tnbSteps.png")] bg-[10px_-190px] bg-no-repeat border-l-[1px] border-[#5b5b5b]'></div>
                        <div className='flex relative h-[80px] w-[130px] pr-[2px] bg-[url("./images/tnbSteps.png")] bg-[0px_-297px] bg-no-repeat'></div>
                    </div>
                    <div className='flex relative size-[106px] mr-[5px] bg-[url("./images/tnbButtons.png")] bg-[0px_-220px] bg-no-repeat'></div>
                </div>
            </div>
            <div className='flex w-[996px] m-[30px_0]'>
                <img src="img/ticketingAd.jpg" alt="ticketingAd" />
            </div>
        </div>
    );
}
