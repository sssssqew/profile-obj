import Card from './components/Card.js';
import Modal from './components/Modal.js';

// 페이지나 컴포넌트 내부에서 사용하는 데이터는 state로 정의하고 자식 컴포넌트에 전달해줄 변수는 props이며 변경불가임(참조만 가능함)
var pageVariables = {
  loadedPictureData: "", // 모달 내부에서만 사용하는 데이터 (state)
  userInfoData: {} // 다른 페이지에서도 사용할 데이터 (사실 서버에 저장후 가져오기 때문에 이 변수는 서버 대신 임시로 사용하는거다)
  // 즉 userInfoData는 다른 페이지에도 사용해야 하는데 실제로는 서버에서 가져오면 되기 때문에 추후 필요없는 변수
  // 자식 컴포넌트에서 부모의 state 값을 변경하려면 함수를 props로 내려주면 된다
  // 추후 컴포넌트 파리미터로 props 객체를 넘겨주고 컴포넌트에서는 참조만 하게 하면 된다
  // 컴포넌트에서는 {name, age, gender} 처럼 플어서 내부에서 참조하면 된다
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
