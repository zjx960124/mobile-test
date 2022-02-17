<template>
  <div class="wrapper">
    <div class="canvas-view">
      <div class="title">
        <span>安全验证</span>
        <van-icon @click="close" name="cross" size="24" color="#000000"/>
      </div>
      <div class="vimg" id="vimg">
        <canvas ref="sliderBlock" id="sliderBlock"></canvas>
        <canvas ref="codeImg" id="codeImg"></canvas>
      </div>
      <div class="slider">
        <div class="track" :class="{ pintuTrue: puzzle }">
          {{ tips }}
        </div>
        <div class="button el-icon-s-grid" @touchstart.prevent="drag"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Validation",
    data() {
      return {
        puzzle: true,
        onClose: null,
        onSuccess: null,
        tips: "拖动滑块完成上方拼图",
        slider: {
          mx: 0,
          bx: 0
        },
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.canvasInit();
      });
    },
    methods: {
      close() {
        this.onClose(this);
        this.$emit('close')
        this.$el.parentNode.removeChild(this.$el)
      },
      success() {
        this.$emit('success');
        this.onSuccess(this);
        this.$el.parentNode.removeChild(this.$el)
      },
      canvasInit() {
        //生成指定区间的随机数
        const random = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1) + min);
        };
        let mainDom = document.querySelector("#codeImg") || this.$refs.codeImg;
        let width = mainDom.width;
        //x: 254, y: 109
        let mx = random(158, width - 50),
          bx = random(50, 55);
        this.slider = { mx, bx };
        this.draw(mx, bx, 55);
      },
      draw(mx, bx, y) {
        let mainDom = document.querySelector("#codeImg") || this.$refs.codeImg;
        let bg = mainDom.getContext("2d");
        let width = mainDom.width;
        let height = mainDom.height;

        let blockDom = document.querySelector("#sliderBlock") || this.$refs.sliderBlock;
        let block = blockDom.getContext("2d");

        // 赋值，绘制canvas
        blockDom.width = width;
        mainDom.width = width;
        blockDom.heitght = height;
        mainDom.height = height;

        let imgSrc = require("../../assets/img.png");
        let img = document.createElement("img");
        img.style.objectFit = "scale-down";
        img.src = imgSrc;
        img.onload = function () {
          bg.drawImage(img, 0, 0, width, height);
          block.drawImage(img, 0, 0, width, height);
        };

        let mainxy = { x: mx, y: y, r: 9 };
        let blockxy = { x: bx, y: y, r: 9 };
        this.drawBlock(block, mainxy, "clip");
        this.drawBlock(bg, mainxy, "fill");
        blockDom.style.left = -(mainxy.x - blockxy.x) + 'px';
      },
      //绘制拼图
      drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
        let x = xy.x,
          y = xy.y,
          r = xy.r,
          l = 40;
        let PI = Math.PI;
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
        ctx.lineTo(x + l, y)
        ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
        ctx.lineTo(x + l, y + l)
        ctx.lineTo(x, y + l)
        ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
        ctx.lineTo(x, y)
        // ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.stroke();
        ctx.globalCompositeOperation = 'xor';
        // ctx.fill();
        type === 'fill'? ctx.fill() : ctx.clip()
      },
      //鼠标按下
      drag(e) {
        // console.log("鼠标按下", e);
        let dom = e.target; //dom元素
        let slider = document.querySelector("#sliderBlock"); //滑块dom
        const downCoordinate = { x: e.touches[0].pageX, y: e.touches[0].pageY };

        //正确的滑块数据
        let checkx = Number(this.slider.mx) - Number(this.slider.bx);
        //x轴数据
        let x = 0;
        const move = moveEV => {
          x = moveEV.touches[0].pageX - downCoordinate.x;
          //y = moveEV.y - downCoordinate.y;
          if (x >= 200 || x <= 0) return false;
          dom.style.left = x + "px";
          //dom.style.top = y + "px";
          slider.style.left = x + -(this.slider.mx - this.slider.bx) +  "px";
        };

        const up = () => {
          document.removeEventListener("touchmove", move);
          document.removeEventListener("touchend", up);
          dom.style.left = "";
          let max = checkx + 10;
          let min = checkx - 10;
          //允许正负误差1
          if ((max >= x && x >= min) || x === checkx) {
            console.log("滑动解锁成功");
            this.puzzle = true;
            this.tips = "验证成功";
            setTimeout(() => {
              this.success();
            }, 500);
          } else {
            this.tips = "验证失败，请重试";
            this.puzzle = false;
            slider.style.left = '0px';
            this.canvasInit();
          }
        };

        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", up);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .4);
    display: flex;
    align-items: center;
    .canvas-view {
      width: 280px;
      height: 283px;
      margin: auto;
      box-sizing: border-box;
      padding: 11px 15px 15px;
      background: #FFFFFF;
      .title {
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #A0A0A0;
        display: flex;
        justify-content: space-between;
        span {
          color: #4BA8FA;
          font-size: 18px;
        }
      }
      .vimg {
        width: 100%;
        height: 140px;
        position: relative;
        margin: 16px 0;
        #codeImg,
        #sliderBlock {
          /*padding: 7px 7px 0 7px;*/
          width: inherit;
          height: inherit;
          position: absolute;
          left: 0;
          top: 0;
        }
        #codeImg {
          //display: none;
        }
        #sliderBlock {
          position: absolute;
          z-index: 4000;
        }
      }
      .slider {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        margin-bottom: 9px;
        .track {
          margin-left: 7px;
          width: 100%;
          height: 44px;
          background: #F0F0F0;
          line-height: 44px;
          border-radius: 4px;
          text-align: center;
        }
        .pintuTrue {
          background: #F0F0F0;
          color: #A0A0A0;
        }
        .button {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 4px;
          line-height: 48px;
          font-size: 12px;
          background: #ffffff;
          box-shadow: #b9bdc8 0 0 3px;
          left: 0;
          text-align: center;
          color: #3e5d8b;
          &:hover {
            color: #2181bd;
          }
        }
      }
    }
  }
</style>
