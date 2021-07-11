import {buildElement, updateElement} from '../lib/helpers.js';

function Card(){
  // 이벤트 핸들러 정의
  function hideProfileImg(event) {
    updateElement(event.target.id, {'className': 'card-picture-img'});
  }
  // 컴포넌트 생성
  function buildComponent(){  
    const cardComponent = buildElement('div', {'id': 'card-component'}, [
      buildElement('div', {'id': 'card-picture'}, [
        buildElement('img', {'id': 'card-picture-img', 'className': 'card-picture-img', 'src': '', 'alt': ''})
      ]),
      buildElement('div', {'id': 'card-name'})
    ]);

    // 부모 노드에 자식 노드가 있을때는 앞뒤로 삽입해야 하므로 updateElement 함수는 사용하기 힘들다
    const profileCardContainer = document.getElementById('profile-card-container');
    profileCardContainer.insertBefore(cardComponent, profileCardContainer.firstChild);
  }
  // 이벤트 핸들러 연결
  function attachHandlers(){
    document.getElementById('card-picture-img').addEventListener("error", hideProfileImg);
  }
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default Card;


