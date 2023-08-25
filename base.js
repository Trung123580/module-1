const search = document.querySelector('#search-input');
const data = JSON.parse(localStorage.getItem('dataApiAll'));
console.log(data);
search.addEventListener('input', (e) => {
  // const value = e.target.value.toLowerCase().trim();
  // const filterSearch = data.filter((item, index, arr) => {
  //   const name = item.name.toLowerCase().trim();
  //   return name.includes(value);
  // });
  const listItem = `
  <div class='searchWrapper'>
    <ul class='listSearch'  style='list-style: none ; display: flex ; flex-direction: column ; gap:10px ; background: #3c4242; '  >
      ${data
        .map((product) => {
          return `<li class="itemSearch" data-id=${product.id} data-categories=${product.api} style='display:flex; gap: 10px; height: 70px ; background: #ccc ;padding:3px 10px ; cursor: pointer;'>
            <div >
              <img style='width: 100% ; height: 100% ;' src=${product.image} alt="">
            </div>
            <div style='display: flex ; flex-direction: column; justify-content: center ; gap: 5px; font-size: 1.3rem;
              font-weight: 700;'>
              <span style='max-width: 90px'>${product.name}</span>
              <p style="color: #3c4242 ; font-size:1rem">${product.desc}</p>
            </div>
              <h3 style='flex-grow: 1 ; display:flex ; align-items:center; justify-content: flex-end ; font-size: 1.5rem ;
               font-weight: 700 ;color: #3c4242 ; width: max-content ' >$ ${product.prices}</h3>
            </li>`;
        })
        .join('')}
    </ul>
  </div>
`;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = listItem;
  const listSearch = tempDiv.querySelector('.searchWrapper');
  const headerSearch = document.querySelector('.header-search');
  headerSearch.appendChild(listSearch);
  headerSearch.style.position = 'relative';
  listSearch.style = `position: absolute; z-index: 9999; color: #000 ; left: 0 ; top: 100% ; height: 350px ; overflow-x: hidden;width: 100%`;
  const listProduct = document.querySelectorAll('.itemSearch');
  // search
  const inputValue = e.currentTarget.value.toLowerCase(); // chuyển đổi giá trị value về chữ in thường
  listProduct.forEach((item) => {
    item.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const api = e.currentTarget.dataset.categories;
      window.location.href = `../details/details.html?id=${id}&data=${api}`;
    });

    const itemText = item.textContent.toLowerCase().trim(); // chuyển đổi giá trị để so sánh kết quả tìm kiếm thành chữ in thường
    // indexOf => tìm kiếm giá trị của 1 chuỗi nếu tìm thấy sẽ trả về vị trí đầu tiên mà giá trị xuất hiện còn nêú ko sẽ trả về -1
    itemText.indexOf(inputValue) > -1 // điều kiện > -1 là khi tìm thấy sẽ bằng 0(true) và so sánh nó lớn hơn -1 là khi tìm thấy sẽ render còn  nếu không sẽ trả ra -1
      ? (item.style.display = 'inline-flex')
      : (item.style.display = 'none');
  });
  // xóa các phần tử đã render ra DOM trước đó
  const listSearchNone = document.querySelectorAll('.searchWrapper');
  listSearchNone.forEach((product, index, arr) => {
    product.style.display = 'block'; // hiện
    if (index > 0) {
      product.remove();
    }
  });
});
const body = document.querySelector('body');

body.addEventListener('click', (e) => {
  const hiddenProduct = document.querySelector('.searchWrapper');
  hiddenProduct ? (hiddenProduct.style.display = 'none') : null; // ận
});
// dung chung All
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
