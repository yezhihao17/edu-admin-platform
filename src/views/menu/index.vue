<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="mini" @click="$router.push({ name: 'create-menu' })">添加菜单</el-button>
      </div>
      <el-table
        :data="menus"
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
          label="菜单名称"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="editMenu(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="deleteMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { allMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  methods: {
    // 获取所有菜单
    async getAllMenus () {
      const { data } = await allMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    // 删除菜单
    async deleteMenuData (id: number) {
      const { data } = await deleteMenu(id)
      // 失败处理
      if (data.code !== '000000') {
        return this.$message.error(data.mesg)
      }
      // 成功处理
      this.$message.success('删除成功')
      // 刷新列表
      this.getAllMenus()
    },
    // 编辑菜单
    editMenu (row: any) {
      this.$router.push({
        name: 'edit-menu',
        query: {
          id: row.id
        }
      })
    },
    // 删除菜单
    deleteMenu (row: any) {
      this.$confirm('确认删除吗？', '删除提示', {
        type: 'warning'
      })
        .then(() => {
          this.deleteMenuData(row.id)
        })
        .catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  },
  created () {
    this.getAllMenus()
  }
})
</script>

<style lang="scss" scoped></style>
