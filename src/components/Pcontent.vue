<template> 
  <div id="pcontent">
    <div class="pcontent">
      <router-link to="/home">
        <div class="back">返回</div>
      </router-link>
      <div class="p_info">
        <img :src="api + list.img_url" alt="">
        <h2>{{list.title}}</h2>
        <p class="price">{{list.price}}元/份</p>
      </div>
      <div class="p_detial">
        <h2>商品详情</h2>
        <div class="p_content">
            <p v-html="list.content"></p>
        </div>
      </div>
      <footer class="pfooter">
        <div class="cart">
          <strong>数量：</strong>
          <div class="cart_num">
            <div class="input_left" @click="decNum()">-</div>
            <div class="input_center">
              <input type="text" readonly="readonly" v-model="num" name="num" id="num">
            </div>
            <div class="input_right" @click="incNum()">+</div>
          </div>
        </div>
        <button class="addcart" @click="postAddCart()">加入购物车</button>
      </footer>
    </div>
  </div>
</template>

<script>
    import Config from './../model/config.js'; 
    import Storage from './../model/storage.js'; 

    export default {
    data () {
        return {
            list: [],
            api: Config.api,
            num: 1
        };
    },
    methods: {
        requestData(id){
            var api = this.api + 'api/productcontent?id=' + id;

            this.$http.get(api).then(response => {
                console.log(response);
                this.list = response.body.result[0];
            }, err => {
                console.log(err);
            })
        },
        decNum(){
            if(this.num > 1){
                --this.num;
            }
        },
        incNum(){
            ++this.num;
        },
        postAddCart(){
            //数据要提交到服务器
            //桌子ID（UID）是扫描二维码从URL获取的。

            var api = this.api + 'api/addcart';
            var uid = Storage.get('roomid');

            this.$http.post(api, { 
                uid: uid,
                title: this.list.title,
                product_id: this.list._id,
                img_url: this.list.img_url,
                price: this.list.price,
                num: this.num
            }).then(response =>{
                //console.log(response);

                if(response.body.success){
                    //给服务器发送消息
                    this.$socket.emit('addcart', 'addcart');

                    this.$router.push({ path: 'home'});
                }
            }, err => {
                console.log(err);
            })
        }
        
    },
    mounted() {
        var id = this.$route.query.id;
        
        this.requestData(id);
    },
    }
</script>

<style lang="scss">

  .back{
    
    
    height: 3.8rem;
    line-height: 3.8rem;
    width: 3.8rem;
    
    border-radius: 50%;
    
    
    background: #000;
    
    
    position: fixed;
    
    
    top: .5rem;
    
    left: .5rem;
    
    color: #fff;
    
    
    &:before{
        
        
         content: "";
        
         display: block;
        
         width: .8rem;
         height: .8rem;
         
         border-left: .2rem solid #fff;
         border-bottom: .2rem solid #fff;
         
         float: left;
         
         position: relative;
         
         top:1.3rem;
         
         left:.6rem;
         
         transform: rotate(45deg);
         
         margin-right: .4rem;
   
    }
}
  .p_info{
      margin: 1rem;
      background-color: #fff;

      img{
          width: 100%;
      }

      h2{
          padding: 0.5rem;
      }

      .price{
          color: red;
          padding: 0.5rem;
      }
  }

  .p_detial{
      background-color: #fff;
      margin: 1rem;
      padding: 0.5rem 1rem;

      h2{
          padding: 0.3rem;
      }
      
      img{
          width: 100%;
      }
      
      p{
          font-size: 1.3rem;
          line-height: 1.6;
          margin-bottom: 5rem;
         
      }
  }

  .pfooter{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      border-top: 1px solid #eee;
      background-color: #fff;

      .cart{
          float: left;

          strong{
              font-size:1.6rem;
              padding: 0.5rem;
          }

          .cart_num{
              display: inline-block;
              border-top: 1px solid #eee;
              border-bottom: 1px solid #eee;

              div{
                  display: inline-block;
                  width: 2.8rem;
                  height: 2.8rem;
                  line-height: 2.8rem;
                  text-align: center;
                  color: red;
                  font-size: 2.4rem;
                  border-left: 1px solid #eee;
                  
              }
              .input_center{
                  color:#000;
                  
                  input{
                      width: 100%;
                      border: none;
                      text-align: center;
                  }
              }
              .input_right{
                  border-right: 1px solid #eee;
              }
          }
      }

      .addcart{
          float: right;
          height: 3rem;
          width: 10rem;
          background-color: red;
          color: #fff;
          border-radius: 0.5rem;
          margin-right: 0.5rem;
          margin-top: 0.7rem;
          border: none;
          font-size: 1.5rem;
      }
  }
</style>