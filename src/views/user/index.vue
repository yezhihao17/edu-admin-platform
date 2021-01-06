<template>
  <div class="user">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="registerTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <el-table
      :data="users"
      style="width: 100%">
        <el-table-column
          label="用户ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="头像"
          align="center"
          prop="portrait">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.portrait">
              <img :src="require('@/assets/default_avatar.png')"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          align="center"
          prop="name">
        </el-table-column>
        <el-table-column
          label="手机号"
          align="center"
          prop="phone">
        </el-table-column>
        <el-table-column
          label="注册时间"
          align="center"
          prop="createTime">
          <template slot-scope="scope">{{ scope.row.createTime | date }}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          prop="status">
          <template slot-scope="scope">
            <i class="status-badge" :class="{
              'success': scope.row.status === 'ENABLE',
              'error': scope.row.status !== 'ENABLE'
              }"></i>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.status === 'ENABLE'"
              @click="handleForbid(scope.row)">禁用</el-button>
            <el-button
              type="text"
              v-if="scope.row.status !== 'ENABLE'"
              @click="handleEnable(scope.row)">启用</el-button>
            <el-button
              type="text"
              @click="handleAssign(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="form.pageSize"
          :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      title="分配角色"
      :visible.sync="dialogFormVisible"
      width="30%"
      @close="closeAllocateDialog">
      <el-select v-model="userRoles" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAllocate">取 消</el-button>
        <el-button type="primary" @click="confirmAllocate" :loading="submiting">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  userList,
  enableUser,
  forbidUser
} from '@/services/user'
import {
  allRoles,
  queryRoleByUser,
  allocateUserRoles
} from '@/services/role'

export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      form: {
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 10
      }, // 搜索条件
      registerTime: [],
      pickerOptions: {
        onPick: (data: any) => {
          const { minDate, maxDate } = data
          if (minDate && maxDate) {
            const vm = this as any
            vm.form.startCreateTime = minDate
            vm.form.endCreateTime = maxDate
          }
        }
      },
      users: [],
      total: 0,
      userRoles: [], // 用户角色
      roles: [], // 角色列表
      selectUserId: 0, // 选中用户的 userId
      submiting: false, // 提交中
      dialogFormVisible: false // 显示分配角色弹出
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户列表信息
    async getUserList () {
      const { data } = await userList(this.form)
      if (data.code === '000000') {
        this.total = data.data.total
        this.users = data.data.records
      }
    },
    // 获取角色列表
    async getRoles () {
      const { data } = await allRoles()
      if (data.code === '000000') {
        this.roles = data.data
      }
    },
    // 查询用户角色
    async getUserOfRoles (userId: number) {
      const { data } = await queryRoleByUser(userId)
      if (data.code === '000000') {
        this.userRoles = data.data.map((role: any) => role.id)
      }
    },
    // 给用户分配角色
    async allocateUserRoles () {
      const { data } = await allocateUserRoles({
        userId: this.selectUserId,
        roleIdList: this.userRoles
      })
      if (data.code === '000000') {
        this.dialogFormVisible = false
        this.$message.success('分配成功')
      } else {
        this.$message.error(data.mesg)
      }
      this.submiting = false
    },
    // 启用用户
    async enableUser (userId: number) {
      const { data } = await enableUser(userId)
      if (data.code === '000000') {
        this.form.currentPage = 1
        this.getUserList()
        this.$message.success('启用成功')
      }
    },
    // 禁用用户
    async forbidUser (userId: number) {
      const { data } = await forbidUser({ userId })
      if (data.code === '000000') {
        this.form.currentPage = 1
        this.getUserList()
        this.$message.success('禁用成功')
      }
    },
    // 搜索
    onSubmit () {
      this.form.currentPage = 1
      this.getUserList()
    },
    // 禁用
    handleForbid (row: any) {
      this.forbidUser(row.id)
    },
    // 启用
    handleEnable (row: any) {
      this.enableUser(row.id)
    },
    // 分配角色
    handleAssign (row: any) {
      this.getRoles()
      this.getUserOfRoles(row.id)
      this.selectUserId = row.id
      this.dialogFormVisible = true
    },
    // 切换页码
    handleCurrentChange (pageNo: number) {
      // 判断当前页数是否和选中的一致
      if (this.form.currentPage !== pageNo) {
        this.form.currentPage = pageNo
        this.getUserList()
      }
    },
    // 取消分配角色
    cancelAllocate () {
      this.dialogFormVisible = false
    },
    // 确定分配角色
    confirmAllocate () {
      this.submiting = true
      this.allocateUserRoles()
    },
    // 关闭分配角色弹出
    closeAllocateDialog () {
      this.roles = []
      this.userRoles = []
      this.selectUserId = 0
    }
  }
})
</script>

<style lang="scss" scoped>
.status-badge {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
.success {
  background-color: $success-color;
}
.error {
  background-color: $danger-color;
}
.pagination-wrapper {
  overflow: hidden;
}
.el-pagination {
  float: right;
  padding: 20px 0;
}
.el-select {
  width: 80%;
}
</style>
