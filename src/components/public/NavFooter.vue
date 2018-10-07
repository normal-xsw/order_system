<template>
    <div id="navfooter">
        <div class="foot_nav" @click="flag=!flag">
            <img src="./../../assets/images/navigation.png" alt="">
            <p>导航</p>
        </div>
        <div class="foot_nav_show" v-if="flag">
            <ul class="list">
                <li>
                    <router-link to="/home">
                        <img src="./../../assets/images/book.png" alt="">
                        <p>菜单</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/cart">
                        <img src="./../../assets/images/cart.png" alt="">
                        <p>购物车</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/order">
                        <img src="./../../assets/images/book.png" alt="">
                        <p>我的订单</p>
                    </router-link >
                </li>
                <li>
                    <router-link to="/order">
                        <img src="./../../assets/images/order.png" alt="">
                        <p>结账</p>
                    </router-link >  
                </li>
                <li @click="flag=!flag">
                    <img src="./../../assets/images/close.png" alt="">
                    <p>返回</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Config from './../../model/config.js';

    export default {
        data(){
            return{
                flag: false,
            };
        },
    }
</script>

