import {buildElement, updateElement, $, searchElement} from '../lib/helpers.js';

import Nav from '../components/Nav.js';
import Card from '../components/Card.js';
import Modal from '../components/Modal.js';
import Alert from '../components/Alert.js';
import Loading from '../components/Loading.js';

function Home(){
  // state
  // 페이지나 컴포넌트 내부에서 사용하는 데이터는 state로 정의
  // 자식 컴포넌트에 전달해줄 변수는 props이며 변경불가임(참조만 가능함)
  
  // 자식 컴포넌트에서 부모의 state 값을 변경하려면 함수를 props로 내려주면 된다
  // 컴포넌트에서는 {name, age, gender} 처럼 플어서 내부에서 참조하면 된다
  

  // 지역함수
  function showAlert(msg, duration){
    setTimeout(function(){
      updateElement('alert-component', {'className': 'alert-component show-alert'})
      updateElement('alert-msg', {}, [msg])
    }, duration)
  }
  function setProfilePicture(userProfileImg) {
    // TODO: createObjectURL 사용하면 해당위치에서 img.onload = URL.revokeObjectURL(img.src); 핸들러 연결해줘야 할듯
    updateElement('card-picture-img', {'src': userProfileImg, 'className': 'card-picture-img show-profileImg'});
  }
  function setProfileName(userName) {
    updateElement('card-name', {}, [userName]);
  }
  function showLoading(){
    updateElement('loading-component', {'className': 'loading-component show-loading'})
  }
  function hideLoading(){
    updateElement('loading-component', {'className': 'loading-component'})
  }
  function showProfileHome(){
    updateElement('profile-home', {'className': 'profile-home'})
  }
  function hideProfileHome(){
    updateElement('profile-home', {'className': 'profile-home hide-profileHome'})
  }
  function displayLoading(){
    hideProfileHome()
    showLoading()
  }
  function displayProfileHome(){
    hideLoading()
    showProfileHome()
  }
  
  // 세션 스토리지에 최신 사용자 정보가 있으면 해당 정보를 보여준다
  function fetchServer(){
    const userInfoData = JSON.parse(sessionStorage.getItem('userInfoData'));
    console.log('user info:'+userInfoData)
    if($(userInfoData).userProfileImg && $(userInfoData).userName && $(userInfoData).userAge && $(userInfoData).userGender){
      setProfilePicture(userInfoData.userProfileImg);
      setProfileName(userInfoData.userName);
    // 세션 스토리지에 최신 사용자 정보가 없으면 서버에서 최신 정보를 가져와서 보여준다
    }else{
      // 로딩화면 보여주기
      displayLoading()

      // 브라우저를 처음 열면 세션 데이터가 존재하지 않으므로 서버에서 데이터를 가져와 세션에 저장함
      console.log('get user data from server ...')
      firebase.database().ref().on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);

        if(data){
          const storageRef = firebase.storage().ref();
          storageRef.child(`images/${data.fileName}`).getDownloadURL().then(function(url) {
            console.log("url from server: " + url)
            
            // 파이어베이스에서 가져온 최신 데이터로 프로필 사진 프로필 이름 셋팅
            setProfilePicture(url);
            setProfileName(data.userName);

            // 다시 프로필 홈페이지 보여주기
            displayProfileHome()
            showAlert('succeed to fetch user information from server !', 1000);

            // 파이어베이스에서 가져온 최신 데이터를 세션 스토리지에 저장하기
            sessionStorage.setItem('userInfoData', JSON.stringify({...data, userProfileImg: url}));
          }).catch(function(error){
            console.log('failed to get img url from server :(')
            displayProfileHome()
            showAlert('Failed to get img url from server !', 1000);
          })
        }else{
          console.log('data does not exist yet')
          displayProfileHome()
          showAlert('Click "submit profile" button to upload first profile !', 1000);
        }
      })
      
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
    const homePage = buildElement('div', {'id': 'profile-home', 'className': 'profile-home'}, [
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
    Modal({setProfilePicture, setProfileName, showAlert});
    Alert();
    Loading();
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