//인덱스 파일 레이아웃 설정
import { ThemedLayoutV2 } from "@refinedev/antd";
import React, { Children } from "react";
import header from "./header";

const Layout = ({ children }: React.PropsWithChildren) => {
  return <ThemedLayoutV2 Header={header}>{children}</ThemedLayoutV2>;
};

export default Layout;
