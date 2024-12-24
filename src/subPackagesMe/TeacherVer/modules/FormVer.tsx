/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useRef } from "@tarojs/taro";
import { AtButton, AtInput, AtList, AtListItem, AtRadio } from "taro-ui";

import { View } from "@tarojs/components";
import "../index.scss";
import { getTeacherVerService } from "../services";
import { showSuccessToast } from "@/utils/util";

const defaultForm: { [key: string]: any } = {};

const TeacherVer = () => {
  const [form, setForm] = useState(defaultForm);
  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm(params => {
      return { ...params, ...opt };
    });
  };

  const handleCancel = () => {
    Taro.navigateBack({
      delta: 1,
      success: function (res) { },
    });
    return;
  };

  const handleToSign = () => {
    console.log(form)
    getTeacherVerService({ ...form }).then((d) => {
      showSuccessToast("提交成功");
      Taro.setStorage({ key: 'teacherToken', data: d.token });
    })
  }
  return (
      <View>
        <View className="at-row  at-row__align--center teacherVer-form-item">
          <View className="at-col at-col-3 teacherVer-label jb-text">手机号:</View>
          <View className="at-col">
            <AtInput
              className="teacherVer-input"
              name="phone"
              value={form.phone}
              onChange={e => handleUpdateForm({ phone: e })}
            />
          </View>
        </View>
        <View className="at-row  at-row__align--center teacherVer-form-item">
          <View className="at-col at-col-3 teacherVer-label jb-text">密码:</View>
          <View className="at-col">
            <AtInput
              className="teacherVer-input"
              name="password"
              value={form.password}
              onChange={e => handleUpdateForm({ password: e })}
            />
          </View>
        </View>
        <View style={{ height: ' 20px' }}></View>
        <View className='edit-btn-wrap'>
          <View className='at-row at-row__justify--around'>
            <View className='at-col at-col-5'>
              <AtButton size='small' circle onClick={handleCancel}>
                取消
              </AtButton>
            </View>
            <View className='at-col at-col-5'>
              <AtButton type='primary' circle size='small' onClick={handleToSign} >
                确定
              </AtButton>
            </View>

          </View>

        </View>
        <View style={{ height: ' 20px' }}></View>
      </View>
  );
};

export default TeacherVer;
