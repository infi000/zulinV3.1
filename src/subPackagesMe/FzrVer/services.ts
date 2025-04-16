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

export const getCheckCheckbaselistService = (payload: any) => request.get(Api.checkCheckbaselist, payload);
export const getCheckCheckedlistService = (payload: any) => request.get(Api.checkCheckedlist, payload);
export const getCheckCheckAddService = (payload: any) => request.get(Api.checkCheckAdd, payload);
export const getCheckCheckmodifyService = (payload: any) => request.get(Api.checkCheckmodify, payload);
export const getTeadetailbytokenService = (payload: any) => request.get(Api.teadetailbytoken, payload);

export const getTeacherVerService = (payload: any) => request.get(Api.getTeacherVer, payload);

export default {};
