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
const banner = document.querySelectorAll('.banner-img');
const middle = document.querySelectorAll('.banner-middle > span');
let currentIndex = 0;
const changeSlide = (direction) => {
  const index = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  if (index >= banner.length || index < 0) return;
  banner[currentIndex].style.transform = `translateX(${direction === 'next' ? '-' : ''}${index}00%)`;
  banner[index].style.transform = `translateX(-${index}00%)`;
  currentIndex = index;
  middle[direction === 'next' ? 1 : 0].style.background = '#fff';
  middle[direction === 'next' ? 0 : 1].style.background = 'rgb(255, 255, 255, 0.2)';
};
document.querySelector('.deals-left').addEventListener('click', () => navProduct());
document.querySelector('.deals-right').addEventListener('click', () => navProduct());
const navProduct = () => {
  window.location.href = `../product/product.html`;
};
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
const handleDetails = (e) => {
  const id = e.dataset.id;
  const data = e.dataset.categories;
  window.location.href = `../details/details.html?id=${id}&data=${data}`;
};
const callApi = async () => {
  const categoriesWomen = document.querySelector('.categories-menu_women');
  const productList = document.querySelector('.categories-menu');
  // Api women
  try {
    const data = 'http://localhost:3000/men';
    await fetch(data)
      .then((item) => item.json())
      .then((data) => {
        const product = data.map((item) => {
          item.categories = 'men';
          const { image, name, id, categories } = item;
          return `
            <div class="categories_item" onClick="handleDetails(this)" data-id=${id} data-categories=${categories}>
                <img class="categories_img" src=${image} alt=${name}>
                <div class="categories_info">
                  <div class="categories_user">
                    <h3>${name}</h3>
                    <span>Explore Now!</span>
                  </div>
                  <img src="../../logo/Arrow 3.svg" alt="">
                </div>
            </div>
          `;
        });
        productList.innerHTML = product.join('');
      });
  } catch (error) {
    console.log('ApiError', error);
  }
  //Api men
  try {
    const data = 'http://localhost:3000/women';
    await fetch(data)
      .then((data) => data.json())
      .then((data) => {
        const product = data.map((item) => {
          item.categories = 'women';
          const { image, name, id, categories } = item;
          if (id > 4 && id <= 8)
            return `
            <div class="categories_item"  onClick="handleDetails(this)" data-id=${id} data-categories=${categories}>
                <img class="categories_img" src=${image} alt=${name}>
                <div class="categories_info">
                  <div class="categories_user">
                    <h3>${name}</h3>
                    <span>Explore Now!</span>
                  </div>  
                  <img  src="../../logo/Arrow 3.svg" alt="">
                </div>
            </div>
          `;
        });
        categoriesWomen.innerHTML = product.join('');
      });
  } catch (error) {
    console.log('ApiError', error);
  }
};
callApi();
const listItem = document.querySelectorAll('.categories_item');
