/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-01-08 00:01:57
 * @FilePath: /zulinV3.1/src/pages/GoodGoods/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取商品类型
 */
export const getAllCtype = ((payload:any) => request.get(Api.goodsAllCtype, payload);
/**
 * 商品搜索 返回商品列表
 */
export const getSearchGoods = (payload: ISearchGoodsParams) => request.get(Api.searchGoods, payload);


/**
 * 	29.	搜索分类集合
 * @param payload 
 * @param payload.ctype  显示位置，1顶部显示，2中部显示
 */
export const getClassifySearch = (payload: { ctype: 1|2 }) => request.get(Api.getClassifySearch, payload);


/**
 * 	获取需要跳转抽奖页面的id
 */
export const getChoujiangId = () => request.get(Api.choujiangId);

export default {};
