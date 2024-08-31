import { SaveButton, useForm } from "@refinedev/antd"; // Refine Ant Design 패키지에서 SaveButton과 useForm 훅을 import
import type { HttpError } from "@refinedev/core"; // Refine Core 패키지에서 HttpError 타입을 import
import type { GetFields, GetVariables } from "@refinedev/nestjs-query"; // Refine NestJS Query 패키지에서 GetFields와 GetVariables 타입을 import

import { CloseOutlined } from "@ant-design/icons"; // Ant Design 아이콘에서 CloseOutlined 아이콘을 import
import { Button, Card, Drawer, Form, Input, Spin } from "antd"; // Ant Design 컴포넌트들(Button, Card, Drawer, Form, Input, Spin)을 import

import type {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/graphql/types"; // GraphQL 타입 정의에서 UpdateUserMutation과 UpdateUserMutationVariables를 import
import { getNameInitials } from "@/utilities"; // 유틸리티 함수 getNameInitials를 import

import { CustomAvatar } from "../../custom-avatar"; // 커스텀 아바타 컴포넌트를 import
import { Text } from "../../text"; // 텍스트 컴포넌트를 import
import { UPDATE_USER_MUTATION } from "./queries"; // 사용자 업데이트 GraphQL Mutation 쿼리를 import

type Props = {
  opened: boolean; // Drawer가 열려있는지 여부를 나타내는 불리언 값
  setOpened: (opened: boolean) => void; // Drawer의 열림 상태를 변경하는 함수
  userId: string; // 수정할 사용자의 ID
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  const {
    saveButtonProps, // SaveButton의 속성
    formProps, // Form의 속성
    query: queryResult, // 사용자 데이터를 가져오는 쿼리의 결과
  } = useForm<
    GetFields<UpdateUserMutation>, // GraphQL Mutation에서 반환되는 필드 타입
    HttpError, // 에러 타입
    GetVariables<UpdateUserMutationVariables> // GraphQL Mutation에 사용되는 변수 타입
  >({
    mutationMode: "optimistic", // 낙관적 업데이트 모드 설정
    resource: "users", // 수정할 리소스는 "users"
    action: "edit", // 수행할 작업은 "edit"
    id: userId, // 수정할 사용자 ID
    meta: {
      gqlMutation: UPDATE_USER_MUTATION, // 사용할 GraphQL Mutation
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data || {}; // 쿼리 결과에서 avatarUrl과 name을 추출

  const closeModal = () => {
    setOpened(false); // Drawer를 닫는 함수
  };

  if (queryResult?.isLoading) {
    // 데이터 로딩 중일 때
    return (
      <Drawer
        open={opened} // Drawer가 열려 있는지 여부
        width={756} // Drawer의 너비 설정
        styles={{
          body: {
            background: "#f5f5f5", // 배경색 설정
            display: "flex", // 플렉스 박스 레이아웃
            alignItems: "center", // 수직 정렬: 중앙
            justifyContent: "center", // 수평 정렬: 중앙
          },
        }}
      >
        <Spin /> {/* 로딩 스피너 표시 */}
      </Drawer>
    );
  }

  return (
    <Drawer
      onClose={closeModal} // Drawer를 닫는 함수
      open={opened} // Drawer가 열려 있는지 여부
      width={756} // Drawer의 너비 설정
      styles={{
        body: { background: "#f5f5f5", padding: 0 }, // 바디 배경색과 패딩 설정
        header: { display: "none" }, // 헤더 숨김 처리
      }}
    >
      <div
        style={{
          display: "flex", // 플렉스 박스 레이아웃
          alignItems: "center", // 수직 정렬: 중앙
          justifyContent: "space-between", // 수평 정렬: 양 끝
          padding: "16px", // 패딩 설정
          backgroundColor: "#fff", // 배경색 설정
        }}
      >
        <Text strong>Account Settings</Text> {/* 제목 텍스트 */}
        <Button
          type="text"
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          icon={<CloseOutlined />} // 닫기 아이콘
          onClick={() => closeModal()} // 버튼 클릭 시 Drawer 닫기
        />
      </div>
      <div
        style={{
          padding: "16px", // 패딩 설정
        }}
      >
        <Card>
          <Form {...formProps} layout="vertical">
            {" "}
            {/* 수직 레이아웃으로 Form 설정 */}
            <CustomAvatar
              shape="square" // 아바타 모양: 사각형
              src={avatarUrl} // 아바타 이미지 URL
              name={getNameInitials(name || "")} // 이름의 이니셜 표시
              style={{
                width: 96, // 아바타 너비
                height: 96, // 아바타 높이
                marginBottom: "24px", // 아래쪽 마진
              }}
            />
            <Form.Item label="Name" name="name">
              {" "}
              {/* 이름 필드 */}
              <Input placeholder="Name" /> {/* 이름 입력 필드 */}
            </Form.Item>
            <Form.Item label="Email" name="email">
              {" "}
              {/* 이메일 필드 */}
              <Input placeholder="email" /> {/* 이메일 입력 필드 */}
            </Form.Item>
            <Form.Item label="Job title" name="jobTitle">
              {" "}
              {/* 직함 필드 */}
              <Input placeholder="jobTitle" /> {/* 직함 입력 필드 */}
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              {" "}
              {/* 전화번호 필드 */}
              <Input placeholder="Timezone" /> {/* 전화번호 입력 필드 */}
            </Form.Item>
          </Form>
          <SaveButton
            {...saveButtonProps} // SaveButton 속성 적용
            style={{
              display: "block", // 블록 요소로 표시
              marginLeft: "auto", // 오른쪽 정렬
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
