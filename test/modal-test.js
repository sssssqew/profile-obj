import {test, assert} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';

const test1 = 'should clear and hide modal when clicked X button';
const test2 = 'should clear file cash when clicked input button';
// change 이벤트가 발생했을때 사용자가 선택한 파일이 없는 경우 빈값을 제대로 리턴하는지 테스트
// change 이벤트가 발생했을때 사용자가 선택한 파일 타입에 따라 boolean 값을 제대로 리턴하는지 테스트
// change 이벤트가 발생했을때 사용자가 선택한 파일 이름이 UI에 제대로 반영되는지 테스트
// change 이벤트가 발생했을때 사용자가 선택한 파일 데이터를 제대로 로드하는지 테스트

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
  document.body.appendChild(modalComponent)
}


function modalComponentTest(){
  test(test1, () => {
    createModalComponent()
    const state = {loadedPictureData: 'test data'};
    
    function setModalComponent(){
      updateElement('modal-info-name', {'value': 'test name'});
      updateElement('modal-info-age', {'value': 'test age'});
      updateElement('modal-info-gender', {'value': 'test gender'});
      updateElement('modal-filename', {}, ["Test file name"]);
      updateElement('profile-modal', {'className': 'profile-modal show-modal'});
    }
    setModalComponent()

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
    
    setTimeout(function(){
      // 이벤트 발생
      searchElement("modal-cancel").click()
      console.log(`\n-- [Test Result] ${test1} --`)

      // 결과값 비교
      assert(state.loadedPictureData === '', 'loaded image data is cleared successfully !','loaded image data is not cleared !');
      assert(readElementProp('modal-info-name', 'value') === '', 'modal info name is cleared successfully !','modal info name is not cleared !');
      assert(readElementProp('modal-info-age', 'value') === '', 'modal info age is cleared successfully !','modal info age is not cleared !');
      assert(readElementProp('modal-info-gender', 'value') === '', 'modal info gender is cleared successfully !','modal info gender is not cleared !');
      assert(readElementProp('modal-filename', 'innerText') === 'No file selected', 'modal file name is cleared successfully !','modal file name is not cleared !')
      assert(readElementProp('profile-modal', 'className') === 'profile-modal', 'modal is hidden successfully!','modal is not hidden !')
      // dom 해제
      document.body.removeChild(searchElement('profile-modal'))
      console.log('\n')
    }, 0)
   
  })

  test(test2, () => {
    setTimeout(function(){
      console.log(`\n-- [Test Result] ${test2} --`)
      assert(false, '', 'test is not possible because of security reason')
      console.log('\n')
    }, 0)
  })
}

export default modalComponentTest