const createElement = domString => {
  const tplEl = document.createElement('template');
  tplEl.innerHTML = domString;
  return tplEl.content;
}

const fetchData = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json
}

// 컴포넌트 변환 함수
const Home = () => {
  const data = fetchData('api/home');
  const { title, content } = data;
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
}
const Service = () => {
  const data = fetchData('api/service');
  const { title, content } = data;
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
}
const About = () => {
  const data = fetchData('api/about');
  const { title, content } = data;
  return createElement(`<h1>${title}</h1><p>${content}</p>`);
}

const NotFound = () => createElement(`<h1>404 Not Found</h1>`);