<template> 
  <div id="search">
    <header class="search_header">
      <input type="text">
    </header>
    <ul class="search_content">
        <li>
            <img src="./../assets/images/1.jpg" alt="">
            <div>
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
                <p class="count">已售：351份</p>
            </div>
        </li>
        <li>
          <img src="./../assets/images/2.jpg" alt="">
          <div>
              <p class="title">大蒜腊肉</p>
              <p class="price">¥26</p>
              <p class="count">已售：351份</p>
          </div>
      </li>
      <li>
          <img src="./../assets/images/3.jpg" alt="">
          <div>
              <p class="title">大蒜腊肉</p>
              <p class="price">¥26</p>
              <p class="count">已售：351份</p>
          </div>
      </li>
    </ul>
    <footer>
        <v-navfooter></v-navfooter>
        <div class="foot_menu">
          <router-link to="/home">
              <img src="./../assets/images/menu.png" alt="">
              <p>菜单</p>
          </router-link>
        </div>
        <v-cartfooter></v-cartfooter>
    </footer>
  </div>
</template>

<script>

import NavFooter from './public/NavFooter.vue';
import CartFooter from './public/CartFooter.vue';

export default {
  name: 'app',
  data () {
    return {
     
    };
  },
  components: {
      'v-navfooter': NavFooter,
      'v-cartfooter': CartFooter
  }
}
</script>

<style lang="scss">
.search_header{
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    text-align: center; 

    input{
        width: 90%;
        height: 4rem;
        line-height: 4rem;
        border: 1px solid #eee;
        border-radius: 0.5rem;
    }
}

.search_content{
    background-color: #fff;

    li{
        border-bottom: 1px solid #eee;
        padding: 0.5rem;

        div{
            display: inline-block;
            position: relative;
            top: -1rem;
            left: 1rem;

            .title{
                font-size: 1.5rem;
                font-weight: bold;
            }

        }

        img{
            width: 6rem;
            height: 6rem;
        }
    }
}
</style>