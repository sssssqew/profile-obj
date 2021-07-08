import buildElement from '../lib/helpers.js';

function Nav(){
  // 이벤트 핸들러 정의
  
  // 컴포넌트 생성
  function buildComponent(){
   const navComponent = buildElement('div', {'id':'nav-component'}, [
    buildElement('button', {'class': 'nav-btns', 'data-url':'/'}, ['Home']),
    buildElement('button', {'class': 'nav-btns', 'data-url':'/about'}, ['About'])
   ]);

   document.getElementById('profile-nav').appendChild(navComponent);
  }

  // 이벤트 핸들러 연결
  function attachHandlers(){}
  
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default Nav;