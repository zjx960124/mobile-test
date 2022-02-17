<template>
  <div class="step_view">
    <div class="main">
      <div
        class="step_item"
        v-for="(item, index) in stepList"
        :key="index"
        @click="itemClick(index, item)"
      >
        <div
          class="step_circle iconfont"
          :class="{
            step_active: active === index,
            step_success: active > index,
          }"
        >
          <template v-if="active === index">
            <div class="step_active"></div>
          </template>
          <template v-if="active > index">
            <div class="step_success"></div>
          </template>
          <div
            class="step_line"
            :class="{ line_active: active > index }"
            :style="{ width: distance + 'px' }"
          ></div>
        </div>
        <div class="step_label">{{ item }}</div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Step",
  props: {
    stepList: Array,
    active: Number,
    stepClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      distance: ''
    }
  },
  mounted() {
    this.calcDistance();
  },
  methods: {
    calcDistance() {
      let tagList = document.getElementsByClassName('step_line');
      this.distance = tagList[1].getBoundingClientRect().left - tagList[0].getBoundingClientRect().left - 26;
    },
    itemClick(index, data) {
      if (!this.stepClick) return false;
      this.$emit('itemClick', index, data);
    }
  }
}
</script>

<style lang="scss" scoped>
.step_view {
  width: 100%;
  min-height: 80px;
  box-sizing: border-box;
  padding: 0 7%;
  border-radius: 4px;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .step_item {
      display: flex;
      flex-direction: column;
      .step_circle {
        width: 12px;
        height: 12px;
        border-radius: 16px;
        background-color: #a0a0a0;
        align-self: center;
        margin-bottom: 12px;
        margin-top: 16px;
        position: relative;
        .step_active {
          position: absolute;
          width: 16px;
          height: 16px;
          left: -2px;
          top: -2px;
          font-size: 16px;
          // background: url("../../assets/dian.png") 100% 100% no-repeat;
          border-radius: 50%;
          background-color: #ffffff;
        }
        .step_active::before {
          content: "\e63e";
          position: absolute;
          width: 0;
          height: 0;
          left: 0;
          top: 0;
          color: #f16041;
        }
        .step_success {
          position: absolute;
          width: 16px;
          height: 16px;
          left: -2px;
          top: -2px;
          background-color: #ffffff;
          // background: url("../../assets/gou.png") 100% 100% no-repeat;
          border-radius: 50%;
        }
        .step_success::before {
          content: "\e6a2";
          position: absolute;
          width: 0;
          height: 0;
          left: 0;
          top: 0;
          color: #f16041;
        }
        .step_line {
          position: absolute;
          height: 1.5px;
          left: 100%;
          margin-left: 8px;
          top: 50%;
          background: #a0a0a0;
          overflow: hidden;
        }
        .step_line.line_active::after {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          width: 100%;
          height: 1.5px;
          animation: widths 0.3s linear 1;
          background: #f16041;
        }
        @keyframes widths {
          0% {
            left: -100%;
          }
          100% {
            left: 0;
          }
        }
      }
      /*.step_circle.step_active {
            background: transparent;
          }
          .step_circle.step_success {
            background: transparent;
          }*/
      /*.step_active:before {
            content: "\e633";
            position: absolute;
            left: -2px;
            top: -2px;
            color: #F16041;
          }
          .step_success:before {
            content: "\e633";
            position: absolute;
            left: -2px;
            top: -2px;
            color: #F16041;
          }*/
      .step_label {
        color: #999999;
        font-size: 16px;
        font-weight: bold;
        font-family: "PingFang SC";
      }
      .step_active + .step_label {
        color: #f16041;
      }
    }
    .step_item:last-child {
      .step_circle {
        .step_line {
          display: none;
        }
      }
    }
  }
}
</style>
