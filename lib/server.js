// 최신 사용자 정보를 파이어베이스 db에 저장함 
/**
 * Set data to realtime database
 * @param {Object} data - data to set 
 * @param {Function} onFail - handle event when error occures while saving data
 * @param {Function} onSuccess - handle event when saving data succeed
 */
function setDataToFirebaseDB(data, onFail, onSuccess){
  const dbRef = firebase.database().ref();
  dbRef.set(data, (error) => {
    if(error) onFail();
    else onSuccess();
  }) 
}

// 서버로 이미지 파일 전송 
/**
 * Send file to fire storage
 * @param {Object} file - file to send into fire storage
 * @param {Function} onError - handle event when error occures while sending file
 * @param {Function} onSave - handle event when sending file succeed
 */
function sendFileToFirestore(file, onError, onSave){
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(`images/${file.name}`).put(file);
  uploadTask.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
      }, onError, onSave);
}

export {setDataToFirebaseDB, sendFileToFirestore};