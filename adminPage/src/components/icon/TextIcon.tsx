import Icon from "@ant-design/icons"; // Ant Design의 Icon 컴포넌트를 import
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon"; // Ant Design Icon의 커스텀 아이콘 컴포넌트의 타입을 import

// SVG 요소를 정의하여 TextIconSvg 컴포넌트를 생성
export const TextIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg" // SVG의 XML 네임스페이스를 지정
    width="12" // SVG의 너비를 12px로 설정
    height="12" // SVG의 높이를 12px로 설정
    viewBox="0 0 12 12" // SVG의 뷰포트 설정
    fill="none" // 초기 채우기 색상을 없앰
  >
    <path
      d="M1.3125 2.25C1.26094 2.25 1.21875 2.29219 1.21875 2.34375V3C1.21875 3.05156 1.26094 3.09375 1.3125 3.09375H10.6875C10.7391 3.09375 10.7812 3.05156 10.7812 3V2.34375C10.7812 2.29219 10.7391 2.25 10.6875 2.25H1.3125Z"
      fill="black" // 경로를 검정색으로 채움
      fillOpacity="0.65" // 채우기 불투명도를 0.65로 설정
    />
    <path
      d="M1.3125 5.57812C1.26094 5.57812 1.21875 5.62031 1.21875 5.67188V6.32812C1.21875 6.37969 1.26094 6.42188 1.3125 6.42188H10.6875C10.7391 6.42188 10.7812 6.37969 10.7812 6.32812V5.67188C10.7812 5.62031 10.7391 5.57812 10.6875 5.57812H1.3125Z"
      fill="black" // 경로를 검정색으로 채움
      fillOpacity="0.65" // 채우기 불투명도를 0.65로 설정
    />
    <path
      d="M1.3125 8.90625C1.26094 8.90625 1.21875 8.94844 1.21875 9V9.65625C1.21875 9.70781 1.26094 9.75 1.3125 9.75H7.6875C7.73906 9.75 7.78125 9.70781 7.78125 9.65625V9C7.78125 8.94844 7.73906 8.90625 7.6875 8.90625H1.3125Z"
      fill="black" // 경로를 검정색으로 채움
      fillOpacity="0.65" // 채우기 불투명도를 0.65로 설정
    />
  </svg>
);

// TextIcon 컴포넌트를 정의하고, CustomIconComponentProps를 부분적으로 수용
export const TextIcon = (props: Partial<CustomIconComponentProps>) => (
  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
  <Icon component={TextIconSvg} {...props} /> // TextIconSvg를 Icon 컴포넌트로 렌더링하며 props를 전달
);
