import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isNavFixed, setIsNavFixed] = useState(false);
    const [navTop, setNavTop] = useState(0);
    const navRef = useRef(null);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    const handleDropdownMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleDropdownMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;
        // Check if the scroll position is greater than the navTop
        setIsNavFixed(scrollY > navTop);
    };

    useEffect(() => {
        if (navRef.current) {
            // Save the nav's top offset
            setNavTop(navRef.current.offsetTop);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [navTop]);

    return (
        <div className='min-h-fit'>
            <div id="top" ref={navRef} className='flex flex-col items-center'>
                <div id="banner" className='flex justify-center w-full bg-[#1E0D44]'>
                    <img src="img/banner.jpg" alt="banner" className='flex' />
                </div>
                <div className='flex items-center justify-between p-[30px_6px_25px_5px] w-[980px]'>
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

            <div
                id="nav"
                className={`flex flex-col transition-all duration-300 border-t-[1px] border-b-[2px] border-b-[#fb4357] ${
                    isNavFixed ? 'fixed top-0 left-0 w-full bg-gradient-to-r from-[#d74357] via-[#f14f3a] to-[#ef642f] text-white z-50' : ''
                }`}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} 
            >
                <div className='flex justify-between py-[5px] w-[980px] mx-auto'>
                    <ul id="navList" className='flex items-center'>
                        {isNavFixed && (
                            <img src="img/logoWhite.png" alt="logoWhite" className='w-[70px] h-[32px]' />
                        )}
                        {['영화', '극장', '예매', '스토어', '이벤트', '혜택'].map((item) => (
                            <li 
                                key={item}
                                className={`my-2 font-semibold flex justify-between w-[100px] ${item === '예매' ? (isNavFixed ? 'text-white' : 'text-[#fb4357] font-bold') : ''}`}
                                onMouseEnter={handleMouseEnter}
                                onClick={() => {
                                    if (item === '영화') {
                                        navigate('/Movie');
                                    } else if (item === '예매') {
                                        navigate('/Ticketing');
                                    }
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div id="nR" className='flex items-center'>
                        <div className='flex items-center border-x-[1px] h-6 p-[0px_10px_0px_10px]'>
                            <div className={`flex text-[16px] pr-[7px] w-[150px] ${isNavFixed ? 'text-white' : 'text-[#222]'}`}>추석엔 빵스타!</div>
                            <img src="img/search.png" alt="search" className='size-[26px] flex justify-end' />
                        </div>
                    </div>
                </div>
            </div>

            {/* 드롭다운 메뉴 */}
            {isDropdownVisible && (
                <div
                    className={`${
                        isNavFixed ? 'fixed top-[50px] left-0 w-full z-50 opacity-100 transition-opacity duration-300' 
                                : 'absolute top-[245px] z-10 w-full opacity-100 transition-opacity duration-300'
                    } flex flex-col items-center bg-white border-t border-gray-200`}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                >
                    <div className='flex w-[980px] mx-auto py-4'>
                        <div className='grid flex-1 grid-cols-6 gap-3'>
                            {['영화', '극장', '예매', '스토어', '이벤트', '혜택'].map((item, index) => (
                                <div key={item} className={`relative flex flex-col ${index > 0 ? 'pl-3' : ''}`}>
                                    {index > 0 && (
                                        <div className='absolute left-0 top-0 h-[75%] border-l-[1px] border-gray-200'></div>
                                    )}
                                    <div className='mb-3 font-[700] text-[15px] text-[#222]'>{item}</div>
                                    <ul className='mb-2 list-none font-[400] text-[14px] text-[#666]'>
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