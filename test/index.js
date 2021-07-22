import {run} from '../lib/test.js';
import cardComponentTest from './card-test.js';
import alertComponentTest from './alert-test.js';
import modalComponentTest from './modal-test.js';

function testAllModules(){
  console.log('\n\n============ Test Check list ===============')
  cardComponentTest()
  alertComponentTest()
  modalComponentTest()

  run()
  console.log('=============================================\n\n')
}

export default testAllModules