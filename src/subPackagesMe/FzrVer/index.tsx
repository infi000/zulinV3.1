/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useRef, useDidShow, useMemo } from '@tarojs/taro';
import { AtButton, AtInput, AtList, AtListItem, AtRadio, AtTabs, AtTabsPane } from 'taro-ui';
import { View, Image, Block } from '@tarojs/components';
import './index.scss';
import FormVer from './modules/FormVer';
import FzrHome from './modules/FzrHome';
import { getTeadetailbytokenService } from './services';
import CheckOpen from './modules/CheckOpen';

const defaultForm: { [key: string]: any } = {};

type TConType = '认证表单' | '负责人主页' | '开店检查' | '闭店检查';
const FzrVer = () => {
  var fzrToken = Taro.getStorageSync('fzrToken');
  const [showCon, setShowCon] = useState<TConType>('负责人主页');
  const [teacherInfo, setTeacherInfo] = useState<any>([]);

  const handleChange = (key: any) => {
    setShowCon(key);
  };

  const handleDetail = () => {
    const token = Taro.getStorageSync('fzrToken');
    if (token) {
      getTeadetailbytokenService({ token })
        .then(res => {
          setTeacherInfo(res || {});
        })
        .catch(err => {
          Taro.setStorage({ key: 'fzrToken', data: '' });
          setShowCon('认证表单');
        });
    }
  };

  const handleLogout = () => {
    Taro.navigateBack({
      delta: 1,
      success: function(res) {
        Taro.setStorage({ key: 'fzrToken', data: '' });
      },
    });
  };

  // useDidShow(() => {
  //   setShowCon(fzrToken ? '负责人主页' : '认证表单')
  //   handleDetail();
  // })
  useEffect(() => {
    setShowCon(fzrToken ? '负责人主页' : '认证表单');
    handleDetail();
  }, [fzrToken]);

  return (
    <View className='fzrVer-wrap fzr-bg'>
      {showCon === '认证表单' && (
        <Block>
          <View className='fzrVer-box-wrap'>
            <FormVer changeTab={handleChange} />
          </View>
        </Block>
      )}
      {showCon === '负责人主页' && (
        <Block>
          <View className='fzrVer-box-wrap'>
            <FzrHome changeTab={handleChange} />
          </View>
          <View className='fzrVer-box-icon3'>
            <Image mode='aspectFill' style='width: 100%;height: 100%;' src='https://api.lifestylelightseeker.com/Public/Web/icon3.png' />
          </View>
          <View className='fzrVer-box-back'>
            <AtButton type='secondary' onClick={handleLogout}>
              退出登录
            </AtButton>
          </View>
        </Block>
      )}
      {showCon === '开店检查' && (
        <CheckOpen changeTab={handleChange} cbtype={1} />
      )}
      {showCon === '闭店检查' && (
        <CheckOpen changeTab={handleChange} cbtype={2} />
      )}
    </View>
  );
};

export default FzrVer;
