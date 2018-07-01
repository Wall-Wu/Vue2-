new Vue({
    el:'.container',
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1,
        delFlag:false,
        editFlag: false,
        confirmAddFlag: false,
        // moreCard:true,
        curProduct:"",
        newAddress:{
            "addressId":"",
            "userName":"",
            "streetName":"",
            "postCode":"",
            "tel":"",
            "isDefault":false
        },
        editIndex: 0,
        editWay: 0
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function () {
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if(res.status=="0"){
                    this.addressList = res.result;
                }
            });
        },
        loadMore:function () {
                this.limitNum=this.addressList.length;
        },
        setDefault:function(addressId){
            //形参addressId实际上等于参数item.addressId，相当于把出发点击事件的地址的ID传入进来。
            //遍历整个地址数组的每一项，把每一项元素的addressId与触发点击事件的addressId进行对比，
            //一致的元素就是我们点击的那个元素。
            this.addressList.forEach(function(item){
                if (addressId == item.addressId){
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        },
        //  设为默认地址后自动跳为list的第一个地址，但是有瑕疵，选择框没有跟随地址一起跳而是留在原地
        // setDefault: function (item,index) {
        //     this.addressList.forEach(function (address) {
        //         address.isDefault = false;
        //     });
        //     item.isDefault = true;
        //     this.addressList.splice(index, 1);
        //     this.addressList.unshift(item); //unshift方法向数组开头添加一个或多个元素，并返回新的长度
        //     this.currentIndex = 0;  //无效，因为添加了点击事件@click="currentIndex = index"
        // },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curProduct =item;
        },
        delProduct:function () {
            var index = this.addressList.indexOf(this.curProduct);
            this.addressList.splice(index,1);
            this.delFlag=false;
            this.currentIndex = 0;
        },

        clear:function () {
            this.editFlag = true;
            this.newAddress="";
            this.addressList.push(this.newAddress);
        },

        showDialog() {
            // this.currentAddress = item;

                    let currentAddress = this.addressList[this.currentIndex];

                    //todo 确保保存时才更新页卡中的地址信息，单独取一份数据进行编辑处理
                    this.newAddress = {
                        userName: currentAddress.userName,
                        streetName: currentAddress.streetName,
                        tel: currentAddress.tel
                    };

                    this.editFlag = true;
        },

        editAddress() {
            let currentAddress = this.addressList[this.currentIndex];

            Object.assign(currentAddress,this.newAddress);
            // this.addressList.push(this.newAddress);

            /*//todo 没找到批量更新data多个键值对的方法
            currentAddress.userName = this.editInfo.userName;
            currentAddress.streetName = this.editInfo.streetName;
            currentAddress.tel = this.editInfo.tel;*/

            this.editFlag = false;
        },

        //  有很严重的bug的一个函数
        // editAddress: function (item,index,way) {
        //     alert("item"+item);
        //     alert("index"+index);
        //     alert("way"+way);
        //     this.editFlag = true;   //唤醒编辑状态
        //     if (way == 0){  //如果是编辑卡片，则打开编辑框，内容与当前地址保持一致
        //         this.newAddress.userName = item.userName;
        //         alert(item.userName);
        //         this.newAddress.streetName = item.streetName;
        //         this.newAddress.tel = item.tel;
        //         this.editIndex = index; //将当前位置值赋值给被编辑位置，方便点击保存时取值
        //         this.editWay = 0;   //判断编辑方式传递给下一操作（是编辑而非新增）
        //         alert("editWay:"+editWay);
        //     } else {    //如果是添加卡片，则内容置空，addressId递增
        //         var length = this.addressList.length - 1;
        //             lastAddress = this.addressList[length];
        //         this.newAddress.addressId = lastAddress.addressId + 1;
        //         this.editWay = 1;   //判断编辑方式传递给下一操作（是新增而非编辑）
        //     }
        // },

        //  有很严重的bug的一个函数
        // saveAddress: function () {
        //     if (this.editWay == 0){
        //         this.addressList.splice(this.editIndex, 1 ,this.newAddress);    //用编辑后的新地址代替新地址
        //     } else {
        //         this.addressList.push(this.newAddress);     //在数组末尾插入新地址
        //     }
        //     this.editFlag = false;
        // }
    }
});