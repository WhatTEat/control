<template>
  <div>
    <div class="userManagement">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" >
        <el-form-item  label-width="10px">
          <el-select  v-model="formInline.condition" placeholder="请选择查询条件">
            <el-option label="用户ID" value="用户ID"></el-option>
            <el-option label="用户名" value="用户名"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-input v-model="formInline.user" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="用户ID"
        prop="id"
        >

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
            @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        id: '',
        name: '',
        creatTime:''
      },]
    }
  },
  methods: {
    //条件查询
    query() {
      console.log(this.formInline.user+this.formInline.condition);
    },
    //更改用户信息
    handleEdit(index, user) {
      console.log(index, user.id);
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
    }
  }
  ,
  //获取用户信息
  created()
  {
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
.userManagement{
  text-align: center;
}

</style>
