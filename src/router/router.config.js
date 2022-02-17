/**
 * 基础路由
 * @type { *[] }
 */
const loginRouter = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '学生登录'
    }
  },
  {
    path: '/telephone',
    name: 'telephone',
    component: () => import('@/views/telephone/telephone.vue'),
    meta: {
      title: '手机验证'
    }
  },
];
const registerRouter = [
  {
    path: '/register',
    name: 'register',
    redirect: '/register/pay',
    component: () => import('@/views/register/index.vue'),
    meta: {
      title: '新生注册'
    },
    children: [
      {
        path: '/register/pay',
        name: 'payCost',
        component: () => import('@/views/register/payCost.vue'),
        meta: {
          title: '费用缴费'
        }
      },
      {
        path: '/register/fill',
        name: 'fill',
        component: () => import('@/views/register/infomationFill.vue'),
        meta: {
          title: '信息填报'
        }
      },
      {
        path: '/register/instructions',
        name: 'instructions',
        component: () => import('@/views/register/instructions.vue'),
        meta: {
          title: '新生须知'
        }
      }
    ]
  },
  {
    name: 'pay',
    path: '/pay',
    component: () => import('@/views/pay/index.vue'),
    meta: {
      title: '二维码支付'
    }
  }
];
const queryInfomationRouter = [
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: () => import('@/views/queryInfomation/orderInfo.vue'),
    meta: {
      title: '缴费详情'
    }
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/queryInfomation/admission.vue'),
    meta: {
      title: '录取结果'
    }
  },
];
export default [...loginRouter, ...registerRouter, ...queryInfomationRouter]
