<template>
  <div>
    <el-container style="height: 850px; border: 1px solid #055ae6">
      <el-aside width="200px" style="background-color: rgb(245,248,247)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1" style="background-color: rgb(245,248,247)">
            <template  slot="title" ><i class="el-icon-message" ></i>管理</template>
            <el-menu-item-group style="background-color: rgb(245,248,247)">
              <el-menu-item index="1-4"><router-link to="/homepage">首页</router-link></el-menu-item>
              <el-menu-item  index="1-1"><router-link to="/examine">用户上传菜单审核</router-link> </el-menu-item>
              <el-menu-item index="1-2"><router-link to="/userManagement">用户管理</router-link></el-menu-item>
              <el-menu-item index="1-3"> <el-button type="text" @click="open">管理员密码修改</el-button>
                </el-menu-item>
              <el-menu-item index="1-5"> <el-button type="text" @click="Logout">退出</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 25px" height="100px">
          <span>欢迎{{name}}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home.vue",
  data(){
    return{
      name:'admin',
    }
  },
  methods:{
    open() {
      this.$prompt('请输入修改后的密码', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',

        inputErrorMessage: '密码格式不正确'
      }).then(({ value }) => {
        let password = {"value":value}
        this.axios({
          method:"post",
          url:"http://localhost:8080/modify",
          data:password
        }).then(res=>{
          if (res.data.message === "success"){
          this.$message({
            type: 'success',
            message: '成功修改管理员密码'
          });}else {
            this.$message({
              type: 'success',
              message: '管理员密码修改失败'
            });
          }
        }).catch(res=>{
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    Logout(){
      this.axios({
        method:'get',
        url:"http://localhost:8080/logout"
      }).then(res=>{
        console.log(res.data)
        this.$router.push('/login')
      }).catch(res=>{
        console.log(res.data)
      })
    }
  },
  created() {
    this.axios({
      method:"get",
      url:"http://localhost:8080/me"
    }).then(res=>{
      if (res.data.message!=="success"){
        this.$router.push("/login")
      }
    }).catch(res=>{
      console.log(res)
    })
  }

}
</script>

<style scoped>
.el-header {
  background-color: rgb(44, 82, 151);
  color: #333;
  line-height: 120px;
}

.el-aside {
  color: #333;
}
</style>
