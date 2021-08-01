import router from './lib/router.js';
import testAllModules from './test/index.js';

var testMode = true; // 테스트모드 설정

if(!testMode){
  window.popped = false;

  router('/');

  window.addEventListener('popstate', function(event){
    window.popped = true;
    router(event.state);
  })
}else{
  // 개발하는 동안 테스트 코드 실행 (Production 인 경우 주석처리)
  testAllModules()
}













