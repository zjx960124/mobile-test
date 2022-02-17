<template>
  <div class="infomation-fill-view">
    <template v-if="!hasFill">
      <div class="fill-view" style="margin-bottom: 10px">
        <div class="tip-title">学生基础信息</div>
        <div class="fill-form">
          <el-form label-position="left" label-width="105px">
            <el-form-item label="学生政治面貌">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="毕业学校">
              <el-input v-model="form.region"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址">
              <el-input v-model="form.region"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input v-model="form.region"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="fill-view">
        <div class="tip-title">家长信息</div>
        <div v-for="(item, index) in count" class="fill-main" :key="index">
          <div class="fill-form">
            <el-form label-position="left" label-width="105px">
              <el-form-item label="家长姓名">
                <el-input v-model="form.region"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="form.region"></el-input>
              </el-form-item>
              <el-form-item label="与学生关系">
                <el-input v-model="form.region"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="create-view">
        <div class="create-icon" @click="createInfo">
          <van-icon color="#999999" name="plus" />
        </div>
      </div>
      <div class="footer">
        <van-button
          color="#F16041"
          round
          block
          type="info"
          native-type="button"
          @click="submitInfo"
          >提交</van-button
        >
      </div>
    </template>
    <template v-else>
      <div style="background: #ffffff">
        <div>
          <van-icon
            class="state-icon"
            size="80"
            color="#004F9C"
            name="checked"
          />
          <div class="pay-result">填报完成</div>
          <div class="pay-tip">您已完成填报，进行下一步操作至完成注册。</div>
        </div>
        <div class="pay-info-view">
          <div class="info-title scale-border">
            <div class="info-label">缴费信息</div>
            <div class="info-value"></div>
          </div>
          <div class="item-title">学生基本信息</div>
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
        <div v-show="familyInfoFlag" class="pay-info-view family-info">
          <div class="item-title">家长信息</div>
          <div class="info-item">
            <div class="info-label">家长姓名</div>
            <div class="info-value">徐克</div>
          </div>
          <div class="info-item">
            <div class="info-label">联系方式</div>
            <div class="info-value">3573873753533435345</div>
          </div>
          <div class="info-item">
            <div class="info-label">与学生关系</div>
            <div class="info-value">父子</div>
          </div>
        </div>
        <div class="show-view">
          <div class="create-icon" @click="spreadInfo">
            <template v-if="familyInfoFlag">
              <van-icon color="#999999" name="arrow-up" />
            </template>
            <template v-if="!familyInfoFlag">
              <van-icon color="#999999" name="arrow-down" />
            </template>
          </div>
        </div>
        <div class="footer" style="margin-top: 36px">
          <van-button
            color="#F16041"
            round
            block
            type="info"
            native-type="button"
            @click="next"
            >下一步</van-button
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "InfomationFill",
  data() {
    return {
      hasFill: false,
      form: {
        region: ''
      },
      count: 1,
      familyInfoFlag: false
    }
  },
  methods: {
    createInfo() {
      ++this.count
    },
    spreadInfo() {
      this.familyInfoFlag = !this.familyInfoFlag;
    },
    submitInfo() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        this.hasFill = true;
        loading.close();
      }, 2000);
    },
    next() {
      this.$router.push('/register/instructions')
    }
  }
}
</script>

<style lang="scss" scoped>
.infomation-fill-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  box-sizing: border-box;
  background: #f2f2f2;
  .fill-view {
    background: #ffffff;
    .tip-title {
      text-align: left;
      margin-top: 30px;
      margin-bottom: 18px;
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
    .fill-main + .fill-main {
      margin-top: 32px;
    }
    .el-form {
      padding: 0 9px;
    }
    .fill-form {
      padding-bottom: 9px;
    }
  }
  .create-view {
    box-sizing: border-box;
    padding: 0 20px;
    background: #ffffff;
    .create-icon {
      width: 100%;
      height: 36px;
      background: #eeeeee;
      margin-bottom: 36px;
      line-height: 36px;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 0 10px 10px;
  }

  .state-icon {
    margin-top: 28px;
    background: #ffffff;
  }
  .pay-result {
    color: #333333;
    font-size: 20px;
    line-height: 20px;
    margin: 16px 0 10.5px;
    font-weight: bold;
  }
  .pay-tip {
    color: #333333;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 48px;
  }
  .pay-info-view {
    background: #ffffff;
    padding: 0 10px 16px;
    box-sizing: border-box;
    .info-title {
      padding-bottom: 7.5px;
      display: flex;
      justify-content: space-between;
      position: relative;
      box-sizing: border-box;
      .info-label {
        font-size: 16px;
        color: #333333;
      }
      .info-value {
        font-size: 16px;
        color: #41a8ff;
      }
    }
    .info-title::after {
      border-bottom: 1px solid #d2d2d2;
    }
    .item-title {
      background: #f7f7f7;
      margin-top: 16px;
      height: 20px;
      margin-bottom: 8px;
      color: #333333;
      font-size: 14px;
    }
    .info-item {
      margin-bottom: 20px;
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
    .info-item:last-of-type {
      margin-bottom: 0;
    }
  }
  .family-info {
    padding-bottom: 0;
    .info-item:last-of-type {
      padding-bottom: 16px;
      border-bottom: 0.5px solid #ededed;
    }
  }
  .show-view {
    background: #ededed;
    margin: 0 10px;
    box-sizing: border-box;
    text-align: center;
    .create-icon {
      width: 100%;
      height: 32px;
      background: #eeeeee;
      line-height: 32px;
    }
  }
}
</style>
