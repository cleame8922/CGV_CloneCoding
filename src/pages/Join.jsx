import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Join2() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activeTab, setActiveTab] = useState('join'); // 현재 활성화된 탭 상태 추가
    const navigate = useNavigate();

    const handleJoin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password.length < 8) {
            setError('비밀번호는 최소 8자 이상이어야 합니다.');
            return;
        }

        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
                body: JSON.stringify({ userId, password }),
            });

            if (response.ok) {
                const data = await response.text();
                setSuccessMessage('회원가입이 성공적으로 완료되었습니다.');
                console.log('Response Body:', data);
                navigate('/login');
            } else {
                const errorData = await response.text();
                setError('회원가입에 실패했습니다: ' + errorData);
            }
        } catch (err) {
            setError('회원가입 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div id='join' className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center mt-[40px]'>
                <div className='flex mb-[10px]'>
                    <img src="img/joinAd.jpg" alt="joinAd" className='w-[721px] h-[391px]' />
                </div>
            </div>

            <div id="top" className='flex flex-col w-[980px] items-center my-[20px]'>
                <div className='flex justify-start'>
                    <ul id="menu" className='flex w-[600px]'>
                        <div
                            id="join"
                            className={`flex items-center justify-center font-[500] ${activeTab === 'join' ? 'bg-[#fb4357]' : 'bg-[#898987]'} text-[#fdfcf0] text-[13px] text-center w-[100px] h-[37px] rounded-t-[5px]`}
                            onClick={() => setActiveTab('join')} // join 탭 클릭 시 활성화
                        >
                            회원가입
                        </div>
                        <div
                            id="cgvJoin"
                            className={`flex items-center justify-center font-[500] ${activeTab === 'cgvJoin' ? 'bg-[#fb4357]' : 'bg-[#898987]'} text-[#fdfcf0] text-[13px] text-center ml-[1px] w-[100px] h-[37px] rounded-t-[5px]`}
                            onClick={() => setActiveTab('cgvJoin')} // cgvJoin 탭 클릭 시 활성화
                        >
                            통합회원가입
                        </div>
                    </ul>
                </div>

                <div id="content" className='flex flex-col items-center border-[1px] border-[#898987] w-[600px] h-max-fit mb-[30px]'>
                    {activeTab === 'join' && (
                        <div id="join" className='flex flex-col items-center justify-center'>
                            <div className='flex justify-center font-[500] pt-[30px] mb-[10px] text-[#666] text-[14px]'>아이디 비밀번호를 입력하신 후, 회원가입 버튼을 클릭해 주세요.</div>
                            {error && <div className="text-red-500">{error}</div>}
                            {successMessage && <div className="text-green-500">{successMessage}</div>}
                            <div id="id" className='mt-[13px] w-fit h-[35px]'>
                                <input
                                    type="text"
                                    className='w-[264px] h-[42px] mb-[5px] border-[2px] border-[#b5b5b5] bg-[url("./images/spriteIcon.png")] bg-[8px_-230px] p-[0_5px_0_40px]'
                                    value={userId}
                                    placeholder='아이디'
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                            <div id="pw" className='mt-[13px] w-fit h-[35px]'>
                                <input
                                    type="password"
                                    className='w-[264px] h-[42px] mb-[5px] border-[2px] border-[#b5b5b5] bg-[url("./images/spriteIcon.png")] bg-[8px_-260px] p-[0_5px_0_40px]'
                                    value={password}
                                    placeholder='비밀번호'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div id="pwConfirm" className='mt-[13px] w-fit h-[35px]'>
                                <input
                                    type="password"
                                    className='w-[264px] h-[42px] mb-[5px] border-[2px] border-[#b5b5b5] bg-[url("./images/spriteIcon.png")] bg-[8px_-260px] p-[0_5px_0_40px]'
                                    value={passwordConfirm}
                                    placeholder='비밀번호 확인'
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                />
                            </div>
                            <div className='mt-2 pb-[30px] w-fit'>
                                <button
                                    className='bg-[#fb4357] text-[#fdfcf0] w-[264px] h-[42px] position-static mt-[5px] p-[2px] text-center'
                                    onClick={handleJoin}
                                >
                                    회원가입
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cgvJoin' && (
                        <div id="cgvJoin" className='flex flex-col my-[30px]'>
                            <div className='flex justify-center text-[14px] text-[#666] font-[500] mb-[15px]'>CJ ONE 통합회원가입 바로가기</div>
                            <a href="https://www.cjone.com/cjmweb/join.do?coopco_cd=7010&brnd_cd=1000" className='flex justify-center text-[#fff] text-[16px] font-[500] w-fit py-[12px] px-[18px] bg-custom-gradient shadow-custom-shadow rounded-[25px]'>
                                CGV + CJONE 통합회원가입
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
