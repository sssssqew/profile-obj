let tests = [];

function test(name, fn){
  tests.push({name, fn})
}

function run(){
  tests.forEach(function(t){
    try{
      t.fn()
      console.log('✅', t.name)
      console.log('\n')
    }catch(e){
      console.log('❌', t.name)
      console.log(e.stack)
    }
  })
}

export {test, run}