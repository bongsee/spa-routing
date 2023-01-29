import {Home, Service, About, NotFound} from "./components.js"

const navigationEl = document.getElementById('navigation');
const rootEl = document.getElementById('root');

const routes = [
  { path:'/', component : Home },
  { path:'/service', component : Service },
  { path:'/about', component : About }
]

const render = async path => {
  const _path = path ?? window.location.pathname;
  console.log(_path)

  try {
    const component = routes.find(route => route.path === _path)?.component || NotFound;
    rootEl.replaceChildren(await component());
  } catch(err) {
    console.error(err);
  }
}

navigationEl.addEventListener('click', (event) => {
  if(!event.target.matches('#navigation > li > a')) return;

  event.preventDefault();
  const path = event.target.getAttribute('href');

  // 이동할 페이지가 현재 페이지와 같다면 함수 종료
  if (window.location.pathname === path) return;

  window.history.pushState(null, null, path);
  render(path);
})

window.addEventListener('popstate', () => {
  render();
});

window.addEventListener('DOMContentLoaded', () => {
  render();
});
