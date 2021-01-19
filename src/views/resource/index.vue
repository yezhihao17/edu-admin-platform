<template>
  <div class="resourse">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="form"
        size="mini"
        ref="searchForm"
        class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="资源分类">
            <el-option
              v-for="category in categorys"
              :key="category.id"
              :label="category.name"
              :value="category.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button
            :disabled="isLoading"
            type="primary"
            @click="getResource">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-button size="mini" @click="handleCreate">添加</el-button>
      <el-button size="mini" @click="$router.push({ name: 'resource-category' })">资源分类</el-button>
    </el-card>
    <el-card>
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
          label="资源路径"
          align="center"
          prop="url">
        </el-table-column>
        <el-table-column
          label="描述"
          align="center"
          prop="description">
        </el-table-column>
        <el-table-column
          label="添加时间"
          align="center"
          prop="name">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | date }}</span>
          </template>
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

      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="form.size"
          :total="total"
          @current-change="handleCurrentChange"
          :disabled="isLoading">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑资源' : '添加资源'"
      :visible.sync="dialogVisible"
      width="30%">
      <create-or-edit-resource
        v-if="dialogVisible"
        :categorys="categorys"
        :categoryId="categoryId"
        :isEdit="isEdit"
        @cancel="dialogVisible = false"
        @success="onSuccess">
      </create-or-edit-resource>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEditResource from './components/CreateOrEditResource.vue'
import {
  getResourcePages,
  getAllCategory,
  deleteResource
} from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'Resourcendex',
  components: {
    createOrEditResource
  },
  data () {
    return {
      isLoading: true, // 加载中
      form: {
        size: 10,
        current: 1,
        categoryId: '',
        name: '',
        url: ''
      },
      total: 0,
      resources: [],
      categorys: [],
      isEdit: false, // 判断是否是编辑资源
      categoryId: 0, // 当前选中资源 id
      dialogVisible: false // 显示资源
    }
  },
  methods: {
    // 获取所有资源
    async getResource () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },

    // 获取资源分类
    async getAllCategory () {
      const { data } = await getAllCategory('')
      this.categorys = data.data
    },

    // 删除资源
    async deleteResource () {
      this.isLoading = true
      const { data } = await deleteResource(this.categoryId)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.getResource()
      } else {
        this.$message.error(data.mesg)
      }
      this.isLoading = false
    },

    // 重置
    reset () {
      (this.$refs.searchForm as Form).resetFields()
      console.log(123)
    },

    // 添加资源
    handleCreate () {
      this.categoryId = 0
      this.isEdit = false
      this.dialogVisible = true
    },

    // 编辑
    handleEdit (resource: any) {
      this.categoryId = resource.id
      this.isEdit = true
      this.dialogVisible = true
    },

    // 删除
    handleDelete (resource: any) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.categoryId = resource.id
        this.deleteResource()
      })
    },
    // 取消
    onCancel () {
      this.dialogVisible = false
    },
    // 成功回调
    onSuccess () {
      this.getResource()
      this.dialogVisible = false
    },
    // 切换页数
    handleCurrentChange (pageNo: number) {
      this.form.current = pageNo
      this.getResource()
    }
  },
  created () {
    this.getResource()
    this.getAllCategory()
  }
})
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  overflow: hidden;
}
.el-pagination {
  float: right;
  padding: 20px 0;
}
</style>
