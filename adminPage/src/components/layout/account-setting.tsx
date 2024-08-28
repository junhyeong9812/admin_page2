// 필요한 라이브러리 및 모듈을 import 합니다.
import { SaveButton, useForm } from "@refinedev/antd"; // SaveButton 컴포넌트와 useForm 훅을 refinedev 라이브러리에서 가져옵니다.
import type { HttpError } from "@refinedev/core"; // HTTP 오류 타입을 refinedev 코어에서 가져옵니다.
import type { GetFields, GetVariables } from "@refinedev/nestjs-query"; // GetFields와 GetVariables 타입을 refinedev의 nestjs-query에서 가져옵니다.

import { CloseOutlined } from "@ant-design/icons"; // Ant Design에서 CloseOutlined 아이콘을 가져옵니다.
import { Button, Card, Drawer, Form, Input, Spin } from "antd"; // Ant Design에서 Button, Card, Drawer, Form, Input, Spin 컴포넌트를 가져옵니다.

import type {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/graphql/types"; // GraphQL 타입 정의에서 UpdateUserMutation과 UpdateUserMutationVariables를 가져옵니다.
import { getNameInitials } from "@/utilities"; // 사용자 이름의 이니셜을 가져오는 유틸리티 함수를 가져옵니다.

import CustomAvatar from "../custom-avatar"; // 커스텀 아바타 컴포넌트를 가져옵니다.
import { Text } from "../text"; // Text 컴포넌트를 가져옵니다.
import { UPDATE_USER_MUTATION } from "./queries"; // 사용자를 업데이트하는 GraphQL Mutation 쿼리를 가져옵니다.

type Props = {
  opened: boolean; // Drawer가 열렸는지 여부를 나타내는 Boolean 값입니다.
  setOpened: (opened: boolean) => void; // Drawer의 열림 상태를 변경하는 함수입니다.
  userId: string; // 현재 편집 중인 사용자의 ID입니다.
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  // useForm 훅을 사용하여 폼의 상태와 동작을 관리합니다.
  const {
    saveButtonProps, // Save 버튼에 전달할 props입니다.
    formProps, // Form 컴포넌트에 전달할 props입니다.
    query: queryResult, // 사용자 정보를 가져오는 쿼리의 결과입니다.
  } = useForm<
    GetFields<UpdateUserMutation>, // GraphQL에서 사용자 정보를 가져오는 필드를 정의합니다.
    HttpError, // HTTP 요청 중 발생할 수 있는 오류 타입입니다.
    GetVariables<UpdateUserMutationVariables> // 사용자 업데이트 Mutation에 사용할 변수 타입을 정의합니다.
  >({
    mutationMode: "optimistic", // 낙관적 업데이트 모드로 설정합니다. (즉, 서버 응답을 기다리기 전에 UI를 업데이트합니다.)
    resource: "users", // 수정할 리소스는 "users"입니다.
    action: "edit", // 수행할 작업은 "edit"입니다.
    id: userId, // 수정할 사용자의 ID를 지정합니다.
    meta: {
      gqlMutation: UPDATE_USER_MUTATION, // 사용할 GraphQL Mutation을 지정합니다.
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {}; // 사용자 정보에서 아바타 URL과 이름을 추출합니다.

  const closeModal = () => {
    setOpened(false); // Drawer를 닫는 함수입니다.
  };

  // 사용자의 정보를 로딩 중인 경우 로딩 스피너를 표시합니다.
  if (queryResult?.isLoading) {
    return (
      <Drawer
        open={opened} // Drawer가 열렸는지 여부를 전달합니다.
        width={756} // Drawer의 너비를 756px로 설정합니다.
        styles={{
          body: {
            background: "#f5f5f5", // 배경색을 설정합니다.
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Spin /> {/* 로딩 스피너를 표시합니다. */}
      </Drawer>
    );
  }

  // 사용자가 정보를 로딩하지 않는 경우 Drawer에 폼을 표시합니다.
  return (
    <Drawer
      onClose={closeModal} // Drawer를 닫는 함수를 지정합니다.
      open={opened} // Drawer가 열렸는지 여부를 전달합니다.
      width={756} // Drawer의 너비를 756px로 설정합니다.
      styles={{
        body: { background: "#f5f5f5", padding: 0 }, // Drawer 본문의 배경색과 패딩을 설정합니다.
        header: { display: "none" }, // 헤더를 숨깁니다.
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#fff", // 배경색을 흰색으로 설정합니다.
        }}
      >
        <Text strong>Account Settings</Text>{" "}
        {/* "Account Settings"라는 제목을 굵게 표시합니다. */}
        <Button
          type="text" // 텍스트 버튼으로 설정합니다.
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          icon={<CloseOutlined />} // 닫기 아이콘을 표시합니다.
          onClick={() => closeModal()} // 버튼 클릭 시 Drawer를 닫습니다.
        />
      </div>
      <div
        style={{
          padding: "16px", // 패딩을 설정합니다.
        }}
      >
        <Card>
          {" "}
          {/* 사용자 정보를 포함하는 카드 컴포넌트입니다. */}
          <Form {...formProps} layout="vertical">
            {" "}
            {/* 수직 레이아웃으로 Form을 설정하고, formProps를 전달합니다. */}
            <CustomAvatar
              shape="square" // 아바타를 사각형 모양으로 설정합니다.
              src={avatarUrl} // 아바타 이미지 URL을 지정합니다.
              name={getNameInitials(name || "")} // 이름의 이니셜을 가져옵니다.
              style={{
                width: 96,
                height: 96,
                marginBottom: "24px", // 아래쪽 여백을 설정합니다.
              }}
            />
            <Form.Item label="Name" name="name">
              {" "}
              {/* 이름 필드입니다. */}
              <Input placeholder="Name" />{" "}
              {/* 사용자 이름을 입력할 Input 필드입니다. */}
            </Form.Item>
            <Form.Item label="Email" name="email">
              {" "}
              {/* 이메일 필드입니다. */}
              <Input placeholder="email" />{" "}
              {/* 사용자 이메일을 입력할 Input 필드입니다. */}
            </Form.Item>
            <Form.Item label="Job title" name="jobTitle">
              {" "}
              {/* 직책 필드입니다. */}
              <Input placeholder="jobTitle" />{" "}
              {/* 사용자 직책을 입력할 Input 필드입니다. */}
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              {" "}
              {/* 전화번호 필드입니다. */}
              <Input placeholder="Timezone" />{" "}
              {/* 사용자 전화번호를 입력할 Input 필드입니다. */}
            </Form.Item>
          </Form>
          <SaveButton
            {...saveButtonProps} // SaveButton에 저장 버튼의 속성을 전달합니다.
            style={{
              display: "block", // 버튼을 블록 요소로 설정합니다.
              marginLeft: "auto", // 오른쪽 끝으로 정렬합니다.
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
