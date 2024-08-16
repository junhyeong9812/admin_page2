// GraphQLClient 클래스를 "@refinedev/nestjs-query" 라이브러리에서 임포트합니다.
// 이 클래스는 GraphQL API와 쉽게 통신할 수 있도록 도와줍니다.
import { GraphQLClient } from "@refinedev/nestjs-query";
// fetchWrapper 함수를 현재 디렉토리의 fetch-wrapper 모듈에서 임포트합니다.
// 이 함수는 fetch 요청을 커스터마이즈하고 에러를 처리합니다.
import { fetchWrapper } from "./fetch-wrapper";

// API 요청을 보낼 백엔드 서버의 URL을 정의합니다.
// 이 URL은 GraphQL API가 호스팅된 서버를 가리킵니다.
export const API_URL = "https://api.crm.refine.dev";

// GraphQL 클라이언트를 생성합니다.
// 이 클라이언트는 API_URL을 통해 백엔드 서버와 통신합니다.
// fetch 옵션은 HTTP 요청을 처리할 방식을 지정하는데,
// 요청 중 발생할 수 있는 에러를 처리하기 위해 fetchWrapper 함수가 사용됩니다.
export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      // fetchWrapper 함수로 HTTP 요청을 감싸고 에러 처리를 합니다.
      return fetchWrapper(url, options);
    } catch (error) {
      // 만약 에러가 발생하면 Promise.reject를 통해 에러를 리젝트합니다.
      return Promise.reject(error as Error);
    }
  },
});
// API_URL: GraphQL 요청을 보낼 백엔드 서버의 주소입니다. 이 주소는 백엔드 서버를 지정하는 프록시와 유사한 역할을 합니다.
// client: GraphQL 클라이언트를 설정하여 지정된 백엔드 서버와 통신할 수 있도록 합니다. 요청을 보낼 때 fetchWrapper를 사용해 에러를 처리합니다.
