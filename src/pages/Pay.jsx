import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom';


export default function Pay() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const movie = queryParams.get('movie');
    const theater = queryParams.get('theater');
    const date = queryParams.get('date');
    const time = queryParams.get('time');
    const poster = queryParams.get('poster');
    const people = queryParams.get('people');
    const seats = queryParams.get('seats');
    const screen = queryParams.get('screen');
    const totalAmount = queryParams.get('totalAmount');
    const paymentType = queryParams.get('paymentType');
    const easyPaymentType = queryParams.get('easyPaymentType');

    // 체크박스 상태 배열로 관리, 초기값은 false
    const [checkedItems, setCheckedItems] = useState({
        all: false,
        one: false,
        two: false,
        three: false,
        four: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked: isChecked } = e.target;
        
        if (name === "all") {
            setCheckedItems({
                all: isChecked,
                one: isChecked,
                two: isChecked,
                three: isChecked,
                four: false, // 'four'는 'all'과 관계 없이 false로 설정
            });
        } else {
            setCheckedItems((prevState) => ({
                ...prevState,
                [name]: isChecked,
            }));
        }
    };

    useEffect(() => {
        const allChecked = checkedItems.one && checkedItems.two && checkedItems.three;
        setCheckedItems((prevState) => ({
            ...prevState,
            all: allChecked,
        }));
    }, [checkedItems.one, checkedItems.two, checkedItems.three]);

    const isAllChecked = checkedItems.all && checkedItems.one && checkedItems.two && checkedItems.three && checkedItems.four;

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col w-[986px] h-[725px] bg-[#f6f6f4] border-[5px] border-[#333] my-[30px]'>
                <div className='flex w-[986px] h-[51px] text-[22px] font-bold text-[#f2f0e5] bg-[#333] border-[1px] border-[#707070] '>
                    <div className='flex items-center pl-5'>예매내역 확인</div>
                </div>
                <div className='flex flex-col items-center'>
                    <div id="container" className='flex pt-[45px] border-b-[2px] border-[#bebebd]'>
                        <div id="left" className='flex flex-col w-[452px] h-[257px] float-left'>
                            <div className='flex h-[35px] bg-[#eeeeec] pl-[23px] border-t-[2px] border-b-[1px] border-[#bebebd] items-center'>
                                <div className='flex text-[18px] text-[#333333] font-bold'>예매정보</div>
                                <div className='flex text-[11px] text-[#666] font-normal pl-[19px]'>결제하시기 전 예매내역을 다시 한번 확인해 주세요.</div>
                            </div>
                            <div id="movieInfo" className='flex pt-[20px] pb-[40px]'>
                                <div className='flex w-[110px] h-[158px] mr-[19px]'>
                                    <img src={poster} alt="moviePoster" />
                                </div>
                                <table className='w-[323px] mb-[10px]'>
                                    <tbody>
                                        <tr id="movieName" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>영화명</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{movie}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="theater" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>극장</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>CGV {theater}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="screen" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>상영관</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{screen}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="movieDate" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>일시</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{date} {time}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="people" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>인원</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{people}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr id="seat" className='flex justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>좌석</th>
                                            <td className='flex w-[271px] font-bold text-[12px]'>{seats}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="right" className='flex flex-col w-[452px] h-[257px] float-left border-l-[1px] border-[#bebebd]'>
                            <div className='flex h-[35px] bg-[#eeeeec] pl-[23px] border-t-[2px] border-b-[1px] border-[#bebebd] items-center'>
                                <div className='flex text-[18px] text-[#333333] font-bold'>예매정보</div>
                                <div className='flex text-[11px] text-[#666] font-normal pl-[19px]'>결제하시기 전 예매내역을 다시 한번 확인해 주세요.</div>
                            </div>
                            <div id="movieInfo" className='flex pt-[20px] pb-[40px]'>
                                <table className='w-[323px] mb-[10px] ml-[20px]'>
                                    <tbody>
                                        <tr id="movieName" className='flex items-center justify-start h-[24px]'>
                                            <th className='flex w-[52px] font-normal text-[12px]'>결제금액</th>
                                            <td className='flex w-[271px] font-bold text-[16px]'>{totalAmount}원</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                    <tr id="paymentMethod" className='flex items-center justify-start h-[24px]'>
                                        <th className='flex w-[52px] font-normal text-[12px]'>결제수단</th>
                                        <td className='flex w-[90px] text-[12px] font-bold'>
                                            {paymentType === '간편결제' ? easyPaymentType : paymentType}
                                        </td>
                                        <td className='flex w-[271px] font-bold text-[#c62424] text-[16px]'>{totalAmount}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="info" className='flex flex-col w-[907px] h-auto py-[15px]'>
                        <ul className='flex flex-col'>
                            <li className='w-[878px] text-[12px] text-[#333] mb-[6px] ml-[15px] pl-[7px]'>인터넷 예매는 온라인상으로 영화상영 시간 20분 전 까지 취소 가능하며 20분 이후에는 현장에서 취소를 하셔야 합니다.</li>
                            <li className='w-[878px] text-[12px] text-[#333] mb-[6px] ml-[15px] pl-[7px]'>현장 취소를 하는 경우 상영시간 이전까지만 가능하며 영화 상영 시작 시간 이후 취소/환불/결제수단 변경은 불가합니다.</li>
                            <li className='w-[878px] text-[12px] text-[#333] mb-[6px] ml-[15px] pl-[7px]'>입장 지연에 따른 관람 불편을 최소화 하기 위해 본 영화는 10분 후 상영이 시작됩니다.</li>
                        </ul>
                        <a href="http://www.cgv.co.kr/support/faq/detail-view.aspx?idx=749&type=239&page=1&searchtext=&pb=Y"
                        className='flex text-[#207cca] text-[12px] mt-[10px] ml-[15px]'>{`> 예약취소 및 환불규정 안내`}</a>
                    </div>

                    <div className='flex w-[907px] h-max-fit pt-[15px] pb-[15px] m-[0_0_28px] bg-[#eeeeee] border-t-[1px] border-b-[1px] border-[#cccccc]'>
                        <div id="leftInfo" className='flex flex-col w-[47%] pl-[3%] border-r-[1px] border-[#cccccc]'>
                        <div className='flex items-center w-[410px] h-min-[15px] m-[0_0_10px]'>
                                <input 
                                    id='all'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="all"
                                    checked={checkedItems.all} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="all" className='w-[93%] ml-[10px] text-[12px] text-[#333333] font-bold'>결제대행서비스 약관에 모두 동의</label>
                            </div>
                            <div className='flex items-center w-[650px] h-min-[15px] mb-[5px] ml-[10px] m-[0_0_10px]'>
                                <input 
                                    id='one'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="one"
                                    checked={checkedItems.one} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="one" className='w-[93%] text-[12px] text-[#333333] font-normal ml-[10px]'>전자금융거래 이용약관</label>
                                <button className='flex w-[100%] bg-none text-[12px] text-[#207cca] h-[16px]'>전문확인</button>
                            </div>
                            <div className='flex items-center w-[650px] h-min-[15px] mb-[5px] ml-[10px] m-[0_0_10px]'>
                                <input 
                                    id='two'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="two"
                                    checked={checkedItems.two} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="two" className='w-[93%] text-[12px] text-[#333333] font-normal ml-[10px]'>개인정보 수집 이용약관</label>
                                <button className='flex w-[100%] bg-none text-[12px] text-[#207cca] h-[16px]'>전문확인</button>
                            </div>
                            <div className='flex items-center w-[650px] h-min-[15px] mb-[5px] ml-[10px] m-[0_0_10px]'>
                                <input 
                                    id='three'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="three"
                                    checked={checkedItems.three} 
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="three" className='w-[93%] text-[12px] text-[#333333] font-normal ml-[10px]'>개인정보 제공 및 위탁 안내 약관</label>
                                <button className='flex w-[100%] bg-none text-[12px] text-[#207cca] h-[16px]'>전문확인</button>
                            </div>
                        </div>
                        <div id="rightInfo" className='flex flex-col w-[47%] pl-[3%]'>
                            <div className='flex items-center w-[410px] h-min-[15px] m-[0_0_10px]'>
                                <input 
                                    id='four'
                                    type="checkbox" 
                                    className='mt-[1px]' 
                                    name="four"
                                    checked={checkedItems.four} 
                                    onChange={handleCheckboxChange} 
                                />
                                <label htmlFor="four" className='w-[93%] ml-[10px] text-[12px] text-[#333333] font-bold'>상기 결제 내역을 모두 확인 했습니다.</label>
                            </div>
                        </div>
                    </div>

                    <div className='flex'>
                        <div id="pay">
                            <img 
                            src={`${process.env.PUBLIC_URL}/img/paymentBtn.png`} 
                            alt="paymentBtn" 
                            style={{ opacity: isAllChecked ? 1 : 0.5 }} // 모든 체크박스가 선택되지 않으면 흐릿하게 표시
                            onClick={() => {
                                if (!isAllChecked) {
                                alert("모든 약관에 동의해야 결제를 진행할 수 있습니다.");
                                return;
                                }
                                // 결제 로직 실행
                                console.log("결제 진행");
                            }}
                            />
                        </div>
                        <div id="cancel" className='flex ml-2'>
                            <img src={`${process.env.PUBLIC_URL}/img/cancelBtn.png`} alt="cancelBtn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
