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
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources } from '@/services/role'
import { getAll, getAllCategory } from '@/services/resource'

export default Vue.extend({
  name: 'AllocResourceIndex',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      resources: [],
      categorys: [],
      checkedIds: []
    }
  },
  methods: {
    // 获取所有资源列表数据
    async getAll () {
      const { data } = await getAll()
      this.getResourceCategoryList(data.data)
      this.getRoleResources()
    },

    // 获取分类资源列表
    async getAllCategory () {
      const { data } = await getAllCategory('')
      // this.resources = data.data
      this.categorys = data.data
      this.getAll()
    },

    // 获取用户的资源列表
    async getRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      this.getRoleResourceIds(data.data)
    },

    // 获取资源分类列表
    getResourceCategoryList (data: any) {
      (this.categorys as any) = this.categorys.map((category: any) => {
        category.isIndeterminate = false
        category.resourceList = data.filter((resource: any) => resource.categoryId === category.id)
        return category
      })
    },

    // 获取用户选中的资源
    getRoleResourceIds (resources: any) {
      (this.resources as any) = this.categorys.map((r: any) => {
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
      r.resourceList = r.resourceList.map((item: any, index: number) => {
        category.resourceList.forEach((categoryItem: any) => {
          if (item.id === categoryItem.id && categoryItem.selected) {
            count++
            item.selected = true
          }
        })
        this.$set(r, index, item)
        return item
      })
      r.isIndeterminate = count > 0 && count < r.resourceList.length
      r.selected = count > 0 && count === r.resourceList.length
    },

    // 清空
    resetChecked () {
      console.log('清空')
    },

    // 保存
    onSave () {
      console.log('保存')
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
