<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="mini" @click="handleCreate">添加角色</el-button>
      </div>
      <el-table
        :data="roles"
        :border="true"
        style="width: 100%">
        <el-table-column
          label="编号"
          type="index"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          min-width="200">
        </el-table-column>
        <el-table-column
          label="添加时间"
          align="center"
          width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="handleAllocMenu(scope.row)">分配菜单</el-button>
              <el-button
                type="text"
                @click="handleAllocResource(scope.row)">分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="50%">
      <create-or-edit-role
        v-if="dialogVisible"
        :is-edit="isEdit"
        :role-id="roleId"
        @success="onSuccess"
        @cancel="dialogVisible = false">
      </create-or-edit-role>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { allRoles } from '@/services/role'
import CreateOrEditRole from './components/CreateOrEditRole.vue'

export default Vue.extend({
  name: 'RoleIndex',
  data () {
    return {
      roles: [], // 角色列表
      dialogVisible: false,
      isEdit: false, // 判断是否编辑还是添加
      roleId: null // 选中角色 id
    }
  },
  methods: {
    // 获取全部角色列表
    async getAllRoles () {
      const { data } = await allRoles()
      if (data.code === '000000') {
        this.roles = data.data
      }
    },
    // 分配菜单
    handleAllocMenu (row: any) {
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleId: row.id
        }
      })
    },
    // 分配资源
    handleAllocResource (row: any) {
      console.log(row)
      this.$router.push({
        name: 'alloc-resource',
        params: {
          roleId: row.id
        }
      })
    },
    // 编辑角色
    handleEdit (row: any) {
      console.log(row)
      this.isEdit = true
      this.roleId = row.id
      this.dialogVisible = true
    },
    // 添加角色
    handleCreate () {
      this.isEdit = false
      this.dialogVisible = true
    },
    // 删除
    handleDelete (row: any) {
      console.log(row)
    },
    // 保存成功
    onSuccess () {
      this.dialogVisible = false
      this.getAllRoles()
    }
  },
  created () {
    this.getAllRoles()
  },
  components: {
    CreateOrEditRole
  }
})
</script>

<style lang="scss" scoped></style>
