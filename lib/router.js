import Home from "../pages/Home.js";
import About from "../pages/About.js";
import NotFound from "../pages/NotFound.js";

window.popped = false;
window.addEventListener('popstate', function(event){ // 앞으로 가기, 뒤로가기한 경우
  window.popped = true;
  router(event.state);
})

/**
 * Router to route to page designated by url
 * @param {string} url - page url to route
 */
function router(url){
  // 앞으로 가기, 뒤로가기 했을때 이전 사이트로 돌아갈 수 있도록 현재 URL 저장
  if(!window.popped){
    window.history.pushState(url, '', url);
  }else{
    window.popped = false;
  }

  switch(url){
    case '/':
      Home(); 
      break;
    case '/about':
      About();
      break;
    default:
      NotFound();
      console.log("not found page !");
 }
}

export default router;