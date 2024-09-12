import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

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
                            <div className='flex flex-col items-center ml-7'>
                                <img src="img/loginJoin.png" alt="loginJoin" className='size-[36px]' />
                                <div className='flex text-[13px] text-[#666] leading-5 whitespace-nowrap'>회원가입</div>
                            </div>
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
                className='flex justify-between mx-[400px] py-[5px] relative group'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div id="content" className='relative'>
                    <ul id="navList" className='flex'>
                        <li className='mx-4 my-2 font-semibold'>영화</li>
                        <li className='mx-4 my-2 font-semibold'>극장</li>
                        <li className='mx-4 my-2 font-semibold'>예매</li>
                        <li className='mx-4 my-2 font-semibold'>스토어</li>
                        <li className='mx-4 my-2 font-semibold'>이벤트</li>
                        <li className='mx-4 my-2 font-semibold'>혜택</li>
                    </ul>
                    {/* 드롭다운 메뉴 */}
                    {isDropdownVisible && (
                        <div className='absolute left-0 z-10 flex bg-white border border-gray-200'>
                            <div className='grid grid-rows-6 gap-4 p-4'>
                                {['영화', '극장', '예매', '스토어', '이벤트', '혜택'].map((item) => (
                                    <div key={item} className='flex flex-col'>
                                        <div className='flex font-[500]'>{item}</div>
                                        <ul className='flex flex-col list-none'> {/* Changed list-disc to list-none */}
                                            {getSubMenu(item).map(subItem => (
                                                <li key={subItem}>{subItem}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div id="nR" className='flex items-center'>
                    <div className='flex items-center border-x-[1px] h-6 p-[0px_10px_0px_10px]'>
                        <div className='flex text-[16px] pr-[7px] text-[#222] w-[150px]'>추석엔 빵스타!</div>
                        <img src="img/search.png" alt="search" className='size-[26px] flex justify-end' />
                    </div>
                </div>
            </div>
            <div className='border-t-2 border-t-[#fb4357]'></div>
        </div>
    );
}

// `item`에 따라 서브 메뉴 항목을 반환하는 함수
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
