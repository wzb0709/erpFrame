export default
  [
    {
      title: '产品中心',
      icon:'appstore',
      id:1,
      path:'product',
      children: [{
        title: '产品列表',
        children: [],
        id:2,
        path:'list',
      }],
    },
    {
      title: '供应商中心',
      icon:'shopping',
      id:3,
      path:'order',
      children: [{
        title: '供应商列表',
        children: [],
        path:'list',
        id:4,
      }],
    },
    {
      title: '会员中心',
      icon:'user',
      id:5,
      path:'member',
      children: [{
        title: '会员列表',
        children: [],
        path:'list',
        id:6,
      }],
    },
    {
      title: '目的地',
      icon:'apartment',
      id:7,
      path:'distribution',
      children: [{
        title: '目的地列表',
        children: [],
        path:'list',
        id:8,
      }],
    },
    {
      title: '系统管理',
      icon:'desktop',
      path:'system',
      id:13,
      children: [{
        title: '用户管理',
        children: [],
        path:'member',
        id:16,
      }],
    },
  ]

