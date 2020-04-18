<template>
  <div class="modal-content">
    <div class="modal-body">
      <div class="title">
        <div class="title_border"></div>
        <div class="title_content">答题卡</div>
      </div>
      <div class="card-content-list">
        <div class="box-list">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="box normal-box s1"
          >
            <a :href="'#' + item.id" class="iconBox">{{ index + 1 }}</a
            ><span class="box icon-box question_marked"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <template v-if="isAnswer"
        ><span class="box icon-box s1"></span>
        <span class="icon-label">未答</span></template
      >
      <template v-if="!isAnswer">
        <span class="box icon-box s2"></span>
        <span class="icon-label">正确</span></template
      >
      <template v-if="isAnswer">
        <span class="box icon-box s3"></span>
        <span class="icon-label">已答</span>
      </template>
      <template v-if="!isAnswer">
        <span class="box icon-box s4"></span>
        <span class="icon-label">错误</span></template
      >
      <template v-if="isAnswer">
        <span class="box icon-box marked"></span>
        <span class="icon-label">标记</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAnswer: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [
        {
          id: "100001",
        },
        {
          id: "100002",
        },
        {
          id: "100003",
        },
        {
          id: "100004",
        },
        {
          id: "100005",
        },
        {
          id: "100006",
        },
      ],
    },
  },
};
</script>

<style lang="less" scoped>
.modal-content {
  width: 240px;
  position: fixed;
  left: 100px;
  height: 80%;
  background-color: #fff;
  .modal-body {
    height: 100%;
    overflow: auto;
    .title {
      margin-bottom: 15px;
      position: relative;
      text-align: left;
      margin-left: 20px;
      color: #666666;
      .title_border {
        display: inline-block;
        width: 4px;
        height: 18px;
        background: #1a8cfe;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      .title_content {
        margin-left: 14px;
        font-weight: 600;
        color: #27274a;
      }
    }
    .card-content-list {
      padding: 0 20px 0 20px;
      position: relative;
      .box-list {
        padding-bottom: 0;
        position: relative;
        left: -5px;
        font-size: 0;
        margin-right: -15px;
        .icon-box.question_marked {
          background: #fe8545 !important;
          border-radius: 100%;
          width: 5px !important;
          height: 5px !important;
          position: relative;
          bottom: 0px;
        }
        .box {
          height: auto;
          line-height: unset;
          position: relative;
          margin-bottom: 15px;
          width: 35px;
          font-size: 14px;
          display: inline-block;
          text-align: center;
          .iconBox {
            width: 27px;
            height: 27px;
            line-height: 25px;
            border: 1px solid #c1c1cb;
            display: inline-block;
            border-radius: 50%;
            cursor: pointer;
          }
          &.question_marked {
            position: absolute !important;
            bottom: -8px;
            padding: unset !important;
            right: 0;
            left: 0;
            margin: auto;
            display: none;
          }
          &.s4 {
            .iconBox {
              border-color: #ff0000;
              color: #fff;
              background: #ff0000;
            }
          }
          &.s2 {
            .iconBox {
              border-color: #1a8cfe;
              color: #fff;
              background: #1a8cfe;
            }
          }
          &.s1 {
            .iconBox {
              border: 1px solid #dcdfe6;
              color: #dcdfe6;
            }
          }
          &.marked {
            background: unset;
            .question_marked {
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .modal-footer {
    position: absolute;
    bottom: 0;
    padding: 10px 20px 10px 0px;
    background-color: #fff;
    right: 0;
    width: 100%;
    box-sizing: border-box;
    text-align: right;
    box-shadow: 0 -2px 10px 0 rgba(58, 62, 81, 0.1);
    .icon-box {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      margin-right: 2px;
      margin: 0 2px 0 15px;
      &.s2,
      &.s3 {
        background: #1a8cfe;
      }
      &.s4 {
        background: #ff0000;
      }
      &.s1 {
        background: #ffffff;
        border: 1px solid #c1c1cb;
      }
      &.marked {
        background: #fe8545;
        border-radius: 100%;
        width: 5px;
        height: 5px;
        position: relative;
        bottom: 1px;
      }
    }
    .icon-label {
      font-size: 12px;
      color: #656577;
    }
  }
}
</style>
