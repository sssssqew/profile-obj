import {test} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';

// img 태그의 src에 빈 문자열을 주면 error가 발생한다
// error 발생 이후 클래스 이름이 변경되어야 한다
function cardComponentTest(){
  test('should hide profile image on error', () => { 
    // ui 생성
    const profileImg = buildElement('div', {'id': 'card-picture'}, [
      buildElement('img', {'id': 'card-picture-img', 'className': 'card-picture-img show-profileImg', 'src': '', 'alt': ''})
    ]);
    // ui 렌더링
    document.body.appendChild(profileImg)

    // 이벤트핸들러 정의
    function hideProfileImg(event) {
      console.log('profile image is broken on testing ...')
      updateElement(event.target.id, {'className': 'card-picture-img'});
    }
    searchElement('card-picture-img').addEventListener("error", hideProfileImg);
    
    setTimeout(function(){
      // 결과값 비교
      console.assert(readElementProp('card-picture-img', 'className') === 'card-picture-img', 'card is not hidden !');
      // dom 해제
      document.body.removeChild(profileImg)
      console.log('\n')
    }, 0)
   
  })
}

export default cardComponentTest