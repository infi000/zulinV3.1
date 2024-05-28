/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-26 10:32:19
 * @FilePath: /zulinV3.1/src/components/Tabbar/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-26 21:53:35
 * @FilePath: /zulinV3.1/src/components/Tabbar/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import delay from '@/utils/delay';
// import { liwu, liwu_s, wode, wode_s } from '@/static/images';
import {btn_shouye2,btn_pinpai, btn_shequ,yydd, btn_wode, yue_s, me, me_s } from '@/static/images';
import { ROUTER_NAME_MAP } from '@/constants/index';

export default {
  namespace: 'tabbar',
  state: {
    nav: [
      {
        title: '首页',
        // type: ROUTER_NAME_MAP.goodGoods,
        type: ROUTER_NAME_MAP.index,
        image: btn_shouye2,
        selectedImage: btn_shouye2,
      },
      {
        title: '预约',
        type: ROUTER_NAME_MAP.reserve,
        image: yydd,
        selectedImage: yydd,
      },
      {
        title: '视频',
        type: ROUTER_NAME_MAP.shipin,
        image: btn_pinpai,
        selectedImage: btn_pinpai,
      },
      {
        title: '我的',
        type: ROUTER_NAME_MAP.me,
        image: btn_wode,
        selectedImage: btn_wode,
      },
    ],
    currentNavIndex: 0,
  },
  reducers: {
    updateNav: (state, { payload }) => {
      state.nav = payload;
    },
    updateCurrentNavIndex: (state, { payload }) => {
      state.currentNavIndex = payload;
    },
  },
  effects: {
    *asyncAdd(_, { all, call, put }) {
      yield call(delay, 2000); //增加延迟测试效果

      yield put({ type: 'add' });
    },
  },
};
