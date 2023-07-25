function apiGetProducts(searchValue) {
  return axios({
    url: `https://64a6ad1e096b3f0fcc804370.mockapi.io/mehanh`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductById(Id) {
  return axios({
    url: `https://64a6ad1e096b3f0fcc804370.mockapi.io/mehanh/${Id}`,
    method: "GET",
  });
}
// product = {name: "...", price: 1000, image: "...", type: "..."}
function apiCreateProduct(product) {
  return axios({
    url: "https://64a6ad1e096b3f0fcc804370.mockapi.io/mehanh",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(Id, newPeople) {
  return axios({
    url: `https://64a6ad1e096b3f0fcc804370.mockapi.io/mehanh/${Id}`,
    method: "PUT",
    data: newPeople,
  });
}

function apiDeleteProduct(Id) {
  return axios({
    url: `https://64a6ad1e096b3f0fcc804370.mockapi.io/mehanh/${Id}`,
    method: "DELETE",
  });
}
