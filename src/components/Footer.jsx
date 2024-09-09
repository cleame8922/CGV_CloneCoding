import React from 'react'

export default function Footer() {
    return (
        <div className='flex justify-center w-[100%] bg-[#f8f8f8] min-h-fit'>
            <div className='flex flex-wrap items-end w-[980px]'>
                <div className='flex h-[240px]'></div>
                <div className='flex'>
                    <ul id="fTop" className='flex justify-between items-center h-fit font-[500] text-[13px] text-[#666] py-[23px] border-b-[1px] border-b-[#ebebeb]'>
                        <li className='flex'>회사소개</li>
                        <li className='flex ml-5'>지속가능경영</li>
                        <li className='flex ml-5'>IR</li>
                        <li className='flex ml-5'>채용정보</li>
                        <li className='flex ml-5'>광고/제휴/출점문의</li>
                        <li className='flex ml-5'>이용약관</li>
                        <li className='flex ml-5'>편성기준</li>
                        <li className='flex ml-5'><a href="https://www.cgv.co.kr/rules/privacy.aspx">
                        <strong className='flex ml-5 text-[#222] underline underline-offset-auto'>개인정보처리방침</strong></a></li>
                        <li className='flex ml-5'>법적고지</li>
                        <li className='flex ml-5'>이메일주소무단수집거부</li>
                        <li className='flex ml-5'>윤리경영</li>
                        <li className='flex ml-5'>사이버감사실</li>
                    </ul>
                </div>
                <div id="fBottom" className='flex flex-start justify-between'>
                    <div id="companyInfo" className='text-[#666] text-[12px] p-[30px_0px]'>
                        <div>(04377)서울특별시 용산구 한강대로 23길 55, 아이파크몰 6층(한강로동)</div>
                        <div>대표이사 : 허민회 ･ 사업자등록번호 : 104-81-45690 ･ 통신판매업신고번호 : 2017-서울용산-0622</div>
                        <div>사업자정보확인</div>
                        <div>호스팅사업자 : CJ올리브네트웍스 ･ 대표이메일 : cjcgvmaster@cj.net</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
