import {buildElement, updateElement, $, searchElement} from './helpers.js';

let tests = [];

/**
 * Register single test to tests array
 * @param {string} name - goal of the test
 * @param {Function} fn - callback function to test
 */
function test(name, fn){
  tests.push({name, fn})
}

/**
 * Run entire tests registered on tests array
 */
function run(){
  tests.forEach(function(t, id){
    try{
      setTimeout(function(){
        console.log('✅', t.name)
        updateElement('test', {}, [buildElement('div', {'id': `check-list-${id}`, 'style': 'font-family: "Nunito", sans-serif; margin-left: 20px; margin-top: 10px'}, [`✅ ${t.name}`])])
        t.fn()
      }, 0) // 테스트의 순서를 보장하기 위함 (테스트의 동기적인 실행 보장)
      
    }catch(e){
      console.log('❌', t.name)
      console.log(e.stack)
      updateElement('test', {}, [buildElement('div', {'id': `check-list-${id}`, 'style': 'font-family: "Nunito", sans-serif; margin-left: 20px; margin-top: 10px'}, [`❌ ${t.name}`])])
    }
  })
}

/**
 * Assert and display message for given condition
 * @param {boolean} condition - boolean value asserted test result compared to expected value
 * @param {string} trueMsg - message to display if condition is true
 * @param {string} falseMsg - message to display if condition is false
 */
function assert(condition, trueMsg, falseMsg){
  if(condition){
    console.log(`🔔 ${trueMsg}`)
    updateElement('test', {}, [buildElement('div', {'className': `result`, 'style': 'font-family: "Nunito", sans-serif; margin-bottom: 10px; margin-left: 20px; padding-bottom: 10px; border-bottom: 1px solid #E8E9EB'}, [`🔔 ${trueMsg}`])])
  }else{
    console.error(falseMsg)
    updateElement('test', {}, [buildElement('div', {'className': `result`, 'style': 'font-family: "Nunito", sans-serif; margin-bottom: 10px; margin-left: 20px; padding-bottom: 10px; border-bottom: 1px solid #E8E9EB'}, [`❌ ${falseMsg}`])])
  }
}

export {test, run, assert}