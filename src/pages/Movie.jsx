import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Movie() {
    const [movies, setMovies] = useState([]);
    const [showNowPlaying, setShowNowPlaying] = useState(false); // 현재 상영작 상태
    const [showUpcoming, setShowUpcoming] = useState(false); // 상영 예정작 필터 상태

    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let url = 'http://localhost:8080/movies'; // 기본 URL
                if (showNowPlaying) {
                    url = 'http://localhost:8080/movies/nowplaying'; // 현재 상영작 URL
                } else if (showUpcoming) {
                    url = 'http://localhost:8080/movies/upcoming'; // 상영 예정작 URL
                }
                
                const response = await axios.get(url);
                const moviesWithFullPosterPath = response.data.map(movie => ({
                    ...movie,
                    poster_path: `${BASE_IMAGE_URL}${movie.poster_path}`,
                }));
                setMovies(moviesWithFullPosterPath);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };
        fetchMovies();
    }, [showNowPlaying, showUpcoming]); // showNowPlaying 또는 showUpcoming이 변경될 때마다 API 호출

    return (
        <div id="chart" className='flex flex-col items-center'>
            <div className='flex justify-between items-center overflow-hidden w-[980px] h-[93px] pt-[30px] border-b-[3px] border-b-[#241d1e]'>
                <div className='flex items-center font-[500] text-[#222] text-[36px]'>무비차트</div>
                <div className='flex items-center'>
                    <div id='moviehart' className='flex items-center w-[64px] h-[17px]'>
                        {/* 무비차트 버튼은 항상 활성화 */}
                        <img src={`${process.env.PUBLIC_URL}/img/arrowChart.png`} alt="arrowChart" className={`${showNowPlaying || showUpcoming ? 'hidden' : 'block'}`} />
                        <div className={`flex items-center ${showUpcoming ? 'text-[#666666]' : 'text-[#fb4357]'} font-[600] text-[14px] ml-1 cursor-pointer`} 
                            onClick={() => {
                                // 무비차트 클릭 시 아무 변화 없음
                                setShowNowPlaying(false);
                                setShowUpcoming(false); // 상영예정작 해제
                            }}
                        >
                            무비차트
                        </div>
                    </div>
                    <div className={`flex items-center pl-[13px] cursor-pointer ${showUpcoming ? 'text-[#fb4357]' : 'text-[#666666]'}`}>
                        {showUpcoming && <img src={`${process.env.PUBLIC_URL}/img/arrowChart.png`} alt="arrowChart" />}
                        <div className={`font-[600] text-[14px]`} 
                            onClick={() => {
                                setShowNowPlaying(false); 
                                setShowUpcoming(true); // 상영예정작 활성화
                            }}
                        >
                            상영예정작
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex w-[980px] items-center justify-between mt-[20px]'>
                <label className='font-[400] text-[#666] text-[13px]'>
                    <input 
                        type="checkbox" 
                        checked={showNowPlaying} 
                        onChange={() => {
                            setShowUpcoming(false); // 상영예정작 해제
                            setShowNowPlaying(prev => !prev);
                        }} 
                    /> 
                    현재 상영작만 보기
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
                                <div className='flex'>
                                        <div className='absolute top-[417px] left-[247px] mt-[-418px] w-[197px] h-[418px]'>
                                            <img src={`${process.env.PUBLIC_URL}/img/chartAd.png`} alt="chartAd" />
                                        </div>
                                </div>
                            )}
                        </div>
                        <div className='relative flex'>
                            <div className='flex'>
                                <img src={movie.poster_path} alt={movie.title} className='w-[197px] h-[260px]' />
                            </div>
                            <div className='absolute top-[8px] left-[8px]'>
                                {movie.age === 'ALL' && (
                                    <img src={`${process.env.PUBLIC_URL}/img/all.svg`} alt="all"  className='size-[20px]'/>
                                )}
                                {movie.age === '12' && (
                                    <img src={`${process.env.PUBLIC_URL}/img/12years.svg`} alt="12years"  className='size-[20px]'/>
                                )}
                                {movie.age === '15' && (
                                    <img src={`${process.env.PUBLIC_URL}/img/15years.svg`} alt="15years"  className='size-[20px]'/>
                                )}
                                {movie.age === '19' && (
                                    <img src={`${process.env.PUBLIC_URL}/img/19years.svg`} alt="19years"  className='size-[20px]'/>
                                )}
                            </div>
                        </div>
                        <div className='mt-[10px] font-[600] text-[#222] text-[16px]'>{movie.title}</div>
                        <div className='text-[#666] text-[14px]'>투표율  {movie.vote_average}</div>
                        <div className='text-[#666] text-[11px] font-[500]'>개봉일  {movie.release_date}</div>
                        <NavLink to='/ticketing' className='flex justify-center items-center mt-1 w-[97px] h-[25px] text-[#ffffff] font-[500] text-[14px] rounded-[5px] bg-[#fb4357]'>예매하기</NavLink>
                    </div>
                ))}
            </div>          
        </div>
    );
}
