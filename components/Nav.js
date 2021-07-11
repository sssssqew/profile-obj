import {buildElement, updateElement} from '../lib/helpers.js';
import router from '../lib/router.js';

function Nav(){
  // 이벤트 핸들러 정의
  function handleNavigation(event){ // 이벤트 위임
    const url = event.target.dataset.url;
    if(url) router(url);
  }
  
  // 컴포넌트 생성
  function buildComponent(){
   const navComponent = buildElement('div', {'id':'nav-component'}, [
    buildElement('button', {'className': 'nav-btns', 'data-url':'/'}, ['Home']),
    buildElement('button', {'className': 'nav-btns', 'data-url':'/about'}, ['About'])
   ]);

   updateElement('profile-nav', {}, [navComponent]);
  }

  // 이벤트 핸들러 연결
  function attachHandlers(){
    document.getElementById('nav-component').addEventListener('click', handleNavigation);
  }
  
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default Nav;