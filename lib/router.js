import Home from "../pages/Home.js";
import About from "../pages/About.js";

function router(url){

 switch(url){
   case '/':
     Home();
     break;
   case '/about':
     About();
     break;
   default:
     console.log("not found page !");
 }
}

export default router;