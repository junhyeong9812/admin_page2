import React from "react"; // React 라이브러리 import

import { useGetIdentity } from "@refinedev/core"; // Refine Core에서 useGetIdentity 훅을 import

import { SettingOutlined } from "@ant-design/icons"; // Ant Design에서 SettingOutlined 아이콘을 import
import { Button, Popover } from "antd"; // Ant Design의 Button과 Popover 컴포넌트 import

import type { User } from "@/graphql/schema.types"; // GraphQL 스키마에서 User 타입을 import

import { CustomAvatar } from "../../custom-avatar"; // 커스텀 아바타 컴포넌트를 import
import { Text } from "../../text"; // 텍스트 컴포넌트를 import
import { AccountSettings } from "../account-settings"; // AccountSettings 컴포넌트를 import

export const CurrentUser = () => {
  const [opened, setOpened] = React.useState(false); // AccountSettings Drawer의 열림 상태를 관리하는 상태 훅
  const { data: user } = useGetIdentity<User>(); // 현재 사용자 정보를 가져오는 useGetIdentity 훅

  const content = (
    <div
      style={{
        display: "flex", // 내부 요소들을 플렉스 박스로 배치
        flexDirection: "column", // 세로 방향으로 정렬
      }}
    >
      <Text
        strong
        style={{
          padding: "12px 20px", // 텍스트에 패딩 적용
        }}
      >
        {user?.name} {/* 사용자의 이름을 굵게 표시 */}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9", // 상단에 회색 선을 추가
          padding: "4px", // 내부 패딩 설정
          display: "flex", // 내부 요소들을 플렉스 박스로 배치
          flexDirection: "column", // 세로 방향으로 정렬
          gap: "4px", // 요소들 간의 간격 설정
        }}
      >
        <Button
          style={{ textAlign: "left" }} // 텍스트를 왼쪽으로 정렬
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          icon={<SettingOutlined />} // 설정 아이콘 추가
          type="text" // 버튼 타입을 텍스트로 설정
          block // 버튼을 블록 요소로 설정하여 전체 너비를 차지
          onClick={() => setOpened(true)} // 클릭 시 Drawer를 열도록 설정
        >
          Account settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight" // Popover의 위치를 오른쪽 아래로 설정
        content={content} // Popover의 내용으로 content를 설정
        trigger="click" // 클릭 시 Popover가 열리도록 설정
        overlayInnerStyle={{ padding: 0 }} // Popover 내부의 패딩 제거
        overlayStyle={{ zIndex: 999 }} // Popover의 z-index 설정
      >
        <CustomAvatar
          name={user?.name} // 사용자의 이름을 전달하여 이니셜 표시
          src={user?.avatarUrl} // 사용자의 아바타 URL 전달
          size="default" // 아바타 크기를 기본값으로 설정
          style={{ cursor: "pointer" }} // 커서를 포인터로 설정
        />
      </Popover>
      {user && (
        <AccountSettings
          opened={opened} // AccountSettings Drawer의 열림 상태 전달
          setOpened={setOpened} // Drawer 열림 상태를 설정하는 함수 전달
          userId={user.id} // 사용자의 ID 전달
        />
      )}
    </>
  );
};
