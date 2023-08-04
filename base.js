function barMenu() {
  const icon_bar = document.querySelector('.nav-bar');
  const icon_item = document.querySelectorAll('.nav-bar > span');
  const header_menu = document.querySelector('.nav');
  let isXState = true;
  icon_bar.addEventListener('click', () => {
    icon_item.forEach((item, index) => {
      if (isXState) {
        index === 0
          ? (item.style = `top : 10px ; rotate : 35deg`)
          : index === 1
          ? (item.style.opacity = `1`)
          : (item.style = `top : -8px ; rotate: -35deg`);
        header_menu.style.display = 'block';
        isXState = false;
      } else {
        index === 0 ? (item.style = `top : 0 ; rotate : 0`) : index === 1 ? (item.style.opacity = '0') : (item.style = `top : 0 ; rotate: 0`);
        header_menu.style.display = 'none';
        isXState = true;
      }
    });
  });
}
barMenu();
const searchInput = document.querySelector('.search-wrapper > img');
const searchWrapper = document.querySelector('.search-wrapper');
let isSearch = true;
searchInput.addEventListener('click', (e) => {
  if (isSearch) {
    searchWrapper.style = `flex-grow : 1`;
    isSearch = false;
  } else {
    searchWrapper.style = `flex-grow : 0`;
    isSearch = true;
  }
});
