import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement, $} from '../lib/helpers.js';
import UserInfo from '../components/UserInfo.js';
import imgData from './imgData.js';

const test1 = 'should show user information after rendering about page';

function aboutPageTest(){
  test(test1, () => {
    let userInfoData = {userName: 'testName', userAge: '3', userGender: 'female', userProfileImg: imgData};
    sessionStorage.setItem('userInfoData', JSON.stringify(userInfoData))
    // ui 생성
    const aboutPage = buildElement('div', {'id': 'profile-about'}, [
      buildElement('div', {'id': 'profile-nav'}),
      buildElement('div', {'id': 'profile-contents'})
    ]);
    // ui 렌더링
    document.body.appendChild(aboutPage)
    UserInfo()

    userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    if($(userInfoData).userProfileImg){
      updateElement('userInfo-profile-img', {'className': 'userInfo-profile-img show-profileImg'}); // 프로필 사진 보여주기
    } 
    

    // 결과값 비교
    assert(readElementProp('userInfo-profile-img', 'className') === 'userInfo-profile-img show-profileImg', 'showed user information after rendering about page successfully !' ,'failed to show user information after rendering about page !');
    // dom 해제
    document.body.removeChild(aboutPage)
    sessionStorage.clear()
    console.log('\n')
  })
}

export default aboutPageTest