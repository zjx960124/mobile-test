<template>
    <div class="order-info-view">
        <div class="info-view">
            <div class="info-title">2021秋季新生入学缴费</div>
            <div class="info-main">
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
                    <div class="item-value">2022.09.22  14:52</div>
                </div>
            </div>
        </div>
        <div style="margin: 36px 0 10px;">
            <van-button
              color="#F16041"
              @click="goBack"
              round
              block
              type="info"
              native-type="button"
            >返回</van-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "OrderInfo",
    data() {
      return {
        validationComp: null,
        visible: false
      }
    },
    mounted() {
    },
    methods: {
      success() {
        console.log('成功事件');
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .order-info-view {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .info-view {
            width: 100%;
            height: fit-content;
            box-sizing: border-box;
            background: #ffffff;
            box-shadow: 0 0 6px rgba(0, 13, 34, .32);
            border-radius: 4px;
            margin-top: 16px;
            .info-title {
                padding: 16px 10px 8px;
                text-align: center;
                color: #333333;
                font-size: 16px;
                border-bottom: 1px solid #EDEDED;
                font-weight: bold;
            }
            .info-main {
                padding: 20px 19px 0;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                .main-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 22px;
                    .item-label {
                        color: #999999;
                    }
                    .item-value {
                        color: #333333;
                    }
                }
                .main-item:last-child {
                    margin-bottom: 24px;
                }
            }
        }
        .visible {
            width: 100vw;
            height: 100vh;
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, .4);
            display: flex;
            justify-content: center;
        }
    }
</style>
