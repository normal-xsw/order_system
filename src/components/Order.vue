<template> 
  <div id="order">
    <div class="order_content">
        <div class="order_info">
            <div class="order_top">
                <img src="./../assets/images/timer.png" alt="">
                <div class="order_info_right">
                    <h2>{{list.uid}}号桌待门店接单</h2>
                    <p>请及时联系服务员确认一点菜品信息!</p>
                </div>
            </div>
            <h3>
                已点菜品{{list.total_num}}份,合计 : <span>{{list.total_price}}元</span>
            </h3>
            <button @click="doPay()">立即结账</button>
        </div>

        <div class="order_list">
            <h3>菜品详情</h3>
            <ul class="list">
                <li v-for="item in list.items">
                    <div class="title">{{item.title}} /<span>已下厨</span></div>
                    <div class="num">{{item.num}}份</div>
                    <div class="price">{{item.price}}元</div>
                </li>
            </ul>
        </div>
      </div>

      <footer>
            <v-navfooter></v-navfooter>
            <div class="foot_menu" style="left: auto; right: 5px">
                <router-link to="/home">
                    <img src="./../assets/images/menu.png" alt="">
                    <p>菜单</p>
                </router-link>
            </div>
      </footer>
  </div>
</template>

<script>
import NavFooter from './public/NavFooter.vue';
import Storage from './../model/storage.js';
import Config from './../model/config.js';

export default {
  name: 'app',
  data () {
    return {
     api: Config.api,
     uid: Storage.get('roomid'),
     list: []
    };
  },
  components: {
      'v-navfooter': NavFooter
  },
  methods: {
      requestOrderData(){
        var api = this.api + 'api/getOrder?uid=' + this.uid;

        this.$http.get(api).then(response => {
          console.log(response);

          this.list = response.body.result[0];
        }, err => {
          console.log(err);
        })
    },
    doPay(){
        var api = this.api + 'api/doPay';
        
        var uid = this.uid;
        var order_id = this.list.order_id;
        var total_price = this.list.total_price;
        var return_url ='http://localhost:8080/#/success'

        this.$http.post(api, {
            uid, 
            order_id,
            total_price, 
            return_url
        }).then(response => {
            console.log(response);

            location.href = response.body.result.data;
        })
    }
  },
  mounted() {
      this.requestOrderData();
  }
}
</script>

<style lang="scss">

.order_content{
padding: 1rem;

.order_info{
    background-color: #fff;
    border-radius: 0.5rem;

    .order_top{
        display: flex;

        img{
            width: 6rem;
            height: 6rem;
        }

        .order_info_right{
            flex: 1;
            margin: 1rem 0 0 2rem;
        }
    }

    h3{
        padding: 0.5rem;

        span{
            color: red;
            font-size: 2rem;
        }
    }
}

  /*订单列表*/
.order_list{
    background-color: #fff;
    border-radius: 0.5rem;
    margin-top: 1rem;

    h3{
        line-height: 2;
        padding: 0.5rem;
    }

    .list{
        li{
            display: flex;
            line-height: 2;
            padding: 0.5rem;

            .title{
                flex: 2;
            }

            .num,.price{
                flex: 1;
                text-align: center;
            }
        }
    }
}

/*支付页面*/
.order_pay{
    
        
    background: #fff;
    
    border-radius: .5rem;
    
    h3{
        
        padding:2rem 0rem .5rem 0rem;
        
        font-size: 2rem;
        text-align: center;
        
    }
    
    .order_pay_detail{
        display: flex;
        
        line-height: 2;
        
        border-bottom: 1px solid #eee;
        
        padding: .5rem;
        
        .d_num,.p_num,.order_time{
            
            flex:1;
        }
    }
    
    .order_pay_info{
        
        line-height: 2;
        
        display: flex;
        
        margin: 1rem 0rem;
        padding: .5rem .5rem 1rem .5rem;
        
        
        .price_list{
            flex: 1;
            
            .price{
                
                font-size: 2rem;
                
                color: red;
            }
        }
        
        .pay_button{
            
                width: 10rem;
                border-radius: .5rem;
                background: red;
                color: #fff;
                text-align: center;
                height: 2.6rem;
                line-height: 2.6rem;
                position: relative;
                
                top:.5rem
        }
    }
}

}
</style>
