<template>
    <div id="myProfile">
      <mu-container class="profilePaper">
        <mu-row>
          <mu-appbar class="profileAppBar" color="primary">
            <mu-icon value="contacts" slot="left"></mu-icon>
            我的个人资料
          </mu-appbar>
        </mu-row>
        <mu-row>
          <mu-col span="12">
            <mu-card class="ProfileCard" raised>
              <mu-card-header :title="'用户名： ' + userInfo.username" :sub-title="'用户ID号:  ' + userInfo.workerId">
                <mu-avatar slot="avatar">
                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></img>
                </mu-avatar>
              </mu-card-header>
              <mu-card-text>
                <mu-list>
                  <mu-list-item>
                    <mu-list-item-title>姓名： {{ userInfo.name }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-title>角色： {{ userInfo.role=='admin'?'管理员':'操作员' }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-title>手机号： {{ userInfo.phone }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-title>电子邮箱：{{ userInfo.email }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-title>地址： {{ userInfo.address }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-title>加入时间： {{ userInfo.createTime | formatDate }}</mu-list-item-title>
                  </mu-list-item>
                </mu-list>
              </mu-card-text>
              <mu-card-actions>
                <!--<mu-button flat>Action 1</mu-button>-->
                <!--<mu-button flat>Action 2</mu-button>-->
              </mu-card-actions>
            </mu-card>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import { getById } from "@/api/worker"
    export default {
        name: "MyProfile",
      data(){
          return{
            //username: Cookies.get("username"),
            userInfo: {
              userId: 0,
              username: "username",
              createTime: null,
            },
        }
      },
      created: function(){
          this.fetchData()
      },
      methods:{
        fetchData: function () {
          let workerId = Cookies.get("worker_id");
          console.log(workerId)
          getById(workerId).then(res => {
            this.userInfo = res.data;
          }).catch(err => {
            this.$toast.error(err)
          })
        }
      },
    }
</script>

<style scoped>
  .profileAppBar{
    height: 40px;
    width: auto!important;
    border-radius: 35px;
    margin: 10px;
    color: #fff;
    padding: 10px;
  }
  .profilePaper{
    padding: 10px;
  }
  .ProfileCard{
    width: 100%;
    margin: 0 auto;
  }
</style>
