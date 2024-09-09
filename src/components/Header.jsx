import React from 'react'

export default function Header() {
    return (
        <div className='min-h-fit]'>
            <div id="top">
                <div id="banner" className='flex justify-center bg-[#1E0D44]'>
                    <img src="img/banner.jpg" alt="banner" className='flex' />
                </div>
                <div className='flex justify-between p-[30px_6px_25px_5px] mx-[400px]'>
                    <div id="bLeft" className='flex'>
                        <img src="img/logoRed.png" alt="logoRed" className='flex w-[117px] h-[53px]' />
                        <p className='flex items-end tracking-[0.313em] text-[16px] text-[#222]'>DEEP DIVE SPACE</p>
                    </div>
                    <div id="bRight" className='flex items-center'>
                        <div className='flex'>
                            <img src="img/point.png" alt="point" className='w-[136px] h-[39px]' />
                        </div>
                        <div id="icon" className='flex'>
                            <div className='flex flex-col items-center ml-7'>
                                <img src="img/loginPassword.png" alt="loginPassword" className='size-[36px]' />
                                <div className='flex text-[13px] text-[#666] leading-5 whitespace-nowrap'>로그인</div>
                            </div>
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
            <div id="nav" className='flex justify-between mx-[400px] py-[5px]'>
                <div id="nLeft" className='flex'>
                    <div className='font-semibold mx-4 my-2'>영화</div>
                    <div className='font-semibold mx-4 my-2'>극장</div>
                    <div className='font-semibold mx-4 my-2'>예매</div>
                    <div className='font-semibold mx-4 my-2'>스토어</div>
                    <div className='font-semibold mx-4 my-2'>이벤트</div>
                    <div className='font-semibold mx-4 my-2'>혜택</div>
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
    )
}
