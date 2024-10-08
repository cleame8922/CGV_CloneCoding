import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Reservation() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const movieId = queryParams.get('movieId');
    const movie = queryParams.get('movie');
    const branchId = queryParams.get('branchId');
    const theater = queryParams.get('theater');
    const date = queryParams.get('date');
    const time = queryParams.get('time');
    const floor = queryParams.get('floor');
    const poster = queryParams.get('poster');
    const seat = queryParams.get('seat');
    const totalSeats = parseInt(seat.replace(/[^0-9]/g, ''), 10);
    const seatCount = queryParams.get('seatCount');
    const screen = queryParams.get('screen');

    const navigate = useNavigate();

    const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let seatsPerRow, totalRows;

    if (totalSeats <= 80) {
        seatsPerRow = 10; // 최대 80석인 경우, 10개씩
        totalRows = Math.ceil(totalSeats / seatsPerRow);
    } else if (totalSeats <= 100) {
        seatsPerRow = 10; // 최대 100석인 경우, 10개씩
        totalRows = Math.ceil(totalSeats / seatsPerRow);
    } else {
        seatsPerRow = 12; // 108석인 경우, 12개씩
        totalRows = Math.ceil(totalSeats / seatsPerRow);
    }
    
    const [selectedNums, setSelectedNums] = useState({ 일반: 0, 청소년: 0, 경로: 0, 우대: 0 });
    const maxSelectable = 8;
    const totalSelected = Object.values(selectedNums).reduce((acc, num) => acc + num, 0);
    const remainingSeats = seat - seatCount;
    
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [tempSeat, setTempSeat] = useState(null);

    const [blockedSeats, setBlockedSeats] = useState([]);

    useEffect(() => {
        // 이미 선택된 좌석 정보를 가져오는 API 호출
        const fetchBlockedSeats = async () => {

            const screeningTime = time; // time은 "hh:mm:ss" 형식으로 되어있다고 가정합니다.
            const [hours, minutes, seconds] = screeningTime.split(':');
            
            const apiUrl = `http://localhost:8080/ticket/chooseTheater/${movieId}/${branchId}/${date}`;
            const requestBody = {
                theaterName: branchId,
                screeningTime: `${hours}:${minutes}:${seconds}`
            };

            try {
                const response = await axios.post(apiUrl, requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });

                // 서버에서 응답받은 좌석 정보를 가공하여 blockedSeats 상태에 저장
                const seatsData = response.data.seats || []; // 응답에서 좌석 정보를 추출
                const formattedBlockedSeats = seatsData.map(seat => `${seat.row}${seat.num}`); // 'A1' 형식으로 변환
                setBlockedSeats(formattedBlockedSeats);
            } catch (error) {
                console.error("좌석 정보를 가져오는 중 오류 발생:", error);
            }
        };

        fetchBlockedSeats();
    }, []);

    const handleSeatClick = (seatNumber) => {
        if (blockedSeats.includes(seatNumber)) {
            return; // 이미 선택된 좌석이면 아무 작업도 하지 않음
        }

        const totalSelectedCount = Object.values(selectedNums).reduce((sum, num) => sum + num, 0);
        const remainingSeats = totalSelectedCount - selectedSeats.length;

        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(prev => prev.filter(seat => seat !== seatNumber));
        } else if (remainingSeats > 0) {
            if (remainingSeats === 1) {
                setSelectedSeats(prev => [...prev, seatNumber]);
            } else if (remainingSeats > 1) {
                const adjacentSeat = getAdjacentSeat(seatNumber);
                if (adjacentSeat && !blockedSeats.includes(adjacentSeat)) {
                    setSelectedSeats(prev => [...prev, seatNumber, adjacentSeat]);
                } else {
                    setSelectedSeats(prev => [...prev, seatNumber]);
                }
            }
        }
    };

    const handleNumClick = (section, num) => {
        if (num <= maxSelectable - totalSelected + selectedNums[section]) {
            setSelectedNums(prev => ({
                ...prev,
                [section]: num,
            }));
        }
    };

    const handleReset = () => {
        setSelectedNums({ 일반: 0, 청소년: 0, 경로: 0, 우대: 0 });
        setSelectedSeats([]);
    };

    const getAdjacentSeat = (seatNumber) => {
        const [row, num] = seatNumber.split(/(?<=^[A-Z])/);
        const adjacentNum = parseInt(num) + 1; // 오른쪽 좌석
        const adjacentSeat = `${row}${adjacentNum}`;
    
        // 인접 좌석이 범위 내에 있고, 차단되지 않았는지 확인
        return adjacentNum <= seatsPerRow ? adjacentSeat : null;
    };
    
    

    const isAdjacentSeat = (seat1, seat2) => {
        const [row1, num1] = seat1.split(/(?<=^[A-Z])/);
        const [row2, num2] = seat2.split(/(?<=^[A-Z])/);
        return row1 === row2 && Math.abs(parseInt(num1) - parseInt(num2)) === 1;
    };
    
    const getSeatType = (seatIndex) => {
        let count = 0;
        for (const [type, num] of Object.entries(selectedNums)) {
            count += num;
            if (seatIndex < count) {
                return type;
            }
        }
        return '';
    };
    

    const moneys = {
        '일반': 15000,
        '청소년': 12000,
        '경로': 7000,
        '우대': 5000,
    };

    const calculateMoneyByType = () => {
        return Object.entries(selectedNums).map(([type, count]) => {
            if (count > 0 && moneys[type]) {
                return {
                    type,
                    price: moneys[type],
                    count
                };
            }
            return null;
        }).filter(Boolean);
    };

    // 총 금액 계산 함수
    const calculateTotalMoney = () => {
        return Object.entries(selectedNums).reduce((total, [type, count]) => {
            return total + (moneys[type] || 0) * count;
        }, 0);
    };

    const moneyByType = calculateMoneyByType();
    const totalMoney = calculateTotalMoney();
    
    const isSelectionComplete = () => {
        return totalSelected > 0 && selectedSeats.length === totalSelected;
    };

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return !!token; // token이 존재하면 true, 그렇지 않으면 false 반환
    };

    const handlePaymentClick = () => {
        if (isSelectionComplete()) {
            if (isLoggedIn()) {
                const selectedSeatList = selectedSeats.join(',');
                
                // 좌석 유형별로 정보를 생성
                const seatTypes = new Set(selectedSeats.map((_, index) => getSeatType(index)));
                const seatTypeInfo = Array.from(seatTypes).join(',');
    
                const peopleInfo = Object.entries(selectedNums)
                    .filter(([_, count]) => count > 0)
                    .map(([type, count]) => `${type} ${count}명`)
                    .join(', ');
    
                const queryParams = new URLSearchParams({
                    movieId,
                    movie,
                    branchId,
                    theater,
                    date,
                    time,
                    floor,
                    poster,
                    seat,
                    seatCount,
                    totalSelected,
                    screen,
                    people: peopleInfo,
                    seats: selectedSeats.join(','),
                    selectedSeats: selectedSeatList,
                    seatTypeInfo: seatTypeInfo,
                    totalAmount: totalMoney,
                }).toString();
        
                navigate(`/payment?${queryParams}`);
            } else {
                // 로그인되어 있지 않은 경우 alert 메시지를 띄우고 로그인 페이지로 이동
                alert('로그인이 필요합니다. 로그인 후 다시 시도해주세요!');
                navigate('/login', { state: { from: location.pathname + location.search } });
            }
        }
    };
    

    return (
        <div className='flex flex-col items-center'>
            <div id="etc" className='flex justify-end w-[996px] h-[74px] pt-[30px]'>
                <div className='flex w-[81px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")]'></div>
                <div className='flex w-[101px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-90px] ml-2'></div>
                <div className='flex w-[113px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-120px] ml-2' onClick={() => {navigate('/ticketing'); }}></div>
            </div>
            
            <div className='flex'>
                <div className='flex w-[160px] h-[300px] mr-1'>
                    <img src="img/sideAd.jpg" alt="sideAd" />
                </div>
                <div id="contents" className='flex flex-col bg-[#f2f0e5] w-[996px] h-[600px]'>
                    <div className='flex items-center justify-center bg-[#333333] w-[996px] h-[33px]'>
                        <div className='flex text-[#fff] text-[16px] font-[500]'>인원 / 좌석</div>
                    </div>
                    <div id="reset" className='absolute top-[325px] right-[470px] w-[65px] text-[#e6e6e6] text-[12px] font-bold bg-[url("./images/refreshBtn.png")] bg-no-repeat bg-[100%_50%] h-[20px]'
                    onClick={handleReset}>다시하기</div>
                    <div className='flex pt-[17px] pb-[3px] border-b-[2px] border-[#d4d3c9]'>
                        <div id="left" className='ml-[20px] pr-[18px] border-r-[1px] border-[#d4d3c9]'>
                            <div className='flex flex-col w-[440px]'>
                                <div className='flex justify-end pb-[5px] text-[11px] text-[red]'>* 최대 8명 선택 가능</div>
                                {Object.keys(selectedNums).map((section, index) => (
                                    <div key={index} className='flex items-center pb-[8px]'>
                                        <div className='w-[55px] h-[22px] text-[12px] text-[#666] flex justify-start'>{section}</div>
                                        <ul className='flex h-[22px]'>
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                                                const isSelected = selectedNums[section] === num;
                                                const isDisabled = (totalSelected > 0 && num > (maxSelectable - totalSelected + selectedNums[section]));

                                                return (
                                                    <li
                                                        key={num}
                                                        onClick={() => handleNumClick(section, num)}
                                                        className={`w-[20px] h-[20px] mr-[6px] text-[14px] font-bold flex items-center justify-center border 
                                                            ${isSelected 
                                                                ? 'border-[#000] bg-[#333] text-white' // 선택된 num의 스타일
                                                                : isDisabled
                                                                    ? 'border-[#d6d3ce] bg-[#d6d3ce] text-[#fff]' // 선택할 수 없는 스타일
                                                                    : 'border-[#d6d3ce] bg-transparent text-[#333]' // 기본 스타일
                                                            }`}>
                                                        {num}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                                <div className='absolute flex justify-end left-[830px] top-[482px]'>
                                    <div className='w-fit h-[18px] text-[#fff] text-[12px] p-[0_5px] border-[1px] border-[#745447] bg-[#926f60] rounded-[3px]'>관람 할인 안내</div>
                                </div>
                            </div>
                        </div>
                        <div id="right" className='flex flex-col ml-[20px] w-[440px]'>
                            <div className='flex justify-start'>
                                <div className='flex pr-[10px] border-r-[1px] border-[#ccc] h-[15px] text-[12px] text-[#333]'>CGV {theater}</div>
                                <div className='flex px-[10px] border-r-[1px] border-[#ccc] h-[15px] text-[12px] text-[#333]'>{floor} {screen}</div>
                                <div className='flex px-[10px] border-r-[1px] border-[#ccc] h-[15px] text-[12px] text-[#333]'>{seatCount}/{seat}</div>
                            </div>
                            <div className='flex justify-start pt-[5px]'>
                                <div className='flex font-bold text-[#5a5a5a] text-[20px]'>{date} {time}</div>
                            </div>
                            <div className='absolute flex justify-end left-[1360px] top-[482px]'>
                                <div className='w-fit h-[18px] text-[#fff] text-[12px] p-[0_5px] border-[1px] border-[#745447] bg-[#926f60] rounded-[3px]'>상영시간 변경</div>
                            </div>
                        </div>
                    </div>
                    <div id="seat" className='flex flex-col w-[996px] items-center pt-[20px]'>
                        <div className='flex flex-col w-[650px] h-[380px]'>
                            <div className='flex w-[650px] bg-[url("./images/screenBg.png")] bg-repeat-x h-[25px] text-[16px] text-[#333] font-bold justify-center'>SCREEN</div>
                            <div className='flex h-[350px] items-center justify-center'>
                                <div className="flex flex-col justify-center mr-4">
                                    {rows.slice(0, totalRows).map(row => (
                                        <div key={row} className="h-[20px] flex items-center justify-end text-[14px] font-bold text-[#333] mr-1">
                                            {row}
                                        </div>
                                    ))}
                                </div>

                                <div className={`grid grid-cols-${seatsPerRow}`} style={{gridTemplateColumns: `repeat(${seatsPerRow}, minmax(0, 1fr))`}}>
                                    {rows.slice(0, totalRows).flatMap(row => 
                                        [...Array(seatsPerRow)].map((_, i) => {
                                            const seatNumber = `${row}${i + 1}`;
                                            const seatIndex = rows.indexOf(row) * seatsPerRow + i;

                                            if (seatIndex >= totalSeats) return null;
                                            
                                            return (
                                                <div
                                                    key={seatNumber}
                                                    onClick={() => !blockedSeats.includes(seatNumber) && handleSeatClick(seatNumber)}
                                                    className={`w-[20px] h-[20px] mx-[1px] text-[12px] p-[1px] flex items-center justify-center border
                                                        ${selectedSeats.includes(seatNumber) ? 'bg-[red] text-[#fff]' : 
                                                        (tempSeat === seatNumber ? 'bg-[orange] text-[#fff]' : 
                                                        (blockedSeats.includes(seatNumber) ? 'bg-[#d6d3ce] text-[#fff] cursor-not-allowed' : 'bg-[#666] text-[#fff] cursor-pointer'))}`}
                                                >
                                                    {i + 1}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex w-[160px] h-[300px] ml-1'>
                    <img src="img/sideAd.jpg" alt="sideAd" />
                </div>
            </div>
            
            <div className='flex w-full bg-[#1d1d1c] h-[129px] justify-center items-center'>
                <div className='flex w-[996px] justify-between'>
                    <div className='flex items-center'>
                        <div className='flex relative h-[80px] w-[210px] pr-[2px]'>
                            <div className='flex'>
                                <div className='flex items-center'>
                                    <img src={poster} alt="Selected Movie Poster" className='w-[70px]' />
                                </div>
                                <div className="ml-2 text-[#cccccc] text-[14px] font-[500]">{movie}</div>
                            </div>
                        </div>
                        <div id="bottom" className='flex flex-col relative h-[80px] w-[210px] pr-[2px]'>
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
                                    {floor} {screen}
                                </div>
                            </div>
                            <div className='flex mt-[2px]'>
                                <div className='w-[50px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>인원</div>
                                <div className='w-[135px] ml-4 text-[#cccccc] text-[12px] font-[700] whitespace-nowrap overflow-hidden text-ellipsis'>
                                    {(() => {
                                        const sections = Object.keys(selectedNums)
                                            .map(section => {
                                                const num = selectedNums[section];
                                                return num > 0 ? `${section} ${num}명` : null;
                                            })
                                            .filter(Boolean)
                                            .join(', ');

                                        const maxLength = 50;
                                        return sections.length > maxLength ? sections.substring(0, maxLength) + '...' : sections;
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[15px] pt-[10px]'>
                        <div className='flex flex-col'>
                            {selectedSeats.length > 0 ? (
                                <>
                                    <div className='flex'>
                                        <div className='flex w-[60px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>좌석명</div>
                                        <div className='flex w-[130px] ml-4 text-[#cccccc] text-[12px] font-[700] whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {(() => {
                                                // 선택된 섹션 추가
                                                const selectedSections = Object.keys(selectedNums).filter(section => selectedNums[section] > 0);
                                                const sectionString = selectedSections.length > 0 ? selectedSections.join(', ') : '';

                                                return `${sectionString}석`;  // 선택된 섹션만 반환
                                            })()}
                                        </div>
                                    </div>
                                    <div className='flex mt-2'>
                                        <div className='flex w-[60px] pl-[10px] text-[#cccccc] text-[12px] font-[500]'>좌석번호</div>
                                        <div className='flex w-[120px] ml-4 text-[#cccccc] text-[12px] font-[700] whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {selectedSeats.join(', ')}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className='w-[200px] bg-[url("./images/tnbSteps.png")] bg-[10px_-190px] bg-no-repeat h-[80px]'></div>
                            )}
                        </div>
                    </div>
                    <div className='flex mt-[15px] pt-[10px]'>
                        <div className='flex flex-col'>
                            {totalSelected > 0 ? (
                                <div className='flex flex-col'>
                                    {moneyByType.map((item, index) => (
                                        <div key={index} className='flex justify-between'>
                                            <div className='flex w-[60px] text-[#cccccc] text-[12px] font-[500]'>
                                                {item.type}
                                            </div>
                                            <div className='flex w-[120px] text-[#cccccc] text-[12px] font-[700] whitespace-nowrap overflow-hidden text-ellipsis'>
                                                {item.price?.toLocaleString() ?? '0'} * {item.count}
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex justify-between mt-2'>
                                        <div className='flex w-[60px] text-[#cccccc] text-[12px] font-[500]'>총 금액</div>
                                        <div className='flex w-[120px] text-[#bf2828] text-[12px] font-[700] whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {totalMoney.toLocaleString()}원
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex relative h-[80px] w-[200px] pr-[2px] bg-[url("./images/tnbSteps.png")] bg-[-30px_-295px] bg-no-repeat'></div>
                            )}
                        </div>
                    </div>
                    <div className='flex w-[130px] bg-[#1d1d1c] h-[129px] justify-center items-center'>
                        <div className='flex w-[996px] justify-between'>
                            <div 
                                className={`flex relative size-[106px] mr-[5px] bg-[url("./images/tnbButtons.png")] 
                                    ${isSelectionComplete() ? 'bg-[-150px_-330px]' : 'bg-[0px_-330px]'
                                    } bg-no-repeat cursor-pointer`}
                                onClick={handlePaymentClick}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex w-[996px] m-[30px_0]'>
                <img src="img/ticketingAd.jpg" alt="ticketingAd" />
            </div>
        </div>
    );
}