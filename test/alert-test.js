import {test} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';

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

    // 이벤트핸들러 정의
    function handleAlertCancel(event){
      const mousePoint = {x: 330, y: 10}; // X 버튼 근처 마우스 좌표를 상수로 선언
      
      // css pseudo element 는 자바스크립트로 클릭할 수 없어서 X 버튼 주변 영역을 클릭했을때 이벤트 처리함
      if(mousePoint.x > this.offsetWidth - 50 && mousePoint.y > this.offsetHeight - 50){
        console.log('clicked Alert X button on testing ...')
        updateElement('alert-component', {'className': 'alert-component'})
        updateElement('alert-msg', {}, [''])
      }
    }
    searchElement('alert-msg').addEventListener('click', handleAlertCancel);
     
    // 이벤트 발생 및 결과값 확인
    // setTimeout을 하지 않으면 아래 코드가 이벤트핸들러보다 먼저 실행된다
    // setTimeout을 감싸면 이벤트핸들러보다 나중에 이벤트루프에 등록되어 
    // 결과적으로 이벤트핸들러가 실행된 다음에 아래 코드가 순차적으로 실행된다
    setTimeout(function(){
      searchElement('alert-msg').click()
      
      // const event = new Event('click');
      // searchElement('alert-msg').dispatchEvent(event)

       // 결과값 비교
       console.assert(readElementProp('alert-component', 'className') === 'alert-component', 'alert is not hidden !');
       console.assert(readElementProp('alert-msg', 'innerText') === '', 'alert msg is not cleared !');
       // dom 해제
       document.body.removeChild(alertComponent)
       console.log('\n')
    }, 0)
    
  })
}

export default alertComponentTest