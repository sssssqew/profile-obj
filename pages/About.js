import {buildElement, updateElement} from '../lib/helpers.js';
import Nav from '../components/Nav.js';

function About(){
  // 이벤트 핸들러 정의
  function hideProfileImg(event) {
    updateElement(event.target.id, {'className': 'userInfo-profile-img'});
  }
  
  // 컴포넌트 생성
  function buildComponent(){
    const userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    const aboutPage = buildElement('div', {'id': 'profile-about'}, [
      buildElement('div', {'id': 'profile-nav'}),
      buildElement('div', {'id': 'profile-contents'}, [
        buildElement('div', {'id': 'userInfo-component'}, [
          buildElement('div',{'id': 'userInfo-profile'}, [
            buildElement('img', {'id': 'userInfo-profile-img', 'className': 'userInfo-profile-img', 'src': `${(userInfoData && userInfoData.userProfileImg)? userInfoData.userProfileImg: ''}`, 'alt': ''})
          ]),
          buildElement('div', {'id': 'userInfo-container'}, [
            buildElement('div', {'id': 'userInfo-info'}, [
              buildElement('p', {'id': 'profile-name'}, [(userInfoData && userInfoData.userName)? `Name: ${userInfoData.userName}`: '']),
              buildElement('p', {'id': 'profile-age'}, [(userInfoData && userInfoData.userAge)? `Age: ${userInfoData.userAge}`: '']),
              buildElement('p', {'id': 'profile-gender'}, [(userInfoData && userInfoData.userGender)? `Gender: ${userInfoData.userGender}`: ''])
            ])
          ])
        ])
      ]),
    ]);

    updateElement('root', {}, ['']);
    updateElement('root', {}, [aboutPage]);
  }
  // 이벤트 핸들러 연결
  function attachHandlers(){
    document.getElementById('userInfo-profile-img').addEventListener("error", hideProfileImg);
  }
  // 하위 컴포넌트 생성
  function addComponents(){
    Nav();
  }

  function doSomethingAfterRendering(){
    const userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    if(userInfoData && userInfoData.userProfileImg){
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