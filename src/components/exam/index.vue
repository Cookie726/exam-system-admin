<template>
  <div class="exam-container">
    <div class="left">
      <div class="modal-content">
        <div class="modal-body">
          <div class="title">
            <div class="title_border"></div>
            <div class="title_content">答题卡</div>
          </div>
          <div class="card-content-list">
            <div class="box-list">
              <div class="box normal-box s4">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s4">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s4">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s4">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s2">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s2">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s2">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s2">
                <a class="iconBox">1</a>
              </div>
              <div class="box normal-box s2">
                <a class="iconBox">1</a>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <span class="box icon-box s2"></span>
          <span class="icon-label">正确</span>
          <span class="box icon-box s4"></span>
          <span class="icon-label">错误</span>
        </div>
      </div>
    </div>
    <div class="middle">
      <problem></problem>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import Problem from "../problem";
export default {
  components: {
    problem: Problem,
  },
};
</script>

<style lang="less" scoped>
.exam-container {
  position: fixed;
  overflow: auto;
  height: 100%;
  width: 100%;
  min-height: 100%;
  background: #eff3f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left {
    width: 360px;
    background-color: red;
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
          &.s2 {
            background: #1a8cfe;
          }
          &.s4 {
            background: #ff0000;
          }
        }
        .icon-label {
          font-size: 12px;
          color: #656577;
        }
      }
    }
  }
  .middle {
    background-color: #fff;
    flex: 1;
  }
  .right {
    width: 260px;
    background-color: yellow;
  }
}
</style>
