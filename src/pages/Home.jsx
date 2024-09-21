import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
    const [selectedImage, setSelectedImage] = useState('img/suiteCinema.png');
    const [hoveredItem, setHoveredItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (image, index) => {
        setSelectedImage(image);
        setHoveredItem(index);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const movies = Array.from({ length: 10 }, (_, index) => ({
        id: index,
        title: `베테랑2`,
        poster: 'img/moviePoster.jpg',
        reservationRate: '예매율: 50%',
    }));

    const moviesToShow = movies.slice(currentIndex, currentIndex + 5);

    const handleNext = () => {
        if (currentIndex < movies.length - 5) {
            setCurrentIndex(prev => prev + 5);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 5);
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div id="video" className='flex flex-col items-center w-[100%] bg-[#000] relative'>
                <video autoPlay loop muted className='mx-[181px]'>
                    <source src="img/video.mp4" type="video/mp4" />
                </video>
                <div className='absolute inset-0 top-0 left-0 flex flex-col justify-center text-white bg-black bg-opacity-50'>
                    <div className='ml-[100px] absolute left-[450px]'>
                        <div className='font-[700] text-[40px]'>트랜스포머 ONE</div>
                        <div className='text-[20px]'>역대급 트랜스포머</div>
                        <div className='text-[20px]'>극장에서 확인하라!</div>
                    </div>
                </div>
                <div className='flex items-center absolute left-[550px] top-[370px] bg-white bg-opacity-80 rounded-[15px] p-[5px_15px] text-[14px] text-[#343434]'>
                    상세보기
                    <img src="img/arrowR.png" alt="arrow" className='flex left-[180px] top-[330px] size-3 ml-3' />
                </div>
                <div className='flex items-center absolute left-[665px] top-[370px]'>
                    <img src="img/play.png" alt="play" className='size-7 border-[1px] border-[#979797] rounded-[50%] p-1' />
                </div>
                <div className='flex items-center absolute left-[700px] top-[370px]'>
                    <img src="img/soundOff.png" alt="soundOff" className='size-7 border-[1px] border-[#979797] rounded-[50%] p-1' />
                </div>
            </div>

            <div id="movie" className='flex justify-center items-center h-[460px] w-full bg-[#f8f8f8] p-[50px_30px_60px]'>
                <div id="container" className='flex flex-col items-center justify-center w-[980px]'>
                    <div className='flex items-center justify-between w-full mb-4'>
                        <div id="chart" className='flex justify-between w-[248px] items-center'>
                            <div className='flex font-[700] text-[#222] text-[26px]'>무비차트</div>
                            <div className='flex border-l-[1px] border-[#d8d8d8] h-[20px]'></div>
                            <div className='flex font-[400] text-[#666666] text-[26px]'>상영예정작</div>
                        </div>
                        <NavLink to='/movie' className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[13px] h-8 text-[14px] text-[#222]'>
                            전체보기
                        </NavLink>
                    </div>
                    <div id="movieList" className='flex overflow-hidden'>
                        {moviesToShow.map((movie, index) => (
                            <div 
                            key={movie.id} 
                            id="movie" 
                            className='relative flex flex-col items-center m-2'
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            >
                            <div className='relative mb-2'>
                                <img src={movie.poster} alt={movie.title} className='w-[170px] h-[234px] rounded-[15px]' />
                                <div className={`absolute inset-0 bg-black transition-opacity duration-300 rounded-[15px] ${hoveredIndex === index ? 'opacity-50' : 'opacity-0'}`}></div>
                                
                                <div className={`absolute px-2 italic text-[40px] text-[#fff] bg-transparent rounded bottom-0 left-2 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}>
                                {currentIndex + index + 1}
                                </div>

                                <div className={`flex flex-col justify-center items-center w-[170px] absolute bottom-20 left-0 transition-opacity duration-300 z-10 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                <NavLink to='/movieDetail' className='flex justify-center items-center font-[500] w-[120px] h-[34px] bg-[#ffffff] text-[14px] text-[#666666] rounded-[5px]'>상세보기</NavLink>
                                <NavLink to='/ticketing' className='flex justify-center items-center font-[500] w-[120px] h-[34px] bg-[#fb4357] text-[14px] text-[#fff] rounded-[5px] mt-2'>예매하기</NavLink>
                                </div>
                            </div>
                            <div className='py-2 font-[600] text-[18px] text-[#222]'>{movie.title}</div>
                            <div className='font-[400] text-[14px] text-[#444444]'>{movie.reservationRate}</div>
                            </div>
                        ))}
                    </div>
                    <div id="arrow" className='absolute flex items-center justify-between w-[980px] mt-2'>
                        {currentIndex > 0 && (
                            <img 
                                src="img/arrowL.png" 
                                alt="arrowL" 
                                className='bg-[#ffffffcc] size-[40px] rounded-full p-[10px] shadow-xl' 
                                onClick={() => {
                                    setCurrentIndex(prev => Math.max(prev - 5, 0));
                                }} 
                            />
                        )}
                        <img 
                            src="img/arrowL.png" 
                            alt="arrowR" 
                            className='bg-[#ffffffcc] size-[40px] rounded-full p-[10px] shadow-xl rotate-180 ml-auto' 
                            onClick={() => {
                                if (currentIndex < movies.length - 5) {
                                    setCurrentIndex(prev => Math.min(prev + 5, movies.length - 5));
                                }
                            }} 
                        />
                    </div>
                </div>
            </div>


            <div id="event" className='flex flex-col w-[980px] mx-[181px] p-[60px_0_6px]'>
                <div className='flex justify-between'>
                    <div className='font-[700] text-[26px] text-[#222]'>EVENT</div>
                    <a href='http://www.cgv.co.kr/culture-event/event/defaultNew.aspx#1' className='flex items-center w-fit border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[13px] h-8 text-[14px] text-[#222]'>
                        전체보기
                        <img src="img/arrowR.png" alt="arrow" className='flex left-[180px] top-[330px] size-3 ml-3' />
                    </a>
                </div>
                <a href='http://www.cgv.co.kr/culture-event/event/detailViewUnited.aspx?seq=41925' className='mt-[19px]'>
                    <img src="img/eventImg.jpg" alt="eventImg" className='rounded-[10px] w-[310px] h-[207px] transition-transform duration-300 ease-in-out transform hover:scale-105' />
                    <div className='mt-[16px] font-[600] text-[#222] text-[18px]'>{`[브레드이발소]서프라이즈 온리 쿠폰`}</div>
                    <div className='mt-[4px] text-[14px] text-[#666]'>2024.09.12~2024.09.18</div>
                </a>
            </div>

            <div id="special" className='flex flex-col w-[980px] mx-[181px] p-[60px_0_21px]'>
                <div className='flex justify-between'>
                    <div className='flex font-[700] text-[26px] text-[#222]'>특별관</div>
                    <a href='http://www.cgv.co.kr/theaters/special/defaultNew.aspx' className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[13px] h-8 text-[14px] text-[#222]'>
                    전체보기
                    <img src="img/arrowR.png" alt="arrow" className='flex left-[180px] top-[330px] size-3 ml-3' />
                    </a>
                </div>
                <div className='flex justify-between'>
                    <div id="specialImg" className='flex mt-[19px]'>
                        <img src={selectedImage} alt="specialImage" className='rounded-[10px] w-[500px] h-[264px]' />
                    </div>
                    <div id="specialList" className='flex flex-col justify-around h-[264px] mt-[19px] w-[380px]'>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 1 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/suiteCinema.png', 1)}
                            onMouseLeave={handleMouseLeave}>
                            <a href='http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=7' className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 1 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>SUITE CINEMA</a>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#호텔 컨셉의 프리미엄관</div>
                        </div>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 2 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/cineLivingroom.png', 2)}
                            onMouseLeave={handleMouseLeave}>
                            <a href='http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=14' className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 2 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>CINE & LIVINGROOM</a>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#신개념 소셜 상영관</div>
                        </div>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 3 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/4dx.png', 3)}
                            onMouseLeave={handleMouseLeave}>
                            <a href='http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=2' className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 3 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>4DX</a>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#모션시트 #오감체험</div>
                        </div>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 4 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/cineDeChef.png', 4)}
                            onMouseLeave={handleMouseLeave}>
                            <a href='http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=8' className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 4 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>CINE de CHEF</a>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#쉐프가 있는 영화관</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="etc" className='grid grid-cols-3 gap-9 w-[980px] mx-[181px] pt-[60px]'>
                <div id="package" className='grid border-[1px] rounded-[10px] px-3 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex font-[500] text-[20px] text-[#222] ml-[10px]'>패키지</div>
                        <a href='https://www.cgv.co.kr/culture-event/popcorn-store/store-category.aspx?CategoryIdx=1' className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222]'>더보기</a>
                    </div>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100430' className='flex items-center px-2 py-5'>
                        <img src="img/breadposter.jpg" alt="breadposter" className='flex w-[55px] h-[76px] rounded-[5px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`<브레드이발소:빵스타의탄생> 얼리버드관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>14000원</div>
                        </div>
                    </a>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100429' className='flex items-center px-2 pb-5'>
                        <img src="img/wepkg.jpg" alt="breadposter" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`우리 패키지`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>62000원</div>
                        </div>
                    </a>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100342' className='flex items-center px-2'>
                        <img src="img/wepkg.jpg" alt="breadposter" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`나랑 너 패키지`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>35000원</div>
                        </div>
                    </a>
                </div>
                <div id="ticket" className='grid border-[1px] rounded-[10px] px-3 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex font-[500] text-[20px] text-[#222] ml-[10px]'>영화관람권</div>
                        <a href='https://www.cgv.co.kr/culture-event/popcorn-store/store-category.aspx?CategoryIdx=2' className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222]'>더보기</a>
                    </div>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100341' className='flex items-center px-2 py-5'>
                        <img src="img/cgv.jpg" alt="cgv" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`CGV 영화관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>13000원</div>
                        </div>
                    </a>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100254' className='flex items-center px-2 pb-5'>
                        <img src="img/imax.jpg" alt="imax" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`IMAX 영화관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>18000원</div>
                        </div>
                    </a>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100255' className='flex items-center px-2'>
                        <img src="img/4dx.jpg" alt="4dx" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`4DX 영화관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>19000원</div>
                        </div>
                    </a>
                </div>
                <div id="giftcard" className='grid border-[1px] rounded-[10px] px-3 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex font-[500] text-[20px] text-[#222] ml-[10px]'>기프트카드</div>
                        <a href='https://www.cgv.co.kr/culture-event/popcorn-store/store-category.aspx?CategoryIdx=3' className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222]'>더보기</a>
                    </div>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100161' className='flex items-center px-2 py-5'>
                        <img src="img/a.jpg" alt="a" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`PACONNIE A형`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>금액충전형</div>
                        </div>
                    </a>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100162' className='flex items-center px-2 pb-5'>
                        <img src="img/b.jpg" alt="b" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`PACONNIE B형`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>금액충전형</div>
                        </div>
                    </a>
                    <a href='https://www.cgv.co.kr/culture-event/popcorn-store/product-detail.aspx?GG_NO=100163' className='flex items-center px-2'>
                        <img src="img/c.jpg" alt="c" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`PACONNIE C형`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>금액충전형</div>
                        </div>
                    </a>
                </div>
            </div>

            <div id="last" className='flex border-box w-[980px] p-[30px_0_120px] mx-[181px]'>
                <div id="notice" className='flex items-center h-[238px] border-[1px] rounded-[10px]'>
                    <div id="leftN" className='flex px-4'>
                        <div className='flex flex-col justify-center w-[500px] p-[24px_26px_20px_30px]'>
                            <div className='flex border-b-[1px] border-b-[##f4f4f4]'>
                                <div className='flex font-[500] text-[16px] text-[#222] mb-[15px]'>공지사항</div>
                                <div className='flex overflow-hidden w-[50%] mt-[2px] ml-[28px] text-[14px] text-[#222] whitespace-nowrap'>{`[극장] [CGV] <블랙핑크 월드투어 [본 핑크] 인 시네마> 무대인사 회차 휠체어석 유의사항 안내`}</div>
                                <a href='http://www.cgv.co.kr/support/news/default.aspx' className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222] ml-8'>더보기</a>
                            </div>
                            <div id="client" className='flex flex-col flex-wrap'>
                                <div className='flex p-[15px_0px]'>
                                    <div className='flex font-[500] text-[16px] text-[#222]'>고객센터</div>
                                    <div className='flex flex-col mt-[2px] ml-[28px]'>
                                        <div className='flex font-[700] text-[14px] text-[#222]'>1544-1122</div>
                                        <div className='text-[14px] text-[#222]'>고객센터 운영시간 (평일 09:00 ~ 18:00)</div>
                                        <div className='text-[14px] text-[#666]'>업무시간 외 자동응답 안내 가능합니다.</div>
                                    </div>
                                </div>
                                <div className='flex px-3 py-3'>
                                    <a href='http://www.cgv.co.kr/support/faq/default.aspx' className='p-[7px_14px] ml-[10px] text-[14px] text-[#222] bg-[#f6f6f6] rounded-[5px]'>FAQ</a>
                                    <div className='p-[7px_14px] ml-[10px] text-[14px] text-[#222] bg-[#f6f6f6] rounded-[5px]'>1:1 문의</div>
                                    <a href='http://www.cgv.co.kr/support/lease/default.aspx' className='p-[7px_14px] ml-[10px] text-[14px] text-[#222] bg-[#f6f6f6] rounded-[5px]'>대관/단체 문의</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="rightN" className='flex flex-col w-[222px] justify-center items-center h-full border-l-[1px]'>
                        <div className='flex flex-col justify-center file'>
                            <div className='flex justify-center font-[500] text-[16px] text-[#222]'>앱 다운로드</div>
                            <div className='flex justify-center text-[12px] text-[#222]'>CGV앱에서 더 편리하게 이용하세요</div>
                        </div>
                        <div className='flex justify-center py-5'>
                            <img src="img/qr.gif" alt="qr" className='flex size-[60px] items-center' />
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='flex text-[12px] text-[#666] text-center'>QR코드를 스캔하고 <br /> 앱설치 페이지로 바로 이동하세요</div>
                        </div>
                    </div>
                </div>
                <div className='flex pl-[20px]'>
                    <img src="img/bugs.png" alt="bugs" className='flex rounded-[10px] w-[211px] h-[238px]'/>
                </div>
            </div>
        </div>
    )
}