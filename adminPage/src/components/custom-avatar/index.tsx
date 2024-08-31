import React from "react"; // React 라이브러리 import

import type { AvatarProps } from "antd"; // Ant Design의 AvatarProps 타입을 import
import { Avatar as AntdAvatar } from "antd"; // Ant Design의 Avatar 컴포넌트를 AntdAvatar로 import

import { getNameInitials, getRandomColorFromString } from "@/utilities"; // 유틸리티 함수 getNameInitials와 getRandomColorFromString을 import

type Props = AvatarProps & {
  name?: string; // 선택적 name 프로퍼티, 문자열 타입
};

const CustomAvatarComponent = ({ name = "", style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name} // 아바타의 대체 텍스트로 name을 설정
      size="small" // 아바타의 크기를 small로 설정
      style={{
        backgroundColor: rest?.src // src가 있으면 투명 배경, 없으면 name에 기반한 랜덤 색상
          ? "transparent"
          : getRandomColorFromString(name),
        display: "flex", // 아바타 내용물을 플렉스 박스로 배치
        alignItems: "center", // 내용물을 수직 방향으로 중앙 정렬
        border: "none", // 테두리 제거
        ...style, // 추가적으로 전달된 스타일을 병합
      }}
      {...rest} // 나머지 AvatarProps 속성들을 전달
    >
      {getNameInitials(name)} {/* 이름의 이니셜을 표시 */}
    </AntdAvatar>
  );
};

export const CustomAvatar = React.memo(
  CustomAvatarComponent,
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name && prevProps.src === nextProps.src;
    // name과 src가 동일하면 컴포넌트를 리렌더링하지 않음 (성능 최적화)
  }
);
