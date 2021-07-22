let tests = [];

function test(name, beforeTest, fn){
  tests.push({name, beforeTest, fn})
}

function run(){
  tests.forEach(function(t){
    try{
      t.fn(t.beforeTest)
      console.log('✅', t.name)
    }catch(e){
      console.log('❌', t.name)
      console.log(e.stack)
    }
  })
}

function isFunction(f){
  if(f !== undefined && f !== null && typeof f === "function"){
    return true;
  }else{
    return false;
  }
}

function doSomethingAfterEvent(registHandler){
  return new Promise(function(resolve, reject){
    registHandler(resolve)
  })
}

export {test, run, isFunction, doSomethingAfterEvent}