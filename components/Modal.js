import {buildElement, updateElement, displayMessage, searchElement} from '../lib/helpers.js';

/**
 * Modal component to pop up 
 * @param {Fuction} showAlert - function to show alert for an amount period of time
 */
function Modal({showAlert}) {
  const state = {
    loadedPictureData: ""
  }
  // 지역함수
  /**
   * Clear input strings and file name 
   */
  function clearModal() {
    state.loadedPictureData = "";
    updateElement('modal-info-name', {'value': ''});
    updateElement('modal-info-age', {'value': ''});
    updateElement('modal-info-gender', {'value': ''});
    updateElement('modal-filename', {}, ["No file selected"]);
  }
  /**
   * Hide Modal window 
   */
  function hideModal() {
    updateElement('profile-modal', {'className': 'profile-modal'});
  }
  /**
   * Validate file extension when user select file
   * @param {Object} fileData - file Object is selected by user
   * @returns {boolean} result if file is valid
   */
  function validateFileExtension(fileData) {
    const fileType = fileData.type;
    const ext = fileType.split("/")[0];
    if (ext !== "image") return;
    return true;
  }
  /**
   * Set file name selected by user
   * @param {Object} fileData  - file Object is selected by user
   */
  function setUploadedFileName(fileData) {
    updateElement('modal-filename', {}, [fileData.name]);
  }
  /**
   * Load picture data into state
   * @param {Object} fileData - file Object is selected by user
   */
  function loadPictureData(fileData) {
    state.loadedPictureData = fileData;

    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   console.log("loaded profile picture!");
    //   // state.loadedPictureData = e.target.result;
    //   // console.log(state.loadedPictureData)
    // };
    // reader.readAsDataURL(fileData);
  }


  /**
   * Check if given number is integer or not
   * @param {number} num - A integer or float number
   * @returns {boolean} result if given number is integer
   */
  function checkIfNumberIsInteger(num) {
    return num % 1 === 0;
  } // 현재는 사용하지 않음
  /**
   * Check if given string has special characters or not
   * @param {string} str - user name given by user
   * @returns {boolean} result if given string has special characters
   */
  function checkIfStringHasSpecialCharacter(str) {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(str);
  }
  /**
   * Check if given string has numbers or not
   * @param {string} str - user name given by user
   * @returns {boolean} result if given string has numbers
   */
  function checkIfStringHasNumbers(str) {
    return /\d/.test(str);
  }
  /**
   * Check if given string only consists of numbers or not
   * @param {string} str - user age given by user
   * @returns {boolean} result if given string only consists of numbers
   */
  function checkIfStringIsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }
  /**
   * Check if given string is valid age or not
   * @param {string} str - user age given by user
   * @returns {boolean} result if given string is valid age
   */
  function checkIfAgeIsValid(str) {
    const age = Number(str);
    if (!checkIfNumberIsInteger(age)) return; // check already on checkIfStringIsOnlyNumbers function (useless code)
    if (age < 1 || age > 150) return;
    return true;
  }
  /**
   * Check if given string is valid gender or not
   * @param {string} str - user gender given by user
   * @returns {boolean} result if given string is valid gender
   */
  function checkIfGenderIsValid(str) {
    if (str !== "male" && str !== "female") return;
    return true;
  }

  /**
   * Check if given user information is valid or not
   * @param {string} userName - user name given by user
   * @param {string} userAge - user age given by user
   * @param {string} userGender - user gender given by user
   * @returns {boolean} result if given user information is valid
   */
  function validateUserInfo(userName, userAge, userGender) {
    if (
      userName === "" ||
      checkIfStringHasSpecialCharacter(userName) ||
      checkIfStringHasNumbers(userName)
    ) {
      return;
    }
    if (
      userAge === "" ||
      !checkIfStringIsOnlyNumbers(userAge) ||
      !checkIfAgeIsValid(userAge)
    ) {
      return;
    }
    if (userGender === "" || !checkIfGenderIsValid(userGender)) {
      return;
    }
    return true;
  }
  function validateInputData(userName, userAge, userGender) {
    if (!validateUserInfo(userName, userAge, userGender)) return;
    return true;
  }
  // 최신 사용자 정보를 파이어베이스 db에 저장함
  function setDataToFirebase(data){
    firebase.database().ref().set(data, function(error){
      if(error) console.log('failed to save user information on realtime database !');
      else console.log('saved data into realtime databse successfully !')
    }) 
  }
  // 서버로 이미지 파일 전송
  function sendFileToFirebase(fileData, userInfoData){
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`images/${fileData.name}`).put(fileData);
    uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, error => {
            console.log(error);
            showAlert('Failed to save img file to server !', 1000);
            updateElement('profile-submit', {'disabled': false}); // 서버 전송이 완료되면 버튼 활성화
        }, () => {
            console.log('uploaded file to firebase successfully !'); // 파일 업로드 완료
            setDataToFirebase(userInfoData)
        });
  }
  /**
   * Save user information to session storage and firebase server
   * @param {string} userName - user name given by user
   * @param {string} userAge - user age given by user
   * @param {string} userGender - user gender given by user
   */
  function saveUserInfo(userName, userAge, userGender) {
    const file = state.loadedPictureData;
    const userInfoData = {userName, userAge, userGender, fileName: file.name};
    
    // 서버로 파일 전송중에는 profile submit 버튼 비활성화
    updateElement('profile-submit', {'disabled': true});
    sendFileToFirebase(file, userInfoData)
    
  }
  

  // 이벤트 핸들러 정의
  /**
   * Handler to cancel Modal window
   */
  function handleModalCancel() {
    clearModal();
    hideModal();
  }
  /**
   * Clear value of file input 
   * @param {Object} event - user event 
   */
  function clearFileCash(event) {
    event.target.value = null;
  }
  /**
   * Handle event when uploading file by user
   * @param {Object} event - user event
   * @returns {undefined} result if file exist or file has valid extension
   */
  function handlePictureUpload(event) {
    // 파일 취소시 해당 이벤트로 들어오지 않음
    // 파일 존재여부 검사
    const selectedFiles = event.target.files;
    if (selectedFiles.length < 1) return;

    console.log(event.target.files[0])
  
    // 파일 확장자 유효성 검사
    if (!validateFileExtension(selectedFiles[0])) {
      alert("uploaded file is not valid");
      return;
    }
    setUploadedFileName(selectedFiles[0]);
    loadPictureData(selectedFiles[0]); // 서버로 파일을 보내기 위하여 파일 자체를 state로 저장하는걸로 수정함 
  }
  /**
   * Handle event when user click 'Select picture' button
   */
  function handlePictureSelect() {
    searchElement("modal-file").click();
  }
  /**
   * Handle event when user click 'Save profile' button
   */
  function handleModalSave() {
    const userName = searchElement("modal-info-name").value.trim();
    const userAge = searchElement("modal-info-age").value.trim();
    const userGender = searchElement("modal-info-gender").value.trim();
  
    // 입력 데이터 검증
    if (!validateInputData(userName, userAge, userGender)) {
      alert("user information is not valid :(");
    } else {
      // snapshot 때문에 파이어베이스에 변경사항이 있으면 다시 home 페이지의 snapshot 함수가 비동기적으로 실행된다 
      // setProfileName(userName);
      // setProfilePicture(state.loadedPictureData);
      saveUserInfo(userName, userAge, userGender); // 프로필 정보 페이지에서 사용할 데이터 저장
      clearModal();
      hideModal();
      showAlert('profile updated successfully !', 1000);
      // displayMessage('profile updated successfully !', 1000);
    }
  }
  /**
   * Handle event when user press enter key
   * @param {Object} event - key press event
   */
  function handleEnterKeyPress(event){
    if(event.keyCode === 13){
      handleModalSave();
    }
  }

  // 컴포넌트 생성
  /**
   * Build specific component */
  function buildComponent() {
    const modalComponent = buildElement('div', {'id': 'modal-component'}, [
      buildElement('div', {'id': 'modal-header'}, [
        'Select profile picture & save your info',
        buildElement('button', {'id': 'modal-cancel', 'className': 'modal-cancel'}, ['X'])
      ]),
      buildElement('div', {'id': 'modal-contents'}, [
        buildElement('div', {'id': 'modal-filezone'}, [
          buildElement('input', {'id': 'modal-file', 'type': 'file', 'accept': 'image/*'}),
          buildElement('button', {'id': 'modal-select'}, ['Select picture']),
          buildElement('div', {'id': 'modal-filename'}, ['No file selected'])
        ]),
        buildElement('div', {'id': 'modal-info'}, [
          buildElement('input', {'type': 'text', 'id': 'modal-info-name', 'className': 'modal-info-inputs', 'placeholder': 'YOUR NAME'}),
          buildElement('input', {'type': 'text', 'id': 'modal-info-age', 'className': 'modal-info-inputs', 'placeholder': 'YOUR AGE'}),
          buildElement('input', {'type': 'text', 'id': 'modal-info-gender', 'className': 'modal-info-inputs', 'placeholder': 'YOUR GENDER'})
        ])
      ]),
      buildElement('div', {'id': 'modal-footer'}, [
        buildElement('button', {'id': 'modal-save'}, ['Save profile'])
      ])
    ]);

    updateElement('profile-modal', {}, [modalComponent]);
  }

  // 이벤트 핸들러 연결
  /**
   * Attach event handlers related to specific component
   */
  function attachHandlers() {
    searchElement("modal-cancel")
      .addEventListener("click", handleModalCancel);
    
    searchElement("modal-file").addEventListener("click", clearFileCash);

    searchElement("modal-file")
      .addEventListener("change", handlePictureUpload);

    searchElement("modal-select")
      .addEventListener("click", handlePictureSelect);

    searchElement("modal-save")
      .addEventListener("click", handleModalSave);
      
    searchElement("modal-info-gender").addEventListener("keypress", handleEnterKeyPress);
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

export default Modal;
