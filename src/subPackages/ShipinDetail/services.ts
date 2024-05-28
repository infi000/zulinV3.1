/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:23
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-26 10:01:35
 * @FilePath: /zulinV3.1/src/pages/Lease/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';


/**
 * 
 * @param payload 取实验项目名称列表
 * @returns 
 */
export const getExperimentnames = () => request.post(Api.experimentnames);


/**
 * 
 * @param payload experimentvideos
 * @returns 
 */
export const getExperimentvideos = (data) => request.post(Api.experimentvideos, data);



/**
 * 
 * @param payload experimentvideos
 * @returns 
 */
export const getExperimentvideodetail = (data) => request.post(Api.experimentvideodetail, data);


export default {};
