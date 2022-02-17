<template>
  <div class="instructions-view">
    <template v-if="!finalState">
      <div class="content-view scale-border">
        <div class="title">
          为做好开学工作，请您积极配合学校，做好开学准备。请您认真阅读以下相关信息：
        </div>
      </div>
      <div class="footer">
        <van-button
          color="#F16041"
          round
          block
          type="info"
          native-type="button"
          @click="final"
          >已知晓</van-button
        >
      </div>
    </template>
    <template v-else>
      <div>
        <div>
          <van-icon
            class="state-icon"
            size="80"
            color="#004F9C"
            name="checked"
          />
          <div class="pay-result">注册完成</div>
          <div class="pay-tip">您已完成注册报道。</div>
        </div>
        <div class="fast-group">
          <div
            class="fast-item scale-border"
            @click="$router.push('/orderInfo')"
          >
            <span>缴费详情</span>
            <van-icon name="arrow" color="#A3A3A3" />
          </div>
          <div
            class="fast-item scale-border"
            @click="$router.push('/orderInfo')"
          >
            <span>填报信息</span>
            <van-icon name="arrow" color="#A3A3A3" />
          </div>
          <div
            class="fast-item scale-border"
            @click="$router.push('/orderInfo')"
          >
            <span>新生须知</span>
            <van-icon name="arrow" color="#A3A3A3" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Instructions",
  data() {
    return {
      finalState: false
    }
  },
  methods: {
    final() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        this.finalState = true;
        loading.close();
      }, 2000);
    }
  }
}
</script>

<style lang="scss" scoped>
.instructions-view {
  width: 100%;
  margin-top: 20px;
  .content-view {
    box-sizing: border-box;
    padding: 16px 20px 20px 20px;
    position: relative;
    .title {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
  }
  .content-view::after {
    border: 1px solid #b8b8b8;
  }
  .footer {
    margin-top: 36px;
  }

  .state-icon {
    margin-top: 14px;
    background: #ffffff;
  }
  .pay-result {
    color: #333333;
    font-size: 20px;
    line-height: 20px;
    margin: 12px 0 12px;
    font-weight: bold;
  }
  .pay-tip {
    color: #333333;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 48px;
  }
  .fast-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    .fast-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 46px;
      color: #333333;
      font-size: 16px;
      position: relative;
    }
    .scale-border::after {
      border-bottom: 1px solid #b8b8b8;
    }
    .fast-item:last-of-type::after {
      border: none;
    }
  }
}
</style>
