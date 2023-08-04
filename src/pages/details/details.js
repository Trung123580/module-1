const data = new URLSearchParams(window.location.search);
const productId = data.get('id');
const productCategories = data.get('data');
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// console.log(productId, productCategories);
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
const productNav = (dataApi) => {
  window.location.href = `../product/product.html?data=${dataApi}`;
};

const handleFocus = (e) => {
  const className = e.getAttribute('class');
  const wrapper = $$(`.${className}`);
  wrapper.forEach((item) => item.classList.remove('border'));
  e.classList.add('border');
};
function randomDetails() {
  const focusImg = $$('.details-review_item > img');
  focusImg.forEach((item) => {
    const categories = item.parentElement.dataset.categories;
    item.addEventListener('click', (e) => {
      const dataId = e.target.getAttribute('src').split('-');
      const id = parseInt(dataId[1].substring(0, 1));
      window.location.href = `./details.html?id=${id}&data=${categories}`;
    });
  });
}

const handleBg = (element) => {
  const sizeList = $$('.size-list > li > span');
  sizeList.forEach((item) => {
    item.classList.remove('bg-black');
  });
  element.classList.toggle('bg-black');
};
// tabs UI
const tabs = $$('.tab__item');
const panes = $$('.pane__item');
const tabsActive = $('.tab__item.active');
const line = $('.line');
line.style.left = tabsActive.offsetLeft + 'px';
line.style.width = tabsActive.offsetWidth + 'px';
console.log(tabsActive);
tabs.forEach((item, index) => {
  const pane = panes[index];

  item.addEventListener('click', (e) => {
    $('.tab__item.active').classList.remove('active');
    $('.pane__item.active').classList.remove('active');
    line.style.left = e.target.offsetLeft + 'px';
    line.style.width = e.target.offsetWidth + 'px';
    pane.classList.add('active');
    e.target.classList.add('active');
  });
});
// handleDetails
const handleDetails = (e) => {
  const id = e.dataset.id;
  const data = e.dataset.categories;
  window.location.href = `./details.html?id=${id}&data=${data}`;
};
// handleAddProduct
const handleAddProduct = (e) => {
  const id = e.dataset.id;
  const name = e.dataset.categories;
  const user = {
    id: id,
    name: name,
  };
  let getData = localStorage.getItem('product');
  const dataArray = getData ? JSON.parse(getData) : [];
  dataArray.push(user);
  if (id && name) localStorage.setItem('product', JSON.stringify(dataArray));
  const content = document.querySelector(`.details-info_btn > button > span`);
  content.textContent = 'Add Success';
  addSuccess(content);
};
const addSuccess = (content) => {
  document.querySelector('#blur').style.display = 'inline-flex';
  setTimeout(() => {
    const blur = document.querySelector('#blur');
    content.textContent = 'Add to cart';
    blur.style = `display: none`;
  }, 2000);
};

