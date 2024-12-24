/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:54:39
 * @FilePath: /zulin/src/subPackagesMe/UserInfoManage/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';

export const getTeacherVerService = (payload: any) => request.get(Api.getTeacherVer, payload);
export const getTeacurstatusmodifyService = (payload: any) => request.post(Api.getTeacurstatusmodify, payload);
export const getTeacurstatusService = (payload: any) => request.post(Api.getTeacurstatus, payload);
export const getTeaworklistService = (payload: any) => request.post(Api.getTeaworklist, payload);
export const getTeaorderlistService = (payload: any) => request.post(Api.getTeaorderlist, payload);
export const getTeaordercancleService = (payload: any) => request.post(Api.teaordercancle, payload);
export const getTeaorderconService = (payload: any) => request.post(Api.teaordercon, payload);
export const getTeaorderendService = (payload: any) => request.post(Api.teaorderend, payload);
export const getTeaordercompleteService = (payload: any) => request.post(Api.teaordercomplete, payload);


export default {};
