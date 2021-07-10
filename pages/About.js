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
        buildElement('div', {'id': 'userInfo-component'}, [
          buildElement('div',{'id': 'userInfo-profile'}, [
            buildElement('img', {'class': 'userInfo-profile-img', 'src': `${(userInfoData && userInfoData.userProfileImg)? userInfoData.userProfileImg: ''}`, 'alt': ''})
          ]),
          buildElement('div', {'id': 'userInfo-info'}, [
            buildElement('p', {'id': 'profile-name'}, [(userInfoData && userInfoData.userName)? userInfoData.userName: '']),
            buildElement('p', {'id': 'profile-age'}, [(userInfoData && userInfoData.userAge)? userInfoData.userAge: '']),
            buildElement('p', {'id': 'profile-gender'}, [(userInfoData && userInfoData.userGender)? userInfoData.userGender: ''])
          ])
        ])
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