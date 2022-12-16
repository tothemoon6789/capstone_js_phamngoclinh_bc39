import Render from "../util/render.js";
import CallApi from "../sevice/callapi.js";
import Ele from "../util/ele.js";
import Validate from "../validate/validate.js";
import Product from "../models/product.js";

const render = new Render();
const callapi = new CallApi("https://637b699c6f4024eac20ce16d.mockapi.io/api/phone");
const ele = new Ele();
const validate = new Validate();

//TODO: render sản phẩm
const renderAdminTable = () => {
    ele.getEle("loaderAdmin").style.display = "block";
    callapi.getItem()
        .then((response) => {
            render.tableAdmin(response.data)
            ele.getEle("loaderAdmin").style.display = "none";
        })
}
renderAdminTable();
// TODO: bam nut add them moi 
const addNewItem = () => {
    ele.getEle("formModal").reset()
    ele.getEle("exampleModalLabel").innerHTML = "THÊM MỚI SẢN PHẨM"
    ele.getEle("btnUpdate").style.display = "none"
    ele.getEle("btnAdd").style.display = ""
}
// TODO: bấm nút add modal
const add = () => {

    let flat = true;
    flat &= validate.validateInput("productName", /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\d!@#$%^&*()|/]+$/, "Chỉ chấp nhận chữ hoặc số và khoảng trắng và các ký tự đặc biệt !")
    flat &= validate.validateInput("productPrice", /^[1-9]\d*$/, "Chỉ chấp nhận số, không bao gồm khoảng trắng, dấu phẩy(,) và dấu chấm(.)!")
    flat &= validate.validateInput("productImage", /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/, "Chỉ chấp nhận link ảnh !")
    flat &= validate.validateInput("productDes", /^([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\d,.!@#$%^&*()_"<>?+-]+){10,200}$/, "Không để trống, từ 10 đến 200 ký tự !")
    flat &= validate.validateInput("productType", /(iphone|Samsung)/, "Phải chọn hãng")
    flat &= validate.validateInput("productScreen", /^[a-zA-Z0-9., ]+$/, "Không để trống")
    flat &= validate.validateInput("productCamera", /^[a-zA-Z0-9., ]+$/, "Không để trống")
    flat &= validate.validateInput("productFrontCamera", /^[a-zA-Z0-9., ]+$/, "Không để trống")
    if (!flat) return
    const product = new Product(
        ele.getValEle("productName"),
        ele.getValEle("productPrice"),
        ele.getValEle("productScreen"),
        ele.getValEle("productCamera"),
        ele.getValEle("productFrontCamera"),
        ele.getValEle("productImage"),
        ele.getValEle("productDes"),
        ele.getValEle("productType")
    )
    ele.disableEle(["productName", "productPrice", "productImage", "productDes", "productType", "productScreen", "productCamera", "productFrontCamera"])
    callapi.setItem(product)
        .then(() => {
            alert("Thêm thành công !")
            ele.enableEle(["productName", "productPrice", "productImage", "productDes", "productType", "productScreen", "productCamera", "productFrontCamera"])
            $(document).ready(() => {
                $("#exampleModal").modal('hide');
            })
            renderAdminTable();
        })
        .catch((value) => {
            console.log(value); 
        })


}
// TODO: bấm nút delete mỗi dòng
const deleteItem = (idItem) => {
    console.log(idItem);
    callapi.delItemById(idItem)
        .then(() => {
            renderAdminTable();
            // ele.getEle("alertDelete").classList.remove("d-none");
            // ele.getEle("alertDelete").classList.add("d-block");



            ele.getEle("alertDelete").innerHTML = `
            <div class="alert alert-success alert-dismissible fixed-bottom">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> Đã xóa sản phẩm có ID: ${idItem}
             </div>
            `
        })
}
// TODO: bấm nút edit mỗi dòng
const editItem = (idItem) => {
    ele.getEle("btnUpdate").style.display = ""
    ele.getEle("exampleModalLabel").innerHTML = "CHỈNH SỬA THÔNG TIN"
    ele.getEle("btnAdd").style.display = "none"
     callapi.getItemById(idItem)
        .then((response) => {
            ele.getEle("productName").value = response.data["name"] 
            ele.getEle("productPrice").value = response.data["price"] 
            ele.getEle("productScreen").value = response.data["screen"] 
            ele.getEle("productCamera").value = response.data["backCamera"] 
            ele.getEle("productFrontCamera").value = response.data["frontCamera"] 
            ele.getEle("productImage").value = response.data["img"] 
            ele.getEle("productDes").value = response.data["desc"] 
            ele.getEle("productType").value = response.data["type"] 
            ele.getEle("btnUpdate").setAttribute("onclick",`updateItem(${response.data["id"] })`)
        })
}
// TODO: bấm nút update trên modal
const updateItem = (idItem) => {
     
    let flat = true;
    flat &= validate.validateInput("productName", /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\d!@#$%^&*()|/]+$/, "Chỉ chấp nhận chữ hoặc số và khoảng trắng và các ký tự đặc biệt !")
    flat &= validate.validateInput("productPrice", /^[1-9]\d*$/, "Chỉ chấp nhận số, không bao gồm khoảng trắng, dấu phẩy(,) và dấu chấm(.)!")
    flat &= validate.validateInput("productImage", /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/, "Chỉ chấp nhận link ảnh !")
    flat &= validate.validateInput("productDes", /^([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\d,.!@#$%^&*()_"<>?+-]+){10,200}$/, "Không để trống, từ 10 đến 200 ký tự !")
    flat &= validate.validateInput("productType", /(iphone|Samsung)/, "Phải chọn hãng")
    flat &= validate.validateInput("productScreen", /^[a-zA-Z0-9., ]+$/, "Không để trống")
    flat &= validate.validateInput("productCamera", /^[a-zA-Z0-9., ]+$/, "Không để trống")
    flat &= validate.validateInput("productFrontCamera", /^[a-zA-Z0-9., ]+$/, "Không để trống")
    if (!flat) return
    const product = new Product(
        ele.getValEle("productName"),
        ele.getValEle("productPrice"),
        ele.getValEle("productScreen"),
        ele.getValEle("productCamera"),
        ele.getValEle("productFrontCamera"),
        ele.getValEle("productImage"),
        ele.getValEle("productDes"),
        ele.getValEle("productType")
    )
    ele.disableEle(["productName", "productPrice", "productImage", "productDes", "productType", "productScreen", "productCamera", "productFrontCamera"])
    console.log(product);
    console.log(idItem);
    callapi.setItemById(product,idItem)
        .then(() => {
            alert("Cập nhật thành công !")
            ele.enableEle(["productName", "productPrice", "productImage", "productDes", "productType", "productScreen", "productCamera", "productFrontCamera"])
            $(document).ready(() => {
                $("#exampleModal").modal('hide');
            })
            renderAdminTable();
        })
        .catch((value) => {
            console.log(value); 
        })

}
// TODO: xử lý onchange chọn loại sản phẩm
const phoneType = () => {
    ele.getEle("loaderAdmin").style.display = "block";
    const valueOption = ele.getValEle("phoneType");
    // TODO: Dừng thực thi nếu
    if (valueOption === "Chọn hãng"){
        callapi.getItem()
            .then((response) => {
                 
                render.tableAdmin(response.data) //! thay đổi dữ liệu
                ele.getEle("loaderAdmin").style.display = "none";
            })
        return
    } 
    callapi.getItem() // type promise
        .then((response) => { //*bắt đầu then
            let onChangeArray = [];
            response.data.forEach(element => {
                const regex =
                    new RegExp(
                        valueOption,
                        "i")
                if (regex.test(element["type"])) onChangeArray.push(element)
            });
            // TODO: Dừng thực thi nếu...
            if (onChangeArray === null) return
            render.tableAdmin(onChangeArray) //! thay đổi dữ liệu
            ele.getEle("loaderAdmin").style.display = "none";
        })                    //*kết thúc then

}
// TODO: search
const searchProduct = () => {
    ele.getEle("loaderAdmin").style.display = "block";
    const searchValue = ele.getEle("searchNameProduct").value; //value input
    const regexPatern = new RegExp(searchValue,"gi");
    const array = [];
    callapi.getItem()
        .then((response) => {
            response.data.forEach(element => {
                let x = element.name.search(regexPatern)
                if(x>-1){
                    
                    array.push(element)
                }
                
            });
            render.tableAdmin(array)
            ele.getEle("loaderAdmin").style.display = "none";
            
        })


}


window.searchProduct = searchProduct;
window.phoneType = phoneType;
window.updateItem = updateItem;
window.editItem = editItem;
window.addNewItem = addNewItem;
window.deleteItem = deleteItem;
window.renderAdminTable = renderAdminTable;
window.add = add;