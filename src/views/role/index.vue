<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="mini">添加角色</el-button>
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
                @click="handleEdit(scope.row)">分配菜单</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)">分配资源</el-button>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { allRoles } from '@/services/role'

export default Vue.extend({
  name: 'RoleIndex',
  data () {
    return {
      roles: []
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
    handleEdit (row: any) {
      console.log(row)
    },
    handleDelete (row: any) {
      console.log(row)
    }
  },
  created () {
    this.getAllRoles()
  }
})
</script>

<style lang="scss" scoped></style>
