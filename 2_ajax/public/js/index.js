import { Home, Service, About, NotFound} from './components.js'

const navigationEl = document.getElementById('navigation');
const rootEl = document.getElementById('root');

const routes = [
  {path:'/', component: Home},
  {path:'/service', component: Service},
  {path:'/about', component: About}
]

async function render(path) {
  try{
    // path에 맞는 컴포넌트 반환
    const component = routes.find((route) => route.path === path)?.component ?? NotFound;
    // 만들어진 컴포넌트를 html root요소에 삽입
    rootEl.replaceChildren(await component());
  } catch(error) {
    console.error(error);
  }
}

navigationEl.addEventListener('click', (event) => {
  if(!event.target.matches('#navigation > li > a')) return;
  event.preventDefault();

  const path = event.target.getAttribute('href');
  render(path)
})

window.addEventListener('DOMContentLoaded', () => render('/'));