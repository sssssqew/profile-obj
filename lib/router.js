import Home from "../pages/Home.js";

function router(url){

 switch(url){
   case '/':
     Home();
     break;
   default:
     console.log("not found page !");
 }
}

export default router;