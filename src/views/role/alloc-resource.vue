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
            :indeterminate="category.indeterminate"
            v-model="category.selected"
            @change="handleCheckAllChange">
            {{ category.name }}
          </el-checkbox>
        </el-row>
        <el-row class="table-layout">
          <el-checkbox-group
            v-model="checkedIds"
            @change="handleCheckChange">
            <el-col
              v-for="resource in category.subResourceList"
              :key="resource.id"
              :span="8">
              <el-checkbox
                :key="resource.id"
                :label="resource.id"
                style="padding: 4px 0;">
                {{ resource.name }}
              </el-checkbox>
            </el-col>
          </el-checkbox-group>
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
import { getAll, getAllCategory } from '@/services/resource'

export default Vue.extend({
  name: 'AllocResourceIndex',
  data () {
    return {
      resources: [],
      checkedIds: []
    }
  },
  methods: {
    // 获取所有资源列表数据
    async getAll () {
      const { data } = await getAll()
      this.getResourceCategoryList(data.data)
    },

    // 获取分类资源列表
    async getAllCategory () {
      const { data } = await getAllCategory('')
      this.resources = data.data
      this.getAll()
    },

    // 获取资源分类列表
    getResourceCategoryList (data: any) {
      (this.resources as any) = this.resources.map((category: any) => {
        category.indeterminate = false
        category.subResourceList = data.filter((resource: any) => resource.categoryId === category.id)
        return category
      })
    },
    resetChecked () {
      console.log('清空')
    },
    onSave () {
      console.log('保存')
    },
    // 全选
    handleCheckAllChange (category: any) {
      console.log(category)
    },

    // 单选
    handleCheckChange (resource: any) {
      console.log(resource)
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
