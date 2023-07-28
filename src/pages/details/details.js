const data = new URLSearchParams(window.location.search);
const productId = data.get('id');
const productCategories = data.get('data');
console.log(productId, productCategories);
const callApi = async (categories) => {
  const data = ` http://localhost:3000/${categories}`;
  await fetch(data)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
callApi(productCategories);
