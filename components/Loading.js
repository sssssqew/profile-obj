import {buildElement, updateElement, searchElement} from '../lib/helpers.js';

// loading 화면은 추후 스스로 만들어서 전자책에 추가한다
function Loading(){
  // 컴포넌트 생성
  function buildComponent(){  
    const loadingComponent = buildElement('div', {'id': 'loading-component', 'className': 'loading-component'});

    updateElement('root', {}, [loadingComponent]);
  }
  // 이벤트 핸들러 연결
  function attachHandlers(){}
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default Loading;


