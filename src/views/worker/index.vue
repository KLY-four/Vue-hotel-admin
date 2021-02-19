<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>操作员管理</span>
      <el-button type="primary" style="float: right; padding: 6px 12px" ><input type="number" v-model="phone" style="border: 0;outline: none" placeholder="根据电话号码查询操作员">&nbsp;&nbsp;&nbsp;<span @click="getWorkerByPhone">搜索</span></el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="workerId"
        label="编号"/>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="username"
        label="用户名"/>
      <el-table-column
        prop="phone"
        label="手机号"/>
      <el-table-column
        prop="email"
        label="电子邮箱"/>
      <el-table-column
        prop="address"
        label="地址"/>
      <el-table-column
        label="修改时间|创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.updateTime | formatDate }}</span>
          <br>
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover
            v-model="scope.row.visible2"
            placement="top"
            width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">取消</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger" @click="scope.row.visible2 = true">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 14px;">
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">添加操作员</el-button>
        <el-button type="danger" :disabled="multipleSelection.length==0" @click="batchDeletion">批量删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getAll, del ,batchDel,getByPhone} from '@/api/worker'

export default {
  data() {
    return {
      visible2: false,
      multipleSelection: [],
      list: null,
      listLoading: true,
      phone:''
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    getWorkerByPhone(){
      if(this.phone==''){
        this.fetchData()
        return
      }
      getByPhone(this.phone).then((res)=>{
        if(res.code===1000) {
          this.list = res.data;
          //this.list.push(res.data)
        }
      }).catch((err)=>{
        this.$notify.error({
          title: '错误',
          message: err.toString()
        });
      })
    },
    fetchData() {
      this.listLoading = true
      getAll().then(response => {
        this.list = response.data;
        this.listLoading = false;
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/worker/' + val })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/worker',
        name: 'EditWorker',
        params: {
          id: row.workerId
        }
      })
    },
    batchDeletion: function () {
      var array='';
      for (var s of this.multipleSelection) {
        array+=s.workerId+',';
      }
      batchDel(array).then((res)=>{
        if (res.code === 1000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.list.push();
          this.fetchData()
        } else {
          this.$message({
            message: '删除失败！',
            type: 'error'
          }).catch((res) => {
            row.loading = false
            this.$toast.error(res)
          })
          row.loading = false
          this.fetchData()
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      del(row.workerId).then(response => {
          const res =response;
        if (res.code===1000) {
          this.list = null
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
            this.fetchData()
        } else {
          this.$message({
            message: '删除失败！',
            type: 'error'
          })
        }
      })
      row.loading = false
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style>
  .red {
    color: red;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style>
