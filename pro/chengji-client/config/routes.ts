export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/user',
  //       routes: [
  //         {
  //           name: 'login',
  //           path: '/user/login',
  //           component: './User/login',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: '/login',
    name: 'login',
    // icon: 'smile',
    component: './login/index',
  },
  {
    path: '/adminRegister',
    name: 'adminRegister',
    // icon: 'smile',
    component: './adminRegister',
  },
  {
    path: '/',
    name: 'adminRegister',
    // icon: 'smile',
    component: './adminRegister',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
