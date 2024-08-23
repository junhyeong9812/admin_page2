// "@refinedev/antd" 패키지에서 ThemedLayoutV2와 ThemedTitleV2 컴포넌트를 가져옵니다.
// ThemedLayoutV2: Refine 프레임워크에서 제공하는 레이아웃 컴포넌트로, 다양한 테마와 함께 사용할 수 있습니다.
// ThemedTitleV2: 제목을 표시하는 컴포넌트로, 레이아웃에 맞춘 테마를 제공합니다.
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";

// React와 Children 유틸리티를 React 패키지에서 가져옵니다.
// React: 리액트 라이브러리의 기본 기능을 사용하기 위해 가져옵니다.
// Children: React.Children 유틸리티로, 자식 요소를 다루기 위한 도구를 제공합니다.
import React, { Children } from "react";

// 커스텀 헤더 컴포넌트를 가져옵니다. 이 파일에서 정의한 헤더 컴포넌트로 보입니다.
import header from "./header";

// Layout 컴포넌트를 정의합니다.
// 이 컴포넌트는 ThemedLayoutV2를 사용하여 전체 레이아웃을 설정하고,
// children 요소를 받아 레이아웃의 컨텐츠 부분에 렌더링합니다.
const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    // ThemedLayoutV2 컴포넌트를 사용하여 레이아웃을 설정합니다.
    // Header: 레이아웃의 상단에 표시될 헤더 컴포넌트를 지정합니다. 여기서는 "header" 파일에서 가져온 커스텀 헤더를 사용합니다.
    // Title: 레이아웃의 타이틀을 지정합니다. ThemedTitleV2 컴포넌트를 사용하여 타이틀을 렌더링하며, "Refine"이라는 텍스트를 타이틀로 설정합니다.
    <ThemedLayoutV2
      Header={header}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine" />}
    >
      {/* Layout 컴포넌트가 받는 자식 요소를 레이아웃의 컨텐츠 부분에 렌더링합니다. */}
      {children}
    </ThemedLayoutV2>
  );
};

// Layout 컴포넌트를 기본 내보내기로 내보냅니다.
export default Layout;
