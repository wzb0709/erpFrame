
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history:'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: '捷径旅服erp',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
