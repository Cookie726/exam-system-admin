<template>
  <div>
    <el-table :data="questionList" border>
      <el-table-column
        align="center"
        prop="content"
        label="题目"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="questionType"
        label="题型"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="classify"
        label="分类"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="value"
        label="分数"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWrongBook } from "@/api/wrongBook";
export default {
  data() {
    return {
      questionList: [
        {
          id: 1,
          content: "<p>这是单选题题目</p>",
          questionType: "单选题",
          classify: "前端",
          analysis: "<p>这是单选题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "<p>这道题选A</p>",
            },
            {
              status: 0,
              id: 2,
              choice: "<p>这道题选B</p>",
            },
            {
              status: 0,
              id: 3,
              choice: "<p>这道题选C</p>",
            },
            {
              status: 0,
              id: 4,
              choice: "<p>这道题选D</p>",
            },
          ],
          value: 10,
          score: 0,
          studentAnswer: "",
          studentOptionList: [
            {
              id: 2,
            },
          ],
          filePath: "",
        },
        {
          id: 2,
          content: "<p>这是多选题题目</p>",
          questionType: "多选题",
          classify: "前端",
          analysis: "<p>这是多选题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "<p>这道题选A</p>",
            },
            {
              status: 0,
              id: 2,
              choice: "<p>这道题选B</p>",
            },
            {
              status: 1,
              id: 3,
              choice: "<p>这道题选C</p>",
            },
            {
              status: 0,
              id: 4,
              choice: "<p>这道题选D</p>",
            },
          ],
          value: 10,
          score: 10,
          studentAnswer: "",
          studentOptionList: [
            {
              id: 1,
            },
            {
              id: 3,
            },
          ],
          filePath: "",
        },
        {
          id: 3,
          content: "<p>这是简答题题目</p>",
          questionType: "简答题",
          classify: "前端",
          analysis: "<p>这是简答题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "<p>这是简答题答案</p>",
            },
          ],
          value: 10,
          score: 8,
          studentAnswer: "<p>这是学生的答案</p>",
          studentOptionList: [],
          filePath: "",
        },
        {
          id: 4,
          content: "<p>这是判断题题目</p>",
          questionType: "判断题",
          classify: "前端",
          analysis: "<p>这是判断题解析</p>",
          optionList: [
            {
              status: 1,
              id: 1,
              choice: "正确",
            },
            {
              status: 0,
              id: 2,
              choice: "错误",
            },
          ],
          value: 10,
          score: 10,
          studentAnswer: "",
          studentOptionList: [
            {
              id: 1,
            },
          ],
          filePath: "",
        },
      ],
      total: 0,
      pageConfig: {
        currentPage: 1,
        limit: 12,
      },
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      getWrongBook(this.pageConfig);
    },
  },
};
</script>

<style></style>
