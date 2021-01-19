<template>
  <div class="alloc-resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分配资源</span>
      </div>
      <div
        v-for="(category, index) in resources"
        :key="category.id">
        <el-row
          class="table-layout"
          :class="{'top-border': index === 0}">
          <el-checkbox
            :indeterminate="category.isIndeterminate"
            v-model="category.selected"
            :label="category.name"
            @change="handleCheckAllChange(category)">
          </el-checkbox>
        </el-row>
        <el-row class="table-layout">
          <el-col
            v-for="resource in category.resourceList"
            :key="resource.id"
            :span="8">
            <el-checkbox
              v-model="resource.selected"
              style="padding: 4px 0;"
              :label="resource.name"
              @change="handleCheckChange(category, $event)">
            </el-checkbox>
          </el-col>
        </el-row>
      </div>
      <div class="btns-wrapper">
        <el-button type="primary" @click="onSave" :disabled="isLoading">保存</el-button>
        <el-button @click="resetChecked" :disabled="isLoading">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources } from '@/services/role'
import { getAll, getAllCategory, allocateRoleResources } from '@/services/resource'

export default Vue.extend({
  name: 'AllocResourceIndex',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      resources: [], // 资源列表
      selectedIds: [], // 选中资源 id
      isLoading: false
    }
  },
  methods: {
    // 获取分类资源列表
    async getAllCategory () {
      const { data } = await getAllCategory('')
      this.resources = data.data
      this.getAll()
    },

    // 获取所有资源列表数据
    async getAll () {
      const { data } = await getAll()
      this.getResourceCategoryList(data.data)
      this.getRoleResources()
    },

    // 获取用户的资源列表
    async getRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      this.getRoleResourceIds(data.data)
    },

    // 给角色分配资源
    async allocateRoleResources () {
      this.isLoading = true
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList: this.selectedIds
      })
      console.log(data)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }

      this.isLoading = false
    },

    // 获取资源分类列表
    getResourceCategoryList (data: any) {
      (this.resources as any) = this.resources.map((category: any) => {
        this.$set(category, 'isIndeterminate', false)
        const resourceList = data.filter((resource: any) => resource.categoryId === category.id)
        this.$set(this.resources, 'resourceList', resourceList)
        category.resourceList = resourceList
        return category
      })
    },

    // 获取用户选中的资源
    getRoleResourceIds (resources: any) {
      (this.resources as any) = this.resources.map((r: any) => {
        resources.forEach((category: any) => {
          if (r.id === category.id && !category.resourceList) {
            r = Object.assign(r, category)
          } else if (r.id === category.id && category.resourceList) {
            this.setResourceList(r, category)
          }
        })
        return r
      })
    },

    // 处理子列表和 isIndeterminate 数据
    setResourceList (r: any, category: any) {
      let count = 0
      r.resourceList = r.resourceList.map((item: any) => {
        category.resourceList.forEach((categoryItem: any) => {
          if (item.id === categoryItem.id && categoryItem.selected) {
            count++
            item.selected = true
          }
        })
        return item
      })
      const len = r.resourceList.length
      r.isIndeterminate = count > 0 && count < len
      r.selected = count > 0 && count === len
    },

    // 清空
    resetChecked () {
      this.resources.forEach((category: any) => {
        category.isIndeterminate = false
        category.selected = false
        if (category.resourceList) {
          category.resourceList.forEach((item: any) => {
            item.selected = false
          })
        }
      })
    },

    // 保存
    onSave () {
      this.getSelectedIds()
      this.allocateRoleResources()
    },

    // 获取选中资源的 id
    getSelectedIds () {
      this.selectedIds = []
      this.resources.forEach((category: any) => {
        if (category.resourceList) {
          category.resourceList.forEach((item: any) => {
            if (item.selected) {
              (this.selectedIds as number[]).push(item.id)
            }
          })
        }
      })
    },

    // 全选
    handleCheckAllChange (category: any) {
      category.isIndeterminate = false
      if (category.resourceList) {
        category.resourceList = category.resourceList.map((item: any) => {
          item.selected = category.selected
          return item
        })
      }
    },

    // 单选
    handleCheckChange (category: any) {
      let count = 0
      const categoryCount = category.resourceList.length
      category.resourceList.forEach((item: any) => {
        if (item.selected) {
          count++
        }
      })
      category.selected = count > 0 && count === categoryCount
      category.isIndeterminate = count > 0 && count < categoryCount
    }
  },
  created () {
    this.getAllCategory()
  }
})
</script>

<style lang="scss" scoped>
.top-border {
  border-top: 1px solid #dcdfe6;
}
.table-layout {
  padding: 20px;
  border-left: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
}
.table-layout:nth-child(1) {
  background-color: rgb(242, 246, 252);
}
.checkbox-item {
  min-height: 30px;
}
.btns-wrapper {
  text-align: center;
  margin-top: 20px;
}
</style>
