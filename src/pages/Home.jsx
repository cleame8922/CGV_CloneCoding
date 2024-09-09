import React, { useState } from 'react';

export default function Home() {
    const [selectedImage, setSelectedImage] = useState('img/suiteCinema.png'); // 기본 이미지 설정
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (image, index) => {
        setSelectedImage(image);
        setHoveredItem(index); // 마우스 오버된 항목 설정
    };

    const handleMouseLeave = () => {
        setHoveredItem(null); // 마우스 오버된 항목 해제
    };

    return (
        <div className='flex flex-col items-center'>
            <div id="video" className='flex flex-col items-center w-[100%] bg-[#000] relative'>
                <video autoPlay loop muted className='w-[980px] mx-[181px]'>
                    <source src="img/video.mp4" type="video/mp4" />
                </video>
                <div className='flex flex-col absolute justify-center left-0 top-0 inset-0 bg-black bg-opacity-50 text-white'>
                    <div className='ml-[100px] absolute left-[350px]'>
                        <div className='font-[700] text-[40px]'>트랜스포머 ONE</div>
                        <div className='text-[20px]'>역대급 트랜스포머</div>
                        <div className='text-[20px]'>극장에서 확인하라!</div>
                    </div>
                </div>
                <div className='flex items-center absolute left-[450px] top-[350px] bg-white bg-opacity-80 rounded-[15px] p-[5px_15px] text-[14px] text-[#343434]'>
                    상세보기
                    <img src="img/arrowR.png" alt="arrow" className='flex left-[180px] top-[330px] size-3 ml-3' />
                </div>
                <div className='absolute left-[570px] top-[350px]'>
                    <img src="img/play.png" alt="play" className='size-7 border-[1px] border-[#979797] rounded-[50%] p-1' />
                </div>
                <div className='absolute left-[610px] top-[350px]'>
                    <img src="img/soundOff.png" alt="soundOff" className='size-7 border-[1px] border-[#979797] rounded-[50%] p-1' />
                </div>
            </div>

            <div id="movie" className='flex h-[300px] bg-[#f8f8f8]'></div>

            <div id="event" className='flex flex-col justify-center w-[980px] mx-[181px] p-[60px_0_6px]'>
                <div className='font-[700] text-[26px] text-[#222]'>EVENT</div>
                <div className='mt-[19px]'>
                    <img src="img/eventImg.jpg" alt="eventImg" className='rounded-[10px] w-[310px] h-[207px]' />
                    <div className='mt-[16px] font-[600] text-[#222] text-[18px]'>가을만큼 풍성한무비추천템</div>
                    <div className='mt-[4px] text-[14px] text-[#666]'>2024.08.30 ~ 2024.09.15</div>
                </div>
            </div>

            <div id="special" className='flex flex-col w-[980px] mx-[181px] p-[60px_0_21px]'>
                <div className='flex justify-between'>
                    <div className='flex font-[700] text-[26px] text-[#222]'>특별관</div>
                    <div className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[13px] h-8 text-[14px] text-[#222]'>
                    전체보기
                    <img src="img/arrowR.png" alt="arrow" className='flex left-[180px] top-[330px] size-3 ml-3' />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div id="specialImg" className='flex mt-[19px]'>
                        <img src={selectedImage} alt="specialImage" className='rounded-[10px] w-[500px] h-[264px]' />
                    </div>
                    <div id="specialList" className='flex flex-col justify-around h-[264px] mt-[19px] w-[380px]'>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 1 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/suiteCinema.png', 1)}
                            onMouseLeave={handleMouseLeave}>
                            <div className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 1 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>SUITE CINEMA</div>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#호텔 컨셉의 프리미엄관</div>
                        </div>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 2 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/cineLivingroom.png', 2)}
                            onMouseLeave={handleMouseLeave}>
                            <div className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 2 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>CINE & LIVINGROOM</div>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#신개념 소셜 상영관</div>
                        </div>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 3 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/4dx.png', 3)}
                            onMouseLeave={handleMouseLeave}>
                            <div className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 3 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>4DX</div>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#모션시트 #오감체험</div>
                        </div>
                        <div className={`flex justify-between content-center border-t-[1px] p-[19px_25px_19px_19px] ${hoveredItem === 4 ? 'border-black border-[1.5px] rounded-[10px]' : ''}`}
                            onMouseEnter={() => handleMouseEnter('img/cineDeChef.png', 4)}
                            onMouseLeave={handleMouseLeave}>
                            <div className={`font-[400] text-[#222] text-[18px] ${hoveredItem === 4 ? 'font-bold' : ''}`} onMouseLeave={handleMouseLeave}>CINE de CHEF</div>
                            <div className='text-[14px] text-[#666] p-[2px_7px] bg-[#f6f6f6] rounded-[4px]'>#쉐프가 있는 영화관</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="etc" className='grid grid-cols-3 gap-9 w-[980px] mx-[181px] pt-[60px]'>
                <div id="package" className='grid border-[1px] rounded-[10px] px-3 py-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex font-[500] text-[20px] text-[#222]'>패키지</div>
                        <div className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222]'>더보기</div>
                    </div>
                    <div className='flex px-2 py-5 items-center'>
                        <img src="img/breadposter.jpg" alt="breadposter" className='flex w-[55px] h-[76px] rounded-[5px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`<브레드이발소:빵스타의탄생> 얼리버드관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>14000원</div>
                        </div>
                    </div>
                    <div className='flex px-2 pb-5 items-center'>
                        <img src="img/wepkg.jpg" alt="breadposter" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`우리 패키지`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>62000원</div>
                        </div>
                    </div>
                    <div className='flex px-2 items-center'>
                        <img src="img/wepkg.jpg" alt="breadposter" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`나랑 너 패키지`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>35000원</div>
                        </div>
                    </div>
                </div>
                <div id="ticket" className='grid border-[1px] rounded-[10px] px-3 py-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex font-[500] text-[20px] text-[#222]'>영화관람권</div>
                        <div className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222]'>더보기</div>
                    </div>
                    <div className='flex px-2 py-5 items-center'>
                        <img src="img/cgv.jpg" alt="cgv" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`CGV 영화관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>13000원</div>
                        </div>
                    </div>
                    <div className='flex px-2 pb-5 items-center'>
                        <img src="img/imax.jpg" alt="imax" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`IMAX 영화관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>18000원</div>
                        </div>
                    </div>
                    <div className='flex px-2 items-center'>
                        <img src="img/4dx.jpg" alt="4dx" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`4DX 영화관람권`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>19000원</div>
                        </div>
                    </div>
                </div>
                <div id="giftcard" className='grid border-[1px] rounded-[10px] px-3 py-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex font-[500] text-[20px] text-[#222]'>기프트카드</div>
                        <div className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222]'>더보기</div>
                    </div>
                    <div className='flex px-2 py-5 items-center'>
                        <img src="img/a.jpg" alt="a" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`PACONNIE A형`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>금액충전형</div>
                        </div>
                    </div>
                    <div className='flex px-2 pb-5 items-center'>
                        <img src="img/b.jpg" alt="b" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`PACONNIE B형`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>금액충전형</div>
                        </div>
                    </div>
                    <div className='flex px-2 items-center'>
                        <img src="img/c.jpg" alt="c" className='flex w-[75px] h-[76px]'/>
                        <div className='flex flex-col ml-5'>
                            <div className='flex flex-wrap font-[500] text-[14px] text-[#222]'>{`PACONNIE C형`}</div>
                            <div className='flex font-[700] text-[16px] text-[#222]'>금액충전형</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="last" className='flex border-box w-[980px] p-[30px_0_120px] mx-[181px]'>
                <div id="notice" className='flex items-center w-[100%] h-[238px] border-[1px] rounded-[10px]'>
                    <div className='flex w-fit'>
                        <div id="leftN" className='flex flex-col justify-center px-3 py-[15px]'>
                            <div className='flex w-fit border-b-[1px] py-[15px]'>
                                <div className='flex font-[500] text-[16px] text-[#222]'>공지사항</div>
                                <div className='flex overflow-hidden w-[50%] mt-[2px] ml-[28px] text-[14px] text-[#222] whitespace-nowrap'>{`[극장] [CGV] <블랙핑크 월드투어 [본 핑크] 인 시네마> 무대인사 회차 휠체어석 유의사항 안내`}</div>
                                <div className='flex items-center border-[1px] bg-white bg-opacity-80 rounded-[15px] px-[10px] h-6 text-[14px] text-[#222] ml-8'>더보기</div>
                            </div>
                            <div id="client" className='flex flex-col flex-wrap px-4 py-3'>
                                <div className='flex p-[15px_0px]'>
                                    <div className='flex font-[500] text-[16px] text-[#222]'>고객센터</div>
                                    <div className='flex flex-col mt-[2px] ml-[28px]'>
                                        <div className='flex font-[700] text-[14px] text-[#222]'>1544-1122</div>
                                        <div className='text-[14px] text-[#222]'>고객센터 운영시간 (평일 09:00 ~ 18:00)</div>
                                        <div className='text-[14px] text-[#666]'>업무시간 외 자동응답 안내 가능합니다.</div>
                                    </div>
                                </div>
                                <div className='flex px-3 py-4'>
                                    <div className='p-[7px_14px] ml-[10px] text-[14px] text-[#222] bg-[#f6f6f6] rounded-[5px]'>FAQ</div>
                                    <div className='p-[7px_14px] ml-[10px] text-[14px] text-[#222] bg-[#f6f6f6] rounded-[5px]'>1:1 문의</div>
                                    <div className='p-[7px_14px] ml-[10px] text-[14px] text-[#222] bg-[#f6f6f6] rounded-[5px]'>대관/단체 문의</div>
                                </div>
                            </div>
                        </div>
                        <div id="rightN" className='flex flex-col justify-center items-center h-fit border-l-[1px]'>
                            <div className='flex flex-col justify-center'>
                                <div className='flex justify-center font-[500] text-[16px] text-[#222]'>앱 다운로드</div>
                                <div className='flex justify-center text-[12px] text-[#222]'>CGV앱에서 더 편리하게 이용하세요</div>
                            </div>
                            <div className='flex justify-center'>
                                <img src="img/qr.gif" alt="qr" className='flex size-[60px] items-center' />
                            </div>
                            <div className='flex justify-center items-center'>
                                <div id="12" className='flex text-[12px] text-[#666] text-center'>QR코드를 스캔하고 <br /> 앱설치 페이지로 바로 이동하세요</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-[40%]'>
                    <img src="img/bugs.png" alt="bugs" className='flex ml-8 rounded-[10px] w-[211px] h-[238px]'/>
                </div>
            </div>
        </div>
    )
}