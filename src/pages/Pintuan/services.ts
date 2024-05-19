/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:23
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-09 22:45:12
 * @FilePath: /zulinV3.1/src/pages/Lease/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 
 * @param payload  17.  加入预约prebookjoin
 * @returns 
 */
export const postPrebookjoin = (data) => request.post(Api.prebookjoin, data);

/**
 * 
 * @param payload 
 * @returns 
 */
export const getPrebookjoinList = () => request.get(Api.prebookjoinList);


export default {};
