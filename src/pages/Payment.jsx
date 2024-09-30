import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Payment() {

    const [selectedNums, setSelectedNums] = useState({ 일반: 0, 청소년: 0, 경로: 0, 우대: 0 });
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('credit');
    const [selectedEasyPayment, setSelectedEasyPayment] = useState('naver');
    const navigate = useNavigate();

    const handleReset = () => {
        setSelectedNums({ 일반: 0, 청소년: 0, 경로: 0, 우대: 0 });
        setSelectedSeats([]);
    };
    
    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.id);
    };
    
    const handleEasyPaymentChange = (e) => {
        setSelectedEasyPayment(e.target.id); // 추가된 핸들러
    };
    
    return (
        <div className='flex flex-col items-center'>   
            <div id="etc" className='flex justify-end w-[996px] h-[74px] pt-[30px]'>
                <div className='flex w-[81px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")]'></div>
                <div className='flex w-[101px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-90px] ml-2'></div>
                <div className='flex w-[113px] h-[30px] bg-no-repeat bg-[url("./images/topButton.png")] bg-[0_-120px] ml-2' onClick={() => {navigate('/ticketing'); }}
                ></div>
            </div>

            <div id="container" className='flex justify-between bg-[#f2f0e5] w-[996px] relative h-auto'>
                <div id="left" className='flex flex-col pt-[5px]'>
                    <div id="discount" className='flex flex-col mb-[30px]'>
                        <div className='flex justify-between px-[20px] items-center bg-[#333333] w-[744px] h-[33px]'>
                            <div className='text-[#e0e0e0] text-[18px] font-[800] m-[2px]'>STEP 1.</div>
                            <div id="reset" className='top-[325px] right-[80px] w-[65px] text-[#e6e6e6] text-[12px] font-bold bg-[url("./images/refreshBtn.png")] bg-no-repeat bg-[100%_50%] h-[20px]'
                            onClick={handleReset}>다시하기</div>
                        </div>
                        <div className='flex justify-between items-center w-[744px] h-[43px] px-[20px] bg-[#dfded6]'>
                            <div className='text-[15px] text-[#333] font-bold'>할인쿠폰</div>
                            <div className='text-[17px] text-[#333]'><IoIosArrowDown /></div>
                        </div>
                    </div>

                    <div id="gift" className='flex flex-col mb-[30px] mt-[5px]'>
                        <div className='flex justify-between px-[20px] items-center bg-[#333333] w-[744px] h-[33px]'>
                            <div className='text-[#e0e0e0] text-[18px] font-[800] m-[2px]'>STEP 2.</div>
                            <div id="reset" className='top-[325px] right-[80px] w-[65px] text-[#e6e6e6] text-[12px] font-bold bg-[url("./images/refreshBtn.png")] bg-no-repeat bg-[100%_50%] h-[20px]'
                            onClick={handleReset}>다시하기</div>
                        </div>
                        <div className='flex justify-between items-center w-[744px] h-[43px] px-[20px] bg-[#dfded6]'>
                            <div className='text-[15px] text-[#333] font-bold'>관람권/기프트콘</div>
                            <div className='text-[17px] text-[#333]'><IoIosArrowDown /></div>
                        </div>
                    </div>

                    <div id="point" className='flex flex-col mb-[30px] mt-[5px]'>
                        <div className='flex justify-between px-[20px] items-center bg-[#333333] w-[744px] h-[33px]'>
                            <div className='text-[#e0e0e0] text-[18px] font-[800] m-[2px]'>STEP 3.</div>
                            <div id="reset" className='top-[325px] right-[80px] w-[65px] text-[#e6e6e6] text-[12px] font-bold bg-[url("./images/refreshBtn.png")] bg-no-repeat bg-[100%_50%] h-[20px]'
                            onClick={handleReset}>다시하기</div>
                        </div>
                        <div className='flex justify-between items-center w-[744px] h-[43px] px-[20px] bg-[#dfded6]'>
                            <div className='text-[15px] text-[#333] font-bold'>포인트 및 기타결제 수단</div>
                            <div className='text-[17px] text-[#333]'><IoIosArrowDown /></div>
                        </div>
                    </div>

                    <div id="pay" className='flex flex-col mt-[5px]'>
                        <div className='flex justify-between px-[20px] items-center bg-[#333333] w-[744px] h-[33px]'>
                            <div className='text-[#e0e0e0] text-[18px] font-[800] m-[2px]'>STEP 4. 최종결제수단</div>
                        </div>
                        <div id="box" className='flex flex-col items-center w-[744px] h-max-fit border-[2px] border-[#d4d3c9]'>
                            <div id="radio" className='flex items-center w-[709px] h-[44px] border-b-[2px] border-[#d7d6cf]'>
                                {['credit', 'phone', 'easy', 'my', 'toss'].map((paymentType) => (
                                    <div key={paymentType} className='flex mx-auto'>
                                        <input 
                                            id={paymentType} 
                                            type="radio" 
                                            name='pay' 
                                            className='flex'
                                            checked={selectedPayment === paymentType}
                                            onChange={handlePaymentChange}
                                        />
                                        <label htmlFor={paymentType} className='flex ml-2 text-[14px] text-[#333] font-bold'>
                                            {paymentType === 'credit' ? '신용카드' :
                                                paymentType === 'phone' ? '휴대폰 결제' :
                                                paymentType === 'easy' ? '간편결제' :
                                                paymentType === 'my' ? '내통장 결제' : '토스'}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div id="radioContent">
                                {selectedPayment === 'credit' && (
                                    <div id="credit">
                                        <div className='flex flex-col items-center w-[740px]'>
                                            <div className='flex w-[700px] h-[40px] border-b-[1px] border-[#d6d4ca]'>
                                                <div className='flex items-center justify-end w-[82px] pr-[10px] text-[12px]'>카드종류</div>
                                                <div className='flex items-center'>
                                                    <select id="credit" className='text-[12px] text-[#666] bg-transparent border-[1px] border-[#d8d8d8]'>
                                                        <option selected>카드를 선택하세요</option>
                                                        <option value="BC카드">BC카드</option>
                                                        <option value="현대카드">현대카드</option>
                                                        <option value="하나카드">하나카드</option>
                                                        <option value="삼성카드">삼성카드</option>
                                                        <option value="신한카드">신한카드</option>
                                                        <option value="KB국민카드">KB국민카드</option>
                                                        <option value="NH카드">NH카드</option>
                                                        <option value="스탠다드차타드은행카드">스탠다드차타드은행카드</option>
                                                        <option value="씨티카드">씨티카드</option>
                                                        <option value="롯데/아멕스카드">롯데/아멕스카드</option>
                                                        <option value="K뱅크">K뱅크</option>
                                                        <option value="우리카드">우리카드</option>
                                                        <option value="코나카드">코나카드</option>
                                                        <option value="신세계카드">신세계카드</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='flex items-start mt-[185px] w-[740px] h-[94px] py-[20px] bg-[#ebe9df]'>
                                                <div className='flex text-[#666666] text-[12px] pl-[20px]'>
                                                    ※ 신용카드 결제 가능 최소 금액은 1,000원 이상입니다. <br />
                                                    삼성U포인트 적립  OK캐쉬백 적립  신세계포인트 적립 <br />   
                                                    (삼성U포인트, OK캐쉬백, 신세계포인트는 포인트 중복 적립 불가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedPayment === 'phone' && (
                                    <div id="phone">
                                        <div id="top">
                                            <div className='flex items-center w-[709px] h-[40px] pl-[50px] mt-[10px]'>
                                                <div className='w-[62px] text-[12px] text-[#333333]'>결제금액</div>
                                                <div className='text-[12px] text-[#333333]'>_원</div>
                                            </div>
                                            <div className='flex items-center w-[709px] h-[40px] pl-[50px] border-y-[1px] border-[#d6d4ca]'>
                                                <div className='w-[62px] text-[12px] text-[#333333]'>상품명</div>
                                                <div className='text-[12px] text-[#333333]'>영화티켓예매</div>
                                            </div>
                                            <div className='flex flex-col pl-[90px] py-[30px]'>
                                                <div className='text-[14px] font-bold h-[30px]'>휴대폰 결제 순서</div>
                                                <div className='text-[13px] text-[#333] font-[400]'>
                                                    1. 우측 하단에 있는 "결제하기" 버튼 클릭해주세요. <br />
                                                    2. 예매내역 확인 후 결제하기 버튼 클릭 시 결제 팝업창이 뜹니다. <br />
                                                    3. 해당 팝업에서 통신사 선택 후 정보를 입력해주세요.<br />  <br />  
                                                    <div className='text-[red]'>※ 휴대폰 결제 진행시 원할한 사용을 위하여 다음 사항을 꼭 확인하세요.</div>
                                                    * 팝업 차단 설정을 꼭 해제하셔야 합니다. (도구→팝업 차단 끄기) <br />
                                                    * 팝업 차단 해제 시, 웹 브라우저 새로고침으로 인하여 최대 10분 동안 동일 좌석 선택이 제한 될 수 있습니다.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedPayment === 'easy' && (
                                    <div id="easy">
                                        <div id="radio2" className='flex items-center w-[709px] h-[44px] border-b-[2px] border-[#d7d6cf]'>
                                            {['naver', 'smile', 'ssg', 'kakao', 'payco'].map((paymentType) => (
                                                <div key={paymentType} className='flex mx-auto'>
                                                    <input 
                                                        id={paymentType} 
                                                        type="radio" 
                                                        name='easyPay' 
                                                        className='flex'
                                                        checked={selectedEasyPayment === paymentType} // 상태에 따라 체크
                                                        onChange={handleEasyPaymentChange} // 핸들러 추가
                                                    />
                                                    <label htmlFor={paymentType} className='flex ml-2 text-[14px] text-[#333] font-bold'>
                                                        {paymentType === 'naver' ? '네이버페이' :
                                                            paymentType === 'smile' ? '스마일페이' :
                                                            paymentType === 'ssg' ? 'SSGPAY' :
                                                            paymentType === 'kakao' ? '카카오페이' : 'PAYCO'}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="radioContent2">
                                            {selectedEasyPayment === 'naver' && (
                                                <div id="naver" className='w-[740px] flex flex-col'>
                                                    <div className='flex items-center p-[13px_30px_0]'>
                                                        <input type="checkbox" />
                                                        <label className='text-[#c62424] text-[12px] ml-[3px]'>문화누리카드 할인</label>
                                                    </div>
                                                    <div className='flex flex-col mb-[30px] pl-[90px] pt-[30px]'>
                                                        <div className='text-[14px] font-bold h-[30px]'>네이버페이 결제 순서</div>
                                                        <div className='text-[13px] text-[#333] font-[400]'>
                                                            1. 우측 하단에 있는 "결제하기" 버튼을 클릭해주세요.<br />
                                                            2. 예매내역 확인 후 결제하기 버튼 클릭 시 '네이버페이' 결제 인증창이 뜹니다. <br />
                                                            3. '네이버페이' 결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                                        </div>
                                                    </div>
                                                    <div className='flex'>
                                                        <div className='flex justify-center py-[15px] font-bold text-center w-[740px] bg-[#ebe9df] text-[red] text-[13px]'>
                                                            네이버페이 결제 시 결제 금액의 최대 2%가 적립됩니다. <br />
                                                            (네이버페이 기본 적립 0.1 ~ 최대 1% + 네이버페이 머니 충전 결제 적립 최대 1%) <br />
                                                            네이버페이 기본 적립은 네이버 경로 결제 시 1%, 기타 경로 결제 시 0.1%가 적립되며,  <br />
                                                            적립 관련 문의사항은 네이버페이 고객센터로 문의 부탁드립니다.  <br />
                                                            네이버페이는 즉시 할인 신용카드 및 카드사 포인트 사용이 불가하며 신용카드별 청구할인은 이용 가능합니다. <br />
                                                            네이버페이는 네이버 ID로 신용카드 또는 은행 계좌 정보를 등록하여 결제할 수 있는 간편결제 서비스입니다. <br />
                                                            주문 변경 시 카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라 변경될 수 있습니다. <br />
                                                            지원 가능 결제수단 : 네이버페이 결제창 내 노출되는 모든 카드/계좌 <br />
                                                            네이버페이 문화누리카드는 [문화누리카드 할인] 적용 건에 한하여 결제 가능합니다.
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedEasyPayment === 'smile' && (
                                                <div id="smile">
                                                    <div className='flex flex-col mb-[30px] pl-[90px] pt-[30px]'>
                                                        <div className='text-[14px] font-bold h-[30px]'>스마일페이 결제 순서</div>
                                                        <div className='text-[13px] text-[#333] font-[400]'>
                                                            1. 아래 결제하기 버튼 클릭 후 다음 단계로 이동<br />
                                                            2. 결제내역 확인 후 결제하기 버튼 클릭 시, 팝업창이 뜸 <br />
                                                            3. 해당 '스마일페이' 팝업에서 원하는 카드를 선택 후 정보를 입력하시면 됩니다.
                                                        </div>
                                                    </div>
                                                    <div className='flex'>
                                                        <div className='flex justify-center py-[15px] font-bold text-center w-[740px] bg-[#ebe9df] text-[red] text-[13px]'>
                                                            스마일페이 결제 시, 기본 0.5% 스마일캐시가 적립되며, <br />
                                                            스마일카드로 결제 시, 기본 0.5% + 추가 2.0% 적립되어 최대 2.5% 적립됩니다. <br /> <br />
                                                            '스마일페이'는 즉시할인 신용카드, 카드사 포인트는 이용이 불가능하며,  <br />
                                                            신용카드별 청구할인은 이용이 가능합니다.  <br />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedEasyPayment === 'ssg' && (
                                                <div id="ssg">
                                                    <div className='flex flex-col mb-[30px] pl-[90px] pt-[30px]'>
                                                        <div className='text-[14px] font-bold h-[30px]'>SSGPAY 결제 순서</div>
                                                        <div className='text-[13px] text-[#333] font-[400]'>
                                                            1. 우측 하단에 있는 '결제하기' 버튼을 클릭해주세요. <br />
                                                            2. 예매내역 확인 후 결제하기 버튼 클릭 시 'SSGPAY' 결제 인증창이 뜹니다. <br />
                                                            3. 'SSGPAY' 결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                                        </div>
                                                    </div>
                                                    <div className='flex'>
                                                        <div className='flex justify-center py-[15px] font-bold text-center w-[740px] bg-[#ebe9df] text-[red] text-[13px]'>
                                                            'SSGPAY'는 결제 시 신용카드 선할인과 카드사 포인트는 <br />
                                                            이용이 불가능하며, 신용카드 별 청구할인은 이용이 가능합니다. 
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedEasyPayment === 'kakao' && (
                                                <div id="kakao">
                                                    <div className='flex flex-col mb-[30px] pl-[90px] pt-[30px]'>
                                                        <div className='text-[14px] font-bold h-[30px]'>카카오페이 결제 순서</div>
                                                        <div className='text-[13px] text-[#333] font-[400]'>
                                                            1. 우측 하단에 있는 '결제하기' 버튼을 클릭해주세요. <br />
                                                            2. 예매내역 확인 후 결제하기 버튼 클릭 시 '카카오페이' 결제 인증창이 뜹니다. <br />
                                                            3. '카카오페이' 결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                                        </div>
                                                    </div>
                                                    <div className='flex'>
                                                        <div className='flex justify-center py-[15px] font-bold text-center w-[740px] bg-[#ebe9df] text-[red] text-[13px]'>
                                                            '카카오페이'는 신용카드 선할인과 카드사 포인트는 이용이 불가능하며, <br />
                                                            신용카드 별 청구할인은 이용이 가능합니다. 
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedEasyPayment === 'payco' && (
                                                <div id="payco">
                                                    <div className='flex flex-col mb-[30px] pl-[90px] pt-[30px]'>
                                                        <div className='text-[14px] font-bold h-[30px]'>PAYCO 결제 순서</div>
                                                        <div className='text-[13px] text-[#333] font-[400]'>
                                                            1. 우측 하단에 있는 '결제하기' 버튼을 클릭해주세요. <br />
                                                            2. 예매내역 확인 후 결제하기 버튼 클릭 시 'PAYCO' 결제 인증창이 뜹니다. <br />
                                                            3. 'PAYCO' 결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                                        </div>
                                                    </div>
                                                    <div className='flex'>
                                                        <div className='flex justify-center py-[15px] font-bold text-center w-[740px] bg-[#ebe9df] text-[red] text-[13px]'>
                                                            'PAYCO'는 씨티카드와 즉시할인 신용카드, 카드사 포인트는 이용이 불가능하며, <br />
                                                            신용카드 별 청구할인은 이용이 가능합니다. <br />
                                                            'PAYCO' 할인쿠폰 사용 금액에 대해서는 CJ ONE 포인트 적립이 불가합니다.
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {selectedPayment === 'my' && (
                                    <div id="my">
                                        <div className='flex flex-col mb-[30px] pl-[90px] pt-[30px]'>
                                            <div className='text-[14px] font-bold h-[30px]'>내통장 결제 결제 순서</div>
                                            <div className='text-[13px] text-[#333] font-[400]'>
                                                1. 아래 결제하기 버튼 클릭 후 다음 단계로 이동 <br />
                                                2. 결제내역 확인 후 결제하기 버튼 클릭 시, 팝업창 노출 <br />
                                                3. 해당 팝업창을 통해 본인명의의 계좌 1회 등록 <br />
                                                4. 계좌등록 시, 비밀번호만으로 현금 간편결제 서비스 이용
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex justify-center py-[15px] font-bold text-center w-[740px] bg-[#ebe9df] text-[red] text-[13px]'>
                                                '내통장 결제'는 CGV 내 본인명의 계좌 등록 후 비밀번호만으로 결제할 수 있는 간편 결제 서비스입니다. <br />
                                                은행 점검시간인 경우 내통장 결제 서비스 이용이 불가합니다.
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedPayment === 'toss' && (
                                    <div id="toss">
                                        <div className='flex flex-col mb-[30px] pl-[90px] pt-[30px]'>
                                            <div className='text-[14px] font-bold h-[30px]'>토스 결제 순서</div>
                                            <div className='text-[13px] text-[#333] font-[400]'>
                                                1. 우측 하단에 있는 "결제하기" 버튼을 클릭해주세요. <br />
                                                2. 예매내역 확인 후 결제하기 버튼 클릭 시 '토스' 결제 인증창이 뜹니다. <br />
                                                3. '토스' 결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex justify-center py-[15px] font-bold text-center w-[740px] bg-[#ebe9df] text-[red] text-[13px]'>
                                                '토스'는 신용카드 선할인과 카드사 포인트는 이용이 불가능하며, <br />
                                                신용카드별 청구할인은 이용이 가능합니다.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='fixed top-[330px] right-[630px]'>
                    <div id="right" className='flex flex-col bg-[#fff] pb-[15px] pt-[19px] shadow-md w-[216px] h-[396px]'>
                        <div className='w-[187px] h-fit my-auto border-[2px] border-[#202020] rounded-md mx-auto'>
                            <div className='h-[32px] bg-[#fff] text-[14px] font-semibold rounded-md flex justify-center items-center'>결제하실 금액</div>
                            <div className='h-[40px] bg-[#474747] text-[#fff] text-[12px] pr-4 flex justify-end items-center'>-원</div>
                        </div>
                        <div className='w-[187px] h-fit my-auto border-[2px] border-[#202020] rounded-md mx-auto'>
                            <div className='h-[32px] bg-[#d9e7eb] text-[14px] rounded-md font-semibold flex justify-center items-center'>할인내역</div>
                            <div className='h-[34px] bg-[#fff] text-[14px] border-y-[2px] border-[#202020] font-semibold flex justify-center items-center'>총 할인금액</div>
                            <div className='h-[40px] bg-[#3c464f] text-[#89e5ff]  text-[12px] pr-4 flex justify-end items-center'>-원</div>
                        </div>
                        <div className='w-[187px] h-fit my-auto border-[2px] border-[#202020] rounded-md mx-auto'>
                            <div className='h-[27px] bg-[#f0ebd2] text-[14px] rounded-md font-semibold flex justify-center items-center'>결제내역</div>
                            <div className='h-[36px] bg-[#fff] text-[12px] border-t-[2px] border-[#dde2e3] px-[10px] flex justify-between items-center'>
                                <div>신용카드</div>
                                <div>-원</div>
                            </div>
                            <div className='h-[34px] bg-[#fff] text-[14px] border-y-[2px] border-[#202020] font-semibold flex justify-center items-center'>남은 결제금액</div>
                            <div className='h-[40px] bg-[#443128] text-[#ffe56b]  text-[12px] pr-4 flex justify-end items-center'>-원</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}