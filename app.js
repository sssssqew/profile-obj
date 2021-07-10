import router from './lib/router.js';

window.popped = false;

router('/');

window.addEventListener('popstate', function(event){
  window.popped = true;
  router(event.state);
})









