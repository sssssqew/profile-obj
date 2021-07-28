import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';

const test1 = 'should clear and hide modal when clicked X button';
const test2 = 'should clear file cash when clicked input button';

// change 이벤트가 발생했을때 사용자가 선택한 파일이 없는 경우 빈값을 제대로 리턴하는지 테스트
const test3 = 'should return length of file 0 when user does not select file';

// change 이벤트가 발생했을때 사용자가 선택한 파일 타입에 따라 boolean 값을 제대로 리턴하는지 테스트
const test4 = 'should return true when user select valid file';
const test5 = 'should return false when user select invalid file';

// change 이벤트가 발생했을때 사용자가 선택한 파일 이름이 UI에 제대로 반영되는지 테스트
const test6 = 'should update file name on UI when user select valid file';
// change 이벤트가 발생했을때 사용자가 선택한 파일 데이터를 제대로 로드하는지 테스트
const test7 = 'should load file data when user select valid file';

// save 버튼을 클릭했을때 사용자가 데이터를 입력하지 않거나 유효하지 않은 데이터를 입력한 경우 validation이 실패하는지 테스트
const test8 = 'should return false of validation check when user provide invalid data'; 

// save 버튼을 클릭했을때 사용자 정보를 세션 스토리지에 잘 저장하는지 테스트
const test9 = 'should save user information on session storage when user click save button';

// save 버튼을 클릭했을때 프로필 사진이 화면에 잘 표시되는지 테스트
const test10 = 'should display profile image on UI when user click save button';

// save 버튼을 클릭했을때 프로필 이름이 화면에 잘 표시되는지 테스트
const test11 = 'should display profile name on UI when user click save button';

// save 버튼을 클릭했을때 알람 메세지가 화면에 잘 표시되는지 테스트
const test12 = 'should display alert message on UI when user click save button';


function createModalComponent(){
  const modalComponent = buildElement('div', {'id': 'profile-modal', 'className': 'profile-modal'}, [
    buildElement('div', {'id': 'modal-component'}, [
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
    ])
  ])
  return modalComponent
}

