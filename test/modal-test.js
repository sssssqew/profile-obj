import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';

// 모달창의 취소 버튼을 클릭했을때 모달창에 입력한 데이터를 삭제하고 모달창이 제대로 숨겨지는지 테스트
const test1 = 'should clear and hide modal when clicked X button';
// 모달창의 파일선택 버튼을 클릭했을때 파일 캐쉬를 제대로 삭제하는지 테스트
const test2 = 'should clear file cash when clicked input button';

// change 이벤트가 발생했을때 사용자가 선택한 파일이 없는 경우 파일 객체 배열의 길이가 0인지 테스트
const test3 = 'should return length of file 0 when user does not select file';
// change 이벤트가 발생했을때 사용자가 선택한 파일 확장자가 validation 검사를 통과하는지 테스트
const test4 = 'should pass validation check of file extension when user select file';
// change 이벤트가 발생했을때 사용자가 선택한 파일 이름이 UI에 제대로 반영되는지 테스트
const test5 = 'should update file name on UI when user select valid file';
// change 이벤트가 발생했을때 사용자가 선택한 파일 데이터를 제대로 로드하는지 테스트
const test6 = 'should load file data when user select valid file';


// save 버튼을 클릭했을때 사용자가 유효하지 않은 데이터를 입력한 경우 validation이 실패하는지 테스트
const test7 = 'should return false of validation check when user provide invalid data'; 
// save 버튼을 클릭했을때 사용자 정보를 세션 스토리지에 잘 저장하는지 테스트
const test8 = 'should save user information on session storage when user click save button';
// save 버튼을 클릭했을때 프로필 사진이 화면에 잘 표시되는지 테스트
const test9 = 'should display profile image on UI when user click save button';
// save 버튼을 클릭했을때 프로필 이름이 화면에 잘 표시되는지 테스트
const test10 = 'should display profile name on UI when user click save button';
// save 버튼을 클릭했을때 알람 메세지가 화면에 잘 표시되는지 테스트
const test11 = 'should display alert message on UI when user click save button';

/* 단위 테스트 (Unit test) */
const test12 = 'should pass validation check of file extension for given test cases';
const test13 = 'should pass validation check whether if string has special characters for given test cases';
const test14 = 'should pass validation check whether if string has numbers for given test cases';
const test15 = 'should pass validation check whether if string is only numbers for given test cases';
const test16 = 'should pass validation check whether if string is valid age for given test cases';
const test17 = 'should pass validation check whether if string is valid gender for given test cases';

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

