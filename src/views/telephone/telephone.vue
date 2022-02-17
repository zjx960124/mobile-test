<template>
  <div class="container-view">
    <img class="logo" src="../../assets/sta.png" alt="" />
    <div class="tip">验证信息</div>
    <van-form class="tel-form" ref="form">
      <div
        class="label-phone"
        :class="{ 'in-focus': focusName === 'label-phone' }"
      >
        手机号码
      </div>
      <van-field
        v-model="telephone"
        name="手机号码"
        class="filed-phone"
        @focus="inputFocus('label-phone')"
        @blur="focusName = ''"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <div class="tel-tip">该手机号仅作为本次安全验证使用</div>
      <div
        class="label-validation"
        :class="{ 'in-focus': focusName === 'label-validation' }"
      >
        验证码
      </div>
      <van-field
        v-model="verificationCode"
        name="验证码"
        @focus="inputFocus('label-validation')"
        @blur="focusName = ''"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button
            plain
            size="small"
            type="info"
            :style="{ color: validationFlag ? '#999999' : '#41A8FF' }"
            style="border: none; font-size: 16px"
            @click="getValidationNumber"
            native-type="button"
            >{{ validationTip }}</van-button
          >
        </template>
      </van-field>
      <div style="margin: 40px 0">
        <van-button
          color="#F16041"
          round
          block
          type="info"
          @click="validation"
          native-type="button"
          >验证</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { getValidationCode, validationCode } from '@/api/base.js';
export default {
  name: "Telephone",
  data() {
    return {
      name: '',
      IdCard: '',
      verificationCode: "",
      telephone: "",
      focusName: "",
      validationFlag: false,
      validationTip: "发送验证码",
      interval: null,
      time: 60,
    };
  },
  mounted() {
    console.log(this.$route);
    this.name = this.$route.query.name;
    this.IdCard = this.$route.query.IdCard;
  },
  methods: {
    getValidationNumber() {
      if (this.validationFlag) return
      const loading = this.$loading({
        lock: true,
        text: '获取验证码',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let param = {
        name: this.name,
        idcard: this.IdCard,
        phoneNumber: this.telephone
      };
      getValidationCode(param).then(res => {
        console.log(res);
        loading.close();
        if (res.code === '200') {
          this.validationFlag = true;
          this.interval = setInterval(() => {
            this.validationTip = this.time + "s后可再次获取";
            this.time--;
            if (this.time <= 0) {
              clearInterval(this.interval);
              this.interval = null;
              this.time = 60;
              this.validationTip = "发送验证码";
              this.validationFlag = false;
            }
          }, 1000);
        } else {
          Dialog.alert({
            title: '提示',
            message: res.msg,
          }).then(() => {
            this.validationFlag = false;
          });
          return;
        }
      }).catch((err) => {
        loading.close();
        this.validationFlag = false;
      })
    },
    validation() {
      let param = {
        idcard: this.IdCard,
        phoneNumber: this.telephone,
        Code: this.verificationCode
      };
      validationCode(param).then((res) => {
        console.log(res);
        if (res.code === '200' && res.data) {
          this.$store.commit("updateUser", res.data);
          this.$router.push("/result");
        }
      }).catch((err) => { })
    },
    inputFocus(ev) {
      this.focusName = ev;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-view {
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  .logo {
    width: 201px;
    height: auto;
    margin: 40px auto 28px;
  }
  .tip {
    color: #333333;
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    text-align: left;
    padding-left: 45px;
  }
  .van-form {
    margin-top: 53px;
    padding: 0 27.5px;
  }
  .tel-form {
    .van-cell {
      padding-bottom: 0;
    }
    .label-phone {
      text-align: left;
      color: #333333;
      font-size: 16px;
      line-height: 1;
      height: 16px;
      padding-left: 16px;
      transition: font-size 0.1s;
    }
    .filed-phone {
      position: relative;
      min-height: 59px;
      ::v-deep.van-field__body {
        padding-left: 33px;
        position: relative;
      }
      ::v-deep.van-field__body::before {
        content: "+86";
        position: absolute;
        top: 3px;
        left: 5px;
        color: #333333;
        font-size: 16px;
      }
    }
    div.in-focus {
      font-size: 12px;
      color: #f16041;
    }
    .tel-tip {
      position: absolute;
      right: 44px;
      color: #fc2121;
      font-size: 12px;
      line-height: 1;
      margin-top: -18px;
      text-align: left;
      box-sizing: border-box;
      padding-left: 20px;
    }
    .label-validation {
      text-align: left;
      color: #333333;
      font-size: 16px;
      line-height: 1;
      height: 16px;
      padding-left: 16px;
      margin-top: 20px;
      transition: font-size 0.1s;
    }
  }
}
</style>
