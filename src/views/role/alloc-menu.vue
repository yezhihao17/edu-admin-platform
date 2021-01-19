<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分配菜单</span>
      </div>
      <el-tree
        ref="menu-tree"
        :data="roles"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        v-loading="isLoading">
      </el-tree>
      <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { menuNodeList } from '@/services/menu'
import { getRoleMenus, allocateRoleMenus } from '@/services/role'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenuIndex',
  data () {
    return {
      isLoading: false,
      roles: [],
      checkedKeys: [], // 选中的菜单 id
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  methods: {
    // 获取所有菜单列表
    async queryMenuNodeList () {
      this.isLoading = true
      const { data } = await menuNodeList()
      this.roles = data.data
      this.isLoading = false
    },

    // 获取角色拥有的菜单列表
    async getRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },

    // 给角色分配菜单
    async allocateRoleMenus (menuIdList: number[]) {
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      if (data.code === '000000') {
        this.$message.success('操作成功！')
        this.$router.back()
      }
    },

    // 获取角色选择的菜单
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        } else if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
      })
    },

    // 重置
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    },

    // 保存
    onSave () {
      const checkedMenus = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      this.allocateRoleMenus(checkedMenus)
    }
  },
  created () {
    this.getRoleMenus()
    this.queryMenuNodeList()
  }
})
</script>

<style lang="scss" scoped></style>