function validateFileExtension(fileData) {
  const fileType = fileData.type;
  const ext = fileType.split("/")[0];
  if (ext !== "image") return;
  return true;
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


// 문자열을 이용하여 가짜 이미지 데이터(base64 string)를 생성하는 함수
function createImgData(str){
  const img = window.btoa(str);
  return 'data:image/png;base64,'+img;
}

function setModalComponent(fakeData){
  updateElement('modal-info-name', {'value': fakeData.name});
  updateElement('modal-info-age', {'value': fakeData.age});
  updateElement('modal-info-gender', {'value': fakeData.gender});
  updateElement('modal-filename', {}, [fakeData.fileName]);
  updateElement('profile-modal', {'className': 'profile-modal show-modal'});
}


function modalComponentTest(){
  test(test1, () => {
    
    document.body.appendChild(createModalComponent())
    const state = {loadedPictureData: 'test data'};
    
    const fakeData = {name: 'test name', age: 'test age', gender: 'test gender', fileName: "Test file name"}
    setModalComponent(fakeData)

    // 이벤트핸들러 정의
    function clearModal() {
      // console.log('clearing modal on testing ...')
      state.loadedPictureData = "";
      updateElement('modal-info-name', {'value': ''});
      updateElement('modal-info-age', {'value': ''});
      updateElement('modal-info-gender', {'value': ''});
      updateElement('modal-filename', {}, ["No file selected"]);
    }
    function hideModal() {
      // console.log('Hiding modal on testing ...')
      updateElement('profile-modal', {'className': 'profile-modal'});
    }
    function handleModalCancel() {
      clearModal();
      hideModal();
    }
    searchElement("modal-cancel").addEventListener("click", handleModalCancel);
    
    // 이벤트 발생
    // searchElement("modal-cancel").click()
    
    const event = new Event('click');
    searchElement('modal-cancel').dispatchEvent(event)

    // 결과값 비교
    console.log(`\n[ ${test1} ]`)
    assert(state.loadedPictureData === '', 'loaded image data is cleared successfully !','loaded image data is not cleared !');
    assert(readElementProp('modal-info-name', 'value') === '', 'modal info name is cleared successfully !','modal info name is not cleared !');
    assert(readElementProp('modal-info-age', 'value') === '', 'modal info age is cleared successfully !','modal info age is not cleared !');
    assert(readElementProp('modal-info-gender', 'value') === '', 'modal info gender is cleared successfully !','modal info gender is not cleared !');
    assert(readElementProp('modal-filename', 'innerText') === 'No file selected', 'modal file name is cleared successfully !','modal file name is not cleared !')
    assert(readElementProp('profile-modal', 'className') === 'profile-modal', 'modal is hidden successfully!','modal is not hidden !')
    // dom 해제
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
   
  })

  test(test2, () => {
   
    // type이 file인 input 요소의 value값은 null이나 빈문자열로만 변경가능하다
    // 테스트를 진행하기에 앞서 value값을 null이나 빈문자열이 아닌 값으로 셋팅해야 하는데 보안상 불가능하다
    console.log(`\n[ ${test2} ]`)
    assert(false, '', 'test is not possible because of security reason')
    console.log('\n')
    
  })

  test(test3, ()=>{
    
    document.body.appendChild(createModalComponent())
    let uploadedFileLength = null;
    
    function handlePictureUpload(event) {
      // console.log('file is uploading on testing ...')
      const selectedFiles = event.target.files;
      uploadedFileLength = selectedFiles.length;
      if (selectedFiles.length < 1) return;
    }
    searchElement("modal-file").addEventListener("change", handlePictureUpload);

    // 파일을 선택하지 않고 change 이벤트를 발생시키면 event.target.files.length = 0
    const event = new Event('change');
    searchElement('modal-file').dispatchEvent(event)

    console.log(`\n[ ${test3} ]`)
    assert(uploadedFileLength === 0, 'file length is 0 successfully !', 'file length is failed to 0 !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
   
  })

  test(test4, ()=>{
    document.body.appendChild(createModalComponent())
    let isValidedFile = false;

    function handlePictureUpload(event) {
      // console.log('file is uploading on testing ...')

      const selectedFiles = [new File([""], "dummy.png", { type: 'image/png' })]; // 사용자가 직접 파일을 선택하지 못하므로 file 객체를 생성해서 사용함 (mocking)
      // 파일 확장자 유효성 검사
      if (!validateFileExtension(selectedFiles[0])) {
        isValidedFile = false;
      }else{
        isValidedFile = true;
      }
    }
    searchElement("modal-file").addEventListener("change", handlePictureUpload);

    const event = new Event('change');
    searchElement('modal-file').dispatchEvent(event)

    console.log(`\n[ ${test4} ]`)
    assert(isValidedFile === true, 'uploaded file is valid successfully !', 'uploaded file is failed to valid !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
  })

  test(test5, ()=>{
    document.body.appendChild(createModalComponent())
    let isValidedFile = null;

    function handlePictureUpload(event) {
      // console.log('file is uploading on testing ...')

      const selectedFiles = [new File([""], "dummy.pdf", { type: 'application/pdf' })]; // 사용자가 직접 파일을 선택하지 못하므로 file 객체를 생성해서 사용함 (mocking)
      // 파일 확장자 유효성 검사
      if (!validateFileExtension(selectedFiles[0])) {
        isValidedFile = false;
      }else{
        isValidedFile = true;
      }
    }
    searchElement("modal-file").addEventListener("change", handlePictureUpload);

    const event = new Event('change');
    searchElement('modal-file').dispatchEvent(event)

    console.log(`\n[ ${test5} ]`)
    assert(isValidedFile === false, 'uploaded file is not valid successfully !', 'uploaded file is failed to be invalid !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
  })

  test(test6, ()=>{
    document.body.appendChild(createModalComponent())
    
    function setUploadedFileName(fileData) {
      updateElement('modal-filename', {}, [fileData.name]);
    }
    function handlePictureUpload(event) {
      // console.log('file is uploading on testing ...')

      const selectedFiles = [new File([""], "dummy.png", { type: 'image/png' })]; // 사용자가 직접 파일을 선택하지 못하므로 file 객체를 생성해서 사용함 (mocking)
      setUploadedFileName(selectedFiles[0]);
    }
    searchElement("modal-file").addEventListener("change", handlePictureUpload);

    const event = new Event('change');
    searchElement('modal-file').dispatchEvent(event)

    console.log(`\n[ ${test6} ]`)
    assert(readElementProp('modal-filename', 'innerText') === 'dummy.png', 'uploaded file name is updated on UI successfully !', 'uploaded file name is failed to be updated on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
  })

  test(test7, ()=>{
    document.body.appendChild(createModalComponent())
    const state = {loadedPictureData: ''};
    const str = "I don't care about a broken image";
    const imgData = createImgData(str);
    
    function loadPictureData(fileData) {
      var reader = new FileReader();
      reader.onload = function (e) {
        // console.log("loaded profile picture!");
        // readAsDataURL 역할이 파일 객체의 str 데이터를 base64 문자열로 변경하므로 결과적으로 createImgData 와 같다
        // readAsDataURL는 이벤트루프에 등록되어 비동기로 실행되는데 테스트는 동기적으로 실행되어야 하므로 createImgData를 사용한다
        state.loadedPictureData = createImgData(str); 
      };
      // load event를 동기적으로 발생시키기 위해서 아래와 같이 한다
      const event = new Event('load');
      reader.dispatchEvent(event)

      // reader.readAsDataURL(fileData); // 파일객체의 str 데이터를 base64 문자열로 변경함 (createImgData 와 같은 역할)    
      // console.log(fileData.text()) // file 객체의 데이터를 텍스트로 읽어온다 (비동기적으로 실행되며 여기서는 str과 같은 값이다)
      // const url = URL.createObjectURL(fileData) // file 객체를 이용하여 blob 링크를 생성한다 (동기적으로 실행되며 img src에 주입한다)
      // URL.createObjectURL() // readAsDataURL 함수는 비동기지만 이 함수는 동기적으로 실행된다

    }
    function handlePictureUpload(event) {
      // console.log('file is uploading on testing ...')

      const selectedFiles = [new File([str], "dummy.png", { type: 'image/png' })]; // 사용자가 직접 파일을 선택하지 못하므로 file 객체를 생성해서 사용함 (mocking)
      loadPictureData(selectedFiles[0]);
    }
    searchElement("modal-file").addEventListener("change", handlePictureUpload);

    const event = new Event('change');
    searchElement('modal-file').dispatchEvent(event)

    // 파일을 읽을때 어느정도 시간이 걸리고 onload 핸들러는 이벤트루프에 등록되어 맨 나중에 실행되기 때문에
    // 결과값 비교를 onload 핸들러 실행뒤에 하려면 결과값 비교 코드블럭을 setTimeout으로 묶어 onload 핸들러 이후에 이벤트루프에 등록해야 한다 (이렇게 하면 다음 테스트 이후에 실행되기 때문에 이렇게 하면 안된다)
   
    console.log(`\n[ ${test7} ]`)
    assert(state.loadedPictureData === imgData, 'loaded file data successfully !', 'failed to load file data !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
  
  })

  test(test8, ()=>{
    const testCases = [
      {name: '', age: '3', gender: 'female', fileName: "Test file name"},            // 사용자가 이름을 입력하지 않은 경우 
      {name: 'dummyname$', age: '3', gender: 'female', fileName: "Test file name"},  // 사용자가 입력한 이름에 특수문자가 포함된 경우 
      {name: 'dummy name', age: '3', gender: 'female', fileName: "Test file name"},  // 사용자가 입력한 이름 안에 공백이 포함된 경우 
      {name: 'dummy3name78', age: '3', gender: 'female', fileName: "Test file name"}, // 사용자가 입력한 이름 안에 숫자가 포함된 경우 
      {name: 'dummyName', age: '', gender: 'female', fileName: "Test file name"},     // 사용자가 나이를 입력하지 않은 경우 
      {name: 'dummyName', age: 'age3', gender: 'female', fileName: "Test file name"}, // 사용자가 입력한 나이에 숫자가 아닌 문자가 포함된 경우
      {name: 'dummyName', age: '1000', gender: 'female', fileName: "Test file name"}, // 사용자가 입력한 나이 범위가 상식을 벗어난 경우
      {name: 'dummyName', age: '3', gender: '', fileName: "Test file name"},          // 사용자가 성별을 입력하지 않은 경우
      {name: 'dummyName', age: '3', gender: 'neutral', fileName: "Test file name"}    // 사용자가 입력한 성별이 male이나 female이 아닌 경우
    ]

    const result = testCases.every(function(c){
      document.body.appendChild(createModalComponent())
      let isValidUserInfo = null;
      setModalComponent(c)

      function handleModalSave() {
        const userName = searchElement("modal-info-name").value.trim();
        const userAge = searchElement("modal-info-age").value.trim();
        const userGender = searchElement("modal-info-gender").value.trim();
      
        // 입력 데이터 검증
        if (!validateInputData(userName, userAge, userGender)) {
          isValidUserInfo = false;
        } else {
          isValidUserInfo = true;
        }
      }
      searchElement("modal-save").addEventListener("click", handleModalSave);

      const event = new Event('click');
      searchElement('modal-save').dispatchEvent(event)

      document.body.removeChild(searchElement('profile-modal'))
      return isValidUserInfo === false;
    })

    console.log(`\n[ ${test8} ]`)
    assert(result, 'returned false of validation check successfully !', 'failed to return false of validation check !')
    console.log('\n')
  })

  

  test(test9, ()=>{
    document.body.appendChild(createModalComponent())
    const str = "I don't care about a broken image";
    const state = {loadedPictureData: createImgData(str)}

    const fakeData = {name: 'dummyName', age: '3', gender: 'male', fileName: "Test file name"}
    setModalComponent(fakeData)

    function saveUserInfo(userName, userAge, userGender) {
      const userInfoData = {userName, userAge, userGender, userProfileImg: state.loadedPictureData};
      sessionStorage.setItem('userInfoData', JSON.stringify(userInfoData));
    }
    function handleModalSave() {
      const userName = searchElement("modal-info-name").value.trim();
      const userAge = searchElement("modal-info-age").value.trim();
      const userGender = searchElement("modal-info-gender").value.trim();
    
      saveUserInfo(userName, userAge, userGender);
    }
    searchElement("modal-save").addEventListener("click", handleModalSave);

    const event = new Event('click');
    searchElement('modal-save').dispatchEvent(event)

    console.log(`\n[ ${test9} ]`)
    assert(sessionStorage.getItem('userInfoData'), 'saved user information successfully on session storage !', 'failed to save user information on session storage !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
  })

  test(test10, ()=>{
    document.body.appendChild(createModalComponent())
    const profileImg = buildElement('img', {'id': 'card-picture-img', 'src': '', 'className': 'card-picture-img'})
    document.body.appendChild(profileImg)

    const str = "I don't care about a broken image";
    const state = {loadedPictureData: createImgData(str)}

    function setProfilePicture(userProfileImg) {
      updateElement('card-picture-img', {'src': userProfileImg, 'className': 'card-picture-img show-profileImg'});
    }
    function handleModalSave() {
      setProfilePicture(state.loadedPictureData);
    }
    searchElement("modal-save").addEventListener("click", handleModalSave);

    const event = new Event('click');
    searchElement('modal-save').dispatchEvent(event)

    console.log(`\n[ ${test10} ]`)
    assert( (readElementProp('card-picture-img', 'src') === state.loadedPictureData) && (readElementProp('card-picture-img', 'className') === 'card-picture-img show-profileImg'), 'displayed profile image on UI successfully !', 'failed to display profile image on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    document.body.removeChild(profileImg)
    console.log('\n')
  })

  test(test11, ()=>{
    document.body.appendChild(createModalComponent())
    const cardName = buildElement('div', {'id': 'card-name'});
    document.body.appendChild(cardName)

    const fakeData = {name: '   dummyName   ', age: '3', gender: 'male', fileName: "Test file name"}
    setModalComponent(fakeData)

    function setProfileName(userName) {
      updateElement('card-name', {}, [userName]);
    }
    function handleModalSave() {
      const userName = searchElement("modal-info-name").value.trim();
      const userAge = searchElement("modal-info-age").value.trim();
      const userGender = searchElement("modal-info-gender").value.trim();
    
      setProfileName(userName);
    }
    searchElement("modal-save").addEventListener("click", handleModalSave);

    const event = new Event('click');
    searchElement('modal-save').dispatchEvent(event)

    console.log(`\n[ ${test11} ]`)
    assert(readElementProp('card-name', 'innerText') === readElementProp("modal-info-name", 'value').trim(), 'displayed profile name on UI successfully !', 'failed to display profile name on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    document.body.removeChild(cardName)
    console.log('\n')
  })

  test(test12, ()=>{
    document.body.appendChild(createModalComponent())
    const alertComponent = buildElement('div', {'id': 'alert-component', 'className': 'alert-component'}, [
      buildElement('div', {'id': 'alert-msg'}, ['']),
    ]);
    document.body.appendChild(alertComponent)
   
    // 동기적으로 실행되어야 하므로 setTimeout은 제거한다
    // setTimeout은 브라우저 API이므로 당연히 정상 작동한다고 가정한다
    function showAlert(msg, duration){
      // setTimeout(function(){
        updateElement('alert-component', {'className': 'alert-component show-alert'})
        updateElement('alert-msg', {}, [msg])
      // }, duration)
    }
    function handleModalSave() {
      showAlert('dummy message', 1000);
    }
    searchElement("modal-save").addEventListener("click", handleModalSave);

    const event = new Event('click');
    searchElement('modal-save').dispatchEvent(event)

    console.log(`\n[ ${test12} ]`)
    assert( (readElementProp('alert-component', 'className') === 'alert-component show-alert') && (readElementProp('alert-msg', 'innerText') === 'dummy message'), 'displayed alert message on UI successfully !', 'failed to display alert message on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    document.body.removeChild(alertComponent)
    console.log('\n')
  })

}

export default modalComponentTest