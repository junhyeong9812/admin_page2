// Ant Design에서 Popover와 Button 컴포넌트를 가져옵니다.
// Popover: 사용자가 특정 요소를 클릭하거나 마우스를 올리면 추가 정보를 제공하는 작은 오버레이를 표시하는 컴포넌트입니다.
// Button: 클릭 가능한 버튼을 생성하는 컴포넌트입니다.
import { Popover, Button } from "antd";
import CustomAvatar from "../custom-avatar"; // 사용자 아바타를 표시하는 커스텀 컴포넌트를 가져옵니다.
import { useGetIdentity } from "@refinedev/core"; // 현재 인증된 사용자의 정보를 가져오는 훅을 가져옵니다.
import * as Icons from "@ant-design/icons"; // Ant Design의 모든 아이콘을 가져옵니다.
const { SettingOutlined } = Icons; // 설정 아이콘을 별도로 가져옵니다.
import type { User } from "@/graphql/schema.types"; // GraphQL에서 정의된 User 타입을 가져옵니다.
import { Text } from "../text"; // 텍스트 컴포넌트를 가져옵니다.
import { useState } from "react"; // 리액트의 useState 훅을 가져옵니다.
import { AccountSettings } from "./account-setting"; // AccountSettings 컴포넌트를 가져옵니다.

// @경로 설정을 vite.config.ts에서 tsconfigPath를 임포트 해줘야 한다는 주석입니다.

// CurrentUser 컴포넌트를 정의합니다.
// 이 컴포넌트는 Popover를 사용하여 클릭 시 오버레이를 표시합니다.
const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false); // AccountSettings 창의 열림 상태를 관리하는 상태 훅입니다.
  const { data: user } = useGetIdentity<User>(); // 현재 사용자의 정보를 가져오는 훅입니다.
  // getIdentity 함수는 auth.ts에서 정의되어 있으며, 인증된 사용자의 정보를 가져옵니다.

  // Popover에 표시될 내용을 정의하는 JSX입니다.
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // 세로 방향으로 정렬합니다.
      }}
    >
      {/* 사용자의 이름을 굵게 표시합니다. */}
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9", // 상단에 구분선을 추가합니다.
          padding: "4px", // 내부 패딩을 설정합니다.
          display: "flex",
          flexDirection: "column", // 세로 방향으로 정렬합니다.
          gap: "4px", // 아이템 간 간격을 설정합니다.
        }}
      >
        {/* 계정 설정 버튼을 정의합니다. 
            버튼을 클릭하면 AccountSettings 창이 열립니다. */}
        <Button
          style={{ textAlign: "left" }} // 텍스트를 왼쪽으로 정렬합니다.
          icon={
            <SettingOutlined
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          } // 설정 아이콘을 버튼에 표시합니다.
          type="text" // 텍스트 버튼으로 설정합니다.
          block // 버튼을 블록 요소로 만들어 전체 너비를 차지하게 합니다.
          onClick={() => setIsOpen(true)} // 버튼 클릭 시 AccountSettings 창을 엽니다.
        >
          Account Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Popover 컴포넌트를 사용하여 트리거 요소를 생성합니다. 
          placement: Popover의 위치를 설정합니다. 여기서는 'bottomRight'로 설정하여 Popover가 트리거 요소의 오른쪽 아래에 나타납니다.
          trigger: Popover를 활성화하는 이벤트를 설정합니다. 여기서는 'click'으로 설정하여 클릭 시 Popover가 나타납니다.
          overlayInnerStyle: Popover 오버레이의 내부 스타일을 설정합니다. 여기서는 padding을 0으로 설정하여 Popover 내부에 여백이 없도록 합니다.
          overlayStyle: Popover 오버레이의 외부 스타일을 설정합니다. 여기서는 zIndex를 999로 설정하여 Popover가 다른 요소 위에 표시되도록 합니다.
       */}
      <Popover
        placement="bottomRight" // Popover가 화면에 나타나는 위치를 설정합니다.
        trigger="click" // 클릭 시 Popover가 나타나도록 설정합니다.
        overlayInnerStyle={{ padding: 0 }} // Popover 내부의 패딩을 없앱니다.
        overlayStyle={{ zIndex: 999 }} // Popover가 다른 요소들 위에 표시되도록 zIndex를 설정합니다.
        content={content} // Popover에 표시될 내용을 지정합니다.
      >
        {/* Popover의 트리거 요소로 사용되는 CustomAvatar 컴포넌트입니다. 
            사용자 아바타가 클릭 가능한 요소로 표시됩니다. */}
        <CustomAvatar
          name={user?.name} // 사용자의 이름을 기반으로 아바타를 표시합니다.
          src={user?.avatarUrl} // 사용자의 아바타 이미지를 설정합니다.
          size="default" // 아바타의 크기를 기본값으로 설정합니다.
          style={{ cursor: "pointer" }} // 마우스 커서를 포인터로 변경하여 클릭 가능성을 나타냅니다.
        />
      </Popover>
      {user && (
        <AccountSettings
          opened={isOpen} // AccountSettings 컴포넌트의 열림 상태를 제어합니다.
          setOpened={setIsOpen} // AccountSettings 컴포넌트의 열림 상태를 변경하는 함수를 전달합니다.
          userId={user.id} // 현재 사용자의 ID를 전달하여 계정 설정을 로드합니다.
        />
      )}
      {/* AccountSettings 컴포넌트가 조건부로 렌더링됩니다. */}
    </>
  );
};

// CurrentUser 컴포넌트를 기본 내보내기로 내보냅니다.
export default CurrentUser;
