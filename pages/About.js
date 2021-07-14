import {buildElement, updateElement, $} from '../lib/helpers.js';

import Nav from '../components/Nav.js';
import UserInfo from '../components/UserInfo.js';

function About(){
  
  // 컴포넌트 생성
  function buildComponent(){
    const aboutPage = buildElement('div', {'id': 'profile-about'}, [
      buildElement('div', {'id': 'profile-nav'}),
      buildElement('div', {'id': 'profile-contents'})
    ]);

    updateElement('root', {}, ['']);
    updateElement('root', {}, [aboutPage]);
  }
  // 이벤트 핸들러 연결
  function attachHandlers(){}

  // 하위 컴포넌트 생성
  function addComponents(){
    Nav();
    UserInfo();
  }

  function doSomethingAfterRendering(){
    const userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    if($(userInfoData).userProfileImg){
      updateElement('userInfo-profile-img', {'className': 'userInfo-profile-img show-profileImg'}); // 프로필 사진 보여주기
    } 
  }

  function init(){
    buildComponent();
    attachHandlers();
    addComponents();
    doSomethingAfterRendering();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default About;