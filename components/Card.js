import buildElement from '../lib/helpers.js';

// 이벤트 핸들러 정의
function hideProfileImg(event) {
  event.target.classList.remove("show-profileImg");
}

// 컴포넌트 생성
const cardPictureImg = buildElement('img', {className: 'card-picture-img', src: '', alt: ''})
const cardPicture = buildElement('div', {id: 'card-picture'});
cardPicture.appendChild(cardPictureImg);

const cardName = buildElement('div', {id: 'card-name'});
const cardComponent = buildElement('div', {id: 'card-component'});
cardComponent.appendChild(cardPicture);
cardComponent.appendChild(cardName);

const profileCardContainer = document.getElementById('profile-card-container');
profileCardContainer.insertBefore(cardComponent, profileCardContainer.firstChild);
export default profileCardContainer;


// 이벤트 핸들러 연결
document.getElementById('card-picture').firstElementChild.addEventListener("error", hideProfileImg);
