import {buildElement, updateElement, $, searchElement} from '../lib/helpers.js';
import router from '../lib/router.js';

function UserInfo(){
  // 이벤트 핸들러 정의
  function hideProfileImg(event) {
    updateElement(event.target.id, {'className': 'userInfo-profile-img'});
  }
  
  // 컴포넌트 생성
  function buildComponent(){
    const userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    const userInfoComponent = buildElement('div', {'id': 'userInfo-component'}, [
      buildElement('div',{'id': 'userInfo-profile'}, [
        buildElement('img', {'id': 'userInfo-profile-img', 'className': 'userInfo-profile-img', 'src': `${$(userInfoData).userProfileImg? userInfoData.userProfileImg: ''}`, 'alt': ''})
      ]),
      buildElement('div', {'id': 'userInfo-container'}, [
        buildElement('div', {'id': 'userInfo-info'}, [
          buildElement('p', {'id': 'profile-name'}, [$(userInfoData).userName? `Name: ${userInfoData.userName}`: '']),
          buildElement('p', {'id': 'profile-age'}, [$(userInfoData).userAge? `Age: ${userInfoData.userAge}`: '']),
          buildElement('p', {'id': 'profile-gender'}, [$(userInfoData).userGender? `Gender: ${userInfoData.userGender}`: ''])
        ])
      ])
    ])

    updateElement('profile-contents', {}, [userInfoComponent]);
  }

  // 이벤트 핸들러 연결
  function attachHandlers(){
    searchElement('userInfo-profile-img').addEventListener("error", hideProfileImg);
  }
  
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default UserInfo;