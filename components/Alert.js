import {buildElement, updateElement, searchElement} from '../lib/helpers.js';

/**
 * Alert component to alarm message to user
 */
function Alert(){
  // 이벤트 핸들러 정의
  /**
   * Cancel Alert when clicked X button
   * @param {Object} event - user event 
   */   
  function handleAlertCancel(event){
    // css pseudo element 는 자바스크립트로 클릭할 수 없어서 X 버튼 주변 영역을 클릭했을때 이벤트 처리함
    if(event.offsetX > this.offsetWidth - 50 && event.offsetY > this.offsetHeight - 50){
      updateElement('alert-component', {'className': 'alert-component'})
      updateElement('alert-msg', {}, [''])
    }
  }
 
  // 컴포넌트 생성
  /**
   * Build specific component */
  function buildComponent(){  
    const alertComponent = buildElement('div', {'id': 'alert-component', 'className': 'alert-component'}, [
      buildElement('div', {'id': 'alert-msg'}, ['']),
    ]);

    updateElement('profile-alert', {}, [alertComponent]);
  }
  // 이벤트 핸들러 연결
  /**
   * Attach event handlers related to specific component
   */
  function attachHandlers(){
    searchElement('alert-msg').addEventListener('click', handleAlertCancel)
  }
  /**
   * initialize component when rendering on browser
   */
  function init(){
    buildComponent();
    attachHandlers();
  }
  init();
}

export default Alert;