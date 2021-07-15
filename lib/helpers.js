function setProperties(el, attrs){
  if(attrs === undefined || attrs === null || Object.keys(attrs).length === 0) return;
  for(let attr in attrs){
    if(attr in el){
      el[attr] = attrs[attr];
    }else{
      el.setAttribute(attr, attrs[attr]); // 비호환 속성인지 체크해서 비호환 속성이면 setAttribute 으로 처리하기 (예 : data-url)
    }
  }
}
function setContents(el, contents){
  if(contents === undefined || contents === null || contents.length === 0) return;
  contents.forEach(function(content){
    if(content instanceof Node){ // content가 Node 타입인 경우 appendChild 함수를 사용할 수 있다
      el.appendChild(content);
    }else{
      el.innerText = content;
    }
  })
}

function buildElement(type, attrs, contents){
  const el = document.createElement(type);
  setProperties(el, attrs);
  setContents(el, contents);
  return el;
}


function updateElement(id, attrs, contents){
  const el = document.getElementById(id);
  if(el === null){ // 검색한 DOM이 존재하지 않는 경우
    throw "Can't search dom element !";
  } 
  setProperties(el, attrs);
  setContents(el, contents);
  return el;
}

// 파라미터로 들어온 값이 객체인지 아닌지 검사함
function $(obj){
  if(obj === undefined || obj === null) return false;
  else if(!((obj) instanceof Object)) return false;
  else if((obj) instanceof Array) return false;
  else return obj;
  
}

function displayMessage(msg, duration){
  setTimeout(function(){
    alert(msg);
  }, duration)
}

export {buildElement, updateElement, $, displayMessage};