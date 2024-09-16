import React from 'react'

export default function Movie() {

    const movies = [
        {
            title: "영화 제목 1",
            rating: "8.5",
            poster: "img/moviePoster.jpg",
        },
        {
            title: "영화 제목 2",
            rating: "7.0",
            poster: "img/moviePoster.jpg",
        },
        {
            title: "영화 제목 3",
            rating: "9.0",
            poster: "img/moviePoster.jpg",
        },
        {
            title: "영화 제목 4",
            rating: "9.0",
            poster: "img/moviePoster.jpg",
        },
        {
            title: "영화 제목 5",
            rating: "8.5",
            poster: "img/moviePoster.jpg",
        },
        {
            title: "영화 제목 6",
            rating: "7.0",
            poster: "img/moviePoster.jpg",
        },
        {
            title: "영화 제목 3",
            rating: "9.0",
            poster: "img/moviePoster.jpg",
        },
        {
            title: "영화 제목 4",
            rating: "9.0",
            poster: "img/moviePoster.jpg",
        },
    ];

    return (
        <div id="chart" className='flex flex-col items-center'>
            <div className='flex justify-between items-center overflow-hidden w-[980px] h-[93px] pt-[30px] border-b-[3px] border-b-[#241d1e]'>
                <div className='flex items-center font-[500] text-[#222] text-[36px]'>무비차트</div>
                <div className='flex items-center'>
                    <div className='flex items-center w-[64px] h-[17px]'>
                        <img src="img/arrowChart.png" alt="arrowChart" />
                        <div className='flex items-center text-[#fb4357] font-[600] text-[14px] ml-1'>무비차트</div>
                    </div>
                    <div className='flex items-center font-[600] text-[#666666] text-[14px] pl-[13px]'>상영예정작</div>
                </div>
            </div>

            <div className='flex w-[980px] items-center justify-between mt-[20px]'>
                <label className='font-[400] text-[#666] text-[13px]'>
                    <input type="checkbox" /> 현재 상영작만 보기
                </label>
                <div className='flex'>
                    <select className='flex p-[3px_5px] h-[29px] border-[1px] border-[#b4b3aa] text-[#666] text-[13px] font-[400]'>
                        <option>예매율순</option>
                        <option>평점순</option>
                        <option>관람객순</option>
                    </select>
                    <div className='flex items-center p-[0_5px_0] border-[2px] border-[#7b7b7b] font-[700] text-[13px] text-[#7b7b7b] ml-2'>GO</div>
                </div>
            </div>

            <div id="movieList" className='w-[980px] mt-[30px] grid grid-cols-4 gap-2'>
                {movies.map((movie, index) => (
                    <div 
                        key={index} 
                        className={`mb-[20px] pb-[30px] ${index === 2 ? 'col-span-2' : ''}`}
                    >
                        <div 
                            className={`flex justify-center font-[500] text-[#ffffff] text-[19px] w-[197px] h-[28px] mb-1 ${index > 2 ? 'bg-[#333333]' : 'bg-[#fb4357]'} ${index === 2 ? 'relative' : ''}`}
                        >
                            {`No. ${index + 1}`}
                            {index === 2 && (
                                <div className='absolute top-[417px] left-[247px] mt-[-418px] w-[197px] h-[418px]'>
                                    <img src="img/chartAd.png" alt="chartAd" />
                                </div>
                            )}
                        </div>
                        <div className='flex'>
                            <img src={movie.poster} alt={movie.title} className='w-[197px] h-[260px]' />
                        </div>
                        <div className='mt-[10px] font-[600] text-[#222] text-[16px]'>{movie.title}</div>
                        <div className='text-[#666] text-[14px]'>평점: {movie.rating}</div>
                        <div className='flex justify-center items-center mt-1 w-[97px] h-[25px] text-[#ffffff] font-[500] text-[14px] rounded-[5px] bg-[#fb4357]'>예매하기</div>
                    </div>
                ))}
            </div>          
        </div>
    )
}