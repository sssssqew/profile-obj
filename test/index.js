import {run} from '../lib/test.js';
import cardComponentTest from './card-test.js';
import alertComponentTest from './alert-test.js';
import modalComponentTest from './modal-test.js';
import navComponentTest from './nav-test.js';
import userInfoComponentTest from './userInfo-test.js';

import homePageTest from './home-test.js';
import aboutPageTest from './about-test.js';

function testAllModules(){
  // 컴포넌트 테스트
  cardComponentTest()
  alertComponentTest()
  modalComponentTest()
  navComponentTest()
  userInfoComponentTest()

  // 페이지 테스트
  homePageTest()
  aboutPageTest()

  run()
}

export default testAllModules