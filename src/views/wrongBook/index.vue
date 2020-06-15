<template>
  <div>
    <wrong-question
      v-for="question in questionList"
      :key="question.id"
      :question="question"
    ></wrong-question>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getWrongBook } from "@/api/wrongBook";
import WrongQuestion from "@/components/wrongQuestion";
export default {
  data() {
    return {
      questionList: [],
      total: 0,
      pageConfig: {
        currentPage: 1,
        limit: 8,
      },
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      getWrongBook(this.pageConfig).then((res) => {
        if (res.code === 0) {
          this.questionList = res.data.recordQuestionDTOList;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange(currentPage) {
      this.pageConfig.currentPage = currentPage;
      this.setData();
    },
  },
  components: {
    WrongQuestion,
  },
};
</script>

<style lang="less" scoped>
.block {
  text-align: center;
}
</style>
