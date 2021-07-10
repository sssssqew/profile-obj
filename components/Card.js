import buildElement from '../lib/helpers.js';

function Card(){
  // 이벤트 핸들러 정의
  function hideProfileImg(event) {
    event.target.classList.remove("show-profileImg");
  }
  // 컴포넌트 생성
  function buildComponent(){  
    const cardComponent = buildElement('div', {'id': 'card-component'}, [
      buildElement('div', {'id': 'card-picture'}, [
        buildElement('img', {'class': 'card-picture-img', 'src': '', 'alt': ''})
      ]),
      buildElement('div', {'id': 'card-name'})
    ]);

    const profileCardContainer = document.getElementById('profile-card-container');
    profileCardContainer.insertBefore(cardComponent, profileCardContainer.firstChild);
  }
  // 이벤트 핸들러 연결
  function attachHandlers(){
    document.getElementById('card-picture').firstElementChild.addEventListener("error", hideProfileImg);
  }
  function init(){
    buildComponent();
    attachHandlers();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default Card;


