import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Pay() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const movieId = queryParams.get('movieId');
    const movie = queryParams.get('movie');
    const branchId = queryParams.get('branchId');
    const theater = queryParams.get('theater');
    const date = queryParams.get('date');
    const time = queryParams.get('time');
    const poster = queryParams.get('poster');
    const people = queryParams.get('people');
    const seats = queryParams.get('seats');
    const screen = queryParams.get('screen');
    const totalAmount = queryParams.get('totalAmount');
    const paymentType = queryParams.get('paymentType');
    const easyPaymentType = queryParams.get('easyPaymentType');

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    // 체크박스 상태 배열로 관리, 초기값은 false
    const [checkedItems, setCheckedItems] = useState({
        all: false,
        one: false,
        two: false,
        three: false,
        four: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked: isChecked } = e.target;
        
        if (name === "all") {
            setCheckedItems({
                all: isChecked,
                one: isChecked,
                two: isChecked,
                three: isChecked,
                four: false, // 'four'는 'all'과 관계 없이 false로 설정
            });
        } else {
            setCheckedItems((prevState) => ({
                ...prevState,
                [name]: isChecked,
            }));
        }
    };

    useEffect(() => {
        const allChecked = checkedItems.one && checkedItems.two && checkedItems.three;
        setCheckedItems((prevState) => ({
            ...prevState,
            all: allChecked,
        }));
    }, [checkedItems.one, checkedItems.two, checkedItems.three]);

    const isAllChecked = checkedItems.all && checkedItems.one && checkedItems.two && checkedItems.three && checkedItems.four;

    async function handlePayment() {
        if (!isAllChecked) {
            alert("모든 약관에 동의해주세요.");
            return;
        }

        const totalAmount = queryParams.get('totalAmount');
        const movie = queryParams.get('movie');

        // IMP 객체가 정의되어 있는지 확인
        if (typeof window.IMP === 'undefined') {
            console.error("결제 라이브러리가 로드되지 않았습니다.");
            return;
        }

        var IMP = window.IMP;
        IMP.init("imp56135040");

        function requestPay() {
            IMP.request_pay(
                {
                    pg: "kakaopay",
                    pay_method: "card",
                    merchant_uid: `order_${new Date().getTime()}`,
                    name: movie,
                    amount: totalAmount,
                    buyer_name: "홍길동",
                },
                async function (rsp) {
                    if (rsp.success) {
                        console.log("결제 성공:", rsp);
                        // 결제 성공 시 백엔드 API 호출
                        try {
                            const response = await sendBookingData();
                            if (response.bookingNum) {
                                // 성공적으로 예매 정보가 저장됨
                                alert(`예매가 완료되었습니다. 예매번호: ${response.bookingNum}`);
                                navigate('/payend');
                            } else {
                                // 예매 정보 저장 실패
                                alert("예매 정보 저장에 실패했습니다. 고객센터에 문의해주세요.");
                            }
                        } catch (error) {
                            console.error("API 호출 중 오류 발생:", error);
                            alert("예매 처리 중 오류가 발생했습니다. 고객센터에 문의해주세요.");
                        }
                    } else {
                        alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                    }
                }
            );
        }

        // 결제 요청 함수 호출
        requestPay();
    }

    const convertSeatsFormat = (seatsString) => {
        return seatsString.split(', ').map(seat => {
            const [row, num] = seat.split('');
            return { row, num: parseInt(num) };
        });
    };

    async function sendBookingData() {
        const apiUrl = 'http://localhost:8080/booking';
        const token = localStorage.getItem('token');
    
        const theaterData = screen; // 실제로는 URL에서 받아오는 값
        const theaterNum = theaterData.replace('관', ''); // '관'을 제거하고 숫자만 추출
    
        const formattedSeats = convertSeatsFormat(seats);
    
        const screeningTime = time; // time은 "hh:mm:ss" 형식으로 되어있다고 가정합니다.
        const [hours, minutes, seconds] = screeningTime.split(':');

        const peopleArray = people.split(',').map(person => {
            const [ticketType, ticketCount] = person.trim().replace('명', '').split(' ');
            return {
                ticketType: ticketType, // 예: '일반', '청소년'
                ticketCount: parseInt(ticketCount, 10) // 숫자로 변환
            };
        });
        
        const bookingData = {
            movieId: movieId, // 실제 영화 ID로 변경 필요
            screeningDate: date,
            screeningTime: `${hours}:${minutes}:${seconds}`,
            branchId: branchId, // 실제 지점 ID로 변경 필요
            theaterNum: theaterNum,
            ticketsCategory: peopleArray,
            seats: formattedSeats,
            paymentAmount: parseInt(totalAmount),
            paymentType: paymentType,
            easyPaymentType: easyPaymentType
        };
    
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                data: bookingData // body에 명시적으로 data 넣기
            });
    
            return response.data; // axios는 기본적으로 response.data에 JSON 데이터를 반환함
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            throw error;
        }
    }
    
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-[986px] h-[725px] bg-[#f6f6f4] border-[5px] border-[#333] my-[30px]'>
                <div className='flex w-full h-[51px] text-[22px] font-bold text-[#f2f0e5] bg-[#333] border-[1px] border-[#707070] '>
                    <div className='flex items-center pl-5'>예매내역 확인</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div id="container" className='flex pt-[45px] border-b-[2px] border-[#bebebd]'>
                        <div id="left" className='flex flex-col w-[452px] h-[257px] float-left'>
                            <div className='flex h-[35px] bg-[#eeeeec] pl-[23px] border-t-[2px] border-b-[1px] border-[#bebebd] items-center'>
                                <div className='flex text-[18px] text-[#333333] font-bold'>예매정보</div>
                                <div className='flex text-[11px] text-[#666] font-normal pl-[19px]'>결제하시기 전 예매내역을 다시 한번 확인해 주세요.</div>
                            </div>
                            <div id="movieInfo" className='flex pt-[20px] pb-[40px]'>
                                <div className='flex w-[110px] h-[158px] mr-[19px]'>
                                    <img src={poster} alt="moviePoster" />
                                </div>
                                <table className='w-[323px] mb-[10px]'>
                                    <tbody>
                                        <tr id="movieName" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>영화명</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{movie}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="theater" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>극장</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>CGV {theater}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="screen" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>상영관</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{screen}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="movieDate" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>일시</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{date} {time}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="people" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>인원</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{people}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="seat" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>좌석</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{seats}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="right" className='flex flex-col w-[452px] h-[257px] float-left border-l-[1px] border-[#bebebd]'>
                            <div className='flex h-[35px] bg-[#eeeeec] pl-[23px] border-t-[2px] border-b-[1px] border-[#bebebd] items-center'>
                                <div className='flex text-[18px] text-[#333333] font-bold'>예매정보</div>
                                <div className='flex text-[11px] text-[#666] font-normal pl-[19px]'>결제하시기 전 예매내역을 다시 한번 확인해 주세요.</div>
                            </div>
                            <div id="movieInfo" className='flex pt-[20px] pb-[40px]'>
                                <table className='w-[323px] mb-[10px] ml-[20px]'>
                                    <tbody>
                                        <tr id="movieName" className='flex items-center justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>결제금액</th>
                                            <td className='flex w-[271px] font-bold text-[16px]'>{totalAmount}원</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                    <tr id="paymentMethod" className='flex items-center justify-start h-[24px]'>
                                        <th className='flex w-[52px] font-normal text-[12px]'>결제수단</th>
                                        <td className='flex w-[90px] text-[12px] font-bold'>
                                            {paymentType === '간편결제' ? easyPaymentType : paymentType}
                                        </td>
                                        <td className='flex w-[271px] font-bold text-[#c62424] text-[16px]'>{totalAmount}원</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="info" className='flex flex-col w-[907px] h-auto py-[15px]'>
                        <ul className='flex flex-col'>
                            <li className='w-[878px] text-[12px] text-[#333] mb-[6px] ml-[15px] pl-[7px]'>인터넷 예매는 온라인상으로 영화상영 시간 20분 전 까지 취소 가능하며 20분 이후에는 현장에서 취소를 하셔야 합니다.</li>
                            <li className='w-[878px] text-[12px] text-[#333] mb-[6px] ml-[15px] pl-[7px]'>현장 취소를 하는 경우 상영시간 이전까지만 가능하며 영화 상영 시작 시간 이후 취소/환불/결제수단 변경은 불가합니다.</li>
                            <li className='w-[878px] text-[12px] text-[#333] mb-[6px] ml-[15px] pl-[7px]'>입장 지연에 따른 관람 불편을 최소화 하기 위해 본 영화는 10분 후 상영이 시작됩니다.</li>
                        </ul>
                        <a href="http://www.cgv.co.kr/support/faq/detail-view.aspx?idx=749&type=239&page=1&searchtext=&pb=Y"
                        className='flex text-[#207cca] text-[12px] mt-[10px] ml-[15px]'>{`> 예약취소 및 환불규정 안내`}</a>
                    </div>

                    <div className='flex w-[907px] h-max-fit pt-[15px] pb-[15px] m-[0_0_28px] bg-[#eeeeee] border-t-[1px] border-b-[1px] border-[#cccccc]'>
                        <div id="leftInfo" className='flex flex-col w-[47%] pl-[3%] border-r-[1px] border-[#cccccc]'>
                        <div className='flex items-center w-[410px] h-min-[15px] m-[0_0_10px]'>
                                <input 
                                    id='all'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="all"
                                    checked={checkedItems.all} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="all" className='w-[93%] ml-[10px] text-[12px] text-[#333333] font-bold'>결제대행서비스 약관에 모두 동의</label>
                            </div>
                            <div className='flex items-center w-[650px] h-min-[15px] mb-[5px] ml-[10px] m-[0_0_10px]'>
                                <input 
                                    id='one'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="one"
                                    checked={checkedItems.one} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="one" className='w-[93%] text-[12px] text-[#333333] font-normal ml-[10px]'>전자금융거래 이용약관</label>
                                <button className='flex w-[100%] bg-none text-[12px] text-[#207cca] h-[16px]'>전문확인</button>
                            </div>
                            <div className='flex items-center w-[650px] h-min-[15px] mb-[5px] ml-[10px] m-[0_0_10px]'>
                                <input 
                                    id='two'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="two"
                                    checked={checkedItems.two} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="two" className='w-[93%] text-[12px] text-[#333333] font-normal ml-[10px]'>개인정보 수집 이용약관</label>
                                <button className='flex w-[100%] bg-none text-[12px] text-[#207cca] h-[16px]'>전문확인</button>
                            </div>
                            <div className='flex items-center w-[650px] h-min-[15px] mb-[5px] ml-[10px] m-[0_0_10px]'>
                                <input 
                                    id='three'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="three"
                                    checked={checkedItems.three} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="three" className='w-[93%] text-[12px] text-[#333333] font-normal ml-[10px]'>개인정보 제공 및 위탁 안내 약관</label>
                                <button className='flex w-[100%] bg-none text-[12px] text-[#207cca] h-[16px]'>전문확인</button>
                            </div>
                        </div>
                        <div id="rightInfo" className='flex flex-col w-[47%] pl-[3%]'>
                            <div className='flex items-center w-[410px] h-min-[15px] m-[0_0_10px]'>
                                <input 
                                    id='four'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="four"
                                    checked={checkedItems.four} 
                                    onChange={handleCheckboxChange} 
                                />
                                <label htmlFor="four" className='w-[93%] ml-[10px] text-[12px] text-[#333333] font-bold'>상기 결제 내역을 모두 확인 했습니다.</label>
                            </div>
                        </div>
                    </div>

                    <div className='flex'>
                        <div id="pay">
                            <img 
                            src={`${process.env.PUBLIC_URL}/img/paymentBtn.png`} 
                            alt="paymentBtn" 
                            style={{ opacity: isAllChecked ? 1 : 0.5 }} // 모든 체크박스가 선택되지 않으면 흐릿하게 표시
                            onClick={handlePayment}
                            />
                        </div>
                        <div id="cancel" className="flex ml-2" onClick={handleCancelClick}>
                            <img src={`${process.env.PUBLIC_URL}/img/cancelBtn.png`} alt="cancelBtn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
