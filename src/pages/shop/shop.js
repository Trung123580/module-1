const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
$$('.control').forEach((item) =>
  item.addEventListener('click', (e) => {
    e.preventDefault();
    productNav(e.target.parentElement.dataset.api);
  })
);
$('.shop-left_btn').addEventListener('click', (e) => {
  productNav(e.target.dataset.api);
});
const productNav = (dataApi) => {
  window.location.href = `../product/product.html?data=${dataApi}`;
};
window.onload = () => {
  //onload khi tải hêt tài nguyên tải lên web mới gọi đến hàm này
  totalPrices(); // do render từ js nên cần tài nguyên tải lên mới lấy được DOM
};
const totalPrices = () => {
  const subTotal = $('.render-total');
  const shipping = $('.render-shipping');
  const productShipping = $$('.product-shipping');
  const monyShipping = [...productShipping].reduce((acc, item) => {
    const mony = item.textContent.trim();
    for (let i = 0; i < mony.length; i++) {
      if (!isNaN(mony[i])) {
        //!isNaN  kiểm tra xem nó có phải là 1 số trong chuỗi String không
        acc += parseInt(mony[i]);
      }
    }
    return acc;
  }, 0);
  const totalAll = $('.total-all');
  const productPrices = $$('.product-total');
  const result = [...productPrices].reduce((acc, item) => {
    const mony = item.textContent.trim();
    const value = mony.substring(1, mony.length - 3);
    return (acc += parseInt(value));
  }, 0);
  subTotal.textContent = `$${result}.00`;
  shipping.textContent = `$${monyShipping}.00`;
  totalAll.textContent = `$${result - monyShipping}.00`;
};
const handleDelete = (e) => {
  const product = e.parentElement.parentElement;
  product.remove();
};
const handleChange = (e, dom) => {
  const count = dom.parentElement.querySelector('span');
  const data = parseInt(count.textContent);
  const value = e === 'next' ? data + 1 : data - 1;
  if (value < 0) return;
  count.textContent = value;
};
const checkOut = (content, dataMen, dataWomen, product) => {
  const check = $('.btn-checkout');
  check.addEventListener('click', () => {
    const shipping = $$('.product-shipping');
    const monyShipping = [...shipping].reduce((acc, item) => {
      const mony = item.textContent.trim();
      for (let i = 0; i < mony.length; i++) {
        if (!isNaN(mony[i])) {
          //!isNaN  kiểm tra xem nó có phải là 1 số trong chuỗi String không
          acc += parseInt(mony[i]);
        }
      }
      return acc;
    }, 0);
    const checkOutDom = `
      <div class="check-details">
          <div class="check-title">
            <h3>Home</h3>
            <div class="icon_arrow"></div>
            <h3>My Account</h3>
            <div class="icon_arrow"></div>
            <h3>Check Out</h3>
          </div>
          <div class="new-top">
            <span class="new-bar"></span>
            <h2 class="new-title">Check Out</h2>
          </div>
          <h3 class="billing">Billing Details</h3>
          <form class="check-info"  action="" method="post">
             <div class="form-group">
                <div class="check-info_item">
                  <label for="first-name">First Name*</label>
                  <input type="text" id="first-name" name="" value="" placeholder="First Name">
                </div>
                <div class="check-info_item">
                  <label for="last-name">Last Name*</label>
                  <input type="text" id="last-name" name="" value="" placeholder="Last Name">
                </div>
                <div class="check-info_item">
                  <label for="country">Country / Region*</label>
                  <input type="text" id="country" name="" value="" placeholder="Country / Region">
                </div>
                <div class="check-info_item">
                  <label for="company">Company Name</label>
                  <input type="text" id="company" name="" value="" placeholder="Company (optional)">
                </div>
                <div class="check-info_item">
                  <label for="address">Street Address*</label>
                  <input type="number" id="address" name="" value="" placeholder="House number and street name">
                </div>
                <div class="check-info_item">
                  <label for="room">Apt, suite, unit</label>
                  <input type="text" id="room" name="" value="" placeholder="apartment, suite, unit, etc. (optional)">
                </div>
             </div>
             <div class="check-address">
                <div class="check-info_item">
                  <label for="city">City*</label>
                  <input type="text" id="city" name="" value="" placeholder="Town / City">
                </div>
                <div class="check-info_item">
                  <label for="">State*</label>
                  <select>
                    <option value="">State</option>
                    <option value="">State</option>                    
                    <option value="">State</option>                    
                    <option value="">State</option>                    
                  </select>
                </div>
                <div class="check-info_item">
                  <label for="postal">Postal Code*</label>
                  <input type="text" id="postal" name="" value="" placeholder="Postal Code">
                </div>
              </div>
              <div class="check-info_item" style="width: 382px">
                <label for="phone">Phone*</label>
                <input type="number" id="phone" name="" value="" placeholder="Phone">
              </div>
              <button type="submit" class="check-info_btn">Continue to delivery</button>
              <div class="check-box">
                <input type="checkbox" id="check-box" name="" value="">
                <label for="check-box">Save my information for a faster checkout</label>
              </div>
          </form>
          <div class="line-2"></div>
          <div class="shipping-address">
              <div class="shipping-item">
                <h2>Shipping Address</h2>
                <p>Select the address that matches your card or payment method.</p>
                <div class="form-address">
                    <div>
                      <input type="radio" id="1" name="address" value="">
                      <label for="1">Same as Billing address</label>
                    </div>
                    <div class="line-3"></div>
                    <div>
                      <input type="radio" id="2" name="address" value="">
                      <label for="2">Use a different shipping address</label>
                    </div>
                </div>    
              </div>
              <div class="line-2"></div>
               <div class="shipping-item" >
                <h2>Shipping Method</h2>
                <div class="form-address" style="margin-top:30px">
                    <div>
                      <label >Arrives by Monday, June 7</label>
                    </div>
                    <div class="line-3"></div>
                    <div style="flex-direction:column ; align-items: flex-start ; gap : 8px">
                      <label>Use a different shipping address <span>$${monyShipping}.00</span></label>
                      <span>Additional fess may apply</span>
                    </div>
                </div>    
              </div>
              <div class="line-2"></div>
              <div class="shipping-item">
                <h2>Payment Method</h2>
                <p>All transactions are secure and encrypted.</p>
                <div class="form-address">
                      <div>
                      <input class="" type="radio" id="pay" name="address" value="">
                        <div style="display:flex ; flex-direction:column ; gap : 8px; width: 100%;">
                          <label for="pay">Credit Card</label>
                          <span>We accept all major credit cards.</span>
                          <div class="check-card">
                            <ul>
                              <li>
                                  <a href=""><img src="../../img/googlePay.png" alt=""></a>
                              </li>
                              <li>
                                  <a href=""><img src="../../img/visa.png" alt=""></a>
                              </li>
                              <li>
                                  <a href=""><img src="../../img/paypal.png" alt=""></a>
                              </li>
                              <li>
                                  <a href=""><img src="../../img/paypass.png" alt=""></a>
                              </li>
                            </ul>
                            <div class="check-card_menu">
                            <div class="check-card_item">
                                <input type="number" name="" value="" placeholder="Card number">
                            </div>
                            <div class="check-card_item">
                                <input type="text" name="" value="" placeholder="Name of card">
                            </div>
                            <div class="check-card_item">
                                <input type="text" name="" value="" placeholder="Expiration date (MM/YY)">
                            </div>
                            <div class="check-card_item">
                                <input type="number" name="" value="" placeholder="Security Code">
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="line-3"></div>
                    <div>
                      <input type="radio" id="10" name="address" value="">
                      <div>
                        <label for="10">Use a different shipping address </label>
                        <span>Additional fess may apply</span>
                      </div>
                    </div>
                    <div class="line-3"></div>
                    <div>
                      <input type="radio" id="4" name="address" value="">
                      <label for="4">Paypol</label>
                    </div>
                </div>    
              </div>
          </div>
          <button class="card-btn" type="button">Pay Now</button>
      </div>
    `;
    const data = (dataArray) => {
      return dataArray.map((item, index) => {
        const { name, id, api, image, prices } = item;
        const filterId = product.filter((prodItem) => parseInt(prodItem.id) === id && prodItem.name === api);
        const productMatch = product.find((prodItem) => parseInt(prodItem.id) === id && prodItem.name === api);
        if (productMatch) {
          return `
            <div class="check-order">
                <div class="product">
                  <div class="product-info">
                    <img src="${image}" alt="error">
                      <div class="product-info_desc">
                          <div>
                            <h3>${name}</h3><span>${filterId.length}</span>
                          </div>
                          <span>Color: Yellow</span>
                      </div>
                  </div>
                   <div class="product-total">
                    $${prices * filterId.length}.00
                  </div>
                  <div class="product-shipping" style="display: none">
                      ${parseInt(prices * filterId.length) > 100 ? `$5.00` : 'FREE'}
                  </div>
               </div>
               <div class="line-4">
            </div>
            `;
        }
      });
    };

    const value = checkOutDom.split('').join('');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    div2.className = 'container check-content';
    div.className = 'check-order_list';
    div2.innerHTML = [...value].join('');
    content.innerHTML = ''.split('').join('');
    content.append(div2);
    div2.append(div);
    div.innerHTML = [...data(dataMen), ...data(dataWomen)].join('');
  });
  console.log(content, dataMen, dataWomen);
};
const productShop = () => {
  const token = localStorage.getItem('product');
  const product = JSON.parse(token);
  const shop = $('.shop-product');
  const contentShop = $('.shop');
  if (product !== null) {
    const filter = product.reduce((acc, item) => {
      if (!acc.includes(item.name)) {
        acc.push(item.name);
      }
      return acc;
    }, []);
    const callApi = async (data) => {
      const [men, women] = data;
      try {
        const apiMen = `http://localhost:3000/${men}`;
        const apiWomen = `http://localhost:3000/${women}`;
        // const resMen = await fetch(apiMen);
        // const resWomen = await fetch(apiWomen);
        // const dataMen = await resMen.json();
        // const dataWomen = await resWomen.json();
        const [resMen, resWomen] = await Promise.all([fetch(apiMen), fetch(apiWomen)]);
        const [dataMen, dataWomen] = await Promise.all([resMen.json(), resWomen.json()]);
        const convertDataMen = dataMen.map((item) => {
          return {
            ...item,
            api: 'men',
          };
        });
        const convertDataWomen = dataWomen.map((item) => {
          return {
            ...item,
            api: 'women',
          };
        });
        checkOut(contentShop, convertDataMen, convertDataWomen, product);
        const data = (dataArray) => {
          return dataArray.map((item, index) => {
            const { name, id, api, image, prices } = item;
            const filterId = product.filter((prodItem) => parseInt(prodItem.id) === id && prodItem.name === api);
            const productMatch = product.find((prodItem) => parseInt(prodItem.id) === id && prodItem.name === api);
            if (productMatch) {
              return `
                  <div class="delete-product">
                    <div class="product">
                      <div class="product-info">
                        <img src="${image}" alt="error">
                          <div class="product-info_desc">
                              <h3>${name}</h3>
                              <span>Color: Yellow</span>
                              <span>Size: ${productMatch.size}</span>
                          </div>
                      </div>
                      <div class="product-prices">
                          $${prices} 
                      </div>
                      <div class="product-quantity">
                        <button type="button" onClick="handleChange('prev', this)">-</button>
                        <span>${filterId.length}</span>
                        <button type="button" onClick="handleChange('next', this)">+</button>
                      </div>
                      <div class="product-shipping">
                          ${parseInt(prices * filterId.length) > 100 ? `$5.00` : 'FREE'}
                      </div>
                      <div class="product-total">
                        $${prices * filterId.length}.00
                      </div>
                      <div class="product-delete" data-index=${index} onClick="handleDelete(this)">
                          <img src="../../logo/icon-delete.svg" alt="">
                      </div>
                   </div>
                   <hr class="line">
                  </div>
                `;
            }
          });
        };
        shop.innerHTML = [...data(convertDataMen), ...data(convertDataWomen)].join('');
      } catch (error) {
        console.log(error);
      }
    };
    callApi(filter);
  }
  if (product === null) {
    const productNull = `
          <div class="no-cart">
          <img src="../../img/no-cart.png" alt="">
          <div class="no-cart_text">
              <h2 class="no-cart_title">Your cart is empty and sad :(</h2>
              <span class="no-cart_desc">Add something to make it happy!</span>
          </div>
          <button type="button" class="no-cart_btn">Continue Shopping</button>
      </div>
  `;
    contentShop.innerHTML = productNull.split('').join('');
  }
};
productShop();
