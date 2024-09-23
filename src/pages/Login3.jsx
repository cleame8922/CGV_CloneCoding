import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Login3() {
    return (
    <div className='flex justify-center'>
        <div className='flex flex-col w-[980px] '>
            <div className='flex mt-[30px] bg-[url("./images/bgTabmenuGrade.gif")] bg-repeat-x bg-bottom'>
                <ul id="menu" className='flex'>
                    <NavLink to='/login' className='flex items-center justify-center font-[500] bg-[#898987] text-[#fdfcf0] text-[13px] text-center w-[100px] h-[37px] rounded-t-[5px]'>로그인</NavLink>
                    <NavLink to='/login2' className='flex items-center justify-center font-[500] bg-[#898987] text-[#fdfcf0] text-[13px] text-center ml-[1px] w-[100px] h-[37px] rounded-t-[5px]'>비회원 예매</NavLink>
                    <NavLink to='/login3' className='flex items-center justify-center font-[500] bg-[#fb4357] text-[#fdfcf0] text-[13px] text-center ml-[1px] w-[100px] h-[37px] rounded-t-[5px]'>비회원 예매확인</NavLink>
                </ul>
            </div>
            <div className='flex w-[980px] mt-[30px] mb-[5px]'>
                <div className='flex text-[#222] text-[15px] font-[600]'>비회원 예매 확인</div>
            </div>
            <div className='text-[13px] text-[#666] font-[400] my-[5px]'>비회원으로 예매하신 고객님은 개인정보(법정생년월일, 휴대폰 번호, 비밀번호(4자리))를 입력해주세요</div>

            <div id="container">
                <div className='w-[980px] h-[512px] border-[2px] border-[#dfded7]'>
                    <div id="left" className='float-left w-[50%]'>
                        <div>
                            <div className='flex items-center h-[40px] pl-[30px] bg-[#e3e3e0] text-[#222] text-[15px] font-[500]'>비회원 예매 확인</div>
                        </div>
                        <div className='p-[30px_30px_30px] '>
                            <div className='text-[#222222] text-[13px] border-b-[2px] border-[#999999]'>모든 항목은 필수 입력사항입니다.</div>
                            <form action="#">
                                <table>
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
                                            </td>
                                        </tr>
                                        <tr className='flex items-center border-b-[1px] border-[#dfded7]'>
                                            <th className='p-[15px_0]'>
                                                <label htmlFor="" className='text-[#222222] text-[12px] font-[300]'>비밀번호(4자리)</label>
                                            </th>
                                            <td>
                                                <input type="text" maxLength={8} className='border-[1px] border-[#b5b5b5] ml-[30px] h-[25px] w-[100px]' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div className='flex justify-center'>
                            <div className='mt-[20px] w-fit border-[2px] border-[#fb4357] bg-[#fb4357] text-[#ffffff] text-[12px] font-[500] p-[2px_8px]'>비회원 예매하기</div>
                        </div>
                    </div>
                    <div id="right" className='float-right flex flex-col w-[50%]'>
                        <div>
                            <div className='flex items-center h-[40px] pl-[30px] bg-[#e3e3e0] text-[#222] text-[15px] font-[500]'>비회원 예매 비밀번호 찾기</div>
                        </div>
                        <div className='border-l-[1px] border-[#dfded7] h-[470px]'>
                            <div className='p-[30px_30px_30px]'>
                                <div className='text-[#222222] text-[14px] mb-[20px]'>비회원 예매 시, 입력한 휴대폰번호로 SMS인증을 하면 비회원 예매 비밀번호를 찾으실수 있습니다.</div>
                                <div className='border-t-[2px] border-[#999999]'></div>
                            </div>
                            <div className='flex justify-center'>
                                <div className='mt-[20px] w-fit border-[2px] border-[#333333] text-[#333333] text-[12px] font-[700] p-[2px_20px]'>휴대폰 SMS인증으로 찾기</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-[40px] pb-[50px]'>
                    <dl className='p-[30px] border-[2px] border-[#d5d4cd] bg-[#f9f7ec]'>
                        <dt className='float-left text-[#222] text-[14px] font-[500]'>비회원<br /> 예매 시<br /> 참고하세요!</dt>
                        <dd className='ml-[94px] pl-[25px] text-[14px] text-[#666666] border-l-[1px] border-[#c5c4bf]'>1. 상기 정보 수집에 동의하지 않을 경우, 비회원 예매 서비스를 이용하실 수 없습니다.</dd>
                        <dd className='ml-[94px] pl-[25px] text-[14px] text-[#666666] border-l-[1px] border-[#c5c4bf]'>2. 비회원 예매 시 청소년 관람불가 영화는 예매가 제한됩니다.</dd>
                        <dd className='ml-[94px] pl-[25px] text-[14px] text-[#666666] border-l-[1px] border-[#c5c4bf]'>3. 비회원 에매 결제수단은 신용카드만 가능하며 모든 제휴상품권, 쿠폰, 영화예매권 등의 사용은 회원 예매 서비스 이용 시 가능합니다.</dd>
                        <dd className='ml-[94px] pl-[25px] text-[14px] text-[#666666] border-l-[1px] border-[#c5c4bf]'>4. 모바일과 ARS에서는 취소가 불가능하며, 홈페이지를 이용하여 입력하신 로그인 정보로 취소 처리하실 수 있습니다.</dd>
                        <dd className='ml-[94px] pl-[25px] text-[14px] text-[#666666] border-l-[1px] border-[#c5c4bf]'>5. 비회원 예매 및 비회원 예매 확인/취소 메뉴만 이용 가능합니다. 이 외에 커뮤니티, 댓글, 인정 등의 서비스는 회원 가입 후 이용 가능합니다.</dd>
                        <dd className='ml-[94px] pl-[25px] text-[14px] text-[#666666] border-l-[1px] border-[#c5c4bf]'>6. 문의사항은 CGV 고객센터(1544-1122)로 문의해 주시기 바랍니다.<br />
                        - 운영시간 : 월~금 09:00 ~ 18:00 (이 외 시간은 자동 응답 안내 가능)</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    )
}
