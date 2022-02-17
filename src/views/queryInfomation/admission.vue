<template>
  <div class="container-view">
    <div class="main">
      <div class="empty">
        <div class="tip" v-show="state === 'success'">学生信息如下:</div>
      </div>
      <template v-if="userData">
        <div class="result-main">
          <div>
            <span class="result-main-label">姓名:</span>
            <span class="result-mian-value">{{ userData.name }}</span>
          </div>
          <div>
            <span class="result-main-label">身份证号:</span>
            <span class="result-mian-value">{{ userData.idNo }}</span>
          </div>
          <div>
            <span class="result-main-label">录取专业:</span>
            <span class="result-mian-value">{{ userData.major }}</span>
          </div>
          <div>
            <span class="result-main-label">学制:</span>
            <span class="result-mian-value">{{
              userData.educationalSystem
            }}</span>
          </div>
          <div>
            <span class="result-main-label">学年:</span>
            <span class="result-mian-value">{{
              userData.scholasticYearSystem
            }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <van-empty
          class="custom-image"
          :image="empty"
          description="很抱歉，您未被录取！"
        />
      </template>
    </div>
    <div class="button-view">
      <van-button
        color="#F16041"
        round
        block
        type="info"
        @click="sure"
        native-type="button"
        >{{ state === "success" ? "新生注册" : "返回" }}</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
      state: 'success',
      empty: require('../../assets/empty1.png'),
    }
  },
  computed: {
    userData() {
      return this.$store.state.user;
    }
  },
  mounted() {
    console.log(this.userData);
  },
  methods: {
    sure() {
      this.$router.push('/register/pay')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-view {
  .main {
    padding: 0 10px;
    margin-bottom: 36px;
    .empty {
      width: 100%;
      height: 54px;
      position: relative;
      .tip {
        position: absolute;
        left: 0;
        bottom: 14px;
        color: #010101;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .result-main {
      width: 100%;
      min-height: 185px;
      box-shadow: 0 0 5px 0 rgba(0, 13, 34, 0.35);
      display: flex;
      flex-direction: column;
      font-weight: normal;
      text-align: left;
      padding: 16px 20px;
      box-sizing: border-box;
      border-radius: 4px;
      div {
        margin-bottom: 13px;
        display: flex;
        justify-content: space-between;
        .result-main-label {
          color: #999999;
          font-size: 14px;
        }
        .result-mian-value {
          color: #333333;
          font-size: 14px;
        }
      }
      div:last-of-type {
        margin-bottom: 0;
      }
    }
    .custom-image {
      background: #ffffff;
      box-shadow: 0 0 6px rgba(0, 13, 34, 0.32);
      height: 188px;
      ::v-deep img {
        width: 80px;
        height: 80px;
      }
    }
  }
  .button-view {
    padding: 0 10px;
    margin-bottom: 10px;
  }
}
</style>
