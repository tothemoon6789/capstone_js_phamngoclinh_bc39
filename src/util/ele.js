/********************************************************
 * TODO: THAO TÁC TRÊN ELEMENT CHO CÁC FILE CONTROLLERS *
 *      *LẤY ELEMENT:             getEle(id)            *
 *      *LẤY GIÁ TRỊ CỦA ELEMENT: getEleVal(id)         *
 *      *TÌM ELEMENT CHA:         getEleFather(id)      *
 *      *VÔ HIỆU HÓA ELEMENT:     disableEle(array)     *
 *      *HỦY VÔ HIỆU HÓA ELEMENT: enableELe(array)      *
 ********************************************************/
class Ele {
    //TODO: truyền id nhận element
    getEle(id) {
        return document
            .getElementById(id); //! một element
    }
    //TODO: truyền id nhận giá trị
    getValEle(id) {
        return this
            .getEle(id)
            .value; //! giá trị của elemnt
    }
    //TODO: truyền id nhận element cha của id
    getEleFather(id) {
        const element = this.getEle(id);
        return element
            .parentElement; // ! một element cha
    }

    //TODO: truyền mảng id, vô hiệu hóa chúng
    disableEle(array) {
        array.forEach(id => {
            document
                .getElementById(id)
                .disabled = true; //! vô hiệu hóa các element
        });
    }
    // TODO: truyền mảng id, hủy vô hiệu hóa chúng
    enableEle(array) {
        array.forEach(id => {
          
            document
                .getElementById(id)
                .disabled = false; //! tắc vô hiệu hóa các element
        });
    }
    
 
}
export default Ele