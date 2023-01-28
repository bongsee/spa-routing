// html 생성 함수
const createElement = domString => {
  const tplEl = document.createElement('template');
  tplEl.innerHTML = domString;
  return tplEl.content;
}

// fetch 함수
const fetchData = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

// 컴포넌트 반환 함수
export const Home = async () => {
  const { title, content } = await fetchData('/api/home');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
}
export const Service = async () => {
  const { title, content } = await fetchData('/api/service');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
}
export const About = async () => {
  const { title, content } = await fetchData('/api/about');
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
}
export const NotFound = async () => createElement(`<h1>404 Not Found</h1>`);