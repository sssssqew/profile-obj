import {buildElement, updateElement, $, searchElement, readElementProp} from '../lib/helpers.js';

import Nav from '../components/Nav.js';
import Card from '../components/Card.js';
import Modal from '../components/Modal.js';
import Alert from '../components/Alert.js';
import Loading from '../components/Loading.js';

/**
 * Home page to display user's profile
 */
function Home(){
  // state
  // 페이지나 컴포넌트 내부에서 사용하는 데이터는 state로 정의
  // 자식 컴포넌트에 전달해줄 변수는 props이며 변경불가임(참조만 가능함)
  
  // 자식 컴포넌트에서 부모의 state 값을 변경하려면 함수를 props로 내려주면 된다
  // 컴포넌트에서는 {name, age, gender} 처럼 플어서 내부에서 참조하면 된다
  

  // 지역함수
  /**
   * Show alert message to user
   * @param {string} msg - message to display to user
   * @param {number} duration - integer to delay before displaying message
   */
  function showAlert(msg, duration){
    setTimeout(function(){
      // 아래 코드는 1초 후에 실행되는데 아래 코드가 실행되기 전에 About 페이지로 이동하면 alert-component가 존재하지 않는다는 오류가 남
      if(document.getElementById('alert-component')){
        updateElement('alert-component', {'className': 'alert-component show-alert'})
        updateElement('alert-msg', {}, [msg])
      }
    }, duration)
  }

  /**
   * handle event when profile image load
   */
  function handleProfileImgLoad(event){
    updateElement('card-picture-img', {'className': 'card-picture-img card-show-profileImg'});
    displayProfileHome() // 파이어베이스에서 이미지가 완전히 로드된 후에 home 화면 보여주기
    // showAlert('succeed to fetch user information from server !', 500);
    
    // 초반에 'card-picture-img' DOM을 생성할때 src가 비어있어서 초기 렌더링시 error 이벤트가 발생하므로 
    // 이미지를 로드한 이후에 사진을 다시 숨겨버린다
    // 그러나 이미지 로드한 이후에는 더이상 사진을 숨길 필요가 없으므로 error 이벤트를 제거함
    // searchElement('card-picture-img').removeEventListener("error", hideProfileImg);
  }

  function hideProfileImg(event) {
    updateElement(event.target.id, {'className': 'card-picture-img'});
  }

  /**
   * Display profile picture for given image url
   * @param {string} url - image url to load
   */
  function setProfilePicture(url) {
    // TODO: createObjectURL 사용하면 해당위치에서 img.onload = URL.revokeObjectURL(img.src); 핸들러 연결해줘야 할듯
    updateElement('card-picture-img', {'src': url});
  }
  /**
   * Display user name for given user name
   * @param {string} userName - user name given by user
   */
  function setProfileName(userName) {
    updateElement('card-name', {}, [userName]);
  }
  /**
   * Show loading icon
   */
  function showLoading(){
    updateElement('loading-component', {'className': 'loading-component show-loading'})
  }
  /**
   * Hide loading icon
   */
  function hideLoading(){
    updateElement('loading-component', {'className': 'loading-component'})
  }
  /**
   * Show home page
   */
  function showProfileHome(){
    updateElement('profile-home', {'className': 'profile-home'})
  }
  /**
   * Hide home page
   */
  function hideProfileHome(){
    updateElement('profile-home', {'className': 'profile-home hide-profileHome'})
  }
  /**
   * Display loading 
   */
  function displayLoading(){
    hideProfileHome()
    showLoading()
  }
  /**
   * Display home page
   */
  function displayProfileHome(){
    hideLoading()
    showProfileHome()
  }
  
  // 세션 스토리지에 최신 사용자 정보가 있으면 해당 정보를 보여준다
  /**
   * Fetch data from server 
   */
  function fetchServer(){
    // snapshot 때문에 파이어베이스에 변경사항이 있으면 다시 home 페이지의 snapshot 함수가 비동기적으로 실행된다 
    // 세션 스토리지에 최신 사용자 정보가 없으면 서버에서 최신 정보를 가져와서 보여준다
    // 브라우저를 처음 열면 세션 데이터가 존재하지 않으므로 서버에서 데이터를 가져와 세션에 저장함
    console.log('get user data from server ...')
    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log('realtime database: ', data);

      if(data){
        const storageRef = firebase.storage().ref();

        storageRef.child(`images/${data.fileName}`).getDownloadURL().then((url) => {
          console.log("img url from Storage: ", url)
          
          // 파이어베이스에서 가져온 최신 데이터로 프로필 사진 프로필 이름 업데이트
          setProfilePicture(url);
          setProfileName(data.userName);

          // 파이어베이스에서 가져온 최신 데이터를 세션 스토리지에 저장하기 (About 페이지에서 사용하기 위함)
          sessionStorage.setItem('userInfo', JSON.stringify({...data, url}));
        }).catch((error) => {
          console.log('failed to get img url from Storage :(')
          displayProfileHome()
          showAlert('Failed to get img url from Storage !', 500);
        })
      }else{
        console.log('data does not exist yet')
        displayProfileHome()
        showAlert('Click "submit profile" button to upload first profile !', 500);
      }
    })
      
  }
  
  // 이벤트 핸들러 정의
  /**
   * Show Modal window
   */
  function showModal() {
    updateElement('profile-modal', {'className': 'profile-modal show-modal'});
  }
  /**
   * Handle event when user click 'profile submit' button
   */
  function handleProfileSubmit() {
    showModal();
  }
  
  // 컴포넌트 생성
  /**
   * Build specific component */
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
  /**
   * Attach event handlers related to specific component
   */
  function attachHandlers(){
    searchElement("profile-submit").addEventListener("click", handleProfileSubmit);
  }
  // 하위 컴포넌트 생성
  /**
   * Render needed components for this page
   */
  function addComponents(){
    Nav();
    Card({hideProfileImg, handleProfileImgLoad}); 
    Modal({showAlert});
    Alert();
    Loading();
  }

  /**
   * Process something after rendering page
   */
  function doSomethingAfterRendering(){
    displayLoading() // 로딩화면 보여주기
    fetchServer(); // 서버에서 데이터 가져오기
  }

  /**
   * initialize component when rendering on browser
   */
  function init(){
    buildComponent();
    attachHandlers();
    addComponents();
    doSomethingAfterRendering(); // 렌더 이후 처리함수 (예 - 서버접속)
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default Home;