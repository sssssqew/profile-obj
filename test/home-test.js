import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement, $} from '../lib/helpers.js';

const test1 = 'should show modal window when clicked submit button';

function homePageTest(){
  test(test1, () => {
    // ui 생성
    const homePage = buildElement('div', {'id': 'profile-home'}, [
      buildElement('div', {'id': 'profile-main'}, [
        buildElement('div', {'id': 'profile-nav'}),
        buildElement('div', {'id': 'profile-card'}, [
          buildElement('div', {'id': 'profile-card-container'}, [
            buildElement('button', {'id': 'profile-submit'}, ['submit profile'])
          ])
        ])
      ]),
      buildElement('div', {'id': 'profile-modal', 'className': 'profile-modal'}),
      buildElement('div', {'id': 'profile-alert'})
    ]);
    // ui 렌더링
    document.body.appendChild(homePage)

    // 이벤트핸들러 정의
    function showModal() {
      updateElement('profile-modal', {'className': 'profile-modal show-modal'});
    }
    function handleProfileSubmit() {
      showModal();
    }

    searchElement("profile-submit").addEventListener("click", handleProfileSubmit);
    
    const event = new Event('click');
    searchElement('profile-submit').dispatchEvent(event)

    // 결과값 비교
    assert(readElementProp('profile-modal', 'className') === 'profile-modal show-modal', 'showed modal window when clicked submit button successfully !' ,'failed to show modal window when clicked submit button !');
    // dom 해제
    document.body.removeChild(homePage)
    console.log('\n')
  })
}

export default homePageTest