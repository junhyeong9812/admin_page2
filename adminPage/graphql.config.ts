// IGraphQLConfig 타입을 가져옵니다. 이는 GraphQL 설정 파일의 타입을 정의하는 인터페이스입니다.
import type { IGraphQLConfig } from "graphql-config";

// GraphQL 설정 객체를 정의합니다. 이 객체는 GraphQL 설정 파일을 구성하는 데 사용됩니다.
const config: IGraphQLConfig = {
  // GraphQL 스키마를 정의합니다. 여기서는 외부 URL에서 GraphQL 스키마를 가져옵니다.
  schema: "https://api.crm.refine.dev/graphql",

  // 확장 기능을 정의합니다. 여기서는 코드 생성 관련 설정을 추가합니다.
  extensions: {
    codegen: {
      // 코드 생성 후 실행할 훅을 설정합니다.
      hooks: {
        // 각 파일이 생성된 후 실행할 명령어를 지정합니다.
        // 여기서는 eslint와 prettier를 사용하여 코드를 자동으로 포맷팅하고 스타일을 맞춥니다.
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },

      // 코드 생성 결과를 저장할 파일 및 관련 설정을 정의합니다.
      generates: {
        // GraphQL 스키마를 기반으로 TypeScript 타입 정의 파일을 생성합니다.
        "src/graphql/schema.types.ts": {
          // TypeScript 코드 생성 플러그인을 사용합니다.
          plugins: ["typescript"],
          config: {
            // __typename 필드를 스킵합니다. GraphQL 응답에서 타입명을 포함하지 않도록 설정합니다.
            skipTypename: true,

            // GraphQL의 enum을 TypeScript 타입으로 변환합니다.
            enumsAsTypes: true,

            // 커스텀 스칼라 타입을 정의합니다. 여기서는 DateTime을 string으로 처리합니다.
            scalars: {
              DateTime: {
                // 입력 및 출력 타입을 string으로 정의합니다.
                input: "string",
                output: "string",

                // 스칼라 타입의 형식을 date-time으로 설정합니다.
                format: "date-time",
              },
            },
          },
        },

        // GraphQL 쿼리 및 변형을 기반으로 TypeScript 타입을 생성합니다.
        "src/graphql/types.ts": {
          // 다른 파일에서 생성된 타입을 가져오도록 미리 설정된 구성입니다.
          preset: "import-types",

          // 코드 생성에 사용할 GraphQL 문서 파일들을 정의합니다. 여기서는 src 디렉토리 내 모든 ts, tsx 파일을 포함합니다.
          documents: ["src/**/*.{ts,tsx}"],

          // GraphQL 쿼리 및 변형에 대한 TypeScript 타입을 생성하는 플러그인을 사용합니다.
          plugins: ["typescript-operations"],

          config: {
            // __typename 필드를 스킵합니다. GraphQL 응답에서 타입명을 포함하지 않도록 설정합니다.
            skipTypename: true,

            // GraphQL의 enum을 TypeScript 타입으로 변환합니다.
            enumsAsTypes: true,

            // 타입을 미리 해결하지 않도록 설정합니다. GraphQL의 타입 시스템을 유지합니다.
            preResolveTypes: false,

            // 타입을 가져올 때 import 문을 사용할 수 있도록 설정합니다.
            useTypeImports: true,
          },

          // 타입 경로 설정. `schema.types.ts` 파일에서 생성된 타입을 가져옵니다.
          presetConfig: {
            typesPath: "./schema.types",
          },
        },
      },
    },
  },
};

// 설정된 GraphQL 설정 객체를 내보냅니다.
export default config;
