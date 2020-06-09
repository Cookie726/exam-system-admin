<template>
  <div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {
        title: "<p>这是一个单选题</p>",
        classify: "前端",
        questionType: "单选题",
        analysis: "<p>这是解析</p>",
        optionList: [
          {
            id: 1,
            status: 1,
            choice: "<p>这是A选项</p>"
          },{
            id: 2,
            status: 0,
            choice: "<p>这是B选项</p>"
          },{
            id: 3,
            status: 0,
            choice: "<p>这是C选项</p>"
          },{
            id: 4,
            status: 0,
            choice: "<p>这是D选项</p>"
          }
        ],
        value: 10,
        score: 0,
        studentAnswer: "",
        studentOptionList: [
          {
            id: 3
          }
        ],
        filePath: ""
      },
    };
  },
};
</script>

<style></style>
