import {buildElement, updateElement, $, searchElement} from './helpers.js';

let tests = [];

function test(name, fn){
  tests.push({name, fn})
}

function run(){
  tests.forEach(function(t, id){
    try{
      setTimeout(function(){
        console.log('✅', t.name)
        updateElement('root', {}, [buildElement('div', {'id': `check-list-${id}`, 'style': 'font-family: "Nunito", sans-serif; margin-left: 20px; margin-top: 10px'}, [`✅ ${t.name}`])])
        t.fn()
      }, 0) // 테스트의 순서를 보장하기 위함 (테스트의 동기적인 실행 보장)
      
    }catch(e){
      console.log('❌', t.name)
      console.log(e.stack)
      updateElement('root', {}, [buildElement('div', {'id': `check-list-${id}`, 'style': 'font-family: "Nunito", sans-serif; margin-left: 20px; margin-top: 10px'}, [`❌ ${t.name}`])])
    }
  })
}

function assert(condition, trueMsg, falseMsg){
  if(condition){
    console.log(`🔔 ${trueMsg}`)
    updateElement('root', {}, [buildElement('div', {'className': `result`, 'style': 'font-family: "Nunito", sans-serif; margin-bottom: 10px; margin-left: 20px; padding-bottom: 10px; border-bottom: 1px solid #E8E9EB'}, [`🔔 ${trueMsg}`])])
  }else{
    console.error(falseMsg)
    updateElement('root', {}, [buildElement('div', {'className': `result`, 'style': 'font-family: "Nunito", sans-serif; margin-bottom: 10px; margin-left: 20px; padding-bottom: 10px; border-bottom: 1px solid #E8E9EB'}, [`❌ ${falseMsg}`])])
  }
}

export {test, run, assert}