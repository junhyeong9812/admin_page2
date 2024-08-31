import { Text } from "@/components"; // Text 컴포넌트를 import
import { AccordionHeaderSkeleton } from "./accordion-header-skeleton"; // AccordionHeaderSkeleton 컴포넌트를 import

type Props = React.PropsWithChildren<{
  accordionKey: string; // 아코디언 항목의 고유 키
  activeKey?: string; // 현재 활성화된 아코디언의 키 (선택적)
  setActive: (key?: string) => void; // 아코디언을 활성화하거나 비활성화하는 함수
  fallback: string | React.ReactNode; // 아코디언이 비활성화되었을 때 렌더링될 컴포넌트 또는 문자열
  isLoading?: boolean; // 로딩 상태를 나타내는 불리언 값 (선택적)
  icon: React.ReactNode; // 아코디언 헤더에 표시될 아이콘
  label: string; // 아코디언 헤더에 표시될 텍스트 라벨
}>;

/**
 * 이 컴포넌트는 아코디언 기능을 제공하는 컴포넌트입니다.
 * activeKey가 accordionKey와 동일하면 자식 컴포넌트를 렌더링하고, 그렇지 않으면 fallback을 렌더링합니다.
 * isLoading이 true일 경우, <AccordionHeaderSkeleton /> 컴포넌트를 렌더링합니다.
 * 아코디언이 클릭되면, setActive가 accordionKey를 인수로 호출됩니다.
 */
export const Accordion = ({
  accordionKey,
  activeKey,
  setActive,
  fallback,
  icon,
  label,
  children,
  isLoading,
}: Props) => {
  if (isLoading) {
    return <AccordionHeaderSkeleton />; // 로딩 중일 때, 스켈레톤 UI를 렌더링
  }

  const isActive = activeKey === accordionKey; // 현재 아코디언이 활성화된 상태인지 확인

  const toggleAccordion = () => {
    if (isActive) {
      setActive(undefined); // 활성화된 상태라면, 아코디언을 비활성화
    } else {
      setActive(accordionKey); // 비활성화된 상태라면, 아코디언을 활성화
    }
  };

  return (
    <div
      style={{
        display: "flex", // 내부 요소들을 가로로 배치
        padding: "12px 24px", // 상하 12px, 좌우 24px의 패딩 설정
        gap: "12px", // 요소들 간의 간격을 12px로 설정
        alignItems: "start", // 요소들을 수직 방향으로 시작점 정렬
        borderBottom: "1px solid #d9d9d9", // 하단에 1px 두께의 회색(border color) 선 설정
      }}
    >
      <div style={{ marginTop: "1px", flexShrink: 0 }}>{icon}</div>{" "}
      {/* 아이콘을 표시하며, 크기를 줄이지 않음 */}
      {isActive ? ( // 아코디언이 활성화된 경우
        <div
          style={{
            display: "flex", // 자식 요소들을 세로로 배치
            flexDirection: "column", // 세로 방향 정렬
            gap: "12px", // 요소들 간의 간격을 12px로 설정
            flex: 1, // 남은 공간을 모두 차지
          }}
        >
          <Text strong onClick={toggleAccordion} style={{ cursor: "pointer" }}>
            {label} {/* 라벨 텍스트를 굵게 표시하며 클릭할 수 있게 설정 */}
          </Text>
          {children} {/* 아코디언이 열렸을 때 자식 요소들 렌더링 */}
        </div>
      ) : (
        <div onClick={toggleAccordion} style={{ cursor: "pointer", flex: 1 }}>
          {fallback} {/* 아코디언이 닫혔을 때 fallback 요소 렌더링 */}
        </div>
      )}
    </div>
  );
};
