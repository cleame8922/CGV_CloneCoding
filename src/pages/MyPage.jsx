import React from 'react'

function MyPage() {
    return (
        <div className="relative h-max-fit">
            <div className="flex items-center justify-center h-[600px]">
                <div className='flex flex-col bg-[#FFF] w-[980px] h-[450px] border-white-4 rounded-xl shadow-2xl'>
                    <div className='flex justify-between'>
                        <div className='flex justify-center items-center border-collapse rounded-xl bg-[#AFAFAF] w-[60px] p-3 text-[13px] text-[#ffffff] h-5 m-7'>일반</div>
                        <div className='flex justify-end text-[13px] font-[600] m-7'>편집</div>
                    </div>
                    <div className='flex justify-center text-xl font-semibold mb-7'> VIP까지 남은 금액 260,000원 </div>
                    <hr className='w-[100%] flex mt-3'></hr>
                    <div className='flex justify-center m-7'>
                        <div className='bg-gradient-to-r from-[#d74357] via-[#f14f3a] to-[#ef642f] text-white border-transparent-4 rounded-3xl w-[25%] p-2 flex justify-center'>MEMBERSHIP ZONE</div>
                    </div>
                    <hr className='w-[100%] flex' />
                    <div className="flex justify-around m-7">
                        <div className='flex font-semibold'>POINT</div>
                        <hr className='w-[52px] rotate-90 mt-2.5' />
                        <div className='flex font-semibold'>COUPON</div>
                    </div>
                    <hr />
                    <div className='flex flex-col'>
                        <div className='flex m-3 ml-6 font-semibold'>MY 영화관</div>
                        <div className='flex justify-around'>
                            <div className='flex font-bold'>1st</div>
                            <div className='flex font-bold'>2st</div>
                            <div className='flex font-bold'>3st</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;