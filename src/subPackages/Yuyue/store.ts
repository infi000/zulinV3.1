/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-11-28 00:10:44
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-28 00:10:57
 * @FilePath: /zulinV3.1/src/subPackages/yuyue/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { getExperimentDetailService } from './services';
const PAGE_LEN = 20; // 每页个数

interface IState {
  experimentsDetail: any;

}

const defaultState: IState = {
  experimentsDetail: {},
};

export default {
  namespace: 'yuyue',
  state: defaultState,
  reducers: {

    updateExperimentsDetail: (state: IState, { payload }) => {
      state.experimentsDetail = payload;
    },
  },
  effects: {
    *getExperimentDetail(_, { all, call, put }) {
      const { payload } = _;
      const res = yield call(getExperimentDetailService, { ...payload});
      console.log("asadasdasdas",res);
      yield put({ type: 'updateExperimentsDetail', payload: res });
    },

  },
};
