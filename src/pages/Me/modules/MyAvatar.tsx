/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-08-10 23:47:55
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-09-09 23:11:56
 * @FilePath: /zulin/src/pages/Me/modules/MyAvatar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import { View, Button, Block, Image } from '@tarojs/components';
import { AtAvatar, AtButton } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';

import { logIn } from '@/utils/auth';

import '../index.scss';
import { showErrorToast } from '@/utils/util';
import { HOST } from '@/config/api';

const myType = {
  1: '普通会员',
  2: '年卡会员'
}
const MyAvatar = () => {
  const { isLogIn, wxUserInfo, userInfo } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const getPhoneNumber = (e) => {
    wx.getUserInfo({
      desc: '用于完善会员资料',
      success: async (res) => {
        console.log("获取到的用户信息：", res);
        // 这里提交数据到后端接口，成功返回后设置登录状态
        if ("getPhoneNumber:ok" == e.detail.errMsg) {
          await logIn({ dispatch, userInfo: res.userInfo, phone: { encryptedData: e.detail.encryptedData, iv: e.detail.iv } });
        } else {
          showErrorToast("登录失败")
        }

      },
      fail: (err) => {
        console.log(1212121, err)
      }
    })
    // return ;
    // console.log("获取手机号返回结果:", e.detail.errMsg) // 错误信息，如果获取失败则返回该信息
    // console.log("手机号iv用于解密操作：",e.detail.iv) // iv用于解密操作
    // console.log("密文，解密后可以获取手机号", e.detail.encryptedData) // 密文，解密后可以获取手机号


  }

  const handleLogIn = () => {
    // eslint-disable-next-line no-undef
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        logIn({ dispatch, userInfo: res.userInfo });
      }
    })
  };

  console.log('userInfo', userInfo);
  const handleCarm = () => {
    // eslint-disable-next-line no-undef
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("扫码结果：", res);
        Taro.navigateTo({ url: res.result });
      }
    })
  }
  const handleTeaVer = () => {
    Taro.navigateTo({ url: '/subPackagesMe/TeacherVer/index' });
  }
  return (
    <View className='my-avatar-con jb-bg'>
      <View className='at-row at-row__align--center  my-avatar-top'>
        {isLogIn ? (
          <Block key={JSON.stringify(userInfo)}>
            <View className='at-col  at-col-4'>
              <AtAvatar size='large' circle image={userInfo.face}></AtAvatar>

            </View>
            <View className='at-col'>
              <View className='my-avatar-line1'> <span>{userInfo.nickname}</span></View>
              <View className='my-avatar-line2'><span>{myType[userInfo.mtype] ? myType[userInfo.mtype] : ''}</span></View>

            </View>
            {/* <View className='at-col'>{userInfo.nickname}</View> */}
          </Block>
        ) : (
          // onClick={handleLogIn}
          <Button open-type="getPhoneNumber" onGetPhoneNumber={getPhoneNumber} >
            授权登录
          </Button>
        )}
        {
          userInfo.ut === '2' && <View className='my-avatar-sm' onClick={handleCarm}>
            <Image className='image-img' src={HOST + '/Public/static/images/saoma.png'} mode="aspectFit" style='width: 100%;height: 100%;' />
          </View>
        }
      </View>
      <View className='at-row at-row--wrap  my-avatar-bottom'>
        <View className='at-col at-col-12'>
          <View className='my-card-bg' >追光科探会员</View>
        </View>
        <View className='at-col at-col-12'>
          <View className='my-avatar-desc'>我的余额</View>
          <View className='my-avatar-color'>{userInfo.ta || '-'}</View>

        </View>
        <View className='at-col at-col-12'>
          <View className='my-avatar-desc' onClick={handleTeaVer}>老师认证入口</View>
        </View>
        {/* <View className='at-col at-col-6'>
          <View className='my-avatar-desc'>剩余次数</View>
          <View className='my-avatar-color'>{userInfo.cardcount || '-'}</View>

        </View> */}
      </View>
    </View>
  );
};

export default MyAvatar;
