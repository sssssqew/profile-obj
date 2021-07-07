import Card from './components/Card.js';
import Modal from './components/Modal.js';

var pageVariables = {
  loadedPictureData: "",
  userInfoData: {}
};

function showModal() {
  document.getElementById("profile-modal").classList.add("show-modal");
}

// Define Event handlers
function handleProfileSubmit() {
  showModal();
}

// attach eventhandlers
document
  .getElementById("profile-submit")
  .addEventListener("click", handleProfileSubmit);



// 컴포넌트 초기 렌더링
Card(); 
Modal(pageVariables);
