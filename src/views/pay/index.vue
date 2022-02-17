<template>
    <div class="pay-view">
        <div class="tip">
            <div class="title">支付提示:</div>
            <div>1、该二维码支持，微信支付、支付宝支付和建行APP支付；</div>
            <div>2、支付完成后请返回本平台进行查看是否完成。</div>
        </div>
        <div class="pay-code-view">
            <div class="pay-info">
                <div>订单名称：2019年6月入学缴费账单</div>
                <div>订单编号：516515611156165111156156</div>
                <div>商户名称：福建建筑学校</div>
            </div>
            <div class="pay-amount">￥6400.00</div>
            <div class="line"></div>
            <div class="pay-qr-code"></div>
            <div class="pay-tip">
                <div>该二维码将于2022.01.03 18:15失效</div>
                <div>请您尽快完成支付</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Pay",
    data() {
      return {}
    },
    methods: {
      pay() {
        this.$router.push('/register/fill');
      }
    }
  }
</script>

<style lang="scss" scoped>
    .pay-view {
        padding: 0 10px;
        box-sizing: border-box;
        .tip {
            padding-right: 10px;
            color: #FC2121;
            text-align: left;
            margin: 32px 0;
            .title {
                font-size: 16px;
                font-weight: bold;
            }
        }
        .pay-code-view {
            width: 100%;
            box-shadow: 0 0 6px rgba(0,13,34, .35);
            display: flex;
            flex-direction: column;
            padding-bottom: 20px;
            margin-bottom: 20px;
          border-radius: 4px;
            .pay-info {
                margin: 28px 0 48px 20px;
                color: #333333;
                font-size: 14px;
                line-height: 14px;
                text-align: left;
                & > div:nth-child(2) {
                    margin: 12px 0;
                }
            }
            .pay-amount {
                color: #333333;
                font-size: 28px;
                text-align: center;
                margin-bottom: 20px;
                font-weight: bold;
            }
            .line {
                background: #E6E6E6;
                height: 1px;
            }
            .pay-qr-code {
                margin: 20px auto;
                width: 200px;
                height: 200px;
            }
            .pay-tip {
                text-align: center;
                color: #333333;
                font-size: 14px;
            }
        }
    }
</style>
