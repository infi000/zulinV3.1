/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:23
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-11-14 00:11:45
 * @FilePath: /zulinV3.1/src/pages/Lease/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 	2.  实验项目详细信息experimentdetail
Lease/experimentdetail
必需参数：
eid:实验项目id

 */
export const getExperimentDetailService = (payload: { eid: string }) => request.get(Api.experimentDetail, payload);

/**
 * 
 * @param payload 获取房间
 * @returns 
 */
export const getEquipmentsService = (data) => request.post(Api.leaseEquipments, data);

/**
 * 
 * @param payload 获取工具箱
 * @returns 
 */
export const getToolsService = (data) => request.get(Api.leaseToolboxs, data);

/**
 * 
 * @param payload 获取工具箱
 * @returns 
 */
export const getToolService = (data) => request.get(Api.leaseToolbox, data);

/**
 * 
 * @param payload 获取房间已预约时间段
 * @returns 
 */
export const getEquipmentBookTimes = (data) => request.get(Api.leaseEquipmentbooktimes, data);

/**
 * 
 * @param payload 创建订单
 * @returns 
 */
export const orderadd = (data) => request.post(Api.leaseOrderadd, data);

/**
 * 
 * @param payload 取实验项目名称列表
 * @returns 
 */
export const getExperimentnames = () => request.post(Api.experimentnames);


/**
 * 
 * @param payload 实验项目下小分类列表
 * @returns 
 */
export const getExperimentcategorys = (data) => request.post(Api.experimentcategorys, data);

/**
 * 
 * @param payload 获取老师的状态teastatuslist

 * @returns 
 */
export const getTeacherStatusList = (data) => request.post(Api.getTeacherStatusList, data);

/**
 * 
 * @param payload 获取老师列表

 * @returns 
 */
export const getTeachersList = (data) => request.post(Api.getTeacherSList, data);


export default {};
