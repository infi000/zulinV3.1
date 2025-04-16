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

import { Picker, View, Image } from "@tarojs/components";
import "../index.scss";
import { getTeacherVerService, getTeacurstatusmodifyService, getTeacurstatusService } from "../services";
import { showSuccessToast } from "@/utils/util";
import { tea_dstatus } from "@/constants/index";

const defaultForm: { [key: string]: any } = {};



const TeacherCon = () => {
  const [form, setForm] = useState(defaultForm);

  const [teacherStatus, setTeacherStatus] = useState<any>({});

  const handleGetStatus = () => {
    const token = Taro.getStorageSync('teacherToken');
    getTeacurstatusService({ token }).then(res => {
      setTeacherStatus(res)
    })
  }

  useEffect(() => {
    handleGetStatus()
  }, [])

  useDidShow(() => {
    handleGetStatus()
  })


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
    const { startDay, startTime, endDay, endTime, ...rest } = form;
    const starttime = `${startDay} ${startTime}`;
    const endtime = `${endDay} ${endTime}`;
    const token = Taro.getStorageSync('teacherToken');
    const params = { ...rest, starttime, endtime, token };
    getTeacurstatusmodifyService(params).then(res => {
      showSuccessToast("修改成功");
      handleGetStatus
    })
  }

  return (
    <View>
      <View>

        <View className='at-row  at-row__align--center tea-form-item'>
          {/* 空闲 */}
          <View className={form.status ==0 ?"tea-status-sbtn tea-status-sbtn-choosed": "tea-status-sbtn"}>
            <Image
              onClick={() => handleUpdateForm({ status: '0' })}
              mode='aspectFill'
              style='width: 100%;height: 100%;'
              src={'https://api.lifestylelightseeker.com/Public/Web/status1.png'} />
          </View>
          {/* 忙碌 */}
          <View  className={form.status ==1 ?"tea-status-sbtn tea-status-sbtn-choosed": "tea-status-sbtn"}>
            <Image
              onClick={() => handleUpdateForm({ status: '1' })}
              mode='aspectFill'
              style='width: 100%;height: 100%;'
              src={'https://api.lifestylelightseeker.com/Public/Web/status2.png'} />
          </View>
          {/* 休假 */}
          <View  className={form.status ==2 ?"tea-status-sbtn tea-status-sbtn-choosed": "tea-status-sbtn"}>
            <Image
              onClick={() => handleUpdateForm({ status: '2' })}
              mode='aspectFill'
              style='width: 100%;height: 100%;'
              src={'https://api.lifestylelightseeker.com/Public/Web/status3.png'} />
          </View>
        </View>
        <View className='at-row  at-row__align--center tea-form-item'>
          <View className='at-col at-col-3 userinfo-label jb-text'>开始时间日期:</View>
          <View className='at-col'>
            <Picker mode='date' onChange={(e: any) => handleUpdateForm({ startDay: e.target.value })} value={form.startDay}>
              <AtList>
                <AtListItem extraText={form.startDay} />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className='at-row  at-row__align--center tea-form-item'>
          <View className='at-col at-col-3 userinfo-label jb-text'>开始时分:</View>
          <View className='at-col'>
            <Picker mode='time' onChange={(e: any) => handleUpdateForm({ startTime: e.target.value })} value={form.startTime}>
              <AtList>
                <AtListItem extraText={form.startTime} />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className='at-row  at-row__align--center tea-form-item'>
          <View className='at-col at-col-3 userinfo-label jb-text'>结束时间日期:</View>
          <View className='at-col'>
            <Picker mode='date' onChange={(e: any) => handleUpdateForm({ endDay: e.target.value })} value={form.endDay}>
              <AtList>
                <AtListItem extraText={form.endDay} />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className='at-row  at-row__align--center tea-form-item'>
          <View className='at-col at-col-3 userinfo-label jb-text'>结束时分:</View>
          <View className='at-col'>
            <Picker mode='time' onChange={(e: any) => handleUpdateForm({ endTime: e.target.value })} value={form.endTime}>
              <AtList>
                <AtListItem extraText={form.endTime} />
              </AtList>
            </Picker>
          </View>
        </View>
        <View style={{ height: ' 20px' }}></View>
        <View className='edit-btn-wrap'>
          <View className='at-row at-row__justify--around'>

            <View className='at-col'>
              <AtButton type='primary' circle size='small' onClick={handleToSign} >
                确定
              </AtButton>
            </View>

          </View>

        </View>
        <View style={{ height: ' 20px' }}></View>
      </View>


    </View>
  );
};

export default TeacherCon;
