import {buildElement, updateElement, displayMessage, searchElement} from '../lib/helpers.js';

function Modal({setProfilePicture, setProfileName, showAlert}) {
  const state = {
    loadedPictureData: ""
  }
  // 지역함수
  function clearModal() {
    state.loadedPictureData = "";
    updateElement('modal-info-name', {'value': ''});
    updateElement('modal-info-age', {'value': ''});
    updateElement('modal-info-gender', {'value': ''});
    updateElement('modal-filename', {}, ["No file selected"]);
  }
  function hideModal() {
    updateElement('profile-modal', {'className': 'profile-modal'});
  }
  function validateFileExtension(fileData) {
    const fileType = fileData.type;
    const ext = fileType.split("/")[0];
    if (ext !== "image") return;
    return true;
  }
  function setUploadedFileName(fileData) {
    updateElement('modal-filename', {}, [fileData.name]);
  }
  function loadPictureData(fileData) {
    state.loadedPictureData = fileData;

    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   console.log("loaded profile picture!");
    //   state.loadedPictureData = e.target.result;
    //   // console.log(state.loadedPictureData)
    // };
    // reader.readAsDataURL(fileData);
  }


  function checkIfNumberIsInteger(num) {
    return num % 1 === 0;
  } // 현재는 사용하지 않음
  function checkIfStringHasSpecialCharacter(str) {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(str);
  }
  function checkIfStringHasNumbers(str) {
    return /\d/.test(str);
  }
  function checkIfStringIsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }
  function checkIfAgeIsValid(str) {
    const age = Number(str);
    if (!checkIfNumberIsInteger(age)) return; // check already on checkIfStringIsOnlyNumbers function (useless code)
    if (age < 1 || age > 150) return;
    return true;
  }
  function checkIfGenderIsValid(str) {
    if (str !== "male" && str !== "female") return;
    return true;
  }

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
  function saveUserInfo(userName, userAge, userGender, imgURL) {
    const file = state.loadedPictureData;
    const userInfoData = {userName, userAge, userGender, userProfileImg: imgURL, fileName: file.name};
    sessionStorage.setItem('userInfoData', JSON.stringify(userInfoData));

    // 서버로 이미지 파일 전송
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`images/${file.name}`).put(file);
    uploadTask.on('state_changed', snapshot => {
            console.log(snapshot) // 파일 업로드중
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, error => {
            console.log(error);
            // 사진 삭제
        }, () => {
            console.log('uploaded file to firebase successfully !'); // 파일 업로드 완료
            firebase.database().ref().set(userInfoData); // 사진이 성공적으로 업로드되면 최신 사용자 정보를 파이어베이스 db에 저장함
        }
      );
  }
  

  // 이벤트 핸들러 정의
  function handleModalCancel() {
    clearModal();
    hideModal();
  }
  function clearFileCash(event) {
    event.target.value = null;
  }
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
  function handlePictureSelect() {
    searchElement("modal-file").click();
  }
  function handleModalSave() {
    const userName = searchElement("modal-info-name").value.trim();
    const userAge = searchElement("modal-info-age").value.trim();
    const userGender = searchElement("modal-info-gender").value.trim();
    const imgURL = window.URL.createObjectURL(state.loadedPictureData)
    console.log('createobjec URL:'+imgURL)
  
    // 입력 데이터 검증
    if (!validateInputData(userName, userAge, userGender)) {
      alert("user information is not valid :(");
    } else {
      setProfileName(userName);
      setProfilePicture(imgURL);
      saveUserInfo(userName, userAge, userGender, imgURL); // 프로필 정보 페이지에서 사용할 데이터 저장
      clearModal();
      hideModal();
      showAlert('profile updated successfully !', 1000);
      // displayMessage('profile updated successfully !', 1000);
    }
  }
  function handleEnterKeyPress(event){
    if(event.keyCode === 13){
      handleModalSave();
    }
  }

  // 컴포넌트 생성
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

  function init(){
    buildComponent();
    attachHandlers();
  }
  init();
}

export default Modal;
