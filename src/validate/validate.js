/*******************************************************
 *       TODO: LỚP KIỂM TRA TÍNH HỢP LỆ DỮ LIỆU        *
 *            !CHỈ DÙNG CHO DỮ LIỆU Ô INPUT            *
 *           * METHOD CHÍNH: VALIDATEINPUT()           *
 *    THÔNG QUA: TRẢ VỀ TRUE, XÓA BÁO LỖI TRÊN HTML    *
 * KHÔNG THÔNG QUA: TRẢ VỀ FLASE, IN BÁO LỖI TRÊN HTML *
 *******************************************************/
/**
 * validateInput();
 * removeError();
 * addError();
 */
class Validate {
    /***************************************************************
     *  TODO: KIỂM TRA TÍNH HỢP LỆ DỮ LIỆU NHẬP LIỆU TỪ THẺ INPUT  *
     * FUNCTION: THÔNG QUA ID CỦA THẺ INPUT, PATTER CỦA BIỂU THỨC  *
     * CHÍNH QUY REGEXP, LỜI NHẮN LỖI MESS. KHỞI TẠO BIẾN HỨNG GIÁ *
     * TRỊ CỦA Ô INPUT. DÙNG REGEXP (PATTERN) KIỂM TRA TÍNH HỢP LỆ *
     * CỦA GIÁ TRỊ CỦA Ô INPUT. NẾU ĐÚNG THÌ XÓA THÔNG BÁO LỖI VÀ  *
     *  TRẢ VỀ TRUE, NẾU SAI THÌ HIỂN THỊ THÔNG BÁO LỖI VÀ TRẢ VỀ  *
     *                            FALSE                            *
     ***************************************************************/
    validateInput(id, pattern, mess) {
        
        const value = // Khởi tạo biến hứng giá trị ô input
            document
                .getElementById(id)
                .value;
             
        if (pattern.test(value)) { //?Kiểm tra tính hợp lệ RegExp
            this.removeError(id)
            return true //! Thông qua sự kiểm tra.
        }
        this.addError(id, mess)
        return false //! Không thông qua.
    }
    /**********************************************************************
     *                      TODO: XÓA THÔNG BÁO LỖI                       *
     * GIẢI THÍCH: THÔNG QUA ID CỦA THẺ INPUT, TÌM THẺ CHA CỦA THẺ INPUT  *
     * ĐÓ. TÌM TẬP HỢP THẺ CON THÔNG QUA THẺ CHA VỪA TÌM THẤY. DUYỆT TẬP  *
     * HỢP THẺ CON - CHILDELEMENT. NẾU TÌM THẤY THÌ REMOVE THẺ P VÀ THOÁT *
     * VÒNG LẶP. NẾU KHÔNG TÌM THẤY THÌ DUYỆT XONG VÒNG LẶP VÀ KHÔNG LÀM  *
     *                                 GÌ                                 *
     **********************************************************************/
    removeError(id) {
        let father = // Tìm thẻ cha
            document
                .getElementById(id)
                .parentElement;
        let childElement = // Tìm tập hợp thẻ con
            father
                .children;
        for (let i = 0; i < childElement.length; i++) {
            let element = childElement[i];
            if (element.nodeName === "P") {
                element.remove(); //! Xóa báo lỗi
                break // Thoát vòng lặp
            }
        }
    }

    /*****************************************************************
     * TODO: IN THÔNG BÁO LỖI PHÍA DƯỚI THẺ INPUT
     *        !KHÔNG ÁP DỤNG CHO THẺ FORM TỒN TẠI MẶC ĐỊNH P         *
     *           !METHOD CÓ SỬ DỤNG CLASS CỦA BOOTSTRAP 4            *
     *         THÔNG QUA ID CỦA INPUT VÀ LỜI TIN NHẮN MESS.          *
     *TÌM THẺ CHA CỦA INPUT TRẢ VỀ PARENT,TÌM TẬP HỢP THẺ CON từ thẻ * 
     * cha TRẢ VỀ CHILD. MẶC ĐỊNH KHÔNG TÌM THẤY THẺ P. DUYỆT TẬP    *
     * HỢP CHILD ĐỂ TÌM KIẾM THẺ P. NẾU CÓ P THÌ THOÁT VÒNG LẶP NGAY *
     * LẬP TỨC. SAU KHI DUYỆT, NẾU THẤY P THÌ DỪNG FUNCTION NGAY LẬP *
     * TỨC. CÒN NẾU KHÔNG THẤY THÌ KHỞI TẠO THẺ P, KHỞI TẠO TEXTNODE *
     * ADD TEXTNODE VÀO P, SET ATTRIUTE CHO P. CUỐI CÙNG ADD ELEMENT *
     *                         P VÀO FATHER                          *
     *****************************************************************/
    /**
     * * Hiển thị lời nhắn lỗi trên element P
     * @param {*} id của input
     * @param {*} mess lời nhắn thông báo lỗi.
     * @returns Dùng để thoát Function ngay lập tức
     */
    addError(id, mess) {
        let parent = // Tìm thẻ cha
            document
                .getElementById(id)
                .parentElement;
        let child = // Tìm tập hợp thẻ con thông qua cha
            parent
                .children;
        let pIsExist = false; // Giả sử p không tồn tại
        for (let i = 0; i < child.length; i++) {
            let element = child[i];
            if (element.nodeName === "P") {
                pIsExist = true; //
                break //* element p tồn tại, thoát vòng lặp
            }
        }
        if (pIsExist) return //* element p tồn tại, STOP FUNCTION
        let element = //Tạo thẻ P
            document
                .createElement("p");
        let node =  // Tạo Text cho thẻ P
            document
                .createTextNode(mess);
        element.appendChild(node); // Đẩy text node vào P
        element.setAttribute("class", "text-danger");
        parent.appendChild(element); // ! In báo lỗi
    }



}
export default Validate