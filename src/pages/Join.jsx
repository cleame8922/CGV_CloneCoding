import React from 'react'

export default function Join() {
    return (
        <div id='join' className='flex flex-col items-center justify-center'>
            <div className='flex flex-col w-[980px] items-center mt-[30px]'>
                <div className='flex'>
                    <img src="img/joinAd.jpg" alt="joinAd" className='w-[721px] h-[391px]' />
                </div>
                <div className='flex mt-[20px] mb-[33px] text-[15px] text-[#222]'>CJ ONE 회원이 되시면 하나의 통합된 회원 ID와 비밀번호로<br />
                CGV와 CJ ONE의 다양한 서비스를 이용하실 수 있습니다.</div>
            </div>
                
            <a href='https://www.cjone.com/cjmweb/join.do?coopco_cd=7010&brnd_cd=1000' className='flex p-[2px] text-[#fff] text-[15px] bg-[#fb4357]'>
                <div className='p-[0_50px] h-[44px] border-[1px] border-[#f07469] flex items-center'>CGV + CJONE 통합회원가입</div>
            </a>

            <div className='flex flex-col w-[980px]'>
                <div className='flex text-[16px] text-[#333] font-[500] mb-[15px]'>CJ ONE 상세 혜택</div>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='flex flex-col w-[300px] h-[250px] border-[1px] border-[#e1e0db] text-[#222] p-[30px]'>
                        <div className='pb-[13px] font-[600] text-[#333] text-[13px] border-b-[1px] border-[#e1e0db]'>기본적립율</div>
                        <ul className='mt-[10px] flex flex-col'>
                            <li className='pl-[8px] mb-2 text-[13px] bg-[0px_5px] bg-[url("./images/bulCircleSmall.gif")] bg-no-repeat'>유료 영화관람 금액의 3 ~ 5% 적립</li>
                            <li className='pl-[8px] text-[13px] bg-[0px_5px] bg-[url("./images/bulCircleSmall.gif")] bg-no-repeat'>매점 결제 금액의 0.5% 적립</li>
                        </ul>
                    </div>
                    <div className='flex flex-col w-[300px] h-[250px] border-[1px] border-[#e1e0db] text-[#222] p-[30px]'>
                        <div className='pb-[13px] font-[600] text-[#333] text-[13px] border-b-[1px] border-[#e1e0db]'>제휴할인 시 / 적립 가능매장</div>
                        <ul className='mt-[10px] flex flex-col'>
                            <li className='pl-[8px] mb-2 text-[13px] bg-[0px_5px] bg-[url("./images/bulCircleSmall.gif")] bg-no-repeat'>제휴할인 + 결제금액의 0.5 ~ 5% 적립</li>
                        </ul>
                    </div>
                    <div className='flex flex-col w-[300px] h-[250px] border-[1px] border-[#e1e0db] text-[#222] p-[30px]'>
                        <div className='pb-[13px] font-[600] text-[#333] text-[13px] border-b-[1px] border-[#e1e0db]'>기타 적립안내 / 포인트 사용단위</div>
                        <ul className='mt-[10px] flex flex-col'>
                            <li className='pl-[8px] mb-2 text-[13px] bg-[0px_5px] bg-[url("./images/bulCircleSmall.gif")] bg-no-repeat'>단체할인 시, 무비머니, 관람권, <br />
                            상품권 등으로 구매/결제 시 적립 제외</li>
                            <li className='pl-[8px] mb-2 text-[13px] bg-[0px_5px] bg-[url("./images/bulCircleSmall.gif")] bg-no-repeat'>최대 1일 6회(현장 또는 온라인) 또는 1일<br />
                            24매(온라인) 예매제한</li>
                            <li className='pl-[8px] text-[13px] bg-[0px_5px] bg-[url("./images/bulCircleSmall.gif")] bg-no-repeat'>사용 단위 <br />
                            - 매표, 매점 : 500P <br />
                            - 온라인 예매 : 10P
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex justify-center mt-[15px] mb-[50px] text-[14px] text-[#222]'>※ CJ ONE 통합회원으로 가입되더라도 정보 제공 및 약관 동의가 되지 않은 CJ ONE 제휴 브랜드에는 개인정보가 제공되지 않습니다.</div>
            </div>
        </div>
    )
}
