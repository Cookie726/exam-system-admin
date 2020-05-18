<template>
  <el-tooltip effect="dark" :content="tipContent" placement="top">
    <div
      @click="handleMark"
      class="question-operation operation-icon"
      :class="{ 'icon-marked': isMark, 'icon-mark': !isMark }"
    >
      <i class="icon el-icon-s-flag"></i>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    isMark: Boolean,
    index: Number,
  },
  computed: {
    tipContent() {
      return this.isMark ? "取消标记" : "标记本题";
    },
  },
  mounted() {
    console.log(this.isMark, this.index);
  },
  methods: {
    handleMark() {
      this.$emit("update:isMark", !this.isMark);
    },
  },
};
</script>

<style></style>
