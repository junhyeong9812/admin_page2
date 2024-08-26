export const getNameInitials = (name: string, count = 2) => {
  // `getNameInitials`라는 함수를 export하여 다른 모듈에서 사용할 수 있게 함, `name`은 이름 문자열, `count`는 이니셜의 최대 길이 (기본값 2)
  const initials = name // `initials` 변수를 선언하고, 아래의 작업을 통해 값을 할당
    .split(" ") // 이름을 공백(" ")을 기준으로 분리하여 배열로 만듦
    .map((n) => n[0]) // 배열의 각 요소에서 첫 번째 문자를 추출하여 새로운 배열을 만듦
    .join(""); // 배열의 요소를 빈 문자열("")로 연결하여 하나의 문자열로 만듦 (즉, 이니셜 문자열 생성)
  const filtered = initials.replace(/[^a-zA-Z]/g, ""); // `filtered` 변수에, `initials` 문자열에서 알파벳(a-z, A-Z) 이외의 문자를 모두 제거한 문자열을 저장
  return filtered.slice(0, count).toUpperCase(); // `filtered` 문자열에서 앞에서부터 `count`만큼의 문자를 잘라내어 대문자로 변환한 후 반환
};
