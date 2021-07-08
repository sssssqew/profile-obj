import buildElement from "../lib/helpers.js";

function Modal(pageVariables) {
  // 지역함수
  function clearModal() {
    pageVariables.loadedPictureData = "";
    document.getElementById("modal-info-name").value = "";
    document.getElementById("modal-info-age").value = "";
    document.getElementById("modal-info-gender").value = "";
    document.getElementById("modal-filename").innerText = "No file selected";
  }
  function hideModal() {
    document.getElementById("profile-modal").classList.remove("show-modal");
  }
  function validateFileExtension(fileData) {
    const fileType = fileData.type;
    const ext = fileType.split("/")[0];
    if (ext !== "image") return;
    return true;
  }
  function setUploadedFileName(fileData) {
    document.getElementById("modal-filename").innerText = fileData.name;
  }
  function loadPictureData(fileData) {
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log("loaded profile picture!");
      pageVariables.loadedPictureData = e.target.result;
      // console.log(pageVariables.loadedPictureData)
    };
    reader.readAsDataURL(fileData);
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
  function saveUserInfo(userName, userAge, userGender) {
    pageVariables.userInfoData.userName = userName;
    pageVariables.userInfoData.userAge = userAge;
    pageVariables.userInfoData.userGender = userGender;
  }
  function setProfileName(userName) {
    document.getElementById("card-name").innerText = userName;
  }
  function setProfilePicture() {
    const profileImg = document.getElementById("card-picture").firstElementChild;
    profileImg.src = pageVariables.loadedPictureData;
    profileImg.classList.add("show-profileImg");
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
  
    // 파일 확장자 유효성 검사
    if (!validateFileExtension(selectedFiles[0])) {
      alert("uploaded files is not valid");
      return;
    }
    setUploadedFileName(selectedFiles[0]);
    loadPictureData(selectedFiles[0]);
  }
  function handlePictureSelect() {
    document.getElementById("modal-file").click();
  }
  function handleModalSave() {
    const userName = document.getElementById("modal-info-name").value.trim();
    const userAge = document.getElementById("modal-info-age").value.trim();
    const userGender = document.getElementById("modal-info-gender").value.trim();
  
    // 입력 데이터 검증
    if (!validateInputData(userName, userAge, userGender)) {
      alert("user information is not valid :(");
    } else {
      saveUserInfo(userName, userAge, userGender); // 프로필 정보 페이지에서 사용할 데이터 저장
      setProfileName(userName);
      setProfilePicture();
      clearModal();
      hideModal();
      console.log(pageVariables.userInfoData);
    }
  }

  // 컴포넌트 생성
  function buildComponent() {
    // 모달 헤더
    const modalCancel = buildElement('button', {'id': 'modal-cancel', 'class': 'modal-cancel'});
    modalCancel.innerText = 'X';
    const modalHeader = buildElement('div', {'id': 'modal-header'});
    modalHeader.innerText = 'Select profile picture & save your info.';
    modalHeader.appendChild(modalCancel);

    // 모달 컨텐츠 - 파일존
    const modalFile = buildElement('input', {'id': 'modal-file', 'type': 'file', 'accept': 'image/*'});
    const modalSelect = buildElement('button', {'id': 'modal-select'});
    modalSelect.innerText = 'Select picture';
    const modalFilename = buildElement('div', {'id': 'modal-filename'});
    modalFilename.innerText = 'No file selected';
    const modalFilezone = buildElement('div', {'id': 'modal-filezone'});
    modalFilezone.append(modalFile, modalSelect, modalFilename);

    // 모달 컨텐츠 - 인포
    const modalInfoName = buildElement('input', {'type': 'text', 'id': 'modal-info-name', 'class': 'modal-info-inputs', 'placeholder': 'YOUR NAME'});
    const modalInfoAge = buildElement('input', {'type': 'text', 'id': 'modal-info-age', 'class': 'modal-info-inputs', 'placeholder': 'YOUR AGE'});
    const modalInfoGender = buildElement('input', {'type': 'text', 'id': 'modal-info-gender', 'class': 'modal-info-inputs', 'placeholder': 'YOUR GENDER'});
    const modalInfo = buildElement('div', {'id': 'modal-info'});
    modalInfo.append(modalInfoName, modalInfoAge, modalInfoGender);
    
    const modalContents = buildElement('div', {'id': 'modal-contents'});
    modalContents.append(modalFilezone, modalInfo);
   
    //모달 풋터
    const modalSave = buildElement('button', {'id': 'modal-save'});
    modalSave.innerText = 'Save profile';
    const modalFooter = buildElement('div', {'id': 'modal-footer'});
    modalFooter.appendChild(modalSave);

    const modalComponent = buildElement('div', {'id': 'modal-component'});
    modalComponent.append(modalHeader, modalContents, modalFooter);
    
    const profileModal = document.getElementById('profile-modal');
    profileModal.appendChild(modalComponent);
    console.log(modalComponent);
  }

  // 이벤트 핸들러 연결
  function attachHandlers() {
    document
  .getElementById("modal-cancel")
  .addEventListener("click", handleModalCancel);

document.getElementById("modal-file").addEventListener("click", clearFileCash);

document
  .getElementById("modal-file")
  .addEventListener("change", handlePictureUpload);

document
  .getElementById("modal-select")
  .addEventListener("click", handlePictureSelect);

document
  .getElementById("modal-save")
  .addEventListener("click", handleModalSave);
  }

  function init(){
    buildComponent();
    attachHandlers();
  }
  init();
}

export default Modal;
