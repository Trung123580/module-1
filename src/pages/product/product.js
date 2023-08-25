const valueData = new URLSearchParams(window.location.search);
const productCategories = valueData.get('data');
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const product = $$('.control');
product.forEach((item) => {
  const data = item.dataset.api;
  if (productCategories === data || productCategories === undefined) {
    item.classList.add('active');
  }
  item.addEventListener('click', (e) => {
    e.preventDefault();
    productNav(e.target.parentElement.dataset.api);
  });
});
const showMenu = $('.icon-show');
let isIcon = true;
showMenu.addEventListener('click', () => {
  const productNav = $('.product-nav');
  if (isIcon) {
    productNav.style = `transform: translateX(0)`;
    isIcon = false;
  } else {
    productNav.style = `transform: translateX(-100%)`;
    isIcon = true;
  }
});
const productNav = (dataApi) => {
  window.location.href = `./product.html?data=${dataApi}`;
};
// renderColor
const colorItem = $$('.color');
const colorList = $$('.color__item > span');
colorList.forEach((item, index) => {
  const data = item.textContent;
  colorItem[index].style.background = `${data}`;
});
const handleDetails = (e) => {
  const id = e.dataset.id;
  const data = e.dataset.categories;
  console.log(data);
  window.location.href = `../details/details.html?id=${id}&data=${data}`;
};
const callApi = async (dataApi) => {
  const renderProduct = $('.product-project');
  if (dataApi) {
    try {
      const api = `https://64d25c43f8d60b174361f07e.mockapi.io/api/${dataApi}`;
      const data = await fetch(api);
      const dataMen = await data.json();
      const product = dataMen.map((item) => {
        const { image, name, id, prices, desc } = item;
        return `
            <div class="categories_item" onClick="handleDetails(this)" data-id=${id} data-categories=${dataApi}>
                <img class="categories_img" src=${image} alt=${name}>
                <div class="categories_info">
                  <div class="categories_user">
                    <h3>${name}</h3>
                    <span>${desc}</span>
                  </div>
                  <h4 class="product-prices">$${prices}</h4>
                </div>
                <div class="icon_heart">
                    <img src="../../logo/icon_heart.svg" alt="">
                </div>
            </div>
          `;
      });
      renderProduct.innerHTML = product.join('');
    } catch (error) {
      console.log(error);
    }
  }
};
callApi(productCategories);
