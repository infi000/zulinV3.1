/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-09-01 22:55:14
 * @FilePath: /zulin/src/store/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import { getWindowHeight } from '../utils/app';
import { showToast } from '../utils/util';
import { getUserInfo, getMeInfo } from './services';

export default {
  namespace: 'main',
  state: {
    windowHeight:getWindowHeight(),
    isLogIn:false,
    wxUserInfo:{},
    openid:'',
    yuYueTabIndex: '',
    userInfo: {
      // ut: 1不可验票，2可验票
    }
  },
  reducers: {
    updateIsLogIn: (state, {payload}) =>{
      state.isLogIn = payload;
    },
    updateWxUserInfo: (state, { payload }) => {
      state.wxUserInfo = payload;
    },
    updateOpenid: (state, { payload }) => {
      state.openid = payload;
    },
    updateUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    updateYuyueTabIndex: (state, { payload }) => {
      state.yuYueTabIndex = payload;
    },
  },
  effects: {
    *getUserInfo({}, { call, put, select }) {
      const res = yield call(getUserInfo);
      const res2 = yield call(getMeInfo);
      //  verify: 1审核通过
      const { verify } = {...res2, ...res};
      yield put({ type: 'updateUserInfo', payload: {...res, ...res2} });
      // TODO 暂时删除
      if( verify !== '1'){
        setTimeout(() => {
          Taro.navigateTo({ url: "/subPackagesMe/UserInfoManage/index" }).then(r => {
            showToast('请先完善个人信息提交审核', 4000)
          });
        }, 500);
      }
    },
  }
};
