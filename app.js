var loadedPictureData = "";
      var userInfoData = {};

      function checkIfStringHasSpecialCharacter(str){
        const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return re.test(str);
      }
      function checkIfStringHasNumbers(str){
        return /\d/.test(str); 
      }
      function checkIfStringIsOnlyNumbers(str){
        return /^\d+$/.test(str);
      }
      function checkIfNumberIsInteger(num){
        return num % 1 === 0;
      }
      function checkIfAgeIsValid(str){
        const age = Number(str);
        if(!checkIfNumberIsInteger(age)) return; // check already on checkIfStringIsOnlyNumbers function (useless code)
        if(age < 1 || age > 150) return;
        return true;
      }
      function checkIfGenderIsValid(str){
        if(str !== "male" && str !== "female") return;
        return true;
      }
      function validateUserInfo(userName, userAge, userGender){

        if(userName === "" || checkIfStringHasSpecialCharacter(userName) || checkIfStringHasNumbers(userName)){
          return;
        }
        if(userAge === "" || !checkIfStringIsOnlyNumbers(userAge) || !checkIfAgeIsValid(userAge)){
          return;
        }
        if(userGender === "" || !checkIfGenderIsValid(userGender)){
          return;
        }
        return true;
      }
      function validateInputData(userName, userAge, userGender){
        if(!validateUserInfo(userName, userAge, userGender)) return;
        return true;
      }
      function validateFileExtension(fileData){
        const fileType = fileData.type;
        const ext = fileType.split("/")[0];
        if(ext !== "image") return;
        return true;
      }
      function loadPictureData(fileData){
        var reader = new FileReader(); 
        reader.onload=function(e){
          console.log('loaded profile picture!'); 
          loadedPictureData = e.target.result;
          // console.log(loadedPictureData)
        }; 
        reader.readAsDataURL(fileData);
      }
      function showModal(){
        document.getElementById('profile-modal').classList.add('show-modal');
      }
      function hideModal(){
        document.getElementById('profile-modal').classList.remove('show-modal');
      }
      function clearModal(){
        loadedPictureData = "";
        document.getElementById('modal-info-name').value=''; 
        document.getElementById('modal-info-age').value=''; 
        document.getElementById('modal-info-gender').value=''; 
        document.getElementById('modal-filename').innerText='No file selected';
      }
      function setProfilePicture(){
        const profileImg = document.getElementById('card-picture').firstElementChild;
        profileImg.src=loadedPictureData; 
        profileImg.classList.add('show-profileImg');
      }
      function setProfileName(userName){
        document.getElementById('card-name').innerText = userName; 
      }
      function setUploadedFileName(fileData){
        document.getElementById('modal-filename').innerText=fileData.name; 
      }
      function saveUserInfo(userName, userAge, userGender){
        userInfoData.userName = userName;
        userInfoData.userAge = userAge;
        userInfoData.userGender = userGender;
      }
    // Define Event handlers
      // function hideProfileImg(event){
      //   event.target.classList.remove('show-profileImg');
      // }
      function clearFileCash(event){
        event.target.value = null;
      }
      function handleProfileSubmit(){
        showModal();
      }
      function handleModalCancel(){
        clearModal();
        hideModal();
      }
      function handlePictureSelect(){
        document.getElementById('modal-file').click()
      }
      function handlePictureUpload(event){ // 파일 취소시 해당 이벤트로 들어오지 않음
        // 파일 존재여부 검사
        const selectedFiles = event.target.files;
        if(selectedFiles.length < 1) return;

        // 파일 확장자 유효성 검사
        if(!validateFileExtension(selectedFiles[0])){
          alert("uploaded files is not valid");
          return;
        } 
        setUploadedFileName(selectedFiles[0]);
        loadPictureData(selectedFiles[0])
      }
      function handleModalSave(){
        const userName = document.getElementById('modal-info-name').value.trim();
        const userAge = document.getElementById('modal-info-age').value.trim();
        const userGender = document.getElementById('modal-info-gender').value.trim();

        // 입력 데이터 검증
        if(!validateInputData(userName, userAge, userGender)){
          alert("user information is not valid :(");
        }else{
          saveUserInfo(userName, userAge, userGender); // 프로필 정보 페이지에서 사용할 데이터 저장
          setProfileName(userName);
          setProfilePicture();
          clearModal();
          hideModal();
          console.log(userInfoData)
        }
      }

      // attach eventhandlers
      // document.getElementById('card-picture').firstElementChild.addEventListener('error', hideProfileImg);
      document.getElementById('profile-submit').addEventListener('click', handleProfileSubmit);
      document.getElementById('modal-cancel').addEventListener('click', handleModalCancel);
      document.getElementById('modal-file').addEventListener('click', clearFileCash);
      document.getElementById('modal-file').addEventListener('change', handlePictureUpload);
      document.getElementById('modal-select').addEventListener('click', handlePictureSelect);
      document.getElementById('modal-save').addEventListener('click', handleModalSave);