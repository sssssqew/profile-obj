let tests = [];

function test(name, fn){
  tests.push({name, fn})
}

function run(){
  tests.forEach(function(t){
    try{
      t.fn()
      console.log('✅', t.name)
    }catch(e){
      console.log('❌', t.name)
      console.log(e.stack)
    }
  })
}

function assert(condition, trueMsg, falseMsg){
  if(condition){
    console.log(trueMsg)
  }else{
    console.error(falseMsg)
  }
}

export {test, run, assert}