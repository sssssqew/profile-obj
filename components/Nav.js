import buildElement from '../lib/helpers.js';

function Nav(){
  // 이벤트 핸들러 정의
  
  // 컴포넌트 생성
  function buildComponent(){
   const homeNavBtn = buildElement('button', {'class': 'nav-btns', 'data-url':'/'});
   homeNavBtn.innerText = 'Home';
   const aboutNavBtn = buildElement('button', {'class': 'nav-btns', 'data-url':'/about'});
   aboutNavBtn.innerText = 'About';
   const navComponent = buildElement('div', {'id':'nav-component'});
   navComponent.appendChild(homeNavBtn);
   navComponent.appendChild(aboutNavBtn);

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