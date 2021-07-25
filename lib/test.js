let tests = [];

function test(name, fn){
  tests.push({name, fn})
}

function run(){
  tests.forEach(function(t){
    try{
      setTimeout(function(){t.fn()}, 0) // 테스트의 순서를 보장하기 위함 (테스트의 동기적인 실행 보장)
      console.log('✅', t.name)
    }catch(e){
      console.log('❌', t.name)
      console.log(e.stack)
    }
  })
}

function assert(condition, trueMsg, falseMsg){
  if(condition){
    console.log(`🔔 ${trueMsg}`)
  }else{
    console.error(falseMsg)
  }
}

export {test, run, assert}