import {buildElement, updateElement, searchElement} from '../lib/helpers.js';

/**
 * Card component to display profile image
 */
function Card({handleProfileImgLoad}){
  // 이벤트 핸들러 정의
  /**
   * Hide Profile image when error occure
   * @param {Object} event - user event
   */
  function hideProfileImg(event) {
    updateElement(event.target.id, {'className': 'card-picture-img'});
  }
  // 컴포넌트 생성
  /**
   * Build specific component */
  function buildComponent(){  
    const cardComponent = buildElement('div', {'id': 'card-component'}, [
      buildElement('div', {'id': 'card-picture'}, [
        buildElement('img', {'id': 'card-picture-img', 'className': 'card-picture-img', 'src': '', 'alt': ''})
      ]),
      buildElement('div', {'id': 'card-name'})
    ]);

    // 부모 노드에 자식 노드가 있을때는 앞뒤로 삽입해야 하므로 updateElement 함수는 사용하기 힘들다
    const profileCardContainer = searchElement('profile-card-container');
    profileCardContainer.insertBefore(cardComponent, profileCardContainer.firstChild);
  }
  // 이벤트 핸들러 연결
  /**
   * Attach event handlers related to specific component
   */
  function attachHandlers(){
    searchElement('card-picture-img').addEventListener("error", hideProfileImg);
    searchElement('card-picture-img').addEventListener("load", handleProfileImgLoad);
  }
  /**
   * initialize component when rendering on browser
   */
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); 
}

export default Card;


