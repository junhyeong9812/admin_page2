import { AuthBindings } from "@refinedev/core"; // AuthBindings 타입을 refinedev 라이브러리에서 임포트합니다.
// import type { User } from "@/graphql/schema.types"; // GraphQL 스키마에서 정의된 User 타입을 임포트합니다.
import { API_URL, dataProvider } from "./data"; // API URL과 데이터 프로바이더를 임포트합니다.

// 인증에 사용할 기본 자격 증명 (데모용 이메일 및 비밀번호) 설정
export const authCredentials = {
  email: "michael.scott@dundermifflin.com", // 데모 이메일
  password: "demodemo", // 데모 비밀번호
};

// refinedev의 인증 바인딩을 구현하는 authProvider 객체를 정의합니다.
export const authProvider: AuthBindings = {
  // 로그인 함수: 사용자가 로그인할 때 호출됩니다.
  login: async ({ email }) => {
    try {
      // GraphQL 요청을 통해 사용자 인증을 수행합니다.
      const { data } = await dataProvider.custom({
        url: API_URL, // API URL을 사용하여 요청을 보냅니다.
        method: "post", // POST 메서드를 사용하여 요청을 보냅니다.
        headers: {}, // 기본적으로 헤더는 비어 있습니다.
        meta: {
          variables: { email }, // GraphQL 쿼리에 사용할 변수를 설정합니다.
          rawQuery: `
                    mutation Login($email:String!){
                        login(loginInput:{email:$email}){
                        accessToken
                        }
                    }
                    `, // GraphQL 변이(mutation) 쿼리로 로그인 요청을 보냅니다.
        },
      });
      localStorage.setItem("access_token", data.login.accessToken); // 받은 액세스 토큰을 로컬 스토리지에 저장합니다.
      return {
        success: true, // 로그인 성공 시 반환
        redirectTo: "/", // 로그인 후 리다이렉션할 URL
      };
    } catch (e) {
      // 에러 처리
      const error = e as Error;
      return {
        success: false, // 로그인 실패 시 반환
        error: {
          message: "message" in error ? error.message : "login failed", // 에러 메시지 설정
          name: "name" in error ? error.name : "Invalid email or Password", // 에러 이름 설정
        },
      };
    }
  },
  // 로그아웃 함수: 사용자가 로그아웃할 때 호출됩니다.
  logout: async () => {
    localStorage.removeItem("access_token"); // 로컬 스토리지에서 액세스 토큰을 제거합니다.
    return {
      success: true, // 로그아웃 성공 시 반환
      redirectTo: "/login", // 로그아웃 후 리다이렉션할 URL
    };
  },
  // 에러가 발생했을 때 호출되는 함수
  onError: async (error) => {
    if (error.statusCode === "UNAUTHENTICATED") {
      // 인증되지 않은 상태라면 로그아웃을 트리거합니다.
      return {
        logout: true, // 로그아웃 플래그 설정
        ...error, // 원래 에러를 반환
      };
    }
    return { error }; // 다른 에러는 그대로 반환
  },
  // 사용자 인증 상태를 확인하는 함수
  check: async () => {
    try {
      // GraphQL 쿼리를 사용해 사용자가 인증된 상태인지 확인합니다.
      await dataProvider.custom({
        url: API_URL, // API URL을 사용하여 요청을 보냅니다.
        method: "post", // POST 메서드를 사용하여 요청을 보냅니다.
        headers: {}, // 기본적으로 헤더는 비어 있습니다.
        meta: {
          rawQuery: `
                    query Me {
                        me {
                            name
                            }
                    }
                `, // 사용자 정보를 가져오는 GraphQL 쿼리
        },
      });
      return {
        authenticated: true, // 인증 성공 시 반환
        redirectTo: "/", // 인증 후 리다이렉션할 URL
      };
    } catch (error) {
      // 인증 실패 시
      return {
        authenticated: false, // 인증 실패 시 반환
        redirectTo: "/login", // 인증 실패 후 리다이렉션할 URL
      };
    }
  },
  // 사용자 정보를 가져오는 함수
  getIdentity: async () => {
    const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 액세스 토큰을 가져옵니다.
    try {
      // GraphQL 쿼리를 사용해 사용자 정보를 가져옵니다.
      const { data } = await dataProvider.custom<{ me: any }>({
        url: API_URL, // API URL을 사용하여 요청을 보냅니다.
        method: "post", // POST 메서드를 사용하여 요청을 보냅니다.
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`, // 액세스 토큰이 있으면 인증 헤더에 추가합니다.
            }
          : {}, // 없으면 빈 헤더를 사용합니다.
        meta: {
          rawQuery: `
                        query Me {
                            me {
                                id,
                                name,
                                email,
                                phone,
                                jobTitle,
                                timezone
                                avatarUrl
                            }
                          }
                    `, // 사용자 정보를 가져오는 GraphQL 쿼리
        },
      });

      return data.me; // 사용자 정보를 반환합니다.
    } catch (error) {
      return undefined; // 에러가 발생하면 undefined를 반환합니다.
    }
  },
};

//이런 프로바이더의 이점
// 통합된 인증 관리:

// authProvider를 통해 로그인, 로그아웃, 인증 상태 확인, 사용자 정보 가져오기 등 인증 관련 로직이 하나의 객체로 통합되어 관리됩니다. 이는 인증과 관련된 모든 작업이 일관된 방식으로 처리될 수 있게 해줍니다.
// 유연한 에러 처리:

// 각 함수에서 에러를 개별적으로 처리하고, onError 함수에서 글로벌 에러 처리가 가능하게 구성되었습니다. 이를 통해 인증 과정에서 발생할 수 있는 다양한 에러 상황에 유연하게 대응할 수 있습니다.
// GraphQL과의 매끄러운 통합:

// GraphQL 쿼리와 변이를 사용하여 서버와 통신하며, 사용자 인증 정보를 관리합니다. 이를 통해 클라이언트와 서버 간의 데이터 통신이 효율적으로 이루어집니다.
// 보안 강화:

// 로그인 시 발급된 accessToken을 로컬 스토리지에 저장하고, 이후 요청 시 이를 인증 헤더에 포함시켜 보안을 강화했습니다. 또한, 인증 토큰이 만료되거나 유효하지 않은 경우, onError에서 이를 감지하여 로그아웃 처리할 수 있습니다.
// 코드 재사용성 및 유지보수성:

// authProvider를 통해 다양한 인증 작업이 통합되어, 코드의 재사용성이 높아지고, 인증 관련 로직이 변경될 때 하나의 객체만 수정하면 되므로 유지보수가 용이합니다.
// 사용자 경험 향상:

// 로그인 후 자동 리다이렉트, 로그아웃 후 리다이렉트, 인증 상태에 따라 페이지 접근 제어 등이 가능해져 사용자 경험을 향상시킬 수 있습니다.
// 이러한 이점들은 전체 애플리케이션의 보안, 유지보수성, 유연성을 향상시킵니다. 특히, GraphQL을 사용하는 환경에서 클라이언트와 서버 간의 데이터 통신을 효율적이고 안전하게 관리할 수 있습니다.
