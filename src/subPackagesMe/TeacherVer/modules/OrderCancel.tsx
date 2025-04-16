/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useRef, useDidShow } from "@tarojs/taro";
import { AtButton, AtInput, AtList, AtListItem, AtRadio } from "taro-ui";

import { Picker, View } from "@tarojs/components";
import "../index.scss";
import { getTeacherVerService, getTeacurstatusmodifyService, getTeaordercancleService, getTeaorderlistService } from "../services";
import { showSuccessToast } from "@/utils/util";
import { status_map } from "../constants";

const defaultForm: { [key: string]: any } = {};

interface IProps {
  cancel: any;
  puid:any;
}


const OrderCancel = (props: IProps) => {
  const { cancel, puid } = props;
  const [form, setForm] = useState(defaultForm);
  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm(params => {
      return { ...params, ...opt };
    });
  };

  const handleSubmit = () => {
    const token = Taro.getStorageSync('teacherToken');

    const params = {
      puid,
      remark: form.remark,
      token
    }
    getTeaordercancleService(params).then(res => {
      showSuccessToast("取消成功");
      cancel();
    })
    console.log('params', params)
  };


  return (
    <View className="cancel-order-wrap">
      <View className='at-row  at-row__align--center userinfo-form-item'>
        <View className='at-col at-col-3 userinfo-label jb-text'>原因说明:</View>
        <View className='at-col'>
          <AtInput
            className='no-bg-input'
            name='remark'
            value={form.remark}
            onChange={(e) => handleUpdateForm({ remark: e })}
          />
        </View>
      </View>
      <View style={{ height: ' 20px' }}></View>
        <View className='edit-btn-wrap'>
          <View className='at-row at-row__justify--around'>
            <View className='at-col at-col-5'>
              <AtButton size='small' circle onClick={cancel}>
              返回
              </AtButton>
            </View>
            <View className='at-col at-col-5'>
              <AtButton type='primary' circle size='small' onClick={handleSubmit} >
              提交
              </AtButton>
            </View>

          </View>
        </View>
        <View style={{ height: ' 20px' }}></View>
    </View>
  );
};

export default OrderCancel;
