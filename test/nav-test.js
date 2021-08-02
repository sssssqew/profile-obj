import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';
import router from '../lib/router.js';
import imgData from './imgData.js';

const test1 = 'should route to given url';

// img 태그의 src에 유효하지 않은 값을 주면 error가 발생한다
// error 발생 이후 클래스 이름이 변경되어야 한다
function navComponentTest(){
  test(test1, () => {
    const urlToRoute = '/about';
    
    // 아래 세션 데이터가 없으면 about 페이지로 이동한 후 userInfo 컴포넌트에서 error 이벤트가 발생한다 (img src가 없기 때문)
    // 이후 userInfo 컴포넌트 테스트에서 error 이벤트가 실행되어 아무리 userInfo-profile-img 요소의 class에 show-profileImg를 적용해도 프로필 사진이 보이지 않는다
    // 즉 nav 컴포넌트 테스트가 userInfo 컴포넌트 테스트에 영향을 주기 때문에 아래 세션 데이터로 error가 발생하지 않도록 한다
    let userInfoData = {userName: 'testName', userAge: '3', userGender: 'female', userProfileImg: imgData};
    sessionStorage.setItem('userInfoData', JSON.stringify(userInfoData))
    
    // ui 생성
    const navComponent = buildElement('div', {'id':'nav-component'}, [
      buildElement('button', {'className': 'nav-btns', 'data-url':'/'}, ['Home']),
      buildElement('button', {'className': 'nav-btns', 'data-url':'/about'}, ['About'])
     ]);
    // ui 렌더링
    document.body.appendChild(navComponent)

    // 이벤트핸들러 정의
    function handleNavigation(event){ // 이벤트 위임
      const url = urlToRoute;
      if(url) router(url);
    }

    searchElement('nav-component').addEventListener('click', handleNavigation);

    const event = new Event('click');
    searchElement('nav-component').dispatchEvent(event)

    // 결과값 비교
    const isSatisfied = window.location.pathname === urlToRoute
                    && searchElement('profile-about');
    assert(isSatisfied, 'route to given url successfully !' ,'failed to route to given url !');
    // dom 해제
    document.body.removeChild(navComponent)
    updateElement('root', {}, ['']); // about 페이지가 렌더링되었으므로 root의 모든 child 요소를 제거함
    window.history.back(); // about 페이지로 url이 변경되었으므로 다시 이전 주소로 복귀함
    sessionStorage.clear()
    console.log('\n')

    // about 페이지로 라우팅되면서 userInfo 컴포넌트의 error 이벤트가 실행된다
    // error 이벤트는 비동기로 실행되기 때문에 테스트가 끝나고 실행된다
    // 테스트가 끝나면 userInfo-profile-img 요소가 없기 때문에 오류가 발생한다
  })
}

export default navComponentTest