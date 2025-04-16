/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect } from "@tarojs/taro";
import { AtButton, AtImagePicker, AtInput } from "taro-ui";
import Api from '@/config/api';

import { View } from "@tarojs/components";
import "../index.scss";
// import { getTeaorderconService } from "../services";
import { showErrorToast, showSuccessToast } from "@/utils/util";
import { getCheckCheckAddService, getCheckCheckmodifyService } from "../services";

const defaultForm: { [key: string]: any } = {};

interface IProps {
  cancel: any;
  cbid?: any; // 检查内容id
  cid: any; // 检查记录id
  data: any
}


const EditeFzr = (props: IProps) => {
  const { cancel, cbid, cid, data } = props;
  const [form, setForm] = useState(defaultForm);

  console.log('formform', form)
  useEffect(() => {
    const formatd:any = {};
    if(data.checkstatus){
      formatd.checkstatus = data.checkstatus;
    }
    if(data.checkedimg){
      formatd.checkedimg = [{ url: data.checkedimg }];
    }
    if(data.remark){
      formatd.remark = data.remark;
    }
    setForm(formatd)
  }, []);

  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm(params => {
      return { ...params, ...opt };
    });
  };

  const handleSubmit = () => {

    const token = Taro.getStorageSync('fzrToken');
    const value = Taro.getStorageSync('wxUserInfo');

    const { remark = '', checkstatus, checkedimg } = form;

    if(Array.isArray(checkedimg) && checkedimg.length > 1){
      showErrorToast('只可上传一张图片')
      return
    }
    let openid = '';
    if (value) {
      openid = value.openid;
    }
    const params: any = {
      remark,
      checkstatus,
      token
    }
    if (cid) {
      // 编辑
      params.cid = cid;
      if (Array.isArray(checkedimg) && checkedimg.length > 0) {
        Taro.uploadFile({
          url: Api.checkCheckmodify,
          filePath: checkedimg[checkedimg.length - 1].url,
          name: 'checkedimg',
          formData: {
            openid,
            ...params
          },
          success: (res) => {
            showSuccessToast("提交成功");
            cancel();
          },
        })
      } else {
        getCheckCheckmodifyService(params).then(res => {
          showSuccessToast("提交成功");
          cancel();
        })
      }
    }
    if (cbid) {
      // 新增
      params.cbid = cbid;
      if (Array.isArray(checkedimg) && checkedimg.length > 0) {
        Taro.uploadFile({
          url: Api.checkCheckAdd,
          filePath: checkedimg[checkedimg.length - 1].url,
          name: 'checkedimg',
          formData: {
            openid,
            ...params
          },
          success: (res) => {
            showSuccessToast("提交成功");
            cancel();
          },
        })
      } else {
        getCheckCheckAddService(params).then(res => {
          showSuccessToast("提交成功");
          cancel();
        })
      }

    }
    console.log('params', params)
  };


  return (
    <View className="order-wrap">
      <View className='at-row  at-row__align--center userinfo-form-item'>
        <View className='at-col at-col-3 userinfo-label jb-text'>状态</View>
        <View className='at-row  at-row__align--center fzr-form-item'>
          <View onClick={() => handleUpdateForm({ checkstatus: '1' })} className={form.checkstatus == 1 ? "fzr-status-sbtn fzr-status-sbtn-choosed" : "fzr-status-sbtn"}>
            正常
          </View>
          <View onClick={() => handleUpdateForm({ checkstatus: '2' })} className={form.checkstatus == 2 ? "fzr-status-sbtn fzr-status-sbtn-choosed" : "fzr-status-sbtn"}>
            非正常
          </View>
        </View>
      </View>
      <View className='at-row  at-row__align--center userinfo-form-item'>
        <View className='at-col at-col-3 userinfo-label jb-text'>图片</View>
        <View className='at-col'>
          {/* <Uploader count={1} uploadSucc={(e) => handleUpdateForm({ checkedimg: e })} imgtype='bigimg' /> */}
          <AtImagePicker
            multiple={false}
            showAddBtn={Array.isArray(form.checkedimg) && form.checkedimg.length > 1 ? false : true}
            files={form.checkedimg || []}
            onChange={(f) => handleUpdateForm({ checkedimg: f })}
          />
        </View>
      </View>
      <View className='at-row  at-row__align--center userinfo-form-item'>
        <View className='at-col at-col-3 userinfo-label jb-text'>描述</View>
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

export default EditeFzr;
