import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isNavFixed, setIsNavFixed] = useState(false); // 네비게이션 고정 상태
    const [navTop, setNavTop] = useState(0); // 네비게이션의 초기 위치 저장
    const navRef = useRef(null); // 네비게이션 위치를 참조하기 위한 ref

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    const handleScroll = () => {
        if (navRef.current) {
            const scrollY = window.scrollY;
            const navHeight = navRef.current.offsetHeight;
            const stickyThreshold = navTop + navHeight;

            // 네비게이션 바가 화면 상단에 고정되어야 하는 지점
            if (scrollY > stickyThreshold) {
                setIsNavFixed(true);
            } else {
                setIsNavFixed(false); // 스크롤을 다시 올렸을 때 고정 해제
            }
        }
    };

    useEffect(() => {
        if (navRef.current) {
            setNavTop(navRef.current.offsetTop); // 네비게이션의 초기 위치를 저장
        }

        window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
        return () => {
            window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
        };
    }, []);

    return (
        <div className='min-h-fit'>
            <div id="top">
                <div id="banner" className='flex justify-center bg-[#1E0D44]'>
                    <img src="img/banner.jpg" alt="banner" className='flex' />
                </div>
                <div className='flex justify-between p-[30px_6px_25px_5px] mx-[400px]'>
                    <NavLink to='/' id="bLeft" className='flex'>
                        <img src="img/logoRed.png" alt="logoRed" className='flex w-[117px] h-[53px]' />
                        <p className='flex items-end tracking-[0.313em] text-[16px] text-[#222]'>DEEP DIVE SPACE</p>
                    </NavLink>
                    <div id="bRight" className='flex items-center'>
                        <div className='flex'>
                            <img src="img/point.png" alt="point" className='w-[136px] h-[39px]' />
                        </div>
                        <div id="icon" className='flex'>
                            <NavLink to='/login' className='flex flex-col items-center ml-7'>
                                <img src="img/loginPassword.png" alt="loginPassword" className='size-[36px]' />
                                <div className='flex text-[13px] text-[#666] leading-5 whitespace-nowrap'>로그인</div>
                            </NavLink>
                            <NavLink to='/join' className='flex flex-col items-center ml-7'>
                                <img src="img/loginJoin.png" alt="loginJoin" className='size-[36px]' />
                                <div className='flex text-[13px] text-[#666] leading-5 whitespace-nowrap'>회원가입</div>
                            </NavLink>
                            <div className='flex flex-col items-center ml-7'>
                                <img src="img/loginMember.png" alt="loginMember" className='size-[36px]' />
                                <div className='flex text-[13px] text-[#666] leading-5 whitespace-nowrap'>MY CGV</div>
                            </div>
                            <div className='flex flex-col items-center ml-7'>
                                <img src="img/loginCustomer.png" alt="loginCustomer" className='size-[36px]' />
                                <div className='flex text-[13px] text-[#666] leading-5 whitespace-nowrap'>고객센터</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-[1px]'></div>
            </div>

            {/* 네비게이션 바 */}
            <div
                id="nav"
                ref={navRef}
                className={`flex flex-col group transition-all duration-300 ${
                    isNavFixed ? 'fixed top-0 left-0 w-full bg-gradient-to-r from-[#d74357] via-[#f14f3a] to-[#ef642f] text-white z-50' : ''
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className='flex justify-between mx-[400px] py-[5px]'>
                    <ul id="navList" className='flex'>
                        <img src="img/logoWhite.png" alt="logoWhite" className='w-[70px] h-[32px]' />
                        <li className='my-2 font-semibold mx-7'>영화</li>
                        <li className='my-2 font-semibold mx-7'>극장</li>
                        <li className='my-2 font-semibold mx-7'>예매</li>
                        <li className='my-2 font-semibold mx-7'>스토어</li>
                        <li className='my-2 font-semibold mx-7'>이벤트</li>
                        <li className='my-2 font-semibold mx-7'>혜택</li>
                    </ul>
                    <div id="nR" className='flex items-center'>
                        <div className='flex items-center border-x-[1px] h-6 p-[0px_10px_0px_10px]'>
                            <div className={`flex text-[16px] pr-[7px] w-[150px] ${isNavFixed ? 'text-white' : 'text-[#222]'}`}>추석엔 빵스타!</div>
                            <img src="img/search.png" alt="search" className='size-[26px] flex justify-end' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-t-2 border-t-[#fb4357]'></div>

            {isDropdownVisible && (
                <div className='absolute z-10 w-[100%] bg-white border-t border-gray-200'>
                    <div className='flex mx-[400px] py-4'>
                        <div className='grid flex-1 grid-cols-6 gap-3'>
                            {['영화', '극장', '예매', '스토어', '이벤트', '혜택'].map((item, index) => (
                                <div
                                    key={item}
                                    className={`relative flex flex-col ${index > 0 ? 'pl-3' : ''}`}
                                >
                                    {index > 0 && (
                                        <div className='absolute left-0 top-0 h-[75%] border-l-[1px] border-gray-200'></div>
                                    )}
                                    <div className='mb-3 font-[700] text-[15px]'>{item}</div>
                                    <ul className='mb-2 list-none font-[500] text-[14px] text-[#222]'>
                                        {getSubMenu(item).map(subItem => (
                                            <li key={subItem} className='mb-1'>{subItem}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 서브 메뉴 항목을 반환하는 함수
const getSubMenu = (item) => {
    switch (item) {
        case '영화':
            return ['무비차트', '아트하우스', 'ICECON'];
        case '극장':
            return ['CGV 극장', '특별관'];
        case '예매':
            return ['빠른예매', '상영스케줄', 'English Ticketing', 'English Schedule'];
        case '스토어':
            return ['패키지', '영화관람권', '기프트카드', '콤보', '팝콘', '음료', '스낵', '플레이존', '준비중', '씨네샵 >'];
        case '이벤트':
            return ['SPECIAL', '영화/예매', '멤버십/CLUB', 'CGV 극장별', '패키지', '당첨자 발표', '종료된 이벤트'];
        case '혜택':
            return ['CGV 할인정보', 'CLUB 서비스', 'VIP 라운지'];
        default:
            return [];
    }
};
