<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="菜单列表">
              <!--              <span>{{ props.row.desc }}</span>-->
              <el-container v-for="item in props.row.desc">
                <el-header>{{ item.des }}</el-header>
                <el-avatar shape="square" :size="200" fit='contain' :src="item.src"></el-avatar>
              </el-container>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="菜单 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="菜单名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="菜单描述"
        prop="eatdesc">
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
    <div class="block">

      <el-pagination
        @size-change="SizeChange"
        @current-change="CurrentChange"
        background
        :current-page="currentPage"
        :page-size="pagesize"
        layout="sizes,prev, pager,next,jumper"
        :total="total"
        :page-sizes="[5, 10, 20, 40]"


      >
      </el-pagination>
    </div>

  </div>

</template>

<script>
export default {
  name: "examine.vue",
  data() {
    return {
      name:[],
      tableData: [{
        id: "",
        name: "",
        eatdesc: "",
        desc: [
          {
            des: "",
            src: ""
          },
          {
            des: "",
            src: ""
          }
        ]
      }],
      total:500,
      currentPage:1,
      pagesize:5,
      fits: 'fill',

    }
  }
, methods: {
    handleEdit(index, customer) {
      let gg = {"id":customer.id}
      this.axios({
        method:"post",
        url:"http://localhost:8080/submit/examine",
        data:gg
      }).then(res=>{
        this.toUpdate()
        console.log(res.data)
      }).catch(res=>{
        console.log(res.data)
      })
    },
    handleDelete(index, customer) {
      let gg = {"id":customer.id}
      this.axios({
        method:"post",
        url:"http://localhost:8080/delete/examine",
        data:gg
      }).then(res=>{
        console.log(res.data)
        this.toUpdate()
      }).catch(res=>{
        console.log(res.data)
      })
    },
    SizeChange(size){
      this.pagesize = size;
      console.log(size)
      this.toUpdate()
    },
    CurrentChange(current){
      this.currentPage = current;
      this.toUpdate()
    },
    toUpdate(){
      let page = {"pagesize":this.pagesize,"currentPage":this.currentPage}
      this.axios({
        method: "post",
        url: 'http://localhost:8080/data',
        data:page
      }).then(res => {
        this.tableData = res.data
      }).catch(res => {
        console.log("错误")
      })
    }

  },
  created() {
    let page = {"pagesize":this.pagesize,"currentPage":this.currentPage}
    this.axios({
      method: "post",
      url: 'http://localhost:8080/data',
      data:page
    }).then(res => {
      this.tableData = res.data
    }).catch(res => {
      console.log("错误")
    })
  },


}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;

}

.block {
  margin-left: 350px;
}

</style>
