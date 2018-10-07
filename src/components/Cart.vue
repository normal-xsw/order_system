<template> 
  <div id="cart">
    <!--购物车有数据时显示-->
    <div class="cart_exist" v-if="all_food">
      <header class="cart_header">
        <h2>购物车</h2>
        <div class="people_number">
           <div class="people_number_left">
                <p class="people">用餐人数：{{people_list.p_num}}</p>
                <p class="remarts"><span v-if="!people_list.p_mark">备注：无</span><span v-if="people_list.p_mark">备注：{{people_list.p_mark}}</span></p>
           </div>
           <div class="people_number_right">
               <router-link to="/editor">
                <img src="./../assets/images/edit.png" alt="">
                <p>修改</p>
               </router-link>
           </div>
        </div>
        <div class="cart_food">
            <p>购物车中总共有{{all_food}}个菜</p>
            <p>合计：<span>¥{{all_price}}</span></p>
        </div>
      </header>

      <div class="cart_content">
        <ul>
            <li v-for="(item, key) in list">
                <div class="left">
                    <img v-bind:src="api + item.img_url" alt="">
                </div>
                <div class="food_info">
                    <p>{{item.title}}</p>
                    <p>¥{{item.price}}</p>
                </div>
                <div class="right">
                  <div class="cart_num">
                      <div class="input_left" @click="decNum(item, key)">-</div>
                        <div class="input_center">
                            <input type="text"  readonly="readonly" v-model="item.num" name="num" id="num" />
                        </div>
                      <div class="input_right" @click="incNum(item)">+</div>				      
                  </div>	
                </div>
            </li>
        </ul>
      </div>
      
      <div class="hot_food">
        <h3>本店顾客最常点的菜</h3>
        <div class="item_list_outer">
            <ul class="item_list">
                <li>
                    <div class="inner">
                        <img src="./../assets/images/1.jpg" alt="">
                        <p class="title">大蒜腊肉</p>
                        <p class="price">¥26</p>
                    </div>
                </li>
                <li>
                    <div class="inner">
                        <img src="./../assets/images/2.jpg" alt="">
                        <p class="title">大蒜腊肉</p>
                        <p class="price">¥26</p>
                    </div>
                </li>
                <li>
                    <div class="inner">
                        <img src="./../assets/images/3.jpg" alt="">
                        <p class="title">大蒜腊肉</p>
                        <p class="price">¥26</p>
                    </div>
                </li>
                <li>
                    <div class="inner">
                        <img src="./../assets/images/4.jpg" alt="">
                        <p class="title">大蒜腊肉</p>
                        <p class="price">¥26</p>
                    </div>
                </li>
                <li>
                    <div class="inner">
                        <img src="./../assets/images/5.jpg" alt="">
                        <p class="title">大蒜腊肉</p>
                        <p class="price">¥26</p>
                    </div>
                </li>
                <li>
                    <div class="inner">
                        <img src="./../assets/images/6.jpg" alt="">
                        <p class="title">大蒜腊肉</p>
                        <p class="price">¥26</p>
                    </div>
                </li>
            </ul>
          </div>
      </div>
    </div>

      <!--购物车没数据时显示-->
      <div class="cart_empty" v-if="!all_food">
        <div class="hot_food">
          <h3>本店顾客最常点的菜</h3>
          <div class="item_list_outer">
              <ul class="item_list">
                  <li>
                      <div class="inner">
                          <img src="./../assets/images/1.jpg" alt="">
                          <p class="title">大蒜腊肉</p>
                          <p class="price">¥26</p>
                      </div>
                  </li>
                  <li>
                      <div class="inner">
                          <img src="./../assets/images/2.jpg" alt="">
                          <p class="title">大蒜腊肉</p>
                          <p class="price">¥26</p>
                      </div>
                  </li>
                  <li>
                      <div class="inner">
                          <img src="./../assets/images/3.jpg" alt="">
                          <p class="title">大蒜腊肉</p>
                          <p class="price">¥26</p>
                      </div>
                  </li>
                  <li>
                      <div class="inner">
                          <img src="./../assets/images/4.jpg" alt="">
                          <p class="title">大蒜腊肉</p>
                          <p class="price">¥26</p>
                      </div>
                  </li>
                  <li>
                      <div class="inner">
                          <img src="./../assets/images/5.jpg" alt="">
                          <p class="title">大蒜腊肉</p>
                          <p class="price">¥26</p>
                      </div>
                  </li>
                  <li>
                      <div class="inner">
                          <img src="./../assets/images/6.jpg" alt="">
                          <p class="title">大蒜腊肉</p>
                          <p class="price">¥26</p>
                      </div>
                  </li>
              </ul>
            </div>
        </div>
        <div class="nodata">
          <h2>购物车空空的</h2>
          <p>您可以点击下面的菜单开始点菜</p>
        </div>
      </div>

      <footer>
        <v-navfooter></v-navfooter>
        <div class="foot_menu">
          <router-link to="/home">
              <img src="./../assets/images/menu.png" alt="">
              <p>菜单</p>
          </router-link>
        </div>
        <div class="foot_order" @click="postAddOrder()">
                <img src="./../assets/images/doorder.png" alt="">
                <p>下单</p>
            </div>
      </footer>
  </div>
</template>

