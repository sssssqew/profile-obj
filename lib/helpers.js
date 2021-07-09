function setProperties(el, attrs){
  if(attrs === undefined || attrs === null || Object.keys(attrs).length === 0) return;
  for(let attr in attrs){
    el.setAttribute(attr, attrs[attr]);
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

export default buildElement;