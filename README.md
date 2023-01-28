# SPA와 Routing

- 본 Repo는 이웅모님의 웹사이트 poiemaweb의 포스팅 [SPA & Routing](https://poiemaweb.com/js-spa)에 100% 의존하고 있습니다.
- 김상헌 멘토님의 추천으로 해당 포스팅을 접했고, 포스팅에 소개되어있는 소스코드가 인상 깊어서 백지부터 소스코드를 짜보며 SPA와 Routing에 대한 이해를 높히고자 함에 그 목적이 있습니다.
- [SPA & Routing](https://poiemaweb.com/js-spa) 포스팅의 내용을 키워드 중심으로 나열하여 다시 봤을 때 효과적으로 상기시킬 수 있도록 합니다.

## SPA란 ?

### 기존 link tag를 통한 화면 전환 방식의 단점

- 새로운 페이지 요청 시마다 정적 리소스 다운로드
- 전체 페이지를 리렌더링 : 새로고침 현상

### SPA의 장점

- ajax를 통한 트래픽 감소

  - 웹 애플리케이션에 필요한 모든 정적 리소스를 최초 접근 시 단 한번 다운로드
  - 이후 ajax 통신을 통해 변경된 부분만 갱신

- 사용자 경험(UX) 향상

  - 새로고침 현상 제거

### SPA의 단점(trade-off)

- 초기 구동 속도가 느리다.
- SEO(검색 엔진 최적화) 이슈

  - SPA방식에서 사용되는 CSR(Client Side Rendering)
  - CSR방식은 일반적으로 데이터 패치 요청을 통해 서버로부터 데이터를 응답받아 뷰를 동적으로 생성.
  - 이 때 브라우저 주소창의 URL이 변경되지 않고 이는 곧, 브라우저의 History를 관리할 수 없음을 의미한다.

## Routing 이란 ?

- Routing

  - 라우팅이란, 출발지에서 목적지까지의 경로를 설정하는 기능
  - 애플리케이션에서의 라우팅은 User가 Task를 수행하기 위해 어떤 화면(View)에서 다른 화면으로 화면을 전환하는 내비게이션 관리를 위한 기능을 의미.
  - 일반적으로 라우팅은 사용자가 요청한 URL 또는 이벤트를 해석하고 새로운 페이지로 전환하기 위해 필요한 데이터를 서버에 요청하고 페이지를 전환하는 일련의 행위를 말함.

- 브라우저에서 화면을 전환하는 경우

  - 브라우저의 주소창에 URL을 입력
  - 웹페이지의 링크(a 태그)를 클릭
  - 브라우저의 뒤로가기 또는 앞으로가기 버튼을 클릭(사용자 방문기록 - history 기반)
    - history 관리를 위해서는 각 페이지는 구별할 수 있는 고유한 URL을 소유해야한다.

## SPA와 Rounting

- 살펴볼 케이스는 총 4가지이다.

  - 전통적 링크 방식 (link)
  - ajax
  - ajax + hash
  - ajax + pushState(pjax)

- 각각의 소스코드를 해석해보고, 각 방식이 가지는 trade-off를 알아보자.

### link

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SPA-Router - Link</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/service.html">Service</a></li>
        <li><a href="/about.html">About</a></li>
      </ul>
    </nav>
    <section>
      <h1>Home</h1>
      <p>This is main page</p>
    </section>
  </body>
</html>
```

- a tag의 href 속성값인 리소스 경로가 `URL의 path에 추가`되고 해당 리소스를 `서버에 요청`한다.
- 서버는 리소스를 클라이언트에 응답(`서버 사이드 렌더링(SSR)`).
- 브라우저는 서버가 응답한 html을 렌더링하게 되므로 `새로고침`이 발생.

<img src="https://poiemaweb.com/img/traditional-webpage-lifecycle.png" width="400" />

- 각 페이지마다 고유의 URL이 존재하므로 `history 관리 및 SEO 대응에 아무런 문제가 없다`.
- 하지만 요청마다 `중복된 리소스를 응답`받아야 하며 전체 페이지를 다시 렌더링하는 과정에서 `새로고침이 발생`

### ajax

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SPA-Router - ajax</title>
    <link rel="stylesheet" href="css/style.css" />
    <script type="module" src="js/index.js"></script>
  </head>

  <body>
    <nav>
      <ul id="navigation">
        <!-- a href 속성값으로 서버 측에서 미리 정의한(약속된) endpoint를 사용한다. -->
        <li><a href="/">Home</a></li>
        <li><a href="/service">Service</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
    <div id="root">Loading...</div>
  </body>
</html>
```

- ajax 방식은 내비게이션 `클릭 이벤트를 캐치`하고 사전에 `서버로의 요청을 방지`한다.
- 후에 href 속성값으로 명시된 path를 추출하여 `ajax 요청`을 실시한다.

```javascript
import { Home, Service, About, NotFound } from "./components.js";

const navigationEl = document.getElementById("navigation");
const rootEl = document.getElementById("root");

const routes = [
  { path: "/", component: Home },
  { path: "/service", component: Service },
  { path: "/about", component: About },
];

async function render(path) {
  // path에 맞는 컴포넌트 반환
  const component =
    routes.find((route) => route.path === path)?.component ?? NotFound;
  // 만들어진 컴포넌트를 html root요소에 삽입
  rootEl.replaceChildren(await component());
}

// ajax 요청은 주소창의 url을 변경시키지 않으므로 history 관리가 되지 않는다.
navigationEl.addEventListener("click", (event) => {
  if (!event.target.matches("#navigation > li > a")) return;
  event.preventDefault();

  const path = event.target.getAttribute("href");
  render(path);
});

// 주소창의 url이 변경되지 않기 때문에 새로고침 시 현재 렌더링된 페이지가 아닌 루트 페이지가 요청된다.
window.addEventListener("DOMContentLoaded", () => render("/"));
```

```javascript
// components.js
const createElement = (domString) => {
  const tplEl = document.createElement("template");
  tplEl.innerHTML = domString;
  return tplEl.content;
};

const fetchData = async (url) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

// 컴포넌트 반환 함수
export const Home = async () => {
  const { title, content } = await fetchData("/api/home");
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};
export const Service = async () => {
  const { title, content } = await fetchData("/api/service");
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};
export const About = async () => {
  const { title, content } = await fetchData("/api/about");
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
};
export const NotFound = async () => createElement(`<h1>404 Not Found</h1>`);
```

- ajax 요청은 주소창의 `URL을 변경시키지 않는다`.
- 브라우저의 뒤로가기, 앞으로가기 등의 `history 관리`가 동작하지 않음을 의미. 따라서 history.back(), history.go(n) 등도 동작하지 않는다.
- 주소창의 URL이 변경되지 않기 때문에 새로고침을 해도 `언제나 첫 페이지`가 다시 로딩된다.
- 동일한 하나의 URL로 동작하는 ajax 방식은 `SEO 이슈`에서도 자유로울 수 없다.