const callApi = async (categories) => {
  const detailsBanner = $('.details-content');
  if (categories) {
    const data = `http://localhost:3000/${categories}`;
    await fetch(data)
      .then((res) => res.json())
      .then((data) => {
        // let random = Math.floor(Math.random() * data.length);
        const random = (number) => {
          const data = Math.floor(Math.random() * number.length);
          if (data !== 0) {
            return data;
          }
          return 1;
        };
        const details = data.map((item) => {
          const { image, id, name, prices } = item;
          if (parseInt(productId) === id) {
            return `  
              <div class="details-review">
                <div class="details-review_list">
                    <div class="details-review_item" onClick="handleFocus(this)" data-categories=${categories}>
                        <img src="../../img/${categories}-${random(data)}.png" alt="">
                    </div>
                    <div class="details-review_item " onClick="handleFocus(this)" data-categories=${categories}>
                        <img src="../../img/${categories}-${random(data)}.png" alt="">
                    </div>
                    <div class="details-review_item" onClick="handleFocus(this)" data-categories=${categories}>
                        <img src="../../img/${categories}-${random(data)}.png" alt="">
                    </div>
                    <div class="details-review_btn">
                        <button type="button"></button>
                        <button type="button"></button>
                    </div>
                </div>
                <div class="details-review_banner">
                    <img src=${image} alt="">
                </div>
            </div>
            <div class="details-info">
              <div class="details-info_nav">
                 <span>Shop</span>
                 <span class="icon_arrow"></span>
                 <span>${categories}</span> 
                 <span>Top</span> 
                 <span class="icon_arrow"></span> 
              </div>
              <h2 class="details-info_title">${name}</h2>
              <div class="details-info_review">
                <div class='details-info_star'>
                  <img src="../../logo/icon-star.svg" alt="error">
                  <img src="../../logo/icon-star.svg" alt="error">
                  <img src="../../logo/icon-star.svg" alt="error">
                  <img src="../../logo/icon-star.svg" alt="error">
                  <img src="../../logo/icon-star.svg" alt="error">
                </div>
                <span>3.5</span>
                <div class="details-info_comment">
                  <img src="../../logo/icon-comment.svg" alt="">
                  <span>120 comment</span>
                </div>
              </div>
             <div class='details-info_size'>
                <div class='size-title'>
                  <h3>Select Size</h3>
                  <h3 style="color: #807D7E ; font-weight: 500;">Size Guide</h3>
                    <img src="../../logo/details-arrow.svg" alt="">
                </div>
                <ul class='size-list'>
                  <li>
                    <span onClick="handleBg(this)" >XS</span>
                  </li>
                  <li>
                    <span onClick="handleBg(this)">S</span>
                  </li>
                  <li>
                    <span onClick="handleBg(this)">M</span>
                  </li>
                  <li>
                    <span onClick="handleBg(this)">L</span>
                  </li>
                  <li>
                    <span onClick="handleBg(this)">XL</span>
                  </li>
                </ul>
              </div>
               <div class="color-list">
                  <h3>Colours Available </h3>
                  <ul class="color-wrapper"> 
                    <li class="color-item" onClick="handleFocus(this)">
                      <span ></span>
                    </li>
                    <li class="color-item" onClick="handleFocus(this)">
                      <span ></span>
                    </li>                
                    <li class="color-item" onClick="handleFocus(this)">
                      <span ></span>
                    </li>                
                    <li class="color-item" onClick="handleFocus(this)">
                      <span ></span>
                    </li>  
                  </ul>              
                </div>
                <div class="details-info_btn">
                    <button type="submit" onClick="handleAddProduct(this)" data-id=${id} data-categories=${categories}>
                      <img src="../../logo/details-cart.svg" alt="">
                      <span>Add to cart</span>
                    </button>
                    <button type="submit">
                        ${prices}$
                    </button>
                </div>
                <hr style="border: 1px solid #BEBCBD ; margin-bottom:5px">
                <div class="details-info_pay">
                    <div>
                        <div class="pay__item">
                      <img src="../../logo/pay-1.svg" alt="">
                      <h4>Secure payment</h4>
                    </div>
                    <div class="pay__item">
                      <img src="../../logo/pay-2.svg" alt="">
                      <h4>Size & Fit</h4>
                    </div>
                    </div>
                    <div>
                      <div class="pay__item">
                      <img src="../../logo/pay-3.svg" alt="">
                      <h4>Free shipping</h4>
                    </div>
                    <div class="pay__item">
                      <img src="../../logo/pay-4.svg" alt="">
                      <h4>Free Shipping & Returns</h4>
                    </div>
                    </div>
                </div>
              </div>  
             
            `;
          }
        });
        detailsBanner.innerHTML = details.join('');
        const productList = document.querySelector('.product-menu');
        const product = data.map((item) => {
          const { id, name, image, prices, desc } = item;
          return `
            <div class="categories_item" onClick="handleDetails(this)" data-id=${id} data-categories=${categories}>
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
        productList.innerHTML = product.join('');
      });
    randomDetails();
  }
};
callApi(productCategories);
