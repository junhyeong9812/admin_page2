export const currencyNumber = (
  // `currencyNumber`라는 함수를 export하여 다른 모듈에서 사용할 수 있게 함
  value: number, // 첫 번째 매개변수로 숫자 값을 받음
  options?: Intl.NumberFormatOptions // 두 번째 매개변수로 Intl.NumberFormat의 옵션을 받을 수 있도록 설정 (optional)
) => {
  if (
    // 조건문 시작
    typeof Intl === "object" && // Intl이 객체인지 확인
    Intl && // Intl 객체가 존재하는지 확인 (falsy 값이 아닌지)
    typeof Intl.NumberFormat === "function" // Intl 객체 내에 NumberFormat이라는 함수가 존재하는지 확인
  ) {
    return new Intl.NumberFormat("en-US", {
      // Intl.NumberFormat을 사용하여 숫자를 "en-US" 형식의 통화 형식으로 변환
      style: "currency", // 숫자를 통화 형식으로 지정
      currency: "USD", // 통화는 미국 달러(USD)로 설정
      ...options, // 추가적인 사용자 정의 옵션을 병합 (spread operator 사용)
    }).format(value); // 숫자를 지정된 형식으로 포맷하여 반환
  }

  return value.toString(); // Intl 객체나 NumberFormat 함수가 없는 경우 숫자를 문자열로 변환하여 반환
};
