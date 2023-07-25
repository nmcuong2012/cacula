getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createProduct() {
  // DOM và khởi tạo object product
  let product = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    date: getElement("#date").value,
  };

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then((response) => {
      // Sau khi thêm thành công, dữ liệu chỉ mới được cập nhật ở phía server. Ta cần gọi lại hàm apiGetProducts để lấy được danh sách những sản phẩm mới nhất (bao gồm sản phẩm mình mới thêm)
      return apiGetProducts();
    })
    .then((response) => {
      // response là kết quả promise của hàm apiGetProducts
      display(response.data);
      // Ẩn modal
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      // Xoá thành công
      return apiGetProducts();
    })
    .then((response) => {
      alert("Trả nợ thành công");
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectProduct(productId) {
  // Hiển thị modal
  $("#myModal").modal("show");
  // Hiển thị title và footer của modal
  getElement(".modal-title").innerHTML = "Cập nhật người nợ";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-success" onclick="updateProduct('${productId}')">Cập nhật</button>
  `;

  apiGetProductById(productId)
    .then((response) => {
      // Lấy thông tin sản phẩm thành công => hiển thị dữ liệu lên form
      let product = response.data;
      getElement("#TenSP").value = product.name;
      getElement("#GiaSP").value = product.price;
      getElement("#date").value = product.date;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct(productId) {
  // DOM và khởi tạo object product
  let newProduct = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    date: getElement("#date").value,
  };

  apiUpdateProduct(productId, newProduct)
    .then(() => {
      // Cập nhật thành công
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
      $("#myModal").modal("hide");
      alert("Chỉnh sửa thành công");
    })
    .catch((error) => {
      console.log(error);
    });
}

function display(products) {
  let html = products.reduce((result, value, index) => {
    let product = new Product(value.id, value.name, value.price, value.date);
    let priceVND = value.price
      ? value.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      : "";
    return (
      result +
      `
        <tr>
         <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${priceVND}</td>
          <td>${product.date}</td>
          <td>
            <button
              class="btn btn-primary"
              onclick="selectProduct('${product.id}')"
            >
              Cập nhật
            </button>
            <button
              class="btn btn-danger"
              onclick="deleteProduct('${product.id}')"
            >
              Trả nợ
            </button>
          </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}
// ======= DOM =======
getElement("#btnThemSP").onclick = () => {
  getElement(".modal-title").innerHTML = "Thêm người mượn";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-success" onclick="createProduct()">Thêm</button>
  `;
};

getElement("#txtSearch").onkeypress = (event) => {
  if (event.key !== "Enter") {
    return;
  }

  apiGetProducts(event.target.value)
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// ======= Utils =======
function getElement(selector) {
  return document.querySelector(selector);
}
