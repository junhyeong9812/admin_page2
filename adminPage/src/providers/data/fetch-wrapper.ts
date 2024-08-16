// GraphQLFormattedError 타입을 "graphql" 라이브러리에서 임포트합니다.
// 이 타입은 GraphQL 에러의 표준 포맷을 정의합니다.
import { GraphQLFormattedError } from "graphql";

// Error 타입을 정의합니다. 이 타입은 에러 메시지와 상태 코드를 포함합니다.
type Error = {
  message: string; // 에러 메시지를 나타내는 문자열
  statusCode: string; // 상태 코드를 나타내는 문자열
};

// customFetch 함수를 정의합니다. 이 함수는 URL과 요청 옵션을 받아 fetch 요청을 보냅니다.
const customFetch = async (url: string, options: RequestInit) => {
  // 로컬 스토리지에서 access_token을 가져옵니다.
  const accessToken = localStorage.getItem("access_token");
  // 요청 옵션에서 헤더를 가져옵니다. 기본적으로는 빈 객체를 사용합니다.
  const headers = options.headers as Record<string, string>;
  // fetch를 사용해 HTTP 요청을 보냅니다. 헤더에 Authorization과 Content-Type을 추가하고,
  // Apollo-Require-Preflight 헤더를 "true"로 설정합니다.
  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`, // 인증 토큰을 헤더에 추가
      "Content-Type": "application/json", // 요청의 콘텐츠 타입을 JSON으로 설정
      "Apollo-Require-Preflight": "true", // Apollo 서버와의 통신에서 preflight 요청을 요구
    },
  });
};

// getGraphQLErrors 함수를 정의합니다. 이 함수는 GraphQL 응답의 에러를 파싱하여 반환합니다.
const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  // 응답 body가 없으면 기본 에러를 반환합니다.
  if (!body) {
    return {
      message: "백엔드 코드 제대로 보내", // 백엔드 에러 메시지
      statusCode: "INTERNAL_SERVER_ERROR", // 상태 코드 설정
    };
  }
  // body에 "error" 키가 있는 경우, 에러 메시지를 파싱하여 반환합니다.
  if ("error" in body) {
    const errors = body?.errors; // 에러 배열을 가져옵니다.
    const messages = errors?.map((error) => error?.message)?.join(""); // 모든 에러 메시지를 하나의 문자열로 결합
    const code = errors?.[0]?.extensions?.code; // 첫 번째 에러의 확장 코드
    return {
      message: messages || JSON.stringify(errors), // 에러 메시지 반환
      statusCode: code || 500, // 에러 코드 반환 (기본값은 500)
    };
  }
  // 에러가 없는 경우 null을 반환합니다.
  return null;
};

// fetchWrapper 함수를 정의합니다. 이 함수는 customFetch를 호출하고, 응답에서 GraphQL 에러를 처리합니다.
export const fetchWrapper = async (url: string, options: RequestInit) => {
  // customFetch를 사용해 HTTP 요청을 보냅니다.
  const response = await customFetch(url, options);
  // 응답을 클론하여 두 번 사용할 수 있도록 합니다.
  const responseClone = response.clone();
  // 클론된 응답에서 JSON body를 가져옵니다.
  const body = await responseClone.json();
  // body에서 GraphQL 에러를 추출합니다.
  const error = getGraphQLErrors(body);
  // 에러가 있으면 예외를 던집니다.
  if (error) {
    throw error;
  }
  // 에러가 없으면 원래 응답을 반환합니다.
  return response;
};
