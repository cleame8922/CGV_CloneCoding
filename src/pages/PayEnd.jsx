import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function PayEnd() {

    const location = useLocation();
    const { bookingData, poster, amount } = location.state || {};
    const navigate = useNavigate();

    console.log(location.state);

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-[986px] h-max-fit bg-[#f2f0e5] border-[5px] border-[#333] my-[30px]'>
                <div className='flex w-full h-[51px] text-[22px] font-bold text-[#f2f0e5] bg-[#333] border-[1px] border-[#707070] '>
                    <div className='flex items-center pl-5'>결제내역 확인</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div id="container" className='flex flex-col items-center pt-[45px] pb-[45px] h-[600px]'>
                        <div className='text-[25px] text-[#333] font-bold'>결제가 완료되었습니다.</div>
                        <div className='flex h-[340px] flex-col items-center'>
                            <div id="movieInfo" className='flex w-[620px] h-max-fit pt-[50px] pb-[40px]'>
                                    <div className='flex mr-[19px]'>
                                        <img src={poster} alt="moviePoster" className='w-[160px] h-[240px]' />
                                    </div>
                                    <div className='flex flex-col ml-11'>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>예매번호</div>
                                            <div className='flex font-bold w-[200px]'>{bookingData.bookingNum}</div>
                                        </div>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>영화</div>
                                            <div className='flex font-bold w-[200px]'>{bookingData.movieTitle}</div>
                                        </div>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>극장</div>
                                            <div className='flex font-bold w-[200px]'>CGV {bookingData.branchName}</div>
                                        </div>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>일시</div>
                                            <div className='flex font-bold w-[200px]'>{bookingData.screeningDate} {bookingData.screeningTime}</div>
                                        </div>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>인원</div>
                                            <div className='flex font-bold w-[200px]'>
                                                {bookingData.ticketsCategory.map((ticket, index) => (
                                                    <span key={index}>
                                                        {ticket.ticketType} {ticket.ticketCount}명{index < bookingData.ticketsCategory.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>좌석</div>
                                            <div className='flex font-bold w-[200px]'>
                                                {bookingData.seats.map((seat, index) => (
                                                    <span key={index}>
                                                        {seat.row}{seat.num}{index < bookingData.seats.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>결제금액</div>
                                            <div className='flex text-[#c62424] font-bold w-[200px]'>{amount}원</div>
                                        </div>
                                        <div className='flex w-[400px] mb-3'>
                                            <div className='flex w-[80px] font-normal'>결제수단</div>
                                            <div className='flex font-bold w-[200px]'>{bookingData.paymentType} {bookingData.easyPaymentType}</div>
                                        </div>
                                    </div>
                            </div>
                            <div className='flex w-[200px]'>
                                <button 
                                    className='bg-[#fb4357] text-[#fdfcf0] w-fit h-[42px] position-static mt-[5px] py-[2px] px-[30px] text-center' 
                                    onClick={() => navigate('/')}
                                >
                                    메인으로 가기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
