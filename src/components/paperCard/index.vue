<template>
  <div
    class="paper-card"
    :class="{
      bl_danger:
        paperItem.grades / paperItem.paperScore < 0.6 &&
        pathName === 'examRecord',
      bl_success:
        paperItem.grades / paperItem.paperScore >= 0.6 &&
        pathName === 'examRecord',
      bl_error: !paperItem.isMark && pathName === 'examRecord',
    }"
  >
    <div
      v-if="pathName === 'examRecord'"
      class="item-status"
      :class="{
        danger: paperItem.grades / paperItem.paperScore < 0.6,
        success: paperItem.grades / paperItem.paperScore >= 0.6,
        error: !paperItem.isMark,
      }"
    >
      <span v-if="paperItem.grades / paperItem.paperScore < 0.6">未通过</span>
      <span v-else-if="paperItem.grades / paperItem.paperScore >= 0.6"
        >及格</span
      >
      <span v-if="!paperItem.isMark">未批改</span>
    </div>
    <div class="item-title">{{ paperItem.title }}</div>
    <div class="item-row item-during">
      <div class="item-label">开始时间：</div>
      <div class="item-data">
        {{ paperItem.startTime }}
      </div>
    </div>
    <div class="item-row item-during">
      <div class="item-label">截止时间：</div>
      <div class="item-data">
        {{ paperItem.endTime }}
      </div>
    </div>
    <div class="item-row item-limit">
      <div class="item-label">考试时长：</div>
      <div class="item-data">{{ timeLimit }}分钟</div>
    </div>
    <el-button
      v-if="pathName === 'home'"
      type="primary"
      @click="handleAnswer"
      class="button"
      >开始答题</el-button
    >
    <el-button
      v-if="pathName === 'examRecord'"
      type="primary"
      @click="handleRecord"
      class="button"
      >查看详情</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    paperItem: Object,
    type: Number,
  },
  computed: {
    timeLimit() {
      return Math.floor(this.paperItem.timeLimit);
    },
    pathName() {
      return this.$route.name;
    },
  },
  methods: {
    handleAnswer() {
      if (new Date(this.paperItem.startTime).getTime() > new Date().getTime()) {
        window.ELEMENT.MessageBox.alert("考试还未开始", "提示", {
          confirmButtonText: "确定",
        });
      } else {
        let routeData = this.$router.resolve({
          name: "examStart",
          params: { id: this.paperItem.id },
        });
        window.open(routeData.href, "_blank");
      }
    },
    handleRecord() {
      const routeData = this.$router.resolve({
        name: "examRecordDetail",
        params: {
          id: this.paperItem.id,
        },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.danger {
  background-color: red;
}
.success {
  background-color: #67c23a;
}
.error {
  background-color: #e6a23c;
}
.paper-card {
  width: 390px;
  padding: 20px;
  height: 206px;
  margin-right: 24px;
  margin-bottom: 24px;
  border-left: 4px solid #c1c1cb;
  float: left;
  position: relative;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(58, 62, 81, 0.2);
  border-radius: 4px;
  overflow: hidden;
  top: 0;
  transition: top 0.2s linear;
  &:hover {
    top: -10px;
    box-shadow: 0 2px 10px 0 rgba(58, 62, 81, 0.1);
    .button {
      display: block;
    }
  }
  .item-status {
    width: 60px;
    height: 60px;
    position: absolute;
    right: -30px;
    top: -30px;
    transform: rotate(45deg);
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: #f8f8f8;
  }
  .item-title {
    line-height: 28px;
    font-size: 20px;
    color: #2f3445;
    margin-bottom: 10px;
    height: 56px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-row {
    padding-left: 72px;
    color: #666;
    line-height: 20px;
    position: relative;
    .item-label {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .button {
    display: none;
    position: absolute;
    right: 15px;
  }
}
.bl_danger {
  border-left: 4px solid red;
}
.bl_success {
  border-left: 4px solid #67c23a;
}
.bl_error {
  border-left: 4px solid #e6a23c;
}
</style>
