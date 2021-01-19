<template>
  <div class="resource-category">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="mini" @click="handleCreate">添加</el-button>
      </div>
      <el-table
        :data="resources"
        style="width: 100%"
        v-loading="isLoading"
        :border="true">
        <el-table-column
          label="编号"
          align="center"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          label="资源名称"
          align="center"
          prop="name">
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createdTime">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          align="center"
          prop="sort">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑分类' : '添加分类'"
      :visible.sync="dialogVisible"
      width="30%">
      <create-or-edit-resource-category
        v-if="dialogVisible"
        :category="category"
        :isEdit="isEdit"
        @cancel="dialogVisible = false"
        @success="onSuccess">
      </create-or-edit-resource-category>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEditResourceCategory from './components/CreateOrEditResourceCategory.vue'
import { getAllCategory, deleteCategory } from '@/services/resource'

export default Vue.extend({
  name: 'resourceCategoryIndex',
  components: {
    createOrEditResourceCategory
  },
  data () {
    return {
      resources: [],
      isLoading: false,
      dialogVisible: false,
      isEdit: false,
      category: {}
    }
  },
  methods: {
    // 获取资源分类
    async getAllCategory () {
      this.isLoading = true
      const { data } = await getAllCategory('')
      if (data.code === '000000') {
        this.resources = data.data
      }
      this.isLoading = false
    },

    // 删除资源分类
    async deleteCategory (id: number | string) {
      this.isLoading = true
      const { data } = await deleteCategory(id)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.getAllCategory()
      } else {
        this.isLoading = false
        this.$message.error(data.mesg)
      }
    },

    // 添加资源分类
    handleCreate () {
      this.isEdit = false
      this.category = {}
      this.dialogVisible = true
    },

    // 编辑
    handleEdit (category: any) {
      console.log(category)
      this.isEdit = true
      this.category = category
      this.dialogVisible = true
    },

    // 删除
    handleDelete (category: any) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCategory(category.id)
      })
    },

    // 成功回调
    onSuccess () {
      this.dialogVisible = false
      this.getAllCategory()
    }
  },
  created () {
    this.getAllCategory()
  }
})
</script>

<style lang="scss" scoped></style>
