<template> 
  <div id="start">
      <div v-show="show_loading" class="show_loading">
          <div class="inner">
              <h2>loading...</h2>
              <img src="./../assets/images/loading.gif" alt="">
          </div>
      </div>

    <div class="start_content" v-show="!show_loading">
        <header class="header_content">
            <img src="./../assets/images/餐具.png" alt="">
            用餐人数
        </header>

        <p>请选择正确的用餐人数，小二马上给你送餐具</p>
        <ul class="p_num_list">
          <li v-for="(item, key) in people_list">
              <span v-bind:class="{active: key === 0}">{{item}}人</span>
          </li>
        </ul>
        <input type="text" placeholder="请输入您的口味，忌口等（可不填）" v-model="p_mark">
        <ul class="p_mark_list">
            <li><span>打包带走</span></li>
            <li><span>不要放辣椒</span></li>
            <li><span>微辣</span></li>
        </ul>

    
        <div class="footer_content" @click="postAddPeopleInfo()">
            <span>开始点菜</span>
        </div>
    </div>
  </div>
</template>

<script>
    import Config from './../model/config.js';
    import Storage from './../model/storage.js';

    export default {
    data () {
        return {
            api: Config.api,
            p_num: '1人',
            p_mark: '',
            people_list: [],
            show_loading: true
        };
    },
    methods: {
        changePNumActive(){
            var p_spans = document.querySelectorAll('.p_num_list li span');
            var that = this;

            for(let i = 0; i < p_spans.length; i++){
                p_spans[i].onclick = function(event){
                    for(let j = 0; j < p_spans.length; j++){
                        p_spans[j].className = '';
                    }

                    event.target.className = 'active';
                    that.p_num = event.target.innerHTML;
                    //console.log(that.p_num);
                }
            }
        },
        changePMartactive(){
            var p_spans = document.querySelectorAll('.p_mark_list li span');
            var that = this;

            for(let i = 0; i < p_spans.length; i++){
                p_spans[i].onclick = function(event){
                    for(let j = 0; j < p_spans.length; j++){
                        p_spans[j].className = '';
                    }

                    event.target.className = 'active';
                    that.p_mark = that.p_mark + ' ' + event.target.innerHTML;
                    //console.log(that.p_mark);
                }
            }
        },
        postAddPeopleInfo(){
            var api = this.api + 'api/addPeopleInfo';
            var uid = Storage.get('roomid');

            this.$http.post(api, {
                uid: uid,
                p_num: this.p_num,
                p_mark: this.p_mark
            }).then(response => {
                if(response.body.success){
                    this.$router.push({ path: 'home'});
                }
            }, response => {
                console.log('request errer');
            });
        },
        getPeopleInfo(){
            var uid = Storage.get('roomid');
            var api = this.api + 'api/peopleInfoList?uid=' + uid;

            this.$http.get(api).then(response => {
                console.log(response);

                this.show_loading = false;

                //如果当前桌号的人选了人数，则后面该桌号的人直接进入点餐页面
               if(response.body.result.length > 0){
                   this.$router.push({ path: 'home'});
               }
               
            }, err => {
                    console.log(err);
            });
        }
    },
    created() {
        this.getPeopleInfo();
    },
    mounted() {

        for(let i = 0; i < 12; i++){
            this.people_list.push(i + 1);
        }


        //数据渲染完成再去操作Don节点
        this.$nextTick(function(){
            this.changePNumActive();

            this.changePMartactive();
        })
    },
    }
</script>

<style lang="scss">

  .show_loading{
        width: 100vw;
        height: 100vh;
        overflow: hidden;

        .inner{
            width: 100%;
            height: 100rem;
            background-color: #fff;

            img{
                width: 100%;
                margin-top: 30rem;
                transform: translate(0, -50%);
            }
        }
 }

  .start_content{

    .header_content{
        width: 10rem;
        height: 3.2rem;
        line-height: 3.2rem;
        background-color: #000;
        color: #fff;
        margin: 5rem auto 0rem auto;

        img{          
            height:2.2rem;         
            line-height: 2.2rem;
            position: relative;          
            top:.5rem;
            margin-left: 1rem;
        }
    }

    p{
        color: red;
        text-align: center;
        margin: 1rem auto;
    }

    ul{
        display: flex;
        flex-wrap: wrap;
        margin: 0 0.5rem;

        li{
            box-sizing: border-box;
            width: 25%;
            padding: 0.5rem;

            span{
                display: inline-block;
                border: 1px solid #ccc;
                border-radius: 0.5rem;
                text-align: center;
                width: 100%;
                height: 3.2rem;
                line-height: 3.2rem;
                background-color: #fff;
            }
            span.active{
            background-color: red;
            color: #fff;
        }
        }
    }
    input{
        margin: 1rem;
        padding: 0.2rem 0.5rem;
        width: 90%;
        height: 3rem;
        line-height: 3rem;
        border-radius: 0.5rem;
        border: 1px solid #eee;
    }
    a{
        color: #fff;
    }
    .footer_content{
        position: relative;
        left: 50%;
        top: 20rem;
        width: 6rem;
        height: 6rem;
        margin-left: -3rem;
        background-color: red;
        border-radius: 50%;

        span{
            display: block;
            position: relative;
            top: 1.5rem;
            width: 2rem;
            margin: 0 auto;
        }
    }
  }
</style>