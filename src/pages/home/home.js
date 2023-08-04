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
    console.log('ApiError', error.response);
  }
  //Api men
  const cate = document.querySelector('.categories-menu_women2');
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
        const convert = data.map((item) => {
          const { image, name, id, categories } = item;
          if (id >= 0 && id <= 4)
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
        cate.innerHTML = convert.join('');
      });
  } catch (error) {
    console.log('ApiError', error.response);
  }
};
callApi();
document.querySelectorAll('.control').forEach((item) =>
  item.addEventListener('click', (e) => {
    e.preventDefault();
    productNav(e.target.parentElement.dataset.api);
  })
);
document.querySelectorAll('.new-item').forEach((item) => item.addEventListener('click', (e) => productNav(e.target.parentElement.dataset.api)));
document.querySelectorAll('.sale-menu_item').forEach((item) => item.addEventListener('click', (e) => productNav(e.target.parentElement.dataset.api)));
document.querySelectorAll('.sale-list_item').forEach((item) => item.addEventListener('click', (e) => productNav(e.target.parentElement.dataset.api)));
document.querySelector('.deals-left').addEventListener('click', (e) => productNav(e.target.dataset.api));
document.querySelector('.deals-right').addEventListener('click', (e) => productNav(e.target.dataset.api));
const productNav = (dataApi) => {
  console.log(dataApi);
  window.location.href = `../product/product.html?data=${dataApi}`;
};
