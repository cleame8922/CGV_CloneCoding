import React, {useState} from 'react'

export default function Footer() {
    
    const [selectedUrl, setSelectedUrl] = useState("");

    const handleSelectChange = (e) => {
        setSelectedUrl(e.target.value); // 선택된 옵션의 value 저장
    };

    const handleGoClick = () => {
        if (selectedUrl) {
        window.open(selectedUrl, "_blank"); // 새 창에서 해당 URL로 이동
        } else {
        alert("계열사를 선택하세요."); // 선택되지 않은 경우 경고 메시지
        }
    };

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
                <div id="fBottom" className='flex justify-between flex-start'>
                    <div id="companyInfo" className='text-[#666] text-[12px] p-[30px_0px]'>
                        <div>(04377)서울특별시 용산구 한강대로 23길 55, 아이파크몰 6층(한강로동)</div>
                        <div>대표이사 : 허민회 ･ 사업자등록번호 : 104-81-45690 ･ 통신판매업신고번호 : 2017-서울용산-0622</div>
                        <div>사업자정보확인</div>
                        <div>호스팅사업자 : CJ올리브네트웍스 ･ 대표이메일 : cjcgvmaster@cj.net</div>
                        <div>© CJ CGV. All Rights Reserved</div>
                    </div>
                </div>
            </div>
            <div className='relative flex'>
                <section className='flex absolute top-[320px] right-[30px]'>
                    <select
                        className='h-[34px] text-[12px] text-[#666] bg-transparent border-[1px] border-[#d8d8d8]'
                        onChange={handleSelectChange} // 옵션 변경시 URL 업데이트
                    >
                        <option value="">계열사 바로가기</option>
                        <optgroup label='CJ그룹' className='text-[12px] text-[#666]'>
                        <option value="http://www.cj.net/">CJ주식회사</option>
                        </optgroup>
                        <optgroup label='식품 & 식품서비스' className='text-[12px] text-[#666]'>
                        <option value="https://www.cj.co.kr/kr/index">CJ제일제당</option>
                        <option value="https://www.cjfoodville.co.kr/main.asp">CJ푸드빌</option>
                        <option value="http://www.cjfreshway.com/index.jsp">CJ프레시웨이</option>
                        </optgroup>
                        <optgroup label='생명공학' className='text-[12px] text-[#666]'>
                        <option value="https://www.cj.co.kr/kr/about/business/bio">CJ제일제당 BIO사업부문</option>
                        <option value="https://www.cj.co.kr/kr/about/business/bio">CJ Feed&Card</option>
                        </optgroup>
                        <optgroup label='물류 & 신유통' className='text-[12px] text-[#666]'>
                        <option value="https://www.cjlogistics.com/ko/main">CJ대한통운</option>
                        <option value="http://www.cjenc.co.kr/kr/Default.asp">CJ대한통운 건설부문</option>
                        <option value="https://www.oliveyoung.co.kr/store/company/brandStory.do">CJ올리브영</option>
                        <option value="https://www.cjolivenetworks.co.kr:449/">CJ올리브네트웍스</option>
                        <option value="https://www.cjoshopping.com:9002/index.asp">CJ ENM 커머스부문</option>
                        </optgroup>
                        <optgroup label='엔터테인먼트 & 미디어' className='text-[12px] text-[#666]'>
                        <option value="https://www.cjenm.com/ko/">CJ ENM 엔터테인먼트부문</option>
                        <option value="http://corp.cgv.co.kr/">CJ CGV</option>
                        </optgroup>
                    </select>

                    <div
                        className='flex justify-center items-center ml-[5px] w-[36px] h-[34px] text-[14px] text-[#fff] bg-[#9e9e9e] cursor-pointer'
                        onClick={handleGoClick} // GO 버튼 클릭시 URL로 이동
                    >
                        GO
                    </div>
                </section>
            </div>
        </div>
    )
}
