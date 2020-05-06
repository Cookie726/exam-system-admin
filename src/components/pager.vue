<template>
  <div class="pager">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("update:pageSize", val);
    },
    handleCurrentChange(val) {
      this.$emit("update:currentPage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.pager {
  text-align: center;
}
</style>
