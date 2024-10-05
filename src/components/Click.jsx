import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Ticketing() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 80) { // 스크롤이 100px 이상일 때
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 부드러운 스크롤 애니메이션
        });
    };

    return (
        <div className='relative flex w-[980px]'>
            {isVisible && (
                <>
                    <NavLink to='/ticketing' className='flex justify-center right-[500px] bottom-[80px] fixed text-[#fff] text-[16px] font-[500] w-[136px] p-[12px_0_14px] bg-custom-gradient shadow-custom-shadow rounded-[25px]'>
                        예매하기
                    </NavLink>
                    <div 
                        onClick={scrollToTop} 
                        className='size-[48px] flex justify-center p-3 fixed right-[430px] bottom-[80px] bg-[#fff] rounded-full shadow-custom-shadow border-[1px] border-[#000]'
                    >
                        <img src={`${process.env.PUBLIC_URL}/img/gotoTop.png`} alt="gotoTop" />
                    </div>
                </>
            )}
        </div>
    );
}
