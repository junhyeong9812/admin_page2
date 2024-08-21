// GraphQLClient 클래스를 "@refinedev/nestjs-query" 라이브러리에서 임포트합니다.
// 이 클래스는 GraphQL API와 쉽게 통신할 수 있도록 도와줍니다.
import graphqlDataProvider, {
  GraphQLClient, // GraphQL API와 통신하는 클라이언트 클래스
  liveProvider as graphqlLiveProvider, // 실시간 데이터를 제공하는 프로바이더
} from "@refinedev/nestjs-query";

// fetchWrapper 함수를 현재 디렉토리의 fetch-wrapper 모듈에서 임포트합니다.
// 이 함수는 fetch 요청을 커스터마이즈하고 에러를 처리합니다.
import { fetchWrapper } from "./fetch-wrapper";

// 실시간 GraphQL 구독을 위한 웹소켓 클라이언트를 생성하는 createClient 함수를 임포트합니다.
import { createClient } from "graphql-ws";

// API의 기본 URL을 정의합니다. 다른 요청에서 참조할 수 있습니다.
export const API_BASE_URL = "https://api.crm.refine.dev"; // 백엔드 API의 기본 URL

// API 요청을 보낼 백엔드 서버의 URL을 정의합니다.
// 이 URL은 GraphQL API가 호스팅된 서버를 가리킵니다.
export const API_URL = `${API_BASE_URL}/graphql`;
//이경로가 실제 경로가 됨
("https://api.crm.refine.dev"); // GraphQL API 서버의 HTTP URL

// WebSocket을 통한 GraphQL 구독을 위한 URL을 정의합니다.
export const WS_URL = "wss://api.crm.refine.dev/graphql"; // 실시간 WebSocket URL

// GraphQL 클라이언트를 생성합니다.
// 이 클라이언트는 API_URL을 통해 백엔드 서버와 통신합니다.
// fetch 옵션은 HTTP 요청을 처리할 방식을 지정하는데,
// 요청 중 발생할 수 있는 에러를 처리하기 위해 fetchWrapper 함수가 사용됩니다.
export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      // fetchWrapper 함수로 HTTP 요청을 감싸고 에러 처리를 합니다.
      return fetchWrapper(url, options); // fetchWrapper로 요청을 처리하고 에러를 관리합니다.
    } catch (error) {
      // 만약 에러가 발생하면 Promise.reject를 통해 에러를 리젝트합니다.
      return Promise.reject(error as Error); // 에러가 발생하면 Promise를 리젝트합니다.
    }
  },
});

// WebSocket 클라이언트를 생성합니다.
// 클라이언트는 브라우저 환경에서만 생성되며, 이를 통해 실시간 GraphQL 구독을 설정합니다.
export const wsClient =
  typeof window != "undefined" // window 객체가 존재하는지 확인 (브라우저 환경 확인)
    ? createClient({
        url: WS_URL, // WebSocket 연결을 위한 URL
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 액세스 토큰을 가져옵니다.
          return {
            headers: {
              Authorization: `Bearer #{accessToken}`, // 액세스 토큰을 사용해 인증 헤더를 설정합니다.
            },
          };
        },
      })
    : undefined; // 서버 환경에서는 wsClient를 생성하지 않습니다.

// GraphQL 데이터 프로바이더를 생성합니다.
// 이 프로바이더는 GraphQL 클라이언트를 사용하여 데이터를 가져오고 조작할 수 있도록 합니다.
export const dataProvider = graphqlDataProvider(client);

// WebSocket 클라이언트를 통해 실시간 데이터 프로바이더를 생성합니다.
// 실시간 데이터를 사용할 수 없는 환경에서는 undefined를 반환합니다.
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient) // WebSocket을 사용한 실시간 데이터 프로바이더
  : undefined; // WebSocket 클라이언트가 없으면 실시간 프로바이더도 undefined로 설정됩니다.

//코드 이점
//   1. 효율적인 GraphQL 통신
// GraphQLClient 사용: 이 클라이언트는 GraphQL API와의 통신을 간편하게 만듭니다. 기본적으로 GraphQL 쿼리, 변이(mutation), 서브스크립션(subscriptions)을 쉽게 실행할 수 있는 인터페이스를 제공합니다. 이는 복잡한 HTTP 요청을 직접 작성하지 않고도 데이터를 쉽게 관리하고 조작할 수 있게 합니다.
// 2. 에러 처리 개선
// fetchWrapper 사용: fetchWrapper를 통해 모든 HTTP 요청에 대해 일관된 에러 처리와 요청 전후 처리 로직을 적용할 수 있습니다. 이는 요청 실패 시 일관된 에러 메시지를 받을 수 있고, 필요에 따라 추가적인 로직(예: 로깅, 재시도 등)을 쉽게 구현할 수 있습니다.
// 3. 실시간 데이터 처리
// WebSocket을 통한 실시간 데이터 처리: wsClient와 graphqlLiveProvider를 통해 실시간 데이터 갱신이 가능합니다. 이 기능은 특히 실시간으로 업데이트되어야 하는 데이터(예: 채팅 애플리케이션, 실시간 모니터링 시스템 등)에 매우 유용합니다. 데이터가 변경될 때마다 클라이언트는 이를 즉시 반영할 수 있습니다.
// 4. 확장성과 재사용성
// 데이터 및 라이브 프로바이더: dataProvider와 liveProvider는 GraphQL 클라이언트를 감싸서 데이터 처리 및 실시간 기능을 제공합니다. 이러한 프로바이더는 애플리케이션의 다른 부분에서 쉽게 재사용할 수 있으며, 필요에 따라 다른 API로 교체하거나 기능을 확장하기도 쉽습니다.
// 5. 유연한 인증 처리
// 동적 인증 헤더 설정: wsClient를 생성할 때 connectionParams를 통해 동적으로 인증 헤더를 설정할 수 있습니다. 이를 통해 사용자가 로그인했을 때 얻은 토큰을 사용하여 GraphQL API에 인증된 요청을 쉽게 보낼 수 있습니다. 이 접근 방식은 보안성을 높이고, 다양한 인증 메커니즘을 지원하는 데 유리합니다.
// 6. 일관된 API와 관리
// API 통합 관리: 이 코드 구조는 API URL과 클라이언트를 한 곳에서 관리하여, API 통신에 필요한 설정을 일관되게 관리할 수 있습니다. 이를 통해 유지보수가 용이해지고, 설정 변경 시 일관되게 반영할 수 있습니다.
// 7. 서버와 클라이언트 환경 지원
// 브라우저 환경 검증: wsClient를 생성할 때, 브라우저 환경에서만 WebSocket 클라이언트를 생성하도록 설계되었습니다. 이는 서버 사이드 렌더링(SSR) 환경에서도 코드를 쉽게 사용할 수 있게 합니다.
// 기대 효과
// 향상된 사용자 경험: 실시간 데이터 갱신을 통해 사용자는 최신 데이터를 지속적으로 확인할 수 있습니다.
// 개발 생산성 향상: GraphQL과의 통신을 손쉽게 설정할 수 있어 개발자의 생산성이 향상됩니다.
// 유지보수 용이성: 통합된 설정 관리 및 일관된 에러 처리로 유지보수 시 코드의 안정성과 가독성이 높아집니다.
// 보안 강화: 동적 인증 설정을 통해 보안성을 강화할 수 있습니다.
// 이러한 이점들은 복잡한 웹 애플리케이션에서 특히 유용하며, 효율적이고 확장 가능한 데이터 관리를 가능하게 합니다.
