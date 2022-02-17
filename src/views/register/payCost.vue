<template>
  <div class="pay-cost-view">
    <template v-if="hasOrder">
      <template v-if="payState === 'nopay'">
        <div class="tip-title">代缴账单</div>
        <div class="order-info-view">
          <div class="order-info-title scale-border">
            <div class="info-tip">【2019年6月入学缴费账单】</div>
            <div class="info-btn" @click="$router.push('/orderInfo')">详情</div>
          </div>
          <div class="order-info-main">
            <div class="main-item">
              <div class="item-label">姓名:</div>
              <div class="item-value">徐冉</div>
            </div>
            <div class="main-item">
              <div class="item-label">身份证号:</div>
              <div class="item-value">151615611156156156111</div>
            </div>
            <div class="main-item">
              <div class="item-label">总计费用:</div>
              <div class="item-value">950.00元</div>
            </div>
            <div class="main-item">
              <div class="item-label">缴费截止时间:</div>
              <div class="item-value">2022.09.22 14:52</div>
            </div>
          </div>
        </div>
        <div class="tip-titles">支付方式</div>
        <div class="pay-view">
          <van-checkbox v-model="checked">
            <i
              style="font-size: 26px; margin: 0 3px; color: #004f9c"
              class="iconfont myicon-zhongguojiansheyinhang"
            ></i>
            建设银行储蓄卡
          </van-checkbox>
        </div>
        <div style="margin: 32px 0 10px">
          <van-button
            color="#F16041"
            round
            block
            type="info"
            native-type="button"
            @click="pay"
            >确认支付</van-button
          >
        </div>
      </template>
      <template v-if="payState === 'isPay'">
        <van-icon class="state-icon" size="80" color="red" name="warning" />
        <div class="pay-result">缴费失败</div>
        <div class="pay-tip">您的账单被关闭，请联系学校！</div>
        <div class="pay-info-view">
          <div class="info-title">
            <div class="info-label">缴费信息</div>
            <div class="info-value" @click="$router.push('/orderInfo')">
              详情
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">订单名称</div>
            <div class="info-value">2021秋季新生入学缴费</div>
          </div>
          <div class="info-item">
            <div class="info-label">订单编号</div>
            <div class="info-value">3573873753533435345</div>
          </div>
          <div class="info-item">
            <div class="info-label">支付单号</div>
            <div class="info-value">3573873753533435345</div>
          </div>
          <div class="info-item">
            <div class="info-label">费用总计</div>
            <div class="info-value">1500元</div>
          </div>
          <div class="info-item">
            <div class="info-label">关闭时间</div>
            <div class="info-value">2021.12.25 12:00</div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="tip-title">代缴账单</div>
      <van-empty
        class="custom-image"
        :image="empty"
        description="账单尚未生成，请稍后查询..."
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "PayCost",
  data() {
    return {
      empty: require('../../assets/empty2.png'),
      hasOrder: true,
      payState: 'nopay',
      checked: false
    }
  },
  methods: {
    pay() {
      this.$router.push('/register/fill')
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-cost-view {
  width: 100%;
  .tip-title {
    text-align: left;
    margin-top: 28px;
    margin-bottom: 12px;
    color: #333333;
    font-weight: bold;
    padding-left: 8.5px;
    position: relative;
  }
  .tip-title::before {
    position: absolute;
    content: "";
    left: 0;
    top: 5px;
    width: 3px;
    height: 12px;
    border-radius: 1.5px;
    background: #f16041;
  }
  .tip-titles {
    text-align: left;
    margin-top: 32px;
    margin-bottom: 12px;
    color: #333333;
    font-weight: bold;
    padding-left: 8.5px;
    position: relative;
  }
  .tip-titles::before {
    position: absolute;
    content: "";
    left: 0;
    top: 5px;
    width: 3px;
    height: 12px;
    border-radius: 1.5px;
    background: #f16041;
  }
  .custom-image {
    background: #ffffff;
    box-shadow: 0 0 6px rgba(0, 13, 34, 0.32);
  }
  .order-info-view {
    width: 100%;
    height: fit-content;
    padding: 0 10px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 0 6px rgba(0, 13, 34, 0.32);
    border-radius: 4px;
    .order-info-title {
      padding: 20px 10px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .info-tip {
        color: #333333;
        font-size: 16px;
      }
      .info-btn {
        color: #41a8ff;
        font-size: 16px;
      }
    }
    .order-info-title::after {
      border-bottom: 1px solid #d2d2d2;
    }
    .order-info-main {
      padding: 16px 10px 0;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      .main-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
        .item-label {
          color: #999999;
        }
        .item-value {
          color: #333333;
        }
      }
      .main-item:last-child {
        margin-bottom: 20px;
      }
    }
  }
  .pay-view {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 0 6px rgba(0, 13, 34, 0.32);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    ::v-deep.van-checkbox__label {
      color: #333333;
      // font-family: "PingFang SC";
      font-weight: 400;
      font-size: 18px;
      // margin-left: 36px;
      position: relative;
      overflow: no-display;
      display: flex;
      align-items: center;
    }
    // ::v-deep.van-checkbox__label:before {
    //   content: "\e661";
    //   position: absolute;
    //   width: 18px;
    //   height: 18px;
    //   left: -26px;
    //   top: 2px;
    //   color: #41a8ff;
    // }
  }
  .state-icon {
    margin-top: 40px;
  }
  .pay-result {
    color: #333333;
    font-size: 20px;
    line-height: 20px;
    margin: 20px 0 9px;
    font-weight: bold;
  }
  .pay-tip {
    color: #333333;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 48px;
  }
  .pay-info-view {
    padding: 0 10px;
    box-sizing: border-box;
    .info-title {
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d2d2d2;
      .info-label {
        font-size: 16px;
        color: #333333;
      }
      .info-value {
        font-size: 16px;
        color: #41a8ff;
      }
    }
    .info-item {
      margin-bottom: 28px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      .info-label {
        font-size: 14px;
        color: #999999;
      }
      .info-value {
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>
