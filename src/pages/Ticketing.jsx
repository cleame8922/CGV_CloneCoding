import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Ticketing() {

    const [movies, setMovies] = useState([]);
    const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ticket');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const handleMovieClick = async (movie) => {
        setSelectedMovie(movie); // 선택한 영화 설정
    
        try {
            const response = await axios.get(`http://localhost:8080/ticket/${movie.movieId}`);
            console.log(response.data); // response.data 구조 확인
    
            // 포스터 경로를 직접 설정하여 상태 업데이트
            const movieWithFullPosterPath = {
                ...response.data,
                posterPath: `${BASE_IMAGE_URL}${response.data.posterPath}`,
            };
    
            // 선택한 영화의 세부 정보를 상태에 저장
            setSelectedMovieDetails(movieWithFullPosterPath);
    
            console.log(movieWithFullPosterPath.posterPath); // 수정된 포스터 경로 확인
    
        } catch (error) {
            console.error('Error fetching movie details:', error);
            // 에러 처리 로직 추가
        }
    };

    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

    const ListItem = ({ item, count, justify, onClick, customClass }) => (
        <li
            className={`flex items-center mb-[1px] pl-[6px] pr-[8px] w-[110px] h-[31px] ${justify} text-[#333333] cursor-pointer ${customClass}`}
            onClick={onClick}
        >
            <div>{item}{count !== undefined ? `(${count})` : ''}</div>
        </li>
    );
    
    const [activeSort, setActiveSort] = useState('예매율순');
    const [regions, setRegions] = useState([]);
    const [showTimes, setShowTimes] = useState([]);
    const [activeRegion, setActiveRegion] = useState('서울');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const navigate = useNavigate();
    const today = new Date(); // 현재 날짜
    const todayDay = today.getDate(); // 현재 일
    const todayMonth = today.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더함)
    const todayYear = today.getFullYear(); // 현재 연도

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const response = await fetch('/theaters.json');
                const data = await response.json();
                setRegions(data);
                
                const seoulRegion = data.find(region => region.region === '서울지역');
                if (seoulRegion) {
                    setActiveRegion('서울'); // Set active region
                    // Optionally set the selected theater to the first one in the list
                    setSelectedTheater(seoulRegion.theaters[0]);
                }
            } catch (error) {
                console.error('Error fetching theaters:', error);
            }
        };
        fetchTheaters();
    }, []);
    
    const handleReservationClick = () => {
        if (selectedMovieDetails && selectedTheater && selectedDate && selectedTime) {
            const queryParams = new URLSearchParams({
                movie: selectedMovieDetails.title, // 영화 제목
                theater: selectedTheater, // 선택한 극장
                date: selectedDate, // 선택한 날짜
                time: selectedTime, // 선택한 시간
                floor: selectedShowtime.branch, // 영화관 층수
                screen: selectedShowtime.theaterNum,
                poster: selectedMovieDetails.posterPath, // 포스터 경로
                seat: selectedShowtime.totalSeats, // 총 좌석 수
                seatCount: selectedShowtime.remainSeats, // 남은 좌석 수
            }).toString();
            
            navigate(`/reservation?${queryParams}`);
        } else {
            console.error('모든 필드를 선택해 주세요.'); // 선택되지 않은 필드가 있는 경우 에러 처리
        }
    };    

    const handleSortChange = (sortType) => {
        setActiveSort(sortType);
    };
    
    const handleTheaterClick = async (theater) => {
        setSelectedTheater(theater);
    
        // 지점 ID 설정
        let branchId;
        if (theater === '강남') {
            branchId = 1;
        } else if (theater === '강변') {
            branchId = 2;
        } else {
            branchId = null; // 다른 지점 처리
        }
    
        // 영화 선택 여부 및 branchId 확인 후 시간 정보 요청
        if (selectedMovie && branchId) {
            try {
                const response = await axios.get(`http://localhost:8080/ticket/${selectedMovie.movieId}/${branchId}`);
                setShowTimes(response.data); // 시간 정보 설정
            } catch (error) {
                console.error('Error fetching showtimes:', error);
            }
        }
    };
    

    const handleDateSelect = async (day, dayOfWeek, monthYear) => {
        if (!monthYear) {
            console.error("monthYear is undefined");
            return;
        }

        const [year, month] = monthYear.split('-');
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // yyyy-mm-dd 형식으로 변환

        setSelectedDate(formattedDate); // 선택된 날짜 업데이트

        if (!selectedMovie || !selectedTheater) {
            console.error('Selected movie or theater is undefined');
            return; // 영화나 극장이 선택되지 않았을 경우 처리
        }

        let branchId = null; // 기본값 설정
        switch (selectedTheater) {
            case '강남':
                branchId = 1;
                break;
            case '강변':
                branchId = 2;
                break;
            default:
                console.warn(`Unexpected theater selected: ${selectedTheater}`);
                return; // 다른 극장이 선택되면 함수를 종료
        }

        // API 호출
        try {
            const response = await axios.get(`http://localhost:8080/ticket/${selectedMovie.movieId}/${branchId}/${formattedDate}`);
            setShowTimes(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching showtimes:', error);
            // 에러 발생 시 사용자에게 알리기 위한 추가 로직을 여기 추가할 수 있습니다.
        }
    };
    const [selectedShowtime, setSelectedShowtime] = useState(null);

    const handleShowtimeClick = (showtime) => {
        setSelectedTime(showtime.startTime);
        setSelectedShowtime(showtime);
    };

    const generateDates = (releaseDate) => {
        const today = new Date();
        const release = new Date(releaseDate);
        const startDate = today; // 현재 날짜부터 시작
        const dates = [];
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        for (let i = 0; i < 50; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dayOfWeek = dayNames[date.getDay()];
            dates.push({ year, month, day, dayOfWeek });
        }
        return dates;
    };
    
    useEffect(() => {
        const dates = generateDates(selectedMovie ? selectedMovie.releaseDate : null);
        setAvailableDates(dates);
    }, [selectedMovie]);
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
                    onClick={() => {
                        setSelectedMovie(null);
                        setSelectedTheater(null);
                        setSelectedDate(null);
                    }}
                ></div>
            </div>

            <div className='flex justify-center'>
                <div className='flex w-[160px] h-[300px] mr-1 mt-[2px]'>
                    <img src="img/sideAd.jpg" alt="sideAd" />
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
                                    <div 
                                        key={movie.movieId} 
                                        className={`
                                            flex items-center w-[230px] h-[35px] mb-[1px] cursor-pointer
                                            ${selectedMovie && selectedMovie.movieId === movie.movieId 
                                                ? 'bg-[#333] border-[2px] border-[#5c5c5c] text-[#fff]' 
                                                : ''}
                                        `}
                                        onClick={() => handleMovieClick(movie)}
                                    >
                                        <img 
                                            src={movie.age === 'ALL' 
                                                ? `${process.env.PUBLIC_URL}/img/all.svg` 
                                                : `${process.env.PUBLIC_URL}/img/${movie.age}years.svg`} 
                                            alt={`${movie.age} rating`} 
                                            className="mr-[6px] size-[20px]" 
                                        />
                                        <div className="font-bold text-[13px] pr-[5px]">
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
                                            item={region.region.replace('지역', '')}
                                            count={region.theaters.length}
                                            justify="justify-end" 
                                            onClick={() => {
                                                console.log("Clicked Region:", region.region);
                                                setActiveRegion(activeRegion === region.region ? null : region.region);
                                            }}
                                            customClass={`
                                                bg-[#e6e4d9] text-[12px]
                                                ${activeRegion === region.region 
                                                    ? 'bg-transparent bg-[url("./images/theaterAreaListItemSelected.png")] bg-right bg-no-repeat font-bold' 
                                                    : ''}
                                            `}
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
                                                customClass={`
                                                    ml-1 text-[13px] font-bold px-[7px]
                                                    ${selectedTheater === theater 
                                                        ? 'bg-[#333] border-[2px] border-[#5c5c5c] text-[#fff]' 
                                                        : ''}
                                                `}
                                                onClick={() => handleTheaterClick(theater)}
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
                                {availableDates.length > 0 ? (
                                    Object.entries(
                                        availableDates.reduce((acc, { year, month, day, dayOfWeek }) => {
                                            const monthYearKey = `${year}-${month < 10 ? '0' : ''}${month}`;
                                            if (!acc[monthYearKey]) {
                                                acc[monthYearKey] = [];
                                            }
                                            acc[monthYearKey].push({ day, dayOfWeek });
                                            return acc;
                                        }, {})
                                    ).map(([monthYear, days], index) => {
                                        const [year, month] = monthYear.split('-').map(Number);

                                        return (
                                            <li key={index} className='flex flex-col items-center mb-3'>
                                                <div className="font-bold text-[11px] text-[#666] mt-[12px]">{year}</div>
                                                <div className="font-bold text-[30px] text-[#666] mt-[3px]">{month}</div>
                                                {days.map(({ day, dayOfWeek }, dayIndex) => {
                                                    const currentDate = new Date();
                                                    const releaseDate = selectedMovie ? new Date(selectedMovie.releaseDate) : null; // 영화의 releaseDate
                                                    const isToday = day === currentDate.getDate() && month === currentDate.getMonth() + 1 && year === currentDate.getFullYear();
                                                    const isAfterReleaseDate = releaseDate ? new Date(year, month - 1, day) >= releaseDate : true; // 선택 가능한 날짜
                                                    const isSelected = selectedDate === `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // 선택된 날짜 확인

                                                    return (
                                                        <div
                                                            key={dayIndex}
                                                            onClick={() => {
                                                                if (isAfterReleaseDate) {
                                                                    handleDateSelect(day, dayOfWeek, monthYear);
                                                                }
                                                            }}
                                                            className={`
                                                                flex items-center w-fit mb-[1px] cursor-pointer
                                                                ${isToday ? 'bg-[url("./images/dateListItemToday.png")] bg-no-repeat bg-[0px_12px] pl-[7px]' : ''}
                                                                ${isSelected ? 'bg-[#333] border-[2px] border-[#5c5c5c] w-[65px] h-[32px] m-[1px] px-[6px] text-[#fff]' : 'h-[35px]'}
                                                                ${isAfterReleaseDate ? '' : 'text-[#666666] opacity-25'} // 선택 불가능한 날짜 색상 및 투명도
                                                                ${dayOfWeek === '토' ? 'text-[#31597c]' : dayOfWeek === '일' ? 'text-[#ad2727]' : 'text-[#333]'}
                                                                font-bold text-[13px]
                                                            `}
                                                        >
                                                            <div>{dayOfWeek}</div>
                                                            <div className="ml-2 text-sm">{day}</div>
                                                        </div>
                                                    );
                                                })}
                                            </li>
                                        );
                                    })
                                ) : (
                                    <div className="mt-4 text-center text-gray-500">영화를 선택해주세요.</div>
                                )}
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
                        <div id="select">
                            {selectedMovie && selectedTheater && selectedDate ? (
                                <div className='flex flex-col justify-start w-[300px] mt-[16px]'>
                                    {showTimes.map((show, index) => (
                                        <div key={index} className='flex flex-col mt-[10px] mb-[6px]'>
                                            <div className='flex'>
                                                <div className='flex text-[#b54d15] text-[12px] font-bold mr-[5px]'>{show.branch}</div>
                                                <div className='flex text-[#333] text-[12px] font-bold mr-[5px]'>{show.theaterNum}</div>
                                                <div className='flex text-[12px] text-[#666]'>{show.totalSeats}</div>
                                            </div>
                                            <div className='flex mt-[10px]'>
                                                <div 
                                                    className={`flex border-[2px] border-[#d6d3ce] text-[14px] font-semibold py-[2px] px-[5px] mr-[5px] justify-center items-center ${selectedTime === show.startTime ? 'border-[#000] bg-[#333] text-[#fff]' : ''}`}
                                                    onClick={() => handleShowtimeClick(show)}
                                                >
                                                    {show.startTime}
                                                </div>
                                                <div className='flex text-[12px] text-[#3d7c35] items-center'>{show.remainSeats}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div id="noSelect" className='flex items-center justify-center h-[416px] text-[#666] text-[13px]'>
                                    영화, 극장, 날짜를 선택해주세요.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex w-[160px] h-[300px] ml-1 mt-[2px]'>
                    <img src="img/sideAd.jpg" alt="sideAd" />
                </div>
            </div>            
            <div id="bottom" className='flex w-full bg-[#1d1d1c] h-[129px] justify-center items-center'>
                <div className='flex w-[996px] justify-between'>
                    <div className='flex items-center'>
                        <div className='flex relative h-[80px] w-[210px] pr-[2px]'>
                            {selectedMovieDetails ? (
                                <div className='flex'>
                                    <div className='flex items-center'>
                                        <img src={selectedMovieDetails.posterPath} alt="Selected Movie Poster" className='w-[70px]' />
                                    </div>
                                    <div className="ml-2 text-[#cccccc] text-[14px] font-[500]">{selectedMovieDetails.title}</div>
                                </div>
                            ) : (
                                <div className='bg-[url("./images/tnbSteps.png")] bg-[30px_25px] bg-no-repeat w-full h-full'></div>
                            )}
                        </div>
                        <div className='flex relative h-[80px] w-[210px] pr-[2px]'>
                            {selectedTheater ? (
                                <div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>극장</div>
                                        <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'>CGV{selectedTheater}</div>
                                    </div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>일시</div>
                                        <div className='flex w-[135px] ml-4'>
                                            <div id="dayList" className='mr-1 first-line:text-[#cccccc] text-[12px] font-[700]'>
                                                {selectedDate || ''}
                                            </div>
                                            <div className='text-[#cccccc] text-[12px] font-[700]'>
                                                {selectedTime || ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>상영관</div>
                                        <div id="floorList" className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'>
                                            {selectedShowtime ? `${selectedShowtime.branch} ${selectedShowtime.theaterNum}` : ''}
                                        </div>
                                    </div>
                                    <div className='flex mt-[2px]'>
                                        <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>인원</div>
                                        <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700]'></div>
                                    </div>
                                </div>
                            ) : (
                                <div className='w-[210px] bg-[url("./images/tnbSteps.png")] h-[80px] bg-[30px_25px] bg-no-repeat border-l-[1px] border-[#5b5b5b]'></div>
                            )}
                        </div>
                        <div className='flex relative h-[80px] w-[160px] pr-[2px] bg-[url("./images/tnbSteps.png")] bg-[10px_-190px] bg-no-repeat border-l-[1px] border-[#5b5b5b]'></div>
                        <div className='flex relative h-[80px] w-[130px] pr-[2px] bg-[url("./images/tnbSteps.png")] bg-[0px_-297px] bg-no-repeat'></div>
                    </div>
                    {selectedMovie && selectedTheater && selectedDate && selectedTime? (
                    <div 
                    className='flex relative size-[106px] mr-[5px] bg-[url("./images/tnbButtons.png")] bg-[-150px_-220px] bg-no-repeat cursor-pointer'
                    onClick={handleReservationClick}
                    ></div>
                    ) : (
                    <div className='flex relative size-[106px] mr-[5px] bg-[url("./images/tnbButtons.png")] bg-[0px_-220px] bg-no-repeat'></div>
                    )}
                </div>
            </div>
            <div className='flex w-[996px] m-[30px_0]'>
                <img src="img/ticketingAd.jpg" alt="ticketingAd" />
            </div>
        </div>
    );
}