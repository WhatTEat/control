<template>
  <div>
    <div class="userManagement">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label-width="10px">
          <el-select v-model="formInline.condition" placeholder="请选择查询条件">
            <el-option label="用户ID" value="用户ID"></el-option>
            <el-option label="用户名" value="用户名"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="用户ID"
      >
        <template slot-scope="scope">
          <div>
            <el-avatar :src="scope.row.avatar"></el-avatar>
            <span>{{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        prop="name"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="creatTime"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑资料" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-input v-model="form.avatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信誉分" :label-width="formLabelWidth">
          <el-input v-model="form.credit" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mes1">取 消</el-button>
        <el-button type="primary" @click="mes2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 用户管理页面
 */
export default {
  name: "userManagement",
  data() {
    return {
      formInline: {
        user: '',             //查询框内
        condition: ''         //选择框
      }, tableData: [{
        id: '456',
        name: '',
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        creatTime: ''
      }],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        account: '',
        userPassword: '',
        phoneNumber: "",
        avatar: "",
        credit: "",


      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    //条件查询
    query() {
      //this.formInline.user 查询内容
      //this.formInline.condition 查询选择
      //查询选项为用户名或者用户ID的情况
      if (this.formInline.condition === '用户名' || this.formInline.condition === '用户ID') {
        this.axios({
          method: "post",
          data: {
            "condition": this.formInline.condition,
            "selectInfo": this.formInline.user,
          },
          url: 'http://localhost:8080/user/select'
        }).then(res => {
          this.tableData = res.data
        }).catch(res => {
          console.log("错误")
        })
      }//未选择查询选项的情况
      else {
        this.getMsg();
      }
    },
    //更改用户信息
    handleEdit(index, user) {
      this.dialogFormVisible = true;
      this.form.id = user.id
      //接收服务器信息
      this.axios({
        method: "post",
        data: {
          "id": this.form.id
        },
        url: 'http://localhost:8080/oneUserdata'
      }).then(res => {
        this.form = res.data
      }).catch(res => {
        console.log("错误")
      })
    },
    //用户删除
    handleDelete(index, user) {
      this.axios({
        method: "post",
        data: {
          "id": user.id,
        },
        url: 'http://localhost:8080/delete/userm'
      }).then(res => {
        if (res.data.status === 'OK') {
          this.getMsg();
        }
      }).catch(res => {
        console.log("错误")
      })
    },
    //获取用户信息
    getMsg() {
      this.axios({
        method: "get",
        url: 'http://localhost:8080/userdata'
      }).then(res => {
        this.tableData = res.data
      }).catch(res => {
        console.log("错误")
      })
    },
    //取消
    mes1() {
      this.dialogFormVisible = false;
    },
    //确认
    mes2() {
      this.dialogFormVisible = false;
      this.axios({
        method: "post",
        data: {
          'id': this.form.id,
          'name': this.form.name,
          'account': this.form.account,
          'userPassword': this.form.userPassword,
          'phoneNumber': this.form.phoneNumber,
          'avatar': this.form.avatar,
          'credit': this.form.credit,
        },
        url: 'http://localhost:8080/userEdit'
      }).then(res => {
        if (res.data.status === 'OK') {
          this.getMsg();
          console.log(res.data.status);
        } else {
          console.log(res.data.status);
        }
      }).catch(res => {
        console.log("错误")
      })
    }
  }
  ,
  //获取用户信息
  created() {
    this.axios({
      method: "get",
      url: "http://localhost:8080/me"
    }).then(res => {
      if (res.data.status !== "OK") {
        console.log(11111111111);
        this.$router.push("/login")
      }
    }).catch(res => {
      this.$router.push("/login")
      console.log(res)
    })
    this.axios({
      method: "get",
      url: 'http://localhost:8080/userdata'
    }).then(res => {
      this.tableData = res.data
    }).catch(res => {
      console.log("错误")
    })
  }
}
</script>

<style scoped>
.userManagement {
  text-align: center;
}

</style>
