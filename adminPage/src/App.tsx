import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp, ConfigProvider } from "antd";

import { Layout } from "@/components";
import { resources } from "@/config/resources";
import { authProvider, dataProvider, liveProvider } from "@/providers";
import {
  CompanyCreatePage,
  CompanyEditPage,
  CompanyListPage,
  DashboardPage,
  LoginPage,
  TasksCreatePage,
  TasksEditPage,
  TasksListPage,
} from "@/routes";

import "@refinedev/antd/dist/reset.css";
function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
                useNewQueryKeys: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<DashboardPage />} />

                  <Route
                    path="/tasks"
                    element={
                      <TasksListPage>
                        <Outlet />
                      </TasksListPage>
                    }
                  >
                    <Route path="new" element={<TasksCreatePage />} />
                    <Route path="edit/:id" element={<TasksEditPage />} />
                  </Route>

                  <Route path="/companies">
                    <Route index element={<CompanyListPage />} />
                    <Route path="new" element={<CompanyCreatePage />} />
                    <Route path="edit/:id" element={<CompanyEditPage />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-auth"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource resource="dashboard" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;

// 주요 컴포넌트 및 기능
// 1. GitHubBanner
// 기능: GitHubBanner는 화면 상단에 GitHub 레포지토리로 연결되는 배너를 표시합니다. 이는 개발 중에 프로젝트에 쉽게 접근할 수 있도록 도와줍니다.
// 역할: 프로젝트의 소스 코드가 GitHub에 호스팅되어 있을 때, 이 배너를 통해 사용자 또는 개발자가 GitHub 저장소로 바로 이동할 수 있게 해줍니다. 주로 데모 프로젝트나 오픈소스 프로젝트에서 사용됩니다.
// 2. Refine
// 기능: Refine는 RefineDev의 핵심 컴포넌트로, Refine 애플리케이션의 전체적인 설정을 담당합니다. 이 컴포넌트를 통해 데이터 제공자, 인증 제공자, 라우터 제공자 등 다양한 프로바이더를 설정할 수 있습니다.
// 역할: Refine 애플리케이션의 루트 컴포넌트로 사용되며, 모든 Refine 관련 설정과 상태 관리가 이 컴포넌트에서 이루어집니다. 이 컴포넌트에 dataProvider, authProvider, routerProvider 등의 필수적인 기능들을 전달하여 애플리케이션의 동작 방식을 정의합니다.
// 3. WelcomePage
// 기능: WelcomePage는 RefineDev에서 제공하는 기본 환영 페이지입니다. 새로운 프로젝트에서 기본적으로 제공되며, 애플리케이션의 첫 화면으로 사용될 수 있습니다.
// 역할: 초기 프로젝트 설정이 완료된 후 사용자가 처음 접하게 되는 페이지로, Refine의 기본 기능을 소개하거나, 사용자가 다른 페이지로 이동할 수 있는 네비게이션 역할을 합니다.
// 4. DevtoolsProvider & DevtoolsPanel
// 기능: DevtoolsProvider와 DevtoolsPanel은 개발 도구로, 애플리케이션의 상태, 쿼리, 데이터 흐름 등을 실시간으로 모니터링할 수 있는 패널을 제공합니다.
// 역할: 개발 중에 애플리케이션의 내부 상태를 쉽게 추적하고, 디버깅하며, 성능을 최적화하는 데 도움을 줍니다. 특히, 데이터 흐름을 시각적으로 확인하고, 쿼리 성능이나 에러를 모니터링할 수 있습니다.
// 5. RefineKbar & RefineKbarProvider
// 기능: RefineKbar는 애플리케이션에 커맨드 팔레트를 추가해주는 컴포넌트입니다. RefineKbarProvider는 이 커맨드 팔레트와 관련된 상태와 로직을 관리합니다.
// 역할: 사용자는 키보드 단축키(예: Cmd/Ctrl + K)를 통해 커맨드 팔레트를 열어 빠르게 애플리케이션 내에서 탐색하거나 작업을 수행할 수 있습니다. 개발 생산성을 높이고, 사용자가 애플리케이션 내의 여러 기능을 쉽게 탐색할 수 있도록 돕습니다.
// 6. useNotificationProvider
// 기능: useNotificationProvider는 Ant Design(antd)에서 제공하는 알림 시스템을 Refine 애플리케이션에서 사용할 수 있도록 하는 훅입니다.
// 역할: Refine에서 발생하는 다양한 알림(예: 성공, 실패, 경고 메시지)을 쉽게 관리하고 표시할 수 있습니다. 예를 들어, 데이터를 성공적으로 저장하거나 API 호출에 실패했을 때 사용자에게 알림을 표시하는 데 사용됩니다.
// 7. routerBindings
// 기능: routerBindings는 RefineDev에서 제공하는 라우터와 React Router v6을 연결하는 역할을 합니다. 이를 통해 Refine에서 정의한 라우트 설정을 React Router와 통합하여 사용할 수 있습니다.
// 역할: React Router의 모든 기능을 Refine 애플리케이션에서 사용할 수 있게 하며, 페이지 전환이나 동적 라우팅 등의 기능을 관리합니다.
// 8. DocumentTitleHandler
// 기능: DocumentTitleHandler는 브라우저 탭의 제목(문서 제목)을 동적으로 설정해주는 컴포넌트입니다.
// 역할: 페이지 전환 시마다 해당 페이지에 맞는 브라우저 탭 제목을 설정해줍니다. 이는 사용자 경험을 향상시키며, SEO(검색 엔진 최적화)에도 도움이 됩니다.
// 9. UnsavedChangesNotifier
// 기능: UnsavedChangesNotifier는 사용자가 페이지를 벗어나기 전에 저장되지 않은 변경 사항이 있을 경우 경고를 표시하는 컴포넌트입니다.
// 역할: 사용자가 실수로 저장되지 않은 데이터를 잃지 않도록 보호하며, 페이지를 떠나기 전에 변경 사항을 저장할 기회를 줍니다.
// 10. AntdApp
// 기능: AntdApp은 Ant Design의 전역 설정을 관리하는 컴포넌트입니다. Ant Design은 React 애플리케이션에서 사용하는 UI 라이브러리로, 다양한 컴포넌트와 스타일링 옵션을 제공합니다.
// 역할: Ant Design 컴포넌트들을 전체적으로 감싸서, 테마 설정이나 글로벌 스타일을 적용할 수 있게 합니다.
// 11. BrowserRouter, Route, Routes (from react-router-dom)
// 기능: 이들은 React Router에서 제공하는 라우팅 컴포넌트로, 애플리케이션의 클라이언트 측 라우팅을 관리합니다.
// 역할:
// BrowserRouter: 애플리케이션의 라우팅을 HTML5의 History API를 사용하여 관리하는 컴포넌트입니다.
// Route: 특정 경로에 대해 렌더링할 컴포넌트를 정의합니다.
// Routes: 여러 Route를 감싸서 라우팅 구조를 정의합니다.
// 요약
// 이 코드 구조에서는 RefineDev의 다양한 기능을 사용하여 모던한 CRUD 애플리케이션을 쉽게 개발할 수 있습니다. 각 컴포넌트는 특정한 역할을 담당하며, 이러한 컴포넌트를 결합하여 데이터 제공, 인증, 라우팅, 상태 관리, 알림, 개발 도구 등 다양한 기능을 통합적으로 관리할 수 있습니다. RefineDev를 사용하면 복잡한 애플리케이션 개발이 훨씬 간편해지고, 유지보수도 수월해집니다.

{
  /* <Route

element={
  <Authenticated
    key="authenticated-layout"
    fallback={<CatchAllNavigate to="/login" />}
  />
}
>
<Layout>
  <Outlet />
</Layout>
</Route>
위 구조를 통해 아래와 같은 이점을 가질 수 있다.
<Route> 내부에 <Layout> 컴포넌트를 넣고, 그 위에 Authenticated 컴포넌트를 사용하여 라우트를 구성하면 다음과 같은 효과를 기대할 수 있습니다:

1. 인증된 사용자만 접근 가능:
Authenticated 컴포넌트는 사용자 인증 여부를 확인합니다. 만약 사용자가 인증되지 않았다면, fallback 속성에 지정된 컴포넌트(CatchAllNavigate to="/login")가 실행되어 사용자를 로그인 페이지로 리다이렉트합니다.
이로 인해, <Layout> 내의 모든 경로에 대해 인증된 사용자만 접근할 수 있습니다. 이는 민감한 데이터를 보호하고, 인증된 사용자만 특정 페이지나 기능에 접근할 수 있도록 하는 중요한 보안 메커니즘입니다.
2. 일관된 레이아웃 제공:
<Layout> 컴포넌트를 통해 인증된 사용자가 접근할 수 있는 모든 페이지에 대해 일관된 레이아웃을 제공합니다. 예를 들어, 공통된 헤더, 사이드바, 푸터 등을 포함할 수 있습니다.
모든 자식 경로(Outlet으로 표현된 부분)는 동일한 레이아웃을 공유하게 됩니다. 이렇게 하면 애플리케이션의 페이지 구조가 일관되고, 사용자 경험이 향상됩니다.
3. 라우팅 구조 관리:
이 구조는 리액트 라우터의 Outlet을 사용하여 중첩된 라우트를 관리할 수 있게 해줍니다. 즉, <Layout> 내에 여러 자식 라우트를 정의할 수 있으며, 이 자식 라우트들은 모두 동일한 레이아웃을 사용하게 됩니다.
예를 들어, /dashboard, /profile 등의 경로를 <Layout> 내부에서 정의하면, 이 경로들은 모두 동일한 레이아웃 내에서 렌더링되며, 각 페이지 간의 전환이 부드럽고 일관된 UI를 유지할 수 있습니다.
4. 유연한 페이지 구성:
<Layout> 컴포넌트는 쉽게 확장 가능하며, 사용자가 페이지를 방문할 때마다 기본적으로 적용되는 공통 요소를 설정할 수 있습니다. 예를 들어, 공통적으로 필요한 로직(예: 데이터 페칭, 알림 처리, 접근 권한 확인 등)을 레이아웃 컴포넌트에 포함시킬 수 있습니다.
5. 페이지 보호 및 가시성 관리:
인증이 필요하지 않은 페이지는 <Layout> 밖에서 정의할 수 있고, 인증이 필요한 페이지는 이 <Route> 구조 안에 두어 관리할 수 있습니다. 이렇게 하면 인증이 필요한 페이지와 그렇지 않은 페이지를 명확히 구분하여 관리할 수 있습니다.
요약:
보안성 강화: 인증된 사용자만 특정 레이아웃 및 그에 속한 페이지에 접근할 수 있습니다.
일관된 사용자 경험: 공통된 레이아웃을 적용하여 애플리케이션 전반에 걸쳐 일관된 UI를 제공할 수 있습니다.
중첩 라우트 지원: 다양한 페이지를 구조화하여 중첩 라우트와 관련된 로직을 깔끔하게 관리할 수 있습니다.
이러한 구조를 사용하면, 인증이 필요한 모든 페이지에서 일관된 사용자 경험을 제공하면서, 동시에 보안도 강화할 수 있습니다. */
}
