import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';
import imgData from './imgData.js';

const test1 = 'should hide card on error';

// img 태그의 src에 빈 문자열을 주면 error가 발생한다
// error 발생 이후 클래스 이름이 변경되어야 한다
// dispatchEvent 함수로 error 이벤트를 동기적으로 발생시켜야 한다
// 그렇지 않고 자연적으로 발생시키면 비동기가 되기 때문에 이벤트가 나중에 처리되므로 테스트 코드가 꼬인다

function cardComponentTest(){
  test(test1, () => {
    
    // ui 생성
    const profileImg = buildElement('div', {'id': 'card-picture'}, [
      buildElement('img', {'id': 'card-picture-img', 'className': 'card-picture-img card-show-profileImg', 'src': imgData, 'alt': ''})
    ]);
    // ui 렌더링
    document.body.appendChild(profileImg)

    // 이벤트핸들러 정의
    function hideProfileImg(event) { 
      // console.log('profile image is broken on testing ...')
      updateElement(event.target.id, {'className': 'card-picture-img'});
    }
    searchElement('card-picture-img').addEventListener("error", hideProfileImg);
  
    // dispatchEvent 함수를 사용하는 이유는 이벤트 발생을 동기적으로 실행하기 위함 (원래는 비동기 실행)
    const event = new Event('error');
    searchElement('card-picture-img').dispatchEvent(event)
    // 결과값 비교
    assert(readElementProp('card-picture-img', 'className') === 'card-picture-img', 'hid profile img of card on error successfully !', 'failed to hide profile img of card on error !')
    
    // dom 해제
    document.body.removeChild(profileImg)
    console.log('\n')
    
  })
}

export default cardComponentTest