import React from 'react'

export default function Footer() {
    return (
        <div className='bg-[#f8f8f8] min-h-fit'>
            <div className='flex h-[120px]'></div>
            <ul id="fTop" className='flex justify-between font-[500] text-[13px] text-[#666] mx-[100px] py-[23px] border-b-[1px] border-b-[#ebebeb]'>
                <li>회사소개</li>
                <li>지속가능경영</li>
                <li>IR</li>
                <li>채용정보</li>
                <li>광고/제휴/출점문의</li>
                <li>이용약관</li>
                <li>편성기준</li>
                <li><a href="https://www.cgv.co.kr/rules/privacy.aspx">
                <strong className='text-[#222] underline underline-offset-auto'>개인정보처리방침</strong></a></li>
                <li>법적고지</li>
                <li>이메일주소무단수집거부</li>
                <li>윤리경영</li>
                <li>사이버감사실</li>
            </ul>
            <div id="fBottom">
                <div id="companyInfo" className='text-[#666] text-[12px] mx-[100px] m-a p-[23px_0px]'>
                    <div>(04377)서울특별시 용산구 한강대로 23길 55, 아이파크몰 6층(한강로동)</div>
                    <div>대표이사 : 허민회 ･ 사업자등록번호 : 104-81-45690 ･ 통신판매업신고번호 : 2017-서울용산-0622</div>
                    <div>사업자정보확인</div>
                    <div>호스팅사업자 : CJ올리브네트웍스 ･ 대표이메일 : cjcgvmaster@cj.net</div>
                </div>
            </div>
        </div>
    )
}
