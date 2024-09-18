import React from 'react'

export default function Ticketing() {
    return (
        <div className='flex flex-col items-center'>
            <div id="etc" className='flex justify-end w-[996px] h-[74px] pt-[30px]'>
                <div className='flex w-[81px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")]'></div>
                <div className='flex w-[101px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-90px] ml-2'></div>
                <div className='flex w-[113px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-120px] ml-2'></div>
            </div>
            <div id="contents" className='flex bg-[#d4d3c9] w-[996px] h-[600px]'>
                <div className='flex flex-col items-center bg-[#f2f0e5] w-[284px]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[284px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>영화</div>
                    <div className='flex w-[244px]'>
                        <div className='flex'>
                            <div className='w-[58px] text-[#333] text-[13px]'>전체</div>
                            <div className='w-[90px] text-[#333] text-[13px]'>아트하우스</div>
                            <div className='w-[88px] text-[#333] text-[13px]'>특별관</div>
                        </div>
                    </div>
                </div>
                <div className='bg-[#f2f0e5]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[265px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>극장</div>
                </div>
                <div className='bg-[#f2f0e5]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[91px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>영화</div>
                </div>
                <div className='bg-[#f2f0e5]'>
                    <div className='flex justify-center items-center bg-[#333333] w-[346px] h-[33px] text-[#fff] text-[16px] font-[500] m-[2px]'>시간</div>
                </div>
            </div>
        </div>
    )
}