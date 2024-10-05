// iamport.payment-1.1.6.js

// Iamport 객체를 생성하여 jQuery와 함께 사용할 준비를 합니다.
window.IAMPORT = {
    init: function() {
        console.log("IAMPORT initialized");
        // 결제 초기화 관련 코드
    },
    // 필요한 추가 메서드 구현
};

// jQuery가 로드되었는지 확인
if (typeof jQuery !== "undefined") {
    console.log("jQuery is loaded");
    // IAMPORT.init(); // 필요 시 초기화 메서드를 호출할 수 있습니다.
} else {
    console.log("jQuery is not loaded");
}
