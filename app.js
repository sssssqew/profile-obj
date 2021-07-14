import router from './lib/router.js';
import calcularTest from './test/calcular-test.js';

window.popped = false;

router('/');

window.addEventListener('popstate', function(event){
  window.popped = true;
  router(event.state);
})

calcularTest()









