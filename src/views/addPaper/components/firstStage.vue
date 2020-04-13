<template>
  <div>
    <el-form
      :rules="rules"
      ref="paperInfo"
      :model="paperInfo"
      label-width="80px"
    >
      <el-form-item label="名称" prop="title">
        <el-input style="width: 240px" v-model="paperInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="classify">
        <el-select v-model="paperInfo.classify">
          <el-option
            v-for="item in classifyIndexTable"
            :key="item.value"
            :value="item.classify"
            :label="item.classify"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="nextStage">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { paperClassify } from "../../../config/default";
export default {
  data() {
    return {
      paperInfo: {
        title: "",
        classify: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入试卷名称",
            trigger: "blur"
          }
        ],
        classify: [
          {
            required: true,
            message: "请选择试卷分类",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    classifyIndexTable() {
      return paperClassify;
    }
  },
  methods: {
    nextStage() {
      this.$refs["paperInfo"].validate(valid => {
        if (valid) {
          const { title, classify } = this.paperInfo;
          this.$emit("toTwoStage", { title, classify });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style></style>
