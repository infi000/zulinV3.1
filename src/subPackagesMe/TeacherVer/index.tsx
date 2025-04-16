/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useRef, useDidShow, useMemo } from "@tarojs/taro";
import { AtButton, AtInput, AtList, AtListItem, AtRadio, AtTabs, AtTabsPane } from "taro-ui";
import { View, Image } from "@tarojs/components";
import "./index.scss";
import FormVer from "./modules/FormVer";
import TeacherStatus from "./modules/TeacherStatus";
import TeacherOrder from "./modules/TeacherOrder";
import TeacherWorkList from "./modules/TeacherWorkList";
import TeacherHome from "./modules/TeacherHome";
import TeacherHistoryOrder from "./modules/TeacherHistoryOrder";
import { getTeacurstatusService, getTeadetailbytokenService } from "./services";

const defaultForm: { [key: string]: any } = {};

type TConType = '认证表单' | '老师主页' | '我的订单' | '工时排班' | '我的状态' | '历史订单';
const TeacherVer = () => {
  var teacherToken = Taro.getStorageSync('teacherToken');
  const [showCon, setShowCon] = useState<TConType>('老师主页')
  const [teacherInfo, setTeacherInfo] = useState<any>([]);
  const [teacherStatus, setTeacherStatus] = useState<any>({});

  const handleChange = (key: any) => {
    setShowCon(key);
  };

  const handleDetail = () => {
    const token = Taro.getStorageSync('teacherToken');
    if (token) {
      getTeadetailbytokenService({ token }).then(res => {
        setTeacherInfo(res || {});
        getTeacurstatusService({ token }).then(res => {
          setTeacherStatus(res || {})
        })
      }).catch( err =>{
        Taro.setStorage({ key: 'teacherToken', data: '' });
        setShowCon('认证表单')

      })
    }
  }

  const handleLogout = () => {
    Taro.navigateBack({
      delta: 1,
      success: function (res) {
        Taro.setStorage({ key: 'teacherToken', data: '' });
       },
    });
  }


  console.log('teacherStatus', teacherStatus)
  const memoUrl = useMemo(() => {
    const { dstatus } = teacherStatus;
    if (dstatus == 0) {
      //空闲
      return 'https://api.lifestylelightseeker.com/Public/Web/status1.png'
    }
    if (dstatus == 1) {
      //忙碌
      return 'https://api.lifestylelightseeker.com/Public/Web/status2.png'
    }
    if (dstatus == 2) {
      //休假
      return 'https://api.lifestylelightseeker.com/Public/Web/status3.png'
    }
    return ''
  }, [JSON.stringify(teacherStatus)])

  // useDidShow(() => {
  //   setShowCon(teacherToken ? '老师主页' : '认证表单')
  //   handleDetail();
  // })
  useEffect(() => {
    setShowCon(teacherToken ? '老师主页' : '认证表单')
    handleDetail();
  }, [teacherToken])

  return (
    <View className="teacherVer-wrap tea-bg">
      {
        showCon !== '认证表单' && <View className='teacherVer-head-wrap'>
          <View className="teacherVer-head-name">
            {teacherInfo.teaname}
          </View>
          <View className="teacherVer-head-img">
            <Image
              mode='aspectFill'
              style='width: 100%;height: 100%;'
              src={teacherInfo.head} />
          </View>
          <View className="teacherVer-head-icon">
            <Image
              mode='aspectFill'
              style='width: 100%;height: 100%;'
              src='https://api.lifestylelightseeker.com/Public/Web/icon1.png' />
          </View>
          <View className="teacherVer-head-status"><Image
            mode='aspectFill'
            style='width: 100%;height: 100%;'
            src={memoUrl} /></View>
        </View>
      }

      <View className='teacherVer-box-wrap'>
        {
          showCon === '认证表单' && <FormVer changeTab={handleChange} />
        }
        {
          showCon === '老师主页' && <TeacherHome changeTab={handleChange} />
        }
        {
          showCon === '我的状态' && <TeacherStatus />
        }
        {
          showCon === '工时排班' && <TeacherWorkList />
        }
        {
          showCon === '我的订单' && <TeacherOrder />
        }
        {
          showCon === '历史订单' && <TeacherHistoryOrder />
        }
      </View>
      {
        showCon !== '认证表单' && <View className="teacherVer-box-icon3">
          <Image
            mode='aspectFill'
            style='width: 100%;height: 100%;'
            src='https://api.lifestylelightseeker.com/Public/Web/icon3.png' />
        </View>
      }

      {
        (showCon !== '老师主页' && showCon !== '认证表单') && <View className="teacherVer-box-back">
          <AtButton type='secondary' onClick={() => handleChange('老师主页')}>返回</AtButton>
        </View>
      }
      {
        showCon === '老师主页' && <View className="teacherVer-box-back">
          <AtButton type='secondary' onClick={handleLogout}>退出登录</AtButton>
        </View>
      }

    </View >
  );
};

export default TeacherVer;
