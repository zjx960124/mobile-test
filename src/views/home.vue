<template>
  <div class="home">
    <img class="logo" src="../assets/sta.png" alt="" />
    <div class="views-group">
      <div
        class="item"
        @click="state = 'new'"
        :class="{ 'is-active': state === 'new' }"
      >
        新生注册
      </div>
      <div class="line"></div>
      <div
        class="item"
        @click="state = 'old'"
        :class="{ 'is-active': state === 'old' }"
      >
        在校生登录
      </div>
    </div>
    <van-form class="login-form" ref="form">
      <div
        class="label-name"
        :class="{ 'in-focus': focusName === 'label-name' }"
      >
        姓名
      </div>
      <van-field
        v-model="name"
        name="姓名"
        @focus="inputFocus('label-name')"
        @blur="focusName = ''"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <div
        class="label-card"
        :class="{ 'in-focus': focusName === 'label-card' }"
      >
        身份证号码
      </div>
      <van-field
        v-model="IdCardNumber"
        name="身份证号码"
        @focus="inputFocus('label-card')"
        @blur="focusName = ''"
        :rules="[
          {
            required: true,
            message: '请填写正确身份证号码',
            validator: (value) => {
              return value.length >= 18;
            },
          },
        ]"
      />
      <div style="margin: 40px 0">
        <van-button
          color="#F16041"
          round
          block
          type="info"
          @click="login"
          native-type="button"
          >查询</van-button
        >
      </div>
    </van-form>
    <!--<el-form
      class="login-form"
      :rules="rules"
      :model="loginForm"
      ref="ruleForm"
      label-width="100px"
      label-position="top"
      :hide-required-asterisk="true"
    >
      <el-form-item label="姓名" prop="name" :class="{'in-focus' : focusName === 'label-name' }">
        <el-input
          v-model="loginForm.name"
          @focus="inputFocus('label-name')"
          @blur="focusName = ''"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="IdCardNumber" :class="{'in-focus' : focusName === 'label-card' }">
        <el-input
          v-model="loginForm.IdCardNumber"
          @focus="inputFocus('label-card')"
          @blur="focusName = ''"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-view">
      <van-button color="#F16041" round block type="info" @click="login" native-type="button">查询</van-button>
    </div>-->
  </div>
</template>

<script>
import { login } from '@/api/base.js'
export default {
  name: "home",
  data() {
    return {
      validationComp: null,
      show: false,
      state: 'new',
      loginForm: {
        name: '',
        IdCardNumber: '',
      },
      name: '',
      IdCardNumber: '',
      focusName: '',
      validationState: '成功',
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        IdCardNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    login() {
      this.$refs.form.validate().then(res => {
        this.$validation({
          onClose: () => { console.log('关闭'); this.validationState = '关闭' },
          onSuccess: () => { console.log('成功'); this.validationState = '成功'; this.successValidation() }
        })
      })
    },
    closeValidation() {
      this.show = false;
    },
    successValidation() {
      this.show = false;
      this.$router.push({
        path: '/telephone',
        query: {
          name: this.name,
          IdCard: this.IdCardNumber
        }
      });
    },
    inputFocus(ev) {
      console.log(ev);
      this.focusName = ev;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  .logo {
    width: 201px;
    height: auto;
    margin: 40px auto 28px;
  }
  .views-group {
    display: flex;
    align-items: center;
    justify-content: center;
    .item {
      color: #333333;
      font-size: 20px;
      line-height: 1;
      position: relative;
      font-weight: 400;
    }
    .item.is-active {
      font-weight: bold;
    }
    .item.is-active::after {
      content: "";
      position: absolute;
      background: #f16041;
      width: 22px;
      height: 3px;
      border-radius: 1.5px;
      left: 50%;
      bottom: -8px;
      margin-left: -11px;
    }
    .line {
      margin: 0 20px;
      width: 1px;
      height: 15.5px;
      background: #a0a0a0;
    }
  }
  .van-form {
    margin-top: 41px;
    padding: 0 27.5px;
  }
  .login-form {
    margin-top: 47px;
    text-align: left;
    /*.el-form-item.in-focus {
        label.el-form-item__label {
          font-size: 12px !important;
          color: #F16041 !important;
        }
      }
      .el-form-item {

      }
      .el-form-item__content {
        .el-input {
          .el-input__inner {
            border: 1px solid #ffffff;
          }
          .el-form-item.is-error .el-input__inner {
            border-color: #ffffff;
          }
        }
      }*/
    .van-cell {
      padding-bottom: 0;
    }
    .label-name {
      text-align: left;
      color: #333333;
      font-size: 16px;
      line-height: 1;
      padding-left: 16px;
      height: 16px;
      transition: font-size 0.1s;
    }
    div.in-focus {
      font-size: 12px;
      color: #f16041;
    }
    .label-card {
      text-align: left;
      color: #333333;
      font-size: 16px;
      line-height: 1;
      padding-left: 16px;
      height: 16px;
      margin-top: 43px;
      transition: font-size 0.1s;
    }
  }
  .btn-view {
    margin: 40px 0;
    padding: 0 28px;
    box-sizing: border-box;
  }
}
</style>
