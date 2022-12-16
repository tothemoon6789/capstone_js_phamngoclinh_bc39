import Local from "../sevice/local.js";
import Cart from "../models/cart.js";

class Render {
  // ! from here to line 244 for index.html
  // TODO: render toàn bộ sản phẩm
  product(array, id) {
    let html = "";
    array.forEach((item) => {
      html += `
         <!-- TODO: Card -->
        <div class="col-12 col-sm-6 col-lg-3 mt-3">
          <div class="card">
            <img
              src="${item.img}"
              class="card-img-top"
              alt="..." />
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.desc}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${item.price} đ</li>
              <li class="list-group-item">${item.backCamera}</li>
              <li class="list-group-item">${item.frontCamera}</li>
            </ul>
            <div class="card-body">
              <a
                href="#"
                class="card-link"
                >Mua ngay</a
              >
              <a
                href="#"
                class="card-link"
                >Chi tiết</a
              >
             
              <!-- /* start add to cart */ -->
              <div id="cart${item.id}">
              <button class="btn-add-card" onclick="render.cart(this,${item.id},${item.price},'${item.name}')">Add</button>
              </div>
   
              <!-- /* end add to cart */ -->
            </div>
          </div>
        </div>
        <!-- TODO: End Card -->
         `;
    });
    document.getElementById(id).innerHTML = html;
  }
  // TODO: bấm add, render giỏ hàng
  cart(element, id, price, name) {
    // TODO: Tạo biến local từ this.local tránh gây rối code
    const local = this.local;
    // TODO: nếu dữ liệu không rỗng thì set dữ liệu cho mảng local.arr
    if (local.getItem() !== undefined) {
      local.arr = local.getItem();
    }
    // TODO: nếu không có dữ liệu trên local
    //! START: dữ liệu local undefined thì set thẳng cart lên local
    element.parentElement.innerHTML =
      `<div class="add-card" id="addCard">
      <i class="fa-solid fa-caret-left go-left" onclick="render.cartSubtract(${id})"></i>
      <div id='quantity${id}' class="quantity">1</div>
      <i class="fa-solid fa-caret-right go-right" onclick='render.cartplus(${id})'></i> 
        </div>`
    const cart = new Cart(id, price, name, 1);
    local.arr.push(cart)
    local.setItem(local.arr)
    local.arr = local.getItem()
    //! END: dữ liệu local undefined thì set thẳng cart lên local

  }
  // TODO: Bấm giảm, render số lượng
  local = new Local();
  // 1. Kiểm tra nếu local.getItem() undefined thì set luôn item
  cartSubtract(id, item) {
    const local = this.local;
    //! END: dữ liệu local undefined thì set thẳng cart lên local
    // TODO: nếu đã có dữ liệu trên local tiến hành tìm kiếm
    local.arr = local.getItem();
    local.arr.forEach((element, index) => {
      const valueQty = element["id"] * 1;
      const valueId = id * 1;
      const regexPattern = /^([2-9]|10)$/;
      const valueQuantity = element["quantity"] * 1;
      if (valueQuantity === 1) {

        document.getElementById(`cart${id}`).innerHTML =
          `<button class="btn-add-card" onclick="render.cart(this,${element.id},${element.price},'${element.name}')">Add</button>`
        local.arr.splice(index, 1);
        local.setItem(local.arr);
        return
      }
      if (valueQty === valueId) {
        const qty = local.arr[index]["quantity"] * 1;
        if (regexPattern.test(qty)) {
          local.arr[index]["quantity"] = qty - 1;
          local.setItem(local.arr)
          document.getElementById(`quantity${id}`).innerHTML = local.arr[index].quantity; //!render
        }

      }

    });

  }
  // TODO: Bấm tăng, render số lượng
  cartplus(id) {
    const local = this.local;
    //! END: dữ liệu local undefined thì set thẳng cart lên local
    // TODO: nếu đã có dữ liệu trên local tiến hành tìm kiếm
    local.arr = local.getItem();
    local.arr.forEach((element, index) => {
      const valueQty = element["id"] * 1;
      const valueId = id * 1;
      const regexPattern = /^([1-9])$/;
      if (valueQty === valueId) {
        const qty = local.arr[index]["quantity"] * 1;
        if (regexPattern.test(qty)) {
          local.arr[index]["quantity"] = qty + 1;
          local.setItem(local.arr)
          document.getElementById(`quantity${id}`).innerHTML = local.arr[index].quantity; //!render
        }
        return
      }
    });
  }
  // TODO: Load local storge, render giỏ hàng
  range(id, qty) {
    document
      .getElementById(`cart${id}`)
      .innerHTML =
      `<div class="add-card" id="addCard">
      <i class="fa-solid fa-caret-left go-left" onclick="render.cartSubtract(${id})"></i>
      <div id='quantity${id}' class="quantity">${qty}</div>
      <i class="fa-solid fa-caret-right go-right" onclick='render.cartplus(${id})'></i> 
        </div>`
  }
  // TODO: Bam tang tren cart
  onCartPlus(id) {

    const local = this.local;
    //! END: dữ liệu local undefined thì set thẳng cart lên local
    // TODO: nếu đã có dữ liệu trên local tiến hành tìm kiếm
    local.arr = local.getItem();
    local.arr.forEach((element, index) => {
      const valueQty = element["id"] * 1;
      const valueId = id * 1;
      const regexPattern = /^([1-9])$/;
      if (valueQty === valueId) {
        const qty = local.arr[index]["quantity"] * 1;
        if (regexPattern.test(qty)) {
          local.arr[index]["quantity"] = qty + 1;
          local.setItem(local.arr)
          document.getElementById(`quantity${id}`).innerHTML = local.arr[index].quantity; //!render
          this.table(local.getItem())
        }
        return
      }
    });
  }
  // TODO: Bấm giảm tren cart
  myLocal = new Local();
  // 1. Kiểm tra nếu local.getItem() undefined thì set luôn item
  onCartSubtract(id) {
    const local = this.myLocal;
    //! END: dữ liệu local undefined thì set thẳng cart lên local
    // TODO: nếu đã có dữ liệu trên local tiến hành tìm kiếm
    local.arr = local.getItem();
    local.arr.forEach((element, index) => {

      const valueQty = element["id"] * 1;
      const valueId = id * 1;
      const regexPattern = /^([2-9]|10)$/;
      const valueQuantity = element["quantity"] * 1;

      if (valueQuantity === 1) {

        document.getElementById(`cart${id}`).innerHTML =
          `<button class="btn-add-card" onclick="render.cart(this,${element.id},${element.price},'${element.name}')">Add</button>`
        local.arr.splice(index, 1);
        local.setItem(local.arr);
        if (local.getItem() === undefined) return
        const myCart = local.getItem();
        this.table(myCart);
        return
      }

      if (local.getItem() === undefined) return
      const myCart = local.getItem();
      this.table(myCart);
      if (valueQty === valueId) {
        const qty = local.arr[index]["quantity"] * 1;
        if (regexPattern.test(qty)) {
          local.arr[index]["quantity"] = qty - 1;
          local.setItem(local.arr)
          document.getElementById(`quantity${id}`).innerHTML = local.arr[index].quantity; //!render
        }

      }

    });

  }
  // TODO: render bảng dữ liệu giỏ hàng
  table(array) {
    let html = '';
    let value = 0;
    array.forEach(element => {
      const price = element.price * 1;
      const quantity = element.quantity * 1;
      value += quantity * price;
      html += `
            <tr>
                <td>${element.name}</td>
                <td>${element.price}</td>
                <td>
               
      <div class="add-card" >
      <i class="fa-solid fa-caret-left go-left" onclick="render.onCartSubtract(${element.id})"></i>
      <div class="quantity">${element["quantity"]}</div>
      <i class="fa-solid fa-caret-right go-right" onclick="render.onCartPlus(${element.id})"></i> 
        </div > 
                
                
                </td>
                <td>${price * quantity}</td>
                <td><button onclick="deleteItem('${element.id}')" class="btn"><i class="fa-solid fa-trash-can"></i></button></td>
            </tr>
            `
    });
    html += `
    <tr>
        <td></td>
        <td></td>
        <td>Tổng:</td>
        <td>${value}</td>
    </tr>
    `
    document.getElementById("tbodyCart").innerHTML = html;
  }
  // ! from here is admin
  tableAdmin(array) {
    let html = ''
    array.forEach((element, index) => {
      html += `
      <tr>
          <td>${index + 1}</td>
          <td>${element.name}</td>
          <td>${element.price}</td>
          <td><img src="${element.img}" style="width:50px;height:50px"/></td>
          <td>${element.desc}</td>
          <td>
            <button onclick="deleteItem('${element.id}')" type="button" name="" id="" class="btn btn-danger btn-block">Delete</button>
            <button onclick="editItem('${element.id}')" type="button" name="" id="" class="btn btn-default border mt-2" data-toggle="modal" data-target="#exampleModal">Edit</button>
          </td>
        </tr>
  `
    });
    document.getElementById("tbodyAdmin").innerHTML = html
  }
}
export default Render;
