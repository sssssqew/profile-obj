import buildElement from '../lib/helpers.js';

import Nav from '../components/Nav.js';

function About(){
  // 이벤트 핸들러 정의
  
  
  // 컴포넌트 생성
  function buildComponent(){
    const userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    const aboutPage = buildElement('div', {'id': 'profile-about'}, [
      buildElement('div', {'id': 'profile-nav'}),
      buildElement('div', {'id': 'profile-contents'}, [
        buildElement('p', {'id': 'profile-name'}, [userInfoData? userInfoData.userName: 'No name']),
        buildElement('p', {'id': 'profile-age'}, [userInfoData? userInfoData.userAge: 'No age']),
        buildElement('p', {'id': 'profile-gender'}, [userInfoData? userInfoData.userGender: 'No gender'])
      ]),
    ]);
    const rootEl = document.getElementById('root');
    rootEl.innerHTML = '';
    rootEl.appendChild(aboutPage);
  }
  // 이벤트 핸들러 연결
  function attachHandlers(){
  
  }
  // 하위 컴포넌트 생성
  function addComponents(){
    Nav();
  }

  function init(){
    buildComponent();
    attachHandlers();
    addComponents();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default About;