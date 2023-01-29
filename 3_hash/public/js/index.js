import {Home, Service, About, NotFound} from "./components.js"

const rootEl = document.getElementById('root');

const routes = [
  { path:'', component : Home },
  { path:'service', component : Service },
  { path:'about', component : About }
]

const render = async () => {
  try {
    const hash = window.location.hash.replace('#', '');
    const component = routes.find(route => route.path === hash)?.component ?? NotFound;
    rootEl.replaceChildren(await component());
  } catch(err) {
    console.error(err);
  }
}

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', render);