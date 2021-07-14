import { add, subtract } from "./calcular.js";
import {test, run} from '../lib/test.js';

function calcularTest(){
  test('should add two numbers', () => {
    console.assert(add(1, 2) === 3, 'add function failed !');
  })
  
  test('should subtract two numbers', () => {
    console.assert(subtract(3, 2) !== 1, 'subtract function failed !');
  })
  run()
}

export default calcularTest
