import {run} from '../lib/test.js';
import cardComponentTest from './card-test.js';
import alertComponentTest from './alert-test.js';
import modalComponentTest from './modal-test.js';
import navComponentTest from './nav-test.js';
import userInfoComponentTest from './userInfo-test.js';

function testAllModules(){
  cardComponentTest()
  alertComponentTest()
  modalComponentTest()
  navComponentTest()
  userInfoComponentTest()

  run()
}

export default testAllModules