import {test} from '../lib/test.js';
import {buildElement, updateElement} from '../lib/helpers.js';

// img 태그의 src에 유효하지 않은 값을 주면 error가 발생한다
// error 발생 이후 클래스 이름이 변경되어야 한다
function alertComponentTest(){
  test('should cancel alert when click X button', () => {
    // ui 생성
    const alertComponent = buildElement('div', {'id': 'alert-component', 'className': 'alert-component show-alert'}, [
      buildElement('div', {'id': 'alert-msg'}, ['this is alert component']),
    ]);
    // ui 렌더링
    document.body.appendChild(alertComponent)
    // 이벤트핸들러 연결
    function handleAlertCancel(event){
      // css pseudo element 는 자바스크립트로 클릭할 수 없어서 X 버튼 주변 영역을 클릭했을때 이벤트 처리함
      if(event.offsetX > this.offsetWidth - 50 && event.offsetY > this.offsetHeight - 50){
        console.log('clicked X button on testing ...')
        updateElement('alert-component', {'className': 'alert-component'})
        updateElement('alert-msg', {}, [''])
      }
    }
    document.getElementById('alert-msg').addEventListener('click', handleAlertCancel);
    // 이벤트 발생
    document.getElementById('alert-msg').click()
    // 결과값 비교
    console.assert(document.getElementById('alert-component').className === 'alert-component', 'alert is not hidden !');
    console.assert(document.getElementById('alert-msg').innerText === '', 'alert msg is not cleared !');
    // dom 해제
    document.body.removeChild(alertComponent)
  })
}

export default alertComponentTest