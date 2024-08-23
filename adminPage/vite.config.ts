// Vite에서 React를 사용하기 위한 플러그인을 가져옵니다.
// @vitejs/plugin-react는 Vite에서 React를 사용할 수 있도록 도와주는 플러그인입니다.
import react from "@vitejs/plugin-react";

// Vite의 설정을 정의하기 위해 defineConfig 함수를 가져옵니다.
// defineConfig는 Vite 설정 파일을 더 나은 타입 지원과 IDE 자동 완성을 제공하는 방식으로 작성할 수 있도록 도와줍니다.
import { defineConfig } from "vite";

// tsconfigPaths 플러그인을 가져옵니다.
// vite-tsconfig-paths는 tsconfig.json 파일에 정의된 경로 별칭을 Vite 프로젝트에서 사용할 수 있도록 해주는 플러그인입니다.
import tsconfigPaths from "vite-tsconfig-paths";

// Vite의 설정을 export합니다.
// defineConfig 함수 안에서 Vite 설정을 정의합니다.
export default defineConfig({
  // plugins 배열에 Vite에서 사용할 플러그인들을 나열합니다.
  plugins: [
    // tsconfigPaths 플러그인을 추가합니다.
    // 이 플러그인은 tsconfig.json에서 설정된 경로 별칭(alias)을 Vite에서 인식하고 사용할 수 있게 해줍니다.
    tsconfigPaths(),

    // React 플러그인을 추가합니다.
    // 이 플러그인은 Vite에서 React 파일(.jsx, .tsx 등)을 처리하고 번들링할 수 있도록 해줍니다.
    react(),
  ],
});
//설명
// 요약:
// @vitejs/plugin-react: Vite에서 React를 사용할 수 있게 해주는 플러그인입니다. 이 플러그인을 통해 Vite가 React 코드를 올바르게 해석하고 처리할 수 있습니다.
// vite-tsconfig-paths: TypeScript의 tsconfig.json 파일에서 정의한 경로 별칭을 Vite 프로젝트에서 사용할 수 있게 해주는 플러그인입니다. 예를 들어, import 경로를 절대 경로로 쉽게 작성할 수 있습니다.
// defineConfig: Vite 설정을 정의하는 함수로, 설정을 타입 안전하게 작성할 수 있게 도와줍니다.
// 이 설정 파일은 Vite 프로젝트에서 React와 TypeScript를 함께 사용할 때 필요한 기본 설정을 정의합니다.
