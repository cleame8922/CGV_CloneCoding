import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Login() {
    return (
        <div className='flex justify-center'>
            <div id="container" className='flex flex-col flex-wrap w-[980px] p-[30px_0]'>
                <div id="top" className='flex w-[980px] justify-between'>
                    <div id="left" className='flex flex-col'>
                        <ul id="menu" className='flex'>
                            <NavLink to='/login' className='flex items-center justify-center font-[500] bg-[#898987] text-[#fdfcf0] text-[13px] text-center w-[100px] h-[37px] rounded-t-[5px]'>로그인</NavLink>
                            <NavLink to='/login2' className='flex items-center justify-center font-[500] bg-[#fb4357] text-[#fdfcf0] text-[13px] text-center ml-[1px] w-[100px] h-[37px] rounded-t-[5px]'>비회원 예매</NavLink>
                            <NavLink to='/login3' className='flex items-center justify-center font-[500] bg-[#898987] text-[#fdfcf0] text-[13px] text-center ml-[1px] w-[100px] h-[37px] rounded-t-[5px]'>비회원 예매확인</NavLink>
                        </ul>
                        <div id="login2" className='flex flex-col items-center justify-center border-y-[2px] border-[#898987]
                        w-[541px] h-[350px] py-[30px]'>
                            <div>
                                <div className='flex w-[541px]'>
                                    <div className='flex text-[#fb4357] font-[600] text-[15px]'>STEP 1</div>
                                    <div className='flex text-[#222] text-[15px] font-[600] ml-[10px]'>개인정보 수집 및 이용동의</div>
                                </div>
                                <div className='text-[13px] text-[#666] font-[400] my-[10px]'>비회원 예매 고객께서는 먼저 개인정보 수집 및 이용 동의 정책에 동의해 주셔야 합니다.</div>
                            </div>
                            <div className='mt-[10px]'>
                                <table>
                                    <colgroup>
                                        <col className='w-[17%]'/>
                                        <col className='w-[37%]'/>
                                        <col className='w-[30%]'/>
                                        <col className='w-[16%]'/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th className='h-[34px] text-[#666] text-[11px] bg-[#e2e2e0] border-y-[1px] border-[#b8b6aa]' scope='col'>항목</th>
                                            <th className='h-[34px] text-[#666] text-[11px] bg-[#e2e2e0] border-y-[1px] border-[#b8b6aa]' scope='col'>이용목적</th>
                                            <th className='h-[34px] text-[#666] text-[11px] bg-[#e2e2e0] border-y-[1px] border-[#b8b6aa]' scope='col'>항목</th>
                                            <th className='h-[34px] text-[#666] text-[11px] bg-[#e2e2e0] border-y-[1px] border-[#b8b6aa]' scope='col'>동의여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-b-[2px] border-[#b8b6aa]'>
                                            <th className='text-[#666666] text-[14px] font-[400] p-[10px]'>법정생년월일, 휴대폰번호,<br /> 비밀번호</th>
                                            <td className='border-x-[1px] border-[#b8b6aa] p-[10px] text-[#666] text-[14px] font-[400]'>
                                                <ul>
                                                    <li>· 비회원 예매서비스 제공</li>
                                                    <li>· 이용자식별, 요금정산, 추심, 신규서비스 개발, 접속빈도 파악 등</li>
                                                </ul>
                                            </td>
                                            <td className='p-[10px] h-[105px] text-[14px] text-[#666] border-r-[1px] border-[#b8b6aa] flex justify-center items-center'>수집일로부터 5년</td>
                                            <td>
                                                <div className='ml-[10px] text-[13px] text-[#666666] font-[600]'>
                                                    <input type="radio" name='agree' />
                                                    <label htmlFor="">동의함</label>
                                                </div>
                                                <div className='ml-[10px] text-[13px] text-[#666666] font-[400]'>
                                                    <input type="radio" name='agree' />
                                                    <label htmlFor="">동의안함</label>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-[20px] text-[13px] text-[#666666] font-[500]'>
                                ※ CGV 비회원 예매서비스 제공을 위해 필요한 최소한의 개인정보이므로 입력(수집)에 동의하시지 않을 경우 서비스를 이용하실 수 없습니다.
                            </div>
                            <a href="http://www.cgv.co.kr/rules/privacy.aspx" className='ml-[355px] w-[183px] text-[13px] font-[600] text-[#fb4357] border-[2.3px] border-[#fb4357] p-[0_5px_0]'>개인정보처리(취급)방침전문보기</a>
                        </div>
                    </div>
                    <div id="right" className='flex items-center mt-[35px]'>
                        <img src="img/loginAd.png" alt="loginAd" className='w-[350px] h-[300px]' />
                    </div>
                </div>
                <div className='flex flex-col w-[980px]'>
                    <div className='flex w-[980px] mt-[30px] mb-[10px]'>
                        <div className='flex text-[#fb4357] font-[600] text-[15px]'>STEP 2</div>
                        <div className='flex text-[#222] text-[15px] font-[600] ml-[10px]'>개인정보(휴대폰번호,법정생년월일,비밀번호)입력</div>
                    </div>
                    <div className='text-[13px] text-[#666] font-[400] my-[10px]'>개인정보를 잘못 입력하시면 예매내역 확인/취소 및 티켓 발권이 어려울 수 있으니, 입력하신 정보를 다시 한번 확인해주시기 바랍니다.</div>
                    <div>
                        <div>
                            <div className='flex items-center h-[40px] pl-[30px] bg-[#e3e3e0] text-[#222] text-[15px] font-[500]'>개인정보 입력</div>
                        </div>
                        <div className='w-[980px] h-[415px] p-[30px_30px_30px] border-[2px] border-[#dfded7]'>
                            <div className='text-[#222222] text-[13px] border-b-[2px] border-[#999999]'>모든 항목은 필수 입력사항입니다.</div>
                            <form action="#">
                                <table className='border-collapse w-[920px]'>
                                    <colgroup>
                                        <col />
                                        <col />
                                    </colgroup>
                                    <tbody>
                                        <tr className='flex items-center border-b-[1px] border-[#dfded7]'>
                                            <th className='p-[15px_0]'>
                                                <label htmlFor="" className='text-[#222222] text-[12px] font-[300]'>법정생년월일(8자리)</label>
                                            </th>
                                            <td>
                                                <input type="text" maxLength={8} className='border-[1px] border-[#b5b5b5] ml-[10px] h-[25px] w-[100px]' />
                                            </td>
                                        </tr>
                                        <tr className='flex items-center border-b-[1px] border-[#dfded7]'>
                                            <th className='p-[15px_0]'>
                                                <label htmlFor="" className='text-[#222222] text-[12px] font-[300]'>휴대폰번호</label>
                                            </th>
                                            <td className='flex ml-[58px]'>
                                                <select name="" id="" className='border-[1px] border-[#b5b5b5] text-[13px] p-[3px]'>
                                                    <option value="010">010</option>
                                                    <option value="011">011</option>
                                                    <option value="016">016</option>
                                                    <option value="017">017</option>
                                                    <option value="018">018</option>
                                                    <option value="019">019</option>
                                                </select>
                                                <div className='ml-2 text-[#222222]'>-</div>
                                                <input type="text" className='border-[1px] border-[#b5b5b5] ml-[10px] h-[25px] w-[100px]' />
                                                <div className='ml-2 text-[#222222]'>-</div>
                                                <input type="text" className='border-[1px] border-[#b5b5b5] ml-[10px] h-[25px] w-[100px]' />
                                                <div className='border-[2px] border-[#fb4357] text-[#fb4357] text-[12px] font-[700] ml-[10px] p-[2px_8px]'>인증번호받기</div>
                                            </td>
                                        </tr>
                                        <tr className='flex items-center border-b-[1px] border-[#dfded7]'>
                                            <th className='p-[15px_0]'>
                                                <label htmlFor="" className='text-[#222222] text-[12px] font-[300]'>인증번호(4자리)</label>
                                            </th>
                                            <td>
                                                <input type="text" maxLength={8} className='border-[1px] border-[#b5b5b5] ml-[30px] h-[25px] w-[100px]' />
                                            </td>
                                            <div className='border-[2px] border-[#fb4357] text-[#fb4357] text-[12px] font-[700] ml-[10px] p-[2px_8px]'>인증확인</div>
                                        </tr>
                                        <tr className='flex items-center border-b-[1px] border-[#dfded7]'>
                                            <th className='p-[15px_0]'>
                                                <label htmlFor="" className='text-[#222222] text-[12px] font-[300]'>비밀번호(4자리)</label>
                                            </th>
                                            <td>
                                                <input type="text" maxLength={8} className='border-[1px] border-[#b5b5b5] ml-[30px] h-[25px] w-[100px]' />
                                            </td>
                                        </tr>
                                        <tr className='flex items-center border-b-[1px] border-[#dfded7]'>
                                            <th className='p-[15px_0]'>
                                                <label htmlFor="" className='text-[#222222] text-[12px] font-[300]'>비밀번호확인</label>
                                            </th>
                                            <td>
                                                <input type="text" maxLength={8} className='border-[1px] border-[#b5b5b5] ml-[47px] h-[25px] w-[100px]' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <div className='flex justify-center'>
                                <div className='mt-[20px] w-fit border-[2px] border-[#fb4357] bg-[#fb4357] text-[#ffffff] text-[12px] font-[500] p-[2px_8px]'>비회원 예매하기</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
