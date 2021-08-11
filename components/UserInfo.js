import {buildElement, updateElement, $, searchElement} from '../lib/helpers.js';
import router from '../lib/router.js';

function UserInfo(){
  // 이벤트 핸들러 정의
  /**
   * Handle to hide profile image when error occures
   * @param {Object} event - user event
   */
  function hideProfileImg(event) {
    updateElement(event.target.id, {'className': 'userInfo-profile-img'});
  }
  
  // 컴포넌트 생성
  /**
   * Build specific component */
  function buildComponent(){
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const userInfoComponent = buildElement('div', {'id': 'userInfo-component'}, [
      buildElement('div',{'id': 'userInfo-profile'}, [
        buildElement('img', {'id': 'userInfo-profile-img', 'className': 'userInfo-profile-img', 'src': `${$(userInfo).url? userInfo.url: ''}`, 'alt': ''})
      ]),
      buildElement('div', {'id': 'userInfo-container'}, [
        buildElement('div', {'id': 'userInfo-info'}, [
          buildElement('p', {'id': 'profile-name'}, [$(userInfo).userName? `Name: ${userInfo.userName}`: '']),
          buildElement('p', {'id': 'profile-age'}, [$(userInfo).userAge? `Age: ${userInfo.userAge}`: '']),
          buildElement('p', {'id': 'profile-gender'}, [$(userInfo).userGender? `Gender: ${userInfo.userGender}`: ''])
        ])
      ])
    ])

    updateElement('profile-contents', {}, [userInfoComponent]);
  }

  // 이벤트 핸들러 연결
  /**
   * Attach event handlers related to specific component
   */
  function attachHandlers(){
    searchElement('userInfo-profile-img').addEventListener("error", hideProfileImg);
  }
  /**
   * initialize component when rendering on browser
   */
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default UserInfo;