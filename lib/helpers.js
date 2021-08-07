/**
 * Set attributes of DOM Element
 * @param {Element} el - DOM Element
 * @param {Object} attrs - Object that has attributes to set
 * @returns {undefined} result if there is no attributes to set
 */
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

/**
 * Set child elements for parent element
 * @param {Element} el - DOM Element
 * @param {Array} contents - Array of child elements to set for parent element
 * @returns {undefined} result if there is no element to set
 */
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

/**
 * Build single element or a group of elements
 * @param {string} type - tagName of DOM element to create
 * @param {Object} attrs - Object that has attributes to set
 * @param {Array} contents - Array of child elements to set for parent element
 * @returns {Element} DOM Element built by createElement function
 */
function buildElement(type, attrs, contents){
  const el = document.createElement(type);
  setProperties(el, attrs);
  setContents(el, contents);
  return el;
}

/**
 * Search for specific element matching id 
 * @param {string} id - id of DOM element to search for
 * @returns {Element} - DOM element searched by id
 */
function searchElement(id){
  const el = document.getElementById(id);
  if(el === null){ // 검색한 DOM이 존재하지 않는 경우
    throw `Can't search dom element of id - ${id} !`;
  }
  return el;
}

/**
 * Update DOM element matching id
 * @param {string} id - id of DOM element to update for its attributes
 * @param {Object} attrs - Object that has attributes to update
 * @param {Array} contents - Array of child elements to update for parent element
 * @returns {Element} DOM element updated
 */
function updateElement(id, attrs, contents){
  const el = searchElement(id)
  setProperties(el, attrs);
  setContents(el, contents);
  return el;
}

/**
 * Remove child element from parent element
 * @param {string} parentID - id of parent element 
 * @param {*} childID - id of child element to remove
 */
function removeChildElement(parentID, childID){
  const parentEl = searchElement(parentID);
  const childEl = searchElement(childID);
  parentEl.removeChild(childEl);
}

/**
 * Read specific attribute value designated
 * @param {string} id - id of DOM element to read attribute
 * @param {string} prop - attribute name to read 
 * @returns {string} attribute value designated by prop parameter
 */
function readElementProp(id, prop){
  const el = searchElement(id)
  return el[prop]; 
}

// 파라미터로 들어온 값이 객체인지 아닌지 검사함
/**
 * Check if parameter is object or not
 * @param {*} obj - any value to check type
 * @returns {Object|boolean} result of type validation
 */
function $(obj){
  if(obj === undefined || obj === null) return false;
  else if(!((obj) instanceof Object)) return false;
  else if((obj) instanceof Array) return false;
  else return obj;
}

/**
 * Display message on browser after an amount of duration
 * @param {string} msg - string to display on alert function
 * @param {number} duration - integer to delay before displaying message
 */
function displayMessage(msg, duration){
  setTimeout(function(){
    alert(msg);
  }, duration)
}

export {buildElement, searchElement, updateElement, readElementProp, $, displayMessage, removeChildElement};