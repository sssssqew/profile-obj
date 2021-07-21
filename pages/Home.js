import {buildElement, updateElement, $, searchElement} from '../lib/helpers.js';

import Nav from '../components/Nav.js';
import Card from '../components/Card.js';
import Modal from '../components/Modal.js';
import Alert from '../components/Alert.js';

function Home(){
  // state
  // 페이지나 컴포넌트 내부에서 사용하는 데이터는 state로 정의
  // 자식 컴포넌트에 전달해줄 변수는 props이며 변경불가임(참조만 가능함)
  
  // 자식 컴포넌트에서 부모의 state 값을 변경하려면 함수를 props로 내려주면 된다
  // 컴포넌트에서는 {name, age, gender} 처럼 플어서 내부에서 참조하면 된다
  

  // 지역함수
  function setProfilePicture(userProfileImg) {
    updateElement('card-picture-img', {'src': userProfileImg, 'className': 'card-picture-img show-profileImg'});
  }
  function setProfileName(userName) {
    updateElement('card-name', {}, [userName]);
  }
  
  // 새로고침 후에도 사진 데이터가 사라지지 않음
  function fetchServer(){
    const userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    if($(userInfoData).userProfileImg && $(userInfoData).userName){
      setProfilePicture(userInfoData.userProfileImg);
      setProfileName(userInfoData.userName);
    }else{
      console.log('No profile image yet :(');
    }
  }
  
  // 이벤트 핸들러 정의
  function showModal() {
    updateElement('profile-modal', {'className': 'profile-modal show-modal'});
  }
  function handleProfileSubmit() {
    showModal();
  }
  
  // 컴포넌트 생성
  function buildComponent(){
    const homePage = buildElement('div', {'id': 'profile-home'}, [
      buildElement('div', {'id': 'profile-main'}, [
        buildElement('div', {'id': 'profile-nav'}),
        buildElement('div', {'id': 'profile-card'}, [
          buildElement('div', {'id': 'profile-card-container'}, [
            buildElement('button', {'id': 'profile-submit'}, ['submit profile'])
          ])
        ])
      ]),
      buildElement('div', {'id': 'profile-modal', 'className': 'profile-modal'}),
      buildElement('div', {'id': 'profile-alert'})
    ]);

    updateElement('root', {}, ['']);
    updateElement('root', {}, [homePage]);
  }
  // 이벤트 핸들러 연결
  function attachHandlers(){
    searchElement("profile-submit").addEventListener("click", handleProfileSubmit);
  }
  // 하위 컴포넌트 생성
  function addComponents(){
    Nav();
    Card(); 
    Modal({setProfilePicture, setProfileName});
    Alert();
  }
  function doSomethingAfterRendering(){
    fetchServer();
  }

  function init(){
    buildComponent();
    attachHandlers();
    addComponents();
    doSomethingAfterRendering(); // 렌더 이후 처리함수 (예 - 서버접속)
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default Home;