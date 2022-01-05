<template>
  <div class="login-box">
    <el-form ref="form" :model="form" :rules="rules" label-width="55px">
      <h3 class="login-title">欢迎登陆</h3>
      <el-form-item label="账号" prop="username"  >
        <el-input placeholder="请输入账号" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password" ></el-input>
      </el-form-item>
      <el-button type="primary" class="login-butten"  @click="onSubmit('form')">登陆</el-button>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    onSubmit() {
      this.axios({
        method: 'post',
        url: '/adminLogin',
        data: {
          'username': this.form.username,
          'password': this.form.password,
        },
        // url:"https://www.fastmock.site/mock/d38db8bd5bd7319ab5c1bd6d7c50eda8/login/login"
      }).then(res => {
        if (res.data.status === 'OK') {
          this.$router.push('/home')
        } else {
          console.log(res.data.status);
        }
      }).catch(res => console.log(res))

    }
  }
}
</script>


<style scoped>
.login-box {
  width: 500px;
  height: 350px;
  border: 1px solid #E4E7ED;
  margin-left: 35%;
  margin-top: 15%;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px #E4E7ED;

}
.login-butten{
  margin-left: 55px;

}
.login-title{
  text-align: center;
  margin-bottom: 40px;
}

</style>
