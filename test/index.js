import {run} from '../lib/test.js';
import cardComponentTest from './card-test.js';
import alertComponentTest from './alert-test.js';
import modalComponentTest from './modal-test.js';
import navComponentTest from './nav-test.js';

function testAllModules(){
  cardComponentTest()
  alertComponentTest()
  modalComponentTest()
  navComponentTest()

  run()
}

export default testAllModules