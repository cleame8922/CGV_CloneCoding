import React from 'react';

export default function Login() {
    return (
        <div className='flex justify-center'>
            <div id="container" className='flex flex-col flex-wrap w-[980px] p-[30px_0]'>
                <div id="top" className='flex w-[980px] justify-between'>
                    <div id="left" className='flex flex-col'>
                        <ul id="menu" className='flex'>
                            <li className='flex items-center justify-center font-[500] bg-[#fb4357] text-[#fdfcf0] text-[13px] text-center w-[100px] h-[37px] rounded-t-[5px]'>로그인</li>
                            <li className='flex items-center justify-center font-[500] bg-[#898987] text-[#fdfcf0] text-[13px] text-center ml-[1px] w-[100px] h-[37px] rounded-t-[5px]'>비회원 예매</li>
                            <li className='flex items-center justify-center font-[500] bg-[#898987] text-[#fdfcf0] text-[13px] text-center ml-[1px] w-[100px] h-[37px] rounded-t-[5px]'>비회원 예매확인</li>
                        </ul>
                        <div id="login" className='flex flex-col items-center justify-center border-y-[2px] border-[#898987]
                        w-[541px] h-[298px]'>
                            <div className='flex font-[500] text-[#666] text-[14px]'>아이디 비밀번호를 입력하신 후, 로그인 버튼을 클릭해 주세요.</div>
                            <div id="id" className='mt-[13px] w-[215px] h-[35px]'>
                                <input type="text" className='w-[264px] h-[42px] mb-[5px] border-[2px] border-[#b5b5b5] bg-[url("./images/spriteIcon.png")] bg-[8px_-230px] p-[0_5px_0_40px]' />
                            </div>
                            <div id="pw" className='mt-[13px] w-[215px] h-[35px]'>
                                <input type="password" className='w-[264px] h-[42px] mb-[5px] border-[2px] border-[#b5b5b5] bg-[url("./images/spriteIcon.png")] bg-[8px_-260px] p-[0_5px_0_40px]' />
                            </div>
                            <div className='mt-2 w-[215px]'>
                                <button className='bg-[#fb4357] text-[#fdfcf0] w-[264px] h-[42px] position-static mt-[5px] p-[2px] text-center'>로그인</button>
                            </div>
                            <div id="loginEtc" className='flex justify-between items-center mt-[10px] w-[264px]'>
                                <div id="leftEtc" className='flex ml-[20px]'>
                                    <label className='font-[12px] text-[#666] text-[13px]'>
                                        <input type="checkbox" /> 아이디 저장
                                    </label>
                                </div>
                                <div id="rightEtc" className='flex ml-[20px]'>
                                    <div className='text-[12px] text-[#666] font-[400]'>아이디 찾기</div>
                                    <div className='text-[12px] text-[#666] font-[400] ml-[20px]'>비밀번호 찾기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="right" className='flex items-center mt-[35px]'>
                        <img src="img/loginAd.png" alt="loginAd" className='w-[350px] h-[300px]' />
                    </div>
                </div>
                <div id="bottom" className='flex items-center flex-around mt-[20px] border-[1px] border-[#d5d4ca] w-[980px] h-[62px] p-[0_20px]'>
                    <div className='flex font-[700] text-[#222222] text-[13px]'>CJ ONE 회원이 아니신가요?</div>
                    <div className='flex font-[500] text-[#222] text-[13px] pl-[20px]'>회원가입하시고 다양한 혜택을 누리세요!</div>
                    <div className='flex justify-between w-[300px] ml-[30px]'>
                        <div className='flex justify-center items-center font-[700] w-[144px] h-[27px] p-[0_5px_0] border-[2px] border-[#fb4357] text-[#fb4357] text-[12px]'>CJ ONE 회원가입하기</div>
                        <div className='border-l-[1px]'></div>
                        <div className='flex justify-center items-center font-[700] w-[144px] h-[27px] p-[0_5px_0] border-[2px] border-[#333333] text-[#333333] text-[12px]'>CJ ONE 멤버십이란?</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
