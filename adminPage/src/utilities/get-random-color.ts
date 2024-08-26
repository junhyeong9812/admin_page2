/*
 * generates random colors from  https://ant.design/docs/spec/colors. <color-4> used.
 */
export const getRandomColorFromString = (text: string) => {
  // `getRandomColorFromString`라는 함수를 export하여 다른 모듈에서 사용할 수 있게 함. `text`를 입력받아 이를 기반으로 무작위 색상을 생성
  const colors = [
    // 사용할 색상 목록을 정의 (Ant Design의 색상 스펙에서 가져옴)
    "#ff9c6e",
    "#ff7875",
    "#ffc069",
    "#ffd666",
    "#fadb14",
    "#95de64",
    "#5cdbd3",
    "#69c0ff",
    "#85a5ff",
    "#b37feb",
    "#ff85c0",
  ];

  let hash = 0; // `hash`라는 변수를 초기화 (해시 값을 저장할 변수)
  for (let i = 0; i < text.length; i++) {
    // `text`의 각 문자를 순회하면서 해시 값을 생성
    hash = text.charCodeAt(i) + ((hash << 5) - hash); // 현재 문자에 해당하는 유니코드 값을 해시 계산에 반영 (비트 연산자로 해시를 변형)
    hash = hash & hash; // 해시 값을 32비트 정수로 유지하기 위해 AND 연산 적용
  }
  hash = ((hash % colors.length) + colors.length) % colors.length; // 해시 값을 색상 배열의 길이로 나눈 나머지를 사용해 색상 인덱스를 결정

  return colors[hash]; // 선택된 색상 인덱스에 해당하는 색상을 반환
};
