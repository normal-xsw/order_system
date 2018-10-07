<template> 
  <div id="home">
    <div class="content">
      <header class="index_header">
          <div>
              <router-link to="/hot">
                <img src="./../assets/images/rexiao.png" alt="">
                <p>热销榜</p>
              </router-link>
          </div>
          <div>
              <router-link to="/order">
                <img src="./../assets/images/caidan.png" alt="">
                <p>点过的菜</p>
              </router-link>
          </div>
          <div>
              <router-link to="/search">
                <img src="./../assets/images/sousuo.png" alt="">
                <p>搜你喜欢</p>
              </router-link>
          </div>
      </header>

      <aside class="left_cate" id="left_cate">
          <ul>
              <li v-for="(item, key) in list" @click="changeScrollTop(key)">{{item.title}}</li> 
          </ul>
          <div class="nav_cate" id="nav_cate">
              <img src="./../assets/images/nav.png" alt="">
              <p>菜单</p>
          </div>
      </aside>
        <div class="item" v-for="item in list">
            <h3 class="item_cate">{{item.title}}</h3>
            <ul class="item_list">
                <li v-for="food in item.list">
                    <router-link :to="'/pcontent?id=' + food._id">
                      <div class="inner">
                        <img v-bind:src="api + food.img_url" alt="">
                        <p class="title">{{food.title}}</p>
                        <p class="price">¥{{food.price}}</p>
                      </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

    <v-navfooter></v-navfooter>
    <v-cartfooter></v-cartfooter>
        
    <div class="bg" id="bg">
    </div>
  </div>
</template>

<script>
/*引入脚部导航*/
import NavFooter from './public/NavFooter.vue';
import CartFooter from './public/CartFooter.vue';
import Config from './../model/config.js';

export default {
  data () {
    return {
        list: [],
        api: Config.api
    };
  },
  components: {
      'v-navfooter': NavFooter,
      'v-cartfooter': CartFooter
  },
  methods: {
      asideDomInit(){
        var leftCate = document.getElementById('left_cate');
        var navCate = document.getElementById('nav_cate');
        var bg = document.getElementById('bg');
        var flag = true;

        bg.onclick = navCate.onclick = function(){
            if(flag){
                flag = false;
                leftCate.style.transform = 'translate(0, 0)';
                bg.style.display = 'block';
            }
            else{
                flag = true;
                leftCate.style.transform = 'translate(-100%, 0)';
                bg.style.display = 'none';
            }
        }
      },

      requestData(){
        var api = this.api + 'api/productlist';

        this.$http.get(api).then(response => {
            this.list = response.body.result;
            //console.log(response);
        }, response => {
            console.log('request errer');
        })
        
      },

      changeScrollTop(key){
          // alert(key);

          var itemCates = document.querySelectorAll('.item_cate');
          var leftCate = document.getElementById('left_cate');
          var bg = document.getElementById('bg');

          document.documentElement.scrollTop = itemCates[key].offsetTop;
          bg.style.display = "none";
          leftCate.style.transform = 'translate(-100%, 0)';
      }
  },
  mounted(){
      this.asideDomInit();

      this.requestData();
  }
}
</script>

<style lang="scss">

  /*头部*/
  .index_header{
      display: flex;
      background-color: #fff;
      width: 96%;
      border-radius: 0.5rem;
      height: 4.4rem;
      margin: 1rem auto 0 auto;

      div{
          flex: 1;
          border-right: 1px solid #eee;
          width: 100%;
          text-align: center;

          img{
              width: 2rem;
              height: 2rem;
              margin: 0.2rem auto 0 auto;
          }

          &:last_child{
              border-right: none;
          }
      }
  }

  /*内容*/
  .item{
      .item_cate{
          text-align: center;
          padding: 0.5rem;
      }

      .item_list{
          display: flex;
          flex-wrap: wrap;
          padding: 0 0.5rem;

          li{
              width: 33.3%;
              padding: 0.5rem;
              box-sizing: border-box;

              a{
                  color: #666;
              }
              .inner{
                  width: 100%;
                  background-color: #fff;
                  border-radius: 0.5rem;
                  overflow: hidden;
      
                  img{
                      width: 100%;
                      height: 6rem;
                  }

                  .title{
                      font-weight: bold;
                  }
              }
          }
      }
  }

  /*侧边栏*/
  .left_cate{
      /*过渡动画*/
      transition: all 500ms;
      transform: translate(-100%, 0);

      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width: 6rem;
      height: 100%;
      background-color: #eee;

      ul{
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          background-color: #eee;
          height: 100%;
          padding: 0.5rem;

          li{
              width: 5rem;
              line-height: 4rem;
          }
      }

      .nav_cate{
          position: absolute;
          z-index: 1;
          top: 42%;
          left: 70%;
          width: 5rem;
          height: 4rem;
          background: rgba(132, 128, 128, 0.9);
          border-radius: 0 50% 50% 0;
          

          img{
              width: 2rem;
              height: 2rem;
              margin-left: 2.3rem;
              margin-top: 0.3rem;
          }

          p{
              margin-left: 2.3rem;
              margin-top: -0.3rem;
              color: #fff;
          }
      }
  }

  /*遮罩层*/
  .bg{
      position: fixed;
      z-index: 1;
      left: 0; 
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(132, 128, 128, 0.4);
      display: none;
  }


</style>
