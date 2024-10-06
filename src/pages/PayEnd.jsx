import React from 'react'

export default function PayEnd() {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-[986px] h-[725px] bg-[#f6f6f4] border-[5px] border-[#333] my-[30px]'>
                <div className='flex w-full h-[51px] text-[22px] font-bold text-[#f2f0e5] bg-[#333] border-[1px] border-[#707070] '>
                    <div className='flex items-center pl-5'>결제내역 확인</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div id="container" className='flex pt-[45px] border-b-[2px] border-[#bebebd]'>
                        결제내역
                    </div>
                </div>
            </div>
        </div>
    )
}
