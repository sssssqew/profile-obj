import {test} from '../lib/test.js';
import {buildElement, updateElement, readElementProp, searchElement} from '../lib/helpers.js';

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
  test('should clear and hide modal when clicked X button', () => {
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
      console.log('clearing modal on testing ...')
      state.loadedPictureData = "";
      updateElement('modal-info-name', {'value': ''});
      updateElement('modal-info-age', {'value': ''});
      updateElement('modal-info-gender', {'value': ''});
      updateElement('modal-filename', {}, ["No file selected"]);
    }
    function hideModal() {
      console.log('Hiding modal on testing ...')
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

      // 결과값 비교
      console.assert(state.loadedPictureData === '', 'loaded image data is not cleared !');
      console.assert(readElementProp('modal-info-name', 'value') === '', 'modal info name is not cleared !');
      console.assert(readElementProp('modal-info-age', 'value') === '', 'modal info age is not cleared !');
      console.assert(readElementProp('modal-info-gender', 'value') === '', 'modal info gender is not cleared !');
      console.assert(readElementProp('modal-filename', 'innerText') === 'No file selected', 'modal filename is not cleared !')
      console.assert(readElementProp('profile-modal', 'className') === 'profile-modal', 'modal is not hidden !')
      // dom 해제
      document.body.removeChild(searchElement('profile-modal'))
      console.log('\n')
    }, 0)
   
  })

  test('should clear file cash when clicked input button', () => {
    createModalComponent()

    function setModalComponent(){
      updateElement("modal-file", {'value': ''}) // 보안문제로 value 값은 빈 문자열로만 셋팅가능
    }
    setModalComponent()

    // 이벤트핸들러 정의
    function handlePictureSelect() {
      searchElement("modal-file").click();
    }
    function clearFileCash(event) {
      console.log('clear file ~~~')
      event.target.value = null;
    }
    searchElement("modal-file").addEventListener("click", clearFileCash);
    searchElement("modal-select").addEventListener("click", handlePictureSelect);
 
    setTimeout(function(){
      // 이벤트 발생               
      // searchElement("modal-file").click()

      const event = new Event('click');
      searchElement('modal-file').dispatchEvent(event)


      // 결과값 비교
      console.assert(readElementProp('modal-file', 'value') === null, 'file cash is not cleared !')

      // dom 해제
      document.body.removeChild(searchElement('profile-modal'))
      console.log('\n')
    }, 0)
      
  })
}

export default modalComponentTest