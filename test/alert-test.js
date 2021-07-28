import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';

const test1 = 'should cancel alert when click X button';

// img 태그의 src에 유효하지 않은 값을 주면 error가 발생한다
// error 발생 이후 클래스 이름이 변경되어야 한다
function alertComponentTest(){
  test(test1, () => {
    
    // ui 생성
    const alertComponent = buildElement('div', {'id': 'alert-component', 'className': 'alert-component show-alert'}, [
      buildElement('div', {'id': 'alert-msg'}, ['this is alert component']),
    ]);
    // ui 렌더링
    document.body.appendChild(alertComponent)

    // 이벤트핸들러 정의
    function handleAlertCancel(event){
      // TODO: 콘솔창을 열고 닫고에 따라 아래 mouse 좌표가 if문을 통과할때도 있고 아닐때도 있다 (추후 항상 만족하도록 수정하자)
      const mousePoint = {x: 330, y: 10}; // X 버튼 근처 마우스 좌표를 상수로 선언
      
      // css pseudo element 는 자바스크립트로 클릭할 수 없어서 X 버튼 주변 영역을 클릭했을때 이벤트 처리함
      if(mousePoint.x > this.offsetWidth - 50 && mousePoint.y > this.offsetHeight - 50){
        // console.log('clicked Alert X button on testing ...')
        updateElement('alert-component', {'className': 'alert-component'})
        updateElement('alert-msg', {}, [''])
      }
    }
    searchElement('alert-msg').addEventListener('click', handleAlertCancel);
    
    // setTimeout을 감싸면 이벤트핸들러보다 나중에 이벤트루프에 등록되어 
    // 결과적으로 이벤트핸들러가 실행된 다음에 아래 코드가 순차적으로 실행된다
    
    // searchElement('alert-msg').click()
    
    const event = new Event('click');
    searchElement('alert-msg').dispatchEvent(event)

    // 결과값 비교
    console.log(`\n[ ${test1} ]`)
    const isSatisfied = readElementProp('alert-component', 'className') === 'alert-component'
                    && readElementProp('alert-msg', 'innerText') === '';
    assert(isSatisfied, 'canceled alert successfully !' ,'failed to cancel alert !');
    // dom 해제
    document.body.removeChild(alertComponent)
    console.log('\n')
    
  })
}

export default alertComponentTest