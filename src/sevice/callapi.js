/*************************************************
 * TODO: DÙNG ĐỂ THAO TÁC TRÊN mockapi.com       *
 * TODO: LẤY, THÊM XÓA SỬA DỮ LIỆU               *
 * !Phải add thêm link cdn axios trên file html  *
 *          *METHOD CHÍNH:                       *
 *                getItem(),                     *
 *                setItem(),                     *
 *                getItemById(),                 *
 *                setItemById(),                 *
 *                delItemById(),                 *
 *        !CÁC METHOD ĐỀU TRẢ VỀ PROMISE         *
 * VỚI MỖI DỰ ÁN KHÁC NHAU, THAY ĐỔI CONSTRUCTOR *
 *************************************************/
class CallApi {
    constructor(url){
        this.url = url;
    }
    // TODO: Trả về 1 promise chứa toàn bộ dữ liệu của mảng data
    getItem(){
        return axios({ //! Trả về Promise chứa mảng data
            url:this.url,
            method:"GET"
        })
    }
    getItemById(id){
        return axios({ //! Trả về Promise chứa Item
            url:`${this.url}/${id}`,
            method:"GET"
        })
    }
    setItem(item){
        return axios({ //! Set dữ liệu, trả về Promise
            url:this.url,
            method:"POST",
            data: item
        })
    }
    setItemById(item,id){
        return axios({ // !Cập nhật dữ liệu, trả về Promise
            url:`${this.url}/${id}`,
            method:"PUT",
            data:item
        })
    }
    delItemById(id){
        return axios({ //! Xóa dữ liệu, trả về Promise
            url:`${this.url}/${id}`,
            method:"DELETE",
        })
    }
}
export default CallApi