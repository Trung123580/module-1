const headerSignup = document.querySelector('.header-signup');
const headerLogin = document.querySelector('.header-login');
const signup = document.querySelector('.signup');
const login = document.querySelector('.login');
const backLogin = document.querySelector('.backLogin');
const forget = document.querySelector('.forget_password');
const from = document.querySelectorAll('.from-right');
//chuyển đổi chữ thường
const convert = (item) => item.toLocaleLowerCase();
// header-highlight
const country = document.querySelector('.header-highlight > h3');
const headerMenu = document.querySelector('.header-highlight_menu');
const headerItem = document.querySelectorAll('.header-highlight_item');
function showCountry(country, menu, item) {
  country.addEventListener('click', (e) => {
    menu.classList.toggle('show-important');
  });
  item.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const data = e.target.textContent.trim();
      country.textContent = data;
      menu.classList.remove('show-important');
    });
  });
}
showCountry(country, headerMenu, headerItem);
// ----------------------------------

//
const listEvent = [
  {
    key: 'signup',
    event: headerSignup,
    image: './src/img/banner-signup.png',
  },
  {
    key: 'login',
    event: headerLogin,
    image: './src/img/banner-login.png',
  },
  {
    key: 'signup',
    event: signup,
    image: './src/img/banner-signup.png',
  },
  {
    key: 'login',
    event: login,
    image: './src/img/banner-login.png',
  },
  {
    key: 'login',
    event: backLogin,
    image: './src/img/banner-login.png',
  },
  {
    key: 'forget',
    event: forget,
    image: './src/img/banner-forget.png',
  },
];
const randomBanner = (arrEvent) => {
  const banner = document.querySelector('.form-banner');
  arrEvent.forEach((item) => {
    item.event.addEventListener('click', (e) => {
      e.preventDefault();
      const key = e.target.dataset.key;
      if (key === item.key) {
        banner.setAttribute('src', item.image);
        from.forEach((item) => {
          from[0].classList.add('d-none');
          item.getAttribute('data-from') === key
            ? item.classList.add('d-show')
            : item.classList.remove('d-show');
        });
      }
    });
  });
};
randomBanner(listEvent);
const checkEmail = document.querySelectorAll('#email');
const checkPassword = document.querySelectorAll('#password');
const submit = document.querySelectorAll('.from-group');
const showErrorEmail = document.querySelectorAll('.show-error');
const showErrorPassword = document.querySelectorAll('.show-pass_password');
const submitBtn = document.querySelectorAll('.from-submit > button');
const iconPassword = document.querySelectorAll('.show-password');

function checkSignup(email, password, submit, showEmail, showPassword) {
  const obj = {
    email: 'Chưa Nhập Email!',
    password: 'Chưa Nhập Password!',
  };
  submit.forEach((item, indexForm) => {
    const valueEmail = email[indexForm];
    const valuePassword = password[indexForm];
    const errorEmail = showEmail[indexForm];
    const errorPassword = showPassword[indexForm];
    const valueSubmit = submitBtn[indexForm];
    item.addEventListener('submit', (event) => {
      event.preventDefault();
      email.forEach((item) => {
        item.addEventListener('input', (e) => {
          if (e.target.value !== '') {
            errorEmail.textContent = '';
          } else {
            errorEmail.textContent = obj.email;
          }
        });
        if (valueEmail) {
          if (valueEmail.value === '') {
            errorEmail.textContent = obj.email;
          }
          if (valuePassword.value === '') {
            errorPassword.textContent = obj.password;
          }
        }
      });
      password.forEach((item, index) => {
        item.addEventListener('input', (e) => {
          if (e.target.value !== '') {
            showPassword[index].textContent = '';
          } else {
            showPassword[index].textContent = obj.password;
          }
        });
      });
      if (submit[1] === item && valueEmail.value !== '') {
        let getData = localStorage.getItem('user');
        getData ? (getData = JSON.parse(getData)) : (getData = []);
        const uniqueAccounts = [];
        const data = getData.filter((item) =>
          !uniqueAccounts.includes(item.account) //  item.account nếu không có trong mảng uniqueAccounts thì return true
            ? uniqueAccounts.push(item.account) // và khi nó trả về true push nó vào mảng
            : null
        );
        const newUser = {
          account: valueEmail.value,
          password: valuePassword.value,
        };
        data.push(newUser);
        localStorage.setItem('user', JSON.stringify(data));
        valueSubmit.textContent = 'Success';
        alert('Success');
      } else if (submit[0] === item) {
        const userLogin = localStorage.getItem('user');
        const convertString = JSON.parse(userLogin);
        convertString.forEach((item) => {
          const convertAccount = convert(item.account);
          const convertPass = convert(item.password); // tolowcase
          const convertEmail = convert(email[0].value);
          const convertPassword = convert(password[0].value);
          convertAccount === convertEmail && convertPass === convertPassword
            ? (window.location.href = './src/pages/home/home.html')
            : null;
        });
      }
      event.target.reset();
      valueEmail.focus();
    });
    let isIconShow = true;
    iconPassword[indexForm]?.addEventListener('click', (e) => {
      if (isIconShow) {
        valuePassword.type = 'text';
        e.target.setAttribute('src', './src/logo/eye-show.svg');
        isIconShow = false;
      } else {
        valuePassword.type = 'password';
        e.target.setAttribute('src', './src/logo/Hide view.svg');
        isIconShow = true;
      }
    });
  });
}
checkSignup(checkEmail, checkPassword, submit, showErrorEmail, showErrorPassword);
