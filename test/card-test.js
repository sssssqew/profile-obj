import {test} from '../lib/test.js';
import {buildElement, updateElement} from '../lib/helpers.js';

// img 태그의 src에 유효하지 않은 값을 주면 error가 발생한다
// error 발생 이후 클래스 이름이 변경되어야 한다
function cardComponentTest(){
  test('should hide profile image on error', () => {
    // ui 생성
    const profileImg = buildElement('div', {'id': 'card-picture'}, [
      buildElement('img', {'id': 'card-picture-img', 'className': 'card-picture-img show-profileImg', 'src': '', 'alt': ''})
    ]);
    // ui 렌더링
    document.body.appendChild(profileImg)
    // 이벤트핸들러 연결
    function hideProfileImg(event) {
      console.log('image is broken on testing ...')
      updateElement(event.target.id, {'className': 'card-picture-img'});
    }
    document.getElementById('card-picture-img').addEventListener("error", hideProfileImg);
    // 이벤트 발생 (이미지를 읽어들이는 시간 때문에 비동기 Promise 사용함)
    document.getElementById('card-picture-img').src = 'broken-profile-img';
    // 결과값 비교
    console.assert(document.getElementById('card-picture-img').className === 'card-picture-img', 'hideProfileImg function failed !');
    // dom 해제
    document.body.removeChild(profileImg)
  })
}

export default cardComponentTest