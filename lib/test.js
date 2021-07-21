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

function doSomethingAfterEvent(registHandler){
  return new Promise(function(resolve, reject){
    registHandler(resolve)
  })
}

export {test, run, doSomethingAfterEvent}