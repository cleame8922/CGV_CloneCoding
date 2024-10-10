import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieDetail() {

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { movieId } = useParams();
    
    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
    
    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/movies/details/${movieId}`);
                const movieWithFullPosterPath = {
                    ...response.data,
                    posterPath: `${BASE_IMAGE_URL}${response.data.posterPath}`, // 기본 URL과 결합
                };
                setMovie(movieWithFullPosterPath);
                setLoading(false);
                console.log(movie.credits[0].director);
            } catch (err) {
                setError('영화 정보를 불러오는데 실패했습니다.');
                setLoading(false);
            }
        };
        
        fetchMovieDetail();
    }, [movieId]);

    const directorName = movie.credits && movie.credits.length > 0 ? movie.credits[0].director : '정보 없음';
    
    return (
        <div>
            <div id="movieInfo" className='flex flex-col items-center pt-[40px]'>
                <div className='flex flex-col w-[980px]'>
                    <div className='flex'>
                        <div className='flex flex-col'>
                            {movie.posterPath && (
                                <img src={movie.posterPath} alt={movie.title} className='w-[185px] h-[260px] relative mr-[30px]' />
                            )}
                            
                            <div 
                            className='absolute top-[545px] left-[475px] mt-[-29px] ml-[4px] size-[24px] bg-[url("./images/spriteIcon.png")] bg-[0px_0px] bg-no-repeat cursor-pointer'
                            onClick={() => window.open(movie.posterPath)}
                            >
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div>
                                <div className='flex items-center ml-5'>
                                    <div className='flex text-[25px] text-[#1a1919] font-[500]'>{movie.title}</div>
                                    <div className='flex h-fit p-[2px_7px] ml-[12px] border-[2px] border-[#3e82a4] font-[500] text-[12px] text-[#3e82a4]'>현재상영중</div>
                                </div>
                                <div className='flex w-[765px] border-b-[1px] border-[#d9d6c8] pb-[10px] ml-5'>
                                    <div className='flex text-[14px] text-[#666] mt-[25px]'>투표율 {movie.voteAverage} %</div>
                                    <div className='flex text-[14px] text-[#666] mt-[25px] ml-5'>러닝타임 {movie.runtime}분</div>
                                </div>
                            </div>
                            <div>
                                <div className='w-[750px] h-[80px] text-[13px] text-[#333] font-[500] mt-[18px] ml-5 overflow-hidden'>
                                    감독 : {directorName} <br />
                                    배우 : {movie.credits?.filter(credit => credit.character)
                                        .slice(0, 7) // 첫 7명만 가져오기
                                        .map(credit => credit.name)
                                        .join(', ')} {movie.credits?.filter(credit => credit.character).length > 7 ? '...' : ''} <br />
                                    장르 : {movie.genres?.join(', ')} / 기본정보 : {movie.age}세이상관람가, {movie.runtime}분, {movie.productionCountry}<br />
                                    개봉 : {new Date(movie.releaseDate).toLocaleDateString()}
                                </div>
                            </div>
                            <div className='flex mt-[20px] ml-5'>
                                <NavLink to='/ticketing' className='flex justify-center items-center font-[500] w-[120px] h-[34px] bg-[#fb4357] text-[14px] text-[#fff] rounded-[5px] mt-2'>예매하기</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[50px]'>
                        <div className='flex w-[980px] justify-between'>
                            <div className='flex w-[500px]'>
                                {movie.overview}
                            </div>
                            <div className='flex'>
                                <img src={`${process.env.PUBLIC_URL}/img/movieAd.jpg`} alt="movieAd" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
