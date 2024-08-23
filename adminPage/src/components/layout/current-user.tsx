// Ant Design에서 Popover와 Button 컴포넌트를 가져옵니다.
// Popover: 사용자가 특정 요소를 클릭하거나 마우스를 올리면 추가 정보를 제공하는 작은 오버레이를 표시하는 컴포넌트입니다.
// Button: 클릭 가능한 버튼을 생성하는 컴포넌트입니다. (현재 이 코드에서는 사용되지 않았습니다.)
import { Popover, Button } from "antd";
import CustomAvatar from "../custom-avatar";
import { useGetIdentity } from "@refinedev/core";

import type { User } from "@/graphql/schema.types";
//위의 @경로 설정을 vite.config.ts에서 tsconfigPath를 임포트 해줘야한다.
//

// CurrentUser 컴포넌트를 정의합니다.
// 이 컴포넌트는 Popover를 사용하여 클릭 시 오버레이를 표시합니다.
const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();
  //auth.ts에 getIdentity함수를 통해 가져온다.

  return (
    <>
      {/* Popover 컴포넌트를 사용하여 트리거 요소를 생성합니다. 
          placement: Popover의 위치를 설정합니다. 여기서는 'bottomRight'로 설정하여 Popover가 트리거 요소의 오른쪽 아래에 나타납니다.
          trigger: Popover를 활성화하는 이벤트를 설정합니다. 여기서는 'click'으로 설정하여 클릭 시 Popover가 나타납니다.
          overlayInnerStyle: Popover 오버레이의 내부 스타일을 설정합니다. 여기서는 padding을 0으로 설정하여 Popover 내부에 여백이 없도록 합니다.
          overlayStyle: Popover 오버레이의 외부 스타일을 설정합니다. 여기서는 zIndex를 999로 설정하여 Popover가 다른 요소 위에 표시되도록 합니다.
       */}
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        {/* Popover의 트리거 요소로 사용되는 텍스트입니다. 
            클릭 가능한 컴포넌트 요소를 넣으면 된다
            여기서는 사용자 아이콘이 들어간다. */}
        <CustomAvatar />
      </Popover>
    </>
  );
};

// CurrentUser 컴포넌트를 기본 내보내기로 내보냅니다.
export default CurrentUser;
