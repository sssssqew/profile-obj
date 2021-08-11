import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement, $} from '../lib/helpers.js';
import router from '../lib/router.js';
import imgData from './imgData.js';

const test1 = 'should hide profile img of userInfo on error';

// img 태그의 src에 유효하지 않은 값을 주면 error가 발생한다
// error 발생 이후 클래스 이름이 변경되어야 한다
function userInfoComponentTest(){
  test(test1, () => {
    let userInfoData = {userName: 'testName', userAge: '3', userGender: 'female', userProfileImg: imgData};
    sessionStorage.setItem('userInfoData', JSON.stringify(userInfoData))
    userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    
    // ui 생성
    const userInfoComponent = buildElement('div', {'id': 'userInfo-component'}, [
      buildElement('div',{'id': 'userInfo-profile'}, [
        buildElement('img', {'id': 'userInfo-profile-img', 'className': 'userInfo-profile-img userInfo-show-profileImg','src': `${$(userInfoData).userProfileImg? userInfoData.userProfileImg: ''}`, 'alt': ''})
      ]),
      buildElement('div', {'id': 'userInfo-container'}, [
        buildElement('div', {'id': 'userInfo-info'}, [
          buildElement('p', {'id': 'profile-name'}, [$(userInfoData).userName? `Name: ${userInfoData.userName}`: '']),
          buildElement('p', {'id': 'profile-age'}, [$(userInfoData).userAge? `Age: ${userInfoData.userAge}`: '']),
          buildElement('p', {'id': 'profile-gender'}, [$(userInfoData).userGender? `Gender: ${userInfoData.userGender}`: ''])
        ])
      ])
    ])
    // ui 렌더링
    document.body.appendChild(userInfoComponent)

    // 이벤트핸들러 정의
    function hideProfileImg(event) {
      updateElement(event.target.id, {'className': 'userInfo-profile-img'});
    }

    searchElement('userInfo-profile-img').addEventListener("error", hideProfileImg);
    
    const event = new Event('error');
    searchElement('userInfo-profile-img').dispatchEvent(event)

    // 결과값 비교
    assert(readElementProp('userInfo-profile-img', 'className') === 'userInfo-profile-img', 'hid profile img of userInfo on error successfully !' ,'failed to hide profile img of userInfo on error !');
    // dom 해제
    document.body.removeChild(userInfoComponent)
    sessionStorage.clear()
    console.log('\n')
  })
}

export default userInfoComponentTest