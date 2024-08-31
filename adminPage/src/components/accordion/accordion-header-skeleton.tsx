// AccordionHeaderSkeleton 컴포넌트는 아코디언 헤더 부분에 대한 로딩 상태를 표시하기 위한 스켈레톤 UI를 렌더링합니다.
import { Skeleton } from "antd";

export const AccordionHeaderSkeleton = () => {
  return (
    <div
      style={{
        display: "flex", // 내부 요소들을 가로로 배치
        alignItems: "center", // 요소들을 수직 방향으로 중앙 정렬
        gap: "8px", // 요소들 간의 간격을 8px로 설정
        padding: "12px 24px", // 상하 12px, 좌우 24px의 패딩 설정
        borderBottom: "1px solid #d9d9d9", // 하단에 1px 두께의 회색(border color) 선 설정
      }}
    >
      <Skeleton.Avatar size="small" shape="square" /> // 작은 사이즈의 정사각형 아바타 스켈레톤을 렌더링
      <Skeleton.Input size="small" block style={{ height: "22px" }} /> // 작은 사이즈의 스켈레톤 입력 필드를 높이 22px로 설정하여 렌더링
    </div>
  );
};