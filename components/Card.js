
// 이벤트 핸들러 정의
function hideProfileImg(event){
  event.target.classList.remove('show-profileImg');
}

// 컴포넌트 생성


// 이벤트 핸들러 연결
document.getElementById('card-picture').firstElementChild.addEventListener('error', hideProfileImg);