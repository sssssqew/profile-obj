import {test, run} from '../lib/test.js';
import {buildElement, updateElement} from '../lib/helpers.js';

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
    // 이벤트 발생
    document.getElementById('card-picture-img').src = 'broken-profile-img';
    // 결과값 비교
    console.assert(document.getElementById('card-picture-img').className === 'card-picture-img', 'hideProfileImg function failed !');
    // dom 해제
    document.body.removeChild(profileImg)
  })
  
  run()
}

export default cardComponentTest