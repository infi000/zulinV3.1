/*
 * @Author: infi000_at_home 113079767@qq.com
 * @Date: 2024-08-24 22:44:22
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-08-24 23:59:58
 * @FilePath: \zulinV3.1\src\pages\LeaseListV2\Services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取预约列表信息
 */
export const getListData = (data) => request.get(Api.leaseExperiments, data);

/**
 * 
 * @param payload 实验项目下小分类列表
 * @returns 
 */
export const getExperimentcategorys = (data) => request.post(Api.experimentcategorys, data);

export default {};