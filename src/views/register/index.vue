<template>
  <div class="register-view">
    <step
      class="step-view"
      :step-list="stepList"
      :active="active"
      :step-click="true"
      @itemClick="stepItemClick"
    >
      <div class="group-btn" v-if="active > 0">
        <template v-for="item in stepList.length">
          <div :key="item">
            <van-button
              class="look-btn"
              plain
              color="#F16041"
              type="primary"
              @click="routerJump(item)"
              :style="{ opacity: item - 1 < active ? '1' : '0' }"
              >查看</van-button
            >
          </div>
        </template>
      </div>
    </step>
    <router-view></router-view>
  </div>
</template>

<script>
import Step from "../../components/step/step";
export default {
  name: "Register",
  components: { Step },
  data() {
    return {
      stepList: ['费用缴纳', '信息填报', '新生须知'],
      routerLink: ['/register/pay', '/register/fill', '/register/instructions'],
      active: 0,
      checked: false,
    }
  },
  watch: {
    '$route.path': function (newVal) {
      this.active = this.routerLink.indexOf(newVal)
    }
  },
  mounted() {
    this.active = this.routerLink.indexOf(this.$route.path)
  },
  methods: {
    stepItemClick(index, data) {
      this.active = index;
      this.$router.push(this.routerLink[index]);
    },
    routerJump(index) {
      this.$router.push(this.routerLink[index - 1]);
    }
  }
}
</script>

<style lang="scss" scoped>
.register-view {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .step-view {
    background: #f7f7f7;
    margin-top: 16px;
    ::v-deep .group-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .look-btn {
        width: 60px;
        height: 24px;
        border-radius: 12px;
        font-size: 12px;
        background: #fff8f7;
        margin-bottom: 16px;
        margin-top: 9.5px;
      }
    }
  }
}
</style>