function createFile(data, name, type){
  const file = new Blob([data], { type }); 
  file.name = name;
  return file;
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
    const isSatisfied = state.loadedPictureData === '' && readElementProp('modal-info-name', 'value') === '' &&
    readElementProp('modal-info-age', 'value') === '' && readElementProp('modal-info-gender', 'value') === '' &&
    readElementProp('modal-filename', 'innerText') === 'No file selected' && readElementProp('profile-modal', 'className') === 'profile-modal';
                       
    assert(isSatisfied, 'cleared and hid modal successfully !', 'failed to clear and hide modal !')
    // dom 해제
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
   
  })

  test(test2, () => {
   
    // type이 file인 input 요소의 value값은 null이나 빈문자열로만 변경가능하다
    // 테스트를 진행하기에 앞서 value값을 null이나 빈문자열이 아닌 값으로 셋팅해야 하는데 보안상 불가능하다
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

    assert(uploadedFileLength === 0, 'file length is 0 successfully !', 'file length is failed to 0 !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
   
  })

  test(test4, ()=>{
    const testCases = [
      {file: [createFile("", "dummy.png", 'image/png')], exp: true},
      {file: [createFile("", "dummy.pdf", 'application/pdf')], exp: false}
    ]
    
    const result = testCases.every(function(c){
      document.body.appendChild(createModalComponent())
      let isValidedFile = false;
      
      function handlePictureUpload(event) {
        // console.log('file is uploading on testing ...')

        const selectedFiles = c.file; // 사용자가 직접 파일을 선택하지 못하므로 file 객체를 생성해서 사용함 (mocking)
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

      document.body.removeChild(searchElement('profile-modal'))
      return isValidedFile === c.exp;
    })

    assert(result, 'passed validation check of file extension successfully !', 'failed to valid file extension !')
    console.log('\n')
  })

  test(test5, ()=>{
    const filedata = 'test data';
    const filename = "dummy.png";
    const filetype = 'image/png';

    document.body.appendChild(createModalComponent())
    
    function setUploadedFileName(fileData) {
      updateElement('modal-filename', {}, [fileData.name]);
    }
    function handlePictureUpload(event) {
      // console.log('file is uploading on testing ...')
  
      const file = createFile(filedata, filename, filetype) // 사용자가 직접 파일을 선택하지 못하므로 file 객체를 생성해서 사용함 (mocking)
      setUploadedFileName(file);
    }
    searchElement("modal-file").addEventListener("change", handlePictureUpload);

    const event = new Event('change');
    searchElement('modal-file').dispatchEvent(event)

    assert(readElementProp('modal-filename', 'innerText') === filename, 'uploaded file name is updated on UI successfully !', 'uploaded file name is failed to be updated on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
  })

  test(test6, ()=>{
    const filedata = 'test data';
    const filename = "dummy.png";
    const filetype = 'image/png';
    const state = {loadedPictureData: ''};
    const file = createFile(filedata, filename, filetype)

    document.body.appendChild(createModalComponent())
    
    function loadPictureData(fileData) {
      state.loadedPictureData = fileData;
    }
    function handlePictureUpload(event) {
      // console.log('file is uploading on testing ...')

      loadPictureData(file);
    }
    searchElement("modal-file").addEventListener("change", handlePictureUpload);

    const event = new Event('change');
    searchElement('modal-file').dispatchEvent(event)

    // 파일을 읽을때 어느정도 시간이 걸리고 onload 핸들러는 이벤트루프에 등록되어 맨 나중에 실행되기 때문에
    // 결과값 비교를 onload 핸들러 실행뒤에 하려면 결과값 비교 코드블럭을 setTimeout으로 묶어 onload 핸들러 이후에 이벤트루프에 등록해야 한다 (이렇게 하면 다음 테스트 이후에 실행되기 때문에 이렇게 하면 안된다)
    assert(state.loadedPictureData === file, 'loaded file data successfully !', 'failed to load file data !')
    document.body.removeChild(searchElement('profile-modal'))
    console.log('\n')
  
  })

  test(test7, ()=>{
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

    assert(result, 'returned false of validation check successfully !', 'failed to return false of validation check !')
    console.log('\n')
  })

  test(test8, ()=>{
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

    assert(sessionStorage.getItem('userInfoData'), 'saved user information successfully on session storage !', 'failed to save user information on session storage !')
    document.body.removeChild(searchElement('profile-modal'))
    sessionStorage.clear();
    console.log('\n')
  })

  test(test9, ()=>{
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

    assert( (readElementProp('card-picture-img', 'src') === state.loadedPictureData) && (readElementProp('card-picture-img', 'className') === 'card-picture-img show-profileImg'), 'displayed profile image on UI successfully !', 'failed to display profile image on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    document.body.removeChild(profileImg)
    console.log('\n')
  })

  test(test10, ()=>{
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

    assert(readElementProp('card-name', 'innerText') === readElementProp("modal-info-name", 'value').trim(), 'displayed profile name on UI successfully !', 'failed to display profile name on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    document.body.removeChild(cardName)
    console.log('\n')
  })

  test(test11, ()=>{
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

    assert( (readElementProp('alert-component', 'className') === 'alert-component show-alert') && (readElementProp('alert-msg', 'innerText') === 'dummy message'), 'displayed alert message on UI successfully !', 'failed to display alert message on UI !')
    document.body.removeChild(searchElement('profile-modal'))
    document.body.removeChild(alertComponent)
    console.log('\n')
  })

  /* 단위 테스트 */

  test(test12, () => {
    const testCases = [
      {file: createFile("", "test.pdf", 'application/pdf'), exp: undefined},
      {file: createFile("", "test.mp4", 'audio/mp4'), exp: undefined},
      {file: createFile("", "test.ttf", 'font/ttf'), exp: undefined},
      {file: createFile("", "test.png", 'image/png'), exp: true},
      {file: createFile("", "test.3mf", 'model/3mf'), exp: undefined},
      {file: createFile("", "test.html", 'text/html'), exp: undefined},
      {file: createFile("", "test.mp4", 'video/mp4'), exp: undefined},
    ]

    const result = testCases.every(function(c){
      return validateFileExtension(c.file) === c.exp;
    })

    assert(result, 'passed validation check of file extension successfully !', 'failed to pass validation check of file extension !')
    console.log('\n')
  })

  test(test13, () => {
    const testCases = [
      {str: 'test', exp: false},
      {str: 'test[', exp: true},
      {str: 'test`', exp: true},
      {str: 'test!', exp: true},
      {str: 'test@', exp: true},
      {str: 'test#', exp: true},
      {str: 'test$', exp: true},
      {str: 'test%', exp: true},
      {str: 'test^', exp: true},
      {str: 'test&', exp: true},
      {str: 'test*', exp: true},
      {str: 'test(', exp: true},
      {str: 'test)', exp: true},
      {str: 'test_', exp: true},
      {str: 'test+', exp: true},
      {str: 'test-', exp: true},
      {str: 'test=', exp: true},
      {str: 'test{', exp: true},
      {str: 'test}', exp: true},
      {str: 'test;', exp: true},
      {str: "test'", exp: true},
      {str: 'test:', exp: true},
      {str: 'test"', exp: true},
      {str: 'test|', exp: true},
      {str: 'test,', exp: true},
      {str: 'test.', exp: true},
      {str: 'test<', exp: true},
      {str: 'test>', exp: true},
      {str: 'test/', exp: true},
      {str: 'test?', exp: true},
      {str: 'test~', exp: true},
    ]

    const result = testCases.every(function(c){
      return checkIfStringHasSpecialCharacter(c.str) === c.exp;
    })

    assert(result, 'passed validation check whether if string has special characters successfully !', 'failed to pass validation check whether if string has special characters !')
    console.log('\n')
  })

  test(test14, () => {
    const testCases = [
      {str: 'test', exp: false},
      {str: '123test', exp: true},
      {str: 't123est', exp: true},
      {str: 'te123st', exp: true},
      {str: 'tes123t', exp: true},
      {str: 'test123', exp: true}
    ]

    const result = testCases.every(function(c){
      return checkIfStringHasNumbers(c.str) === c.exp;
    })

    assert(result, 'passed validation check whether if string has numbers successfully !', 'failed to pass validation check whether if string has numbers !')
    console.log('\n')
  })

  test(test15, () => {
    const testCases = [
      {str: 'test', exp: false},
      {str: 'test123', exp: false},
      {str: 'test@#$', exp: false},
      {str: '1234@^&*', exp: false},
      {str: '13.4545', exp: false},
      {str: '1343535', exp: true}
    ]

    const result = testCases.every(function(c){
      return checkIfStringIsOnlyNumbers(c.str) === c.exp;
    })

    assert(result, 'passed validation check whether if string is only numbers successfully !', 'failed to pass validation check whether if string is only numbers !')
    console.log('\n')
  })

  test(test16, () => {
    const testCases = [
      {str: 'test', exp: undefined},
      {str: '13.4', exp: undefined},
      {str: '-45', exp: undefined},
      {str: '0', exp: undefined},
      {str: '37', exp: true},
      {str: '35%', exp: undefined},
      {str: 'test37', exp: undefined},
      {str: '257', exp: undefined}
    ]

    const result = testCases.every(function(c){
      return checkIfAgeIsValid(c.str) === c.exp;
    })

    assert(result, 'passed validation check whether if string is valid age successfully !', 'failed to pass validation check whether if string is valid age !')
    console.log('\n')
  })

  test(test17, () => {
    const testCases = [
      {str: 'male', exp: true},
      {str: 'female', exp: true},
      {str: '', exp: undefined},
      {str: 'mail', exp: undefined},
      {str: 'mal', exp: undefined},
      {str: 'mael', exp: undefined},
      {str: 'meal', exp: undefined},
      {str: 'femail', exp: undefined},
      {str: 'femeal', exp: undefined},
      {str: 'Feminine', exp: undefined},
      {str: 'guy', exp: undefined},
      {str: 'man', exp: undefined},
      {str: 'mr', exp: undefined},
      {str: 'girl', exp: undefined},
      {str: 'woman', exp: undefined},
      {str: 'mrs', exp: undefined},
      {str: 'gender', exp: undefined}
    ]

    const result = testCases.every(function(c){
      return checkIfGenderIsValid(c.str) === c.exp;
    })

    assert(result, 'passed validation check whether if string is valid gender successfully !', 'failed to pass validation check whether if string is valid gender !')
    console.log('\n')
  })

}

export default modalComponentTest