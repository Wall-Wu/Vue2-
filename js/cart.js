new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },
    filters:{
        formatMoney:function (value) {
         return"￥" +value.toFixed(2);
        }
    },
    mounted:function () {
       this.cartView();
    },
    methods:{
      cartView: function () {
          // let _this = this;
         this.$http.get("data/cartData.json",{"id" :123}).then(res=>{   //ES6 语法 res=>相当于把res作为参数的一个函数
               this.productList = res.data.result.list;
               // this.totalMoney = res.data.result.totalMoney;
         });
      },
      changeMoney:function (product,way) {
          if(way>0){
            product.productQuantity++;
          }else {
              product.productQuantity--;
              if(product.productQuantity<1){
                  product.productQuantity=1;
              }
          }
          this.calcTotalPrice();
      },
        selectedProduct:function (item) {
          if(!item.checked){
              Vue.set(item,"checked",true);
              // tjis.$set(item,"checked",true);
          }else {
              item.checked = !item.checked;
          }
          this.calcTotalPrice();
        },
        checkAll:function (flag) {
          this.checkAllFlag = flag;
          var _this =this;
            this.productList.forEach(function (item,index) {
                if(!item.checked){
                    Vue.set(item,"checked",_this.checkAllFlag);
                    // tjis.$set(item,"checked",true);
                }else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function () {
            var _this =this;
            _this.totalMoney=0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                   _this.totalMoney += item.productPrice*item.productQuantity;
                }
            });
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curProduct =item;
        },
        delProduct:function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
            this.calcTotalPrice();
        }
    }
});