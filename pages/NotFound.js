import {buildElement, updateElement} from '../lib/helpers.js';

/**
   * 404 page to display when there is no page to route
   */
function NotFound(){
   /**
   * Build specific component */
  function buildComponent(){
    const notFoundPage = buildElement('div', {'id': 'profile-notFound'}, [
      buildElement('img', {'id': 'profile-notFound-img', 'src': 'https://mblogthumb-phinf.pstatic.net/MjAxOTA5MDZfMTgg/MDAxNTY3NzUyNDQ0NTgx.Ebcq2J8i8Rg44ixvQyCfmGqAZNCPMjZCrT_Dog7Mts4g.-4d34s3UnvbtDhjS5xU2ZOcuYJIBKcFgp1iAt-lgarIg.PNG.lw_10page/002_notfound%EC%9B%90%EC%9D%B8.png?type=w800'})
    ])
    updateElement('root', {}, ['']);
    updateElement('root', {}, [notFoundPage]);
  }
  function attachHandlers(){}
  function addComponents(){}

  /**
   * initialize component when rendering on browser
   */
  function init(){
    buildComponent();
    attachHandlers();
    addComponents();
  }
  init(); // 컴포넌트 생성 + 이벤트핸들러 연결
}

export default NotFound;