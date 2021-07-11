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
    // console.log(content, content instanceof Node)
    if(content instanceof Node){
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

export {buildElement, updateElement};