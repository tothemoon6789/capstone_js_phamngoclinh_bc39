import CallApi from "../sevice/callapi.js"
import Render from "../util/render.js";
import Ele from "../util/ele.js"
import Local from "../sevice/local.js";

const call = new CallApi("https://637b699c6f4024eac20ce16d.mockapi.io/api/phone")
const render = new Render()
const ele = new Ele()
const local = new Local()
// TODO: in toàn bộ sản phẩm
const callApi = () => {
    call.getItem()
        .then((response) => {
            render.product(response, "product") //! render sản phẩm
            if (local.getItem() !== undefined) {
                const cart = local.getItem();
                cart.forEach(element => {
                    render.range(element["id"], element["quantity"]) //! render giỏ hàng
                });
            }
        })
};
callApi();
// TODO: xử lý onchange chọn loại sản phẩm
const phoneType = () => {
    const valueOption = ele.getValEle("phoneType");
    // TODO: Dừng thực thi nếu
    if (valueOption === "Chọn hãng") return
    call.getItem() // type promise
        .then((response) => { //*bắt đầu then
            let onChangeArray = [];
            response.forEach(element => {
                const regex =
                    new RegExp(
                        valueOption,
                        "i")
                if (regex.test(element["type"])) onChangeArray.push(element)
            });
            // TODO: Dừng thực thi nếu...
            if (onChangeArray === null) return
            render.product(onChangeArray, "product") //! thay đổi dữ liệu
        })                    //*kết thúc then

}
// TODO: bấm nút giỏ hàng
const openCart = () => {
    if (local.getItem() === undefined) return
    const cart = local.getItem();
    render.table(cart);
}
// TODO: bấm nút xóa item trên giỏ hàng
const deleteItem = (id) => {
    local.deleteItem(id);
    const cart = local.getItem();
    render.table(cart)
    callApi()
}
// TODO: bấm nút thanh toán
const purchase = () => {
    if (local.getItem().length === 0) {
        alert("Chọn hàng trước khi thanh toán!")
        return
    }
    local.arr = [];
    local.setItem();
    callApi();
    alert("Đơn hàng đã được thanh toán !")
}
// TODO: bấm nút clear giỏ hàng
const clearCart = () => {
    local.arr = [];
    local.setItem();
    callApi();
    document.getElementById("tbodyCart").innerHTML = "";
}
window.phoneType = phoneType
window.render = render;
window.openCart = openCart;
window.deleteItem = deleteItem;
window.purchase = purchase;
window.clearCart = clearCart;

