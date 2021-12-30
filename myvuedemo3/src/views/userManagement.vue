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
        label="日期"
        prop="id"
        >

      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
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
export default {
  name: "userManagement",
  data() {
    return {
      formInline: {
        user: '',
        condition: ''
      }, tableData: [{
        id: '12366788',
        name: '王小虎',
      },]
    }
  },
  methods: {
    query() {
      console.log(this.formInline.user+this.formInline.condition);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }


}
</script>

<style scoped>
.userManagement{
  text-align: center;
}

</style>
