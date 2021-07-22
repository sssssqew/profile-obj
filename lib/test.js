let tests = [];

function test(name, fn){
  tests.push({name, fn})
}

function run(){
  tests.forEach(function(t){
    try{
      setTimeout(function(){
        t.fn()
      }, 0) // 테스트가 곧바로 실행되는게 아니라 이벤트루프에 등록된후 순차적으로 실행되도록 함
      console.log('✅', t.name)
    }catch(e){
      console.log('❌', t.name)
      console.log(e.stack)
    }
  })
}

export {test, run}