<script>
  import NavFooter from './public/NavFooter.vue';
  import Config from './../model/config.js';
  import Storage from './../model/storage.js';

  export default {
    data() {
      return {
        list: [],           //存储菜品信息
        api: Config.api,
        all_food: 0,
        all_price: 0,
        people_list: []      //存储用户点餐信息
      };
    },
    sockets: {
        addcart: function(){    /*接受服务器广播过来的addcart*/
            //console.log("cart.vue接收到服务器的广播");
            this.requestCartData();      //更新购物车数据           
        }
    },
    methods: {
      requestCartData(){
        var uid = Storage.get('roomid');
        var api = this.api + 'api/cartlist?uid=' + uid;

        this.$http.get(api).then(response => {
          //console.log(response);

          this.list = response.body.result;

          this.getCount();
        }, err => {
          console.log(err);
        })
      },
      decNum(item, key){
        var uid = item.uid;
        var product_id = item.product_id;
        var num = item.num;
        var api = this.api + 'api/decCart?uid=' + uid + '&product_id=' + product_id + '&num=' + num;

        this.$http.get(api).then(response => {
          //console.log(response);

          this.$socket.emit('addcart', 'addcart');         //给服务器发消息
        }, err => {
          console.log(err);
        })

        if(item.num === 1){
          this.list.splice(key, 1);
        }
        else{
          --item.num;
        }

        this.getCount();
      },
      incNum(item){
        var uid = item.uid;
        var product_id = item.product_id;
        var num = item.num;
        var api = this.api + 'api/incCart?uid=' + uid + '&product_id=' + product_id + '&num=' + num;

        this.$http.get(api).then(response => {
          //console.log(response);

          this.$socket.emit('addcart', 'addcart');         //给服务器发消息
        }, err => {
          console.log(err);
        })

        ++item.num;
        this.getCount();
      },
      //获得菜品数量和菜品总价
      getCount(){
        var all_food = 0;
        var all_price = 0;

        for(let i = 0; i < this.list.length; i++){
          all_food += this.list[i].num;
          all_price += parseFloat(this.list[i].price) * this.list[i].num;
        }

        this.all_food = all_food;
        this.all_price = all_price;
      },
      getPeopleInfo(){
        var uid = Storage.get('roomid');
        var api = this.api + 'api/peopleInfoList?uid=' + uid;
        this.$http.get(api).then(response => {
          //console.log(response);

          this.people_list = response.body.result[0];
          console.log(this.people_list);
        }, err => {
          console.log(err);
        })
      },
      postAddOrder(){
        var uid = Storage.get('roomid');
        var p_num = this.people_list.p_num;
        var p_mark = this.people_list.p_mark;
        var total_price = this.all_price;
        var total_num = this.all_food;
        var order = JSON.stringify(this.list);
        console.log(this.list);
        var api = this.api + 'api/addOrder';

        this.$http.post(api, {
          uid,
          p_num,
          p_mark,
          total_price,
          total_num,
          order
        }).then(response => {
          //console.log(response);

          if(response.body.success){
            this.$socket.emit('addcart', 'addcart');
            this.$router.push({ path: 'order'});
          }
          else{
            alert('提交订单有错误');
          }
        }, err => {
          console.log(err);
        })
      }
    }, 
    mounted() {
      this.requestCartData();

      this.getPeopleInfo();
    },
    components: {
      'v-navfooter': NavFooter
    }
  };
</script>

<style lang="scss">
.cart_header {
  margin: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem;

  h2 {
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }

  .people_number {
    display: flex;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #eee;

    .people_number_left {
      flex: 1;

      .people {
        color: red;
        margin-bottom: 0.5rem;
      }
    }

    .people_number_right {
      width: 4rem;
      height: 4rem;

      img {
        width: 1.8rem;
        height: 1.8rem;
        margin: 0 auto;
      }
      a{
        color: #666 ;
      }
    }
  }

  .cart_food {
    border-bottom: 1px solid #eee;

    p {
      padding: 0.5rem;

      span {
        color: red;
        font-size: 2.4rem;
      }
    }
  }
}

.cart_content {
  background-color: #fff;
  margin: 1rem;
  border-radius: 0.5rem;

  li {
    display: flex;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #eee;

    .left {
      flex: 1;

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.5rem;
        margin-right: 0.8rem;
      }
    }

    .food_info {
      flex: 1;
    }

    .right {
      width: 10rem;

      .cart_num {
        display: flex;
        width: 10rem;
        margin-top: 0.8rem;

        div {
          flex: 1;
          width: 2.8rem;
          height: 2.8rem;
          line-height: 2.8rem;
          text-align: center;
          color: red;
          font-size: 2.4rem;
          border: 1px solid #eee;
          &:nth-child(2) {
            border: none;
          }

          input {
            width: 100%;
            height: 100%;
            border: 1px solid #eee;
            text-align: center;
            float: left;
          }
        }
      }
    }
  }
}

footer{
  .foot_order{
    position: fixed;
    right: 0.5rem;
    bottom: 0.5rem;
    width: 4.4rem;
    height: 4.4rem;
    background-color: red;
    border-radius: 50%;
    text-align: center;

    img{
        width: 1.8rem;
        height: 1.8rem;
        margin-top:0.5rem;
    }

    p{
        margin-top: -0.3rem;
        color: #fff;
    }
  }
}

/*最常点的菜*/
.hot_food {
  background-color: #fff;
  border-radius: 0.5rem;
  margin: 1rem;

  h3 {
    padding: 0.5rem;
  }

  .item_list_outer {
    width: 100%;
    overflow-x: auto;

    .item_list {
      width: 50rem;

      li {
        float: left;
        width: 8rem;
        box-sizing: border-box;
        padding: 0.5rem;
        border-radius: 0.5rem;

        .inner {
          width: 100%;
          border-radius: 0.5rem;

          img {
            width: 100%;
            border-radius: 0.5rem;
          }
        }
      }
    }
  }
}

.nodata {
  text-align: center;
  line-height: 2.4rem;
}
</style>
