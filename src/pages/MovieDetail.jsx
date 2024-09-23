import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function MovieDetail() {

    const [movies] = useState(() => 
        Array.from({ length: 1 }, (_, index) => {
            const randomRate = (Math.random() * 100).toFixed(1); // 0~100 사이의 소수점 1자리 숫자 생성
            return {
                id: index,
                title: `베테랑2`,
                poster: 'img/moviePoster.jpg',
                reservationRate: `예매율: ${randomRate}%`,
            };
        })
    );

    return (
        <div>
            <div id="movieInfo" className='flex flex-col items-center pt-[40px]'>
                {movies.map((movie, index) => (
                    <div className='flex w-[980px]'>
                        <div>
                            <img src={movie.poster} alt={movie.title} className='w-[170px] h-[234px] relative mr-[30px]' />
                            
                            <div 
                            className='absolute mt-[-29px] ml-[4px] size-[24px] bg-[url("./images/spriteIcon.png")] bg-[0px_0px] bg-no-repeat cursor-pointer'
                            onClick={() => window.open(movie.poster, '_blank')}
                            ></div>
                        </div>
                        <div>
                            <div>
                                <div className='flex items-center'>
                                    <div className='flex text-[25px] text-[#1a1919] font-[500]'>{movie.title}</div>
                                    <div className='flex h-fit p-[2px_7px] ml-[12px] border-[2px] border-[#3e82a4] font-[500] text-[12px] text-[#3e82a4]'>현재상영중</div>
                                </div>
                                <div className='flex w-[765px] border-b-[1px] border-[#d9d6c8] pb-[10px]'>
                                    <div className='flex text-[14px] text-[#666] mt-[25px]'>{movie.reservationRate}</div>
                                </div>
                            </div>
                            <div>
                                <div className='text-[13px] text-[#333] font-[500] mt-[18px]'>
                                감독 : 류승완 / 프로듀서 : 김강이 ,  유국영 / 배우 : 
                                황정민 ,  정해인 ,  장윤주 ,  진경 ,  정만식 ,  신승환 ,  오달수 ,  오대환 ,  김시후 <br />
                                장르 : 액션, 범죄 / 기본 정보 : 
                                15세이상관람가, 118분, 한국 <br />
                                개봉 : 
                                2024.09.13
                                </div>
                            </div>
                            <div className='mt-[22px]'>
                                <NavLink to='/ticketing' className='flex justify-center items-center font-[500] w-[120px] h-[34px] bg-[#fb4357] text-[14px] text-[#fff] rounded-[5px] mt-2'>예매하기</NavLink>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='flex w-[980px]'>
                    <div className='mb-[35px] w-[350px] font-[400] text-[14px] text-[#333333] pt-[40px] mt-[35px]'>
                    가족들도 못 챙기고 밤낮없이 범죄들과 싸우는<br />
                    베테랑 형사 '서도철'(황정민)과 강력범죄수사대 형사들. <br /><br />

                    어느 날, 한 교수의 죽음이 이전에 발생했던<br />
                    살인 사건들과 연관성이 있는 것으로 밝혀지며<br />
                    전국은 연쇄살인범으로 인해 떠들썩해진다.<br />
                    이에 단서를 추적하며 수사를 시작한 형사들.<br />
                    하지만 이들을 비웃기라도 하듯,<br />
                    연쇄살인범은 다음 살인 대상을 지목하는 예고편을<br />
                    인터넷에 공개하며 또 한 번 전 국민을 흔들어 놓는다. <br /><br />

                    강력범죄수사대는 서도철의 눈에 든 정의감 넘치<br />
                    막내 형사 '박선우' (정해인)를 투입한다.<br />
                    그리고 사건은 새로운 방향으로 흐르게 되는데...
                    </div>
                </div>
            </div>

        </div>
    )
}
