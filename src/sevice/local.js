class Local {
    arr = [];
    getItem() {
        if (
            window.localStorage.getItem('smartphone') === null ||
            window.localStorage.getItem('smartphone') === undefined
        ) return
        const json =
            window
                .localStorage
                .getItem('smartphone');
        const item = JSON.parse(json); //! item array
        

        return item
    }
    setItem() {
        const json = JSON.stringify(this.arr);
        window.localStorage.setItem("smartphone", json) //! set item to local
    }
    deleteItem(id){
        this.arr = this.getItem();
        this.arr.forEach((element,index) => {
            console.log(element["id"]);
            console.log(id);
            if(element["id"]*1===id*1){
                this.arr.splice(index,1);
                this.setItem();
                return
            }
        });
        
    }

}
export default Local