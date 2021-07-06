// 이벤트 핸들러 정의
function hideProfileImg(event) {
  event.target.classList.remove("show-profileImg");
}

// 컴포넌트 생성
const cardPictureImg = document.createElement("img");
cardPictureImg.className = "card-picture-img";
cardPictureImg.src = "";
cardPictureImg.alt = "";

const cardPicture = document.createElement('div');
cardPicture.id = "card-picture";
cardPicture.appendChild(cardPictureImg)

const cardName = document.createElement('div');
cardName.id = "card-name";

const cardComponent = document.createElement('div');
cardComponent.id = "card-component";

cardComponent.append(cardPicture, cardName);

const profileCardContainer = document.getElementById('profile-card-container');
profileCardContainer.insertBefore(cardComponent, profileCardContainer.firstChild);
export default profileCardContainer;


// 이벤트 핸들러 연결
document.getElementById('card-picture').firstElementChild.addEventListener("error", hideProfileImg);
