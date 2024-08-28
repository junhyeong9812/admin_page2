// 유틸리티 함수와 Ant Design 컴포넌트를 가져옵니다.
import { getNameInitials } from "@/utilities"; // 사용자의 이름에서 이니셜을 추출하는 유틸리티 함수입니다.
import { Avatar as AntdAvatar, AvatarProps } from "antd"; // Ant Design의 Avatar 컴포넌트와 그에 대한 속성 타입을 가져옵니다.

// Props 타입을 정의합니다.
// 이 타입은 Ant Design의 AvatarProps를 확장하고, 선택적으로 'name' 속성을 추가합니다.
type Props = AvatarProps & {
  name?: string; // 선택적인 name 속성입니다.
};

// CustomAvatar 컴포넌트를 정의합니다.
// 이 컴포넌트는 사용자의 이니셜을 표시하는 아바타를 생성합니다.
const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name} // 아바타의 alt 속성으로 이름을 설정합니다.
      size={"small"} // 아바타의 크기를 small로 설정합니다.
      style={{
        backgroundColor: "#87d068", // 아바타의 배경색을 설정합니다.
        display: "flex", // 아바타 내부의 요소를 플렉스 박스로 설정합니다.
        alignItems: "center", // 아바타 내부 요소를 수직으로 가운데 정렬합니다.
        border: "none", // 아바타의 테두리를 제거합니다.
        ...style, // 추가적인 스타일이 전달되면 덮어씁니다.
      }}
      {...rest} // 나머지 props를 AntdAvatar에 전달합니다.
    >
      {getNameInitials(name || "")}{" "}
      {/* 이름의 이니셜을 표시합니다. name이 없으면 빈 문자열로 처리합니다. */}
    </AntdAvatar>
  );
};

// CustomAvatar 컴포넌트를 기본 내보내기로 내보냅니다.
export default CustomAvatar;
