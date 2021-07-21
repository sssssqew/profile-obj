import {test, doSomethingAfterEvent} from '../lib/test.js';
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

    // 이벤트핸들러 정의
    function registHandler(resolve){
      function hideProfileImg(event) {
        console.log('profile image is broken on testing ...')
        updateElement(event.target.id, {'className': 'card-picture-img'});
        resolve(true)
      }
      function handleImgLoad(){
        resolve(false)
      }
      document.getElementById('card-picture-img').addEventListener("load", handleImgLoad);
      document.getElementById('card-picture-img').addEventListener("error", hideProfileImg);
    }

    // 이벤트핸들러 연결 및 사후처리 (이벤트처리 완료후 결과값을 비교해야 하므로 Promise 사용함)
    doSomethingAfterEvent(registHandler).then(function(done){
      if(done){
        console.log('Hiding profile image is done successfully! - card')
      }else{
        console.log('Hiding profile image is failed! - card')
      }
      // 결과값 비교
      console.assert(document.getElementById('card-picture-img').className === 'card-picture-img', 'profile image is not hidden !');
      // dom 해제
      document.body.removeChild(profileImg)
    })
    
    // 이벤트 발생 (이미지를 읽어들이는 시간 때문에 비동기 Promise 사용함)
    document.getElementById('card-picture-img').src = 'broken-profile-img';
  })
}

export default cardComponentTest