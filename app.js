import router from './lib/router.js';
import testAllModules from './test/index.js';
import firebaseConfig from './firebase-config.js';

var testMode = false; // 테스트모드 설정

if(!testMode){
  firebase.initializeApp(firebaseConfig); // 파이어베이스 초기화
  router('/');
}else{
  // 개발하는 동안 테스트 코드 실행 (Production 인 경우 주석처리)
  testAllModules()
}













