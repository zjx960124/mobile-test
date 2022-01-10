<template>
  <div class="home">
    <div>
      <van-button type="primary" @click="login">登录</van-button>
    </div>
    <div class="wrapper" @click.stop v-show="show">
      <div class="canvas-view">
        <div class="vimg" id="vimg">
          <canvas id="sliderBlock"></canvas>
          <canvas id="codeImg"></canvas>
        </div>
        <div class="slider">
          <div class="track" :class="{ pintuTrue: puzzle }">
            {{ tips }}
          </div>
          <div class="button el-icon-s-grid" @touchstart.prevent="drag"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        show: false,
        puzzle: true,
        tips: "拖动左边滑块完成上方拼图",
        slider: {
          mx: 0,
          bx: 0
        },
      }
    },
    mounted() {
    },
    methods: {
      login() {
        this.show = true;
        this.canvasInit();
      },
      canvasInit() {
        //生成指定区间的随机数
        const random = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1) + min);
        };
        let mainDom = document.querySelector("#codeImg");
        let width = mainDom.width;
        //x: 254, y: 109
        let mx = random(127, width - 50),
          bx = random(10, 128);
        this.slider = { mx, bx };
        this.draw(mx, bx, 55);
      },
      draw(mx, bx, y) {
        let mainDom = document.querySelector("#codeImg");
        let bg = mainDom.getContext("2d");
        let width = mainDom.width;
        let height = mainDom.height;

        let blockDom = document.querySelector("#sliderBlock");
        let block = blockDom.getContext("2d");

        // 赋值，绘制canvas
        blockDom.width = width;
        mainDom.width = width;
        blockDom.heitght = height;
        mainDom.height = height;

        let imgSrc = require("../assets/img.png");
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
          if (x >= 340 || x <= 0) return false;
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
              this.show = false;
            }, 500);
          } else {
            console.log("拼图位置不正确");
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
  .home {
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh;
    position: relative;
    .wrapper {
      width: 100%;
      height: inherit;
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      .vimg {
        width: 100%;
        height: 155px;
        position: relative;
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
        height: 65px;
        border-bottom: #c7c9d0 1px solid;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .track {
          margin-left: 7px;
          width: 286px;
          height: 38px;
          background: rgba(28, 136, 188, 0.5);
          border-radius: 25px;
          font-size: 6px;
          line-height: 38px;
          padding-right: 15px;
          padding-left: 70px;
        }
        .pintuTrue {
          background: #67c23a;
          color: #ffffff;
        }
        .button {
          position: absolute;
          width: 50px;
          height: 50px;
          line-height: 48px;
          font-size: 12px;
          background: #ffffff;
          box-shadow: #b9bdc8 0 0 3px;
          border-radius: 50%;
          left: 7px;
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
