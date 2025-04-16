import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取订单列表信息
 */
export const getOrderList = (data) => request.get(Api.getuserxlprebooklist, data);
export const getUserxlprebookchlist = (data) => request.get(Api.userxlprebookchlist, data);
export const postXlPreOrder = (data) => request.post(Api.userxlprebook, data);
