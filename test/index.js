import {run} from '../lib/test.js';
import cardComponentTest from './card-test.js';
import alertComponentTest from './alert-test.js';

function testAllModules(){
  console.log('\n\n============ Test Results ===============')
  cardComponentTest()
  alertComponentTest()

  run()
  console.log('==========================================\n\n')
}

export default testAllModules