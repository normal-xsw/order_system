<template>
    <div id="cart_footer">
        <router-link to="/cart">
            <div class="foot_cart">
                <img src="./../../assets/images/cart.png" alt="">
                <p>购物车</p>
                <div class="cart_num" v-if="cartNum">{{cartNum}}</div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import Config from './../../model/config.js';
    import Storage from './../../model/storage.js';

    export default {
        data(){
            return{
                api: Config.api,
                cartNum: 0
            };
        },
        methods: {
            getCartInfo(){
                var uid = Storage.get('roomid');
                var api = this.api + 'api/cartCount?uid=' + uid;

                this.$http.get(api).then(response =>{
                    console.log(response);

                    this.cartNum = response.body.result;
                }, err => {
                    console.log(err);
                })
            }
        },
        sockets: {
            addcart: function(){     /*接受服务器广播过来的addcart*/
               // console.log("接收到服务器的广播了");
                this.getCartInfo();     //更新购物车菜品数量
            }
        },
        mounted() {
            this.getCartInfo();
        },
    }
</script>