
import Taro, { useState, useEffect, useDidShow, useRouter, useMemo } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Video, Button } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtButton, AtInputNumber, AtCalendar, AtFloatLayout, AtTag, AtAvatar } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux';
import { currentDate, currentHour, falsyParamsFilter, showToast } from '@/utils/util';

import './index.scss';
import { getPrebookjoinList, postPrebookjoin } from './services';

const Lease = () => {
  const [List, setList] = useState<any>([])

  const handleJoin = (opt: any) => {
    const { bid } = opt;
    postPrebookjoin({ bid, paytype: 'miniwxpay' }).then(payInfo => {

      if (!payInfo.arraydata) {
        showToast("支付信息不存在");
        return;
      }
      console.log("支付信息", payInfo)
      let { timeStamp, nonceStr, signType, paySign } = payInfo.arraydata;
      const pak = payInfo.arraydata.package;
      // 支付
      Taro.requestPayment({
        timeStamp: timeStamp + "",
        nonceStr: nonceStr,
        package: pak,
        signType,
        paySign,
        success: function (res) {
          Taro.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 2000,
          })
        },
        fail: function (res) {
          showToast("加入失败");
          console.log(res)
        }
      })
    })
  }

  useDidShow(() => {
    getPrebookjoinList().then(res => {
      const {prebooks } = res;
      setList(prebooks || [])
    })
  })
  return (
    <View className='pintuan-warp'>
      <View className='pintuan-warp-inner'>
        {/* 实验小项列表 */}
        <View className='pt-wrap'>
          {
            List.map((item, index) => {
              return <View className='pt-line at-row  at-row__align--center' key={item.bid}>
                <View className='at-col at-col-3'>
                  <AtAvatar size='large' image={item.thumbinal}></AtAvatar>
                </View>
                <View className='at-col at-col-7'>
                  <View className='pt-ectitle'>
                    <View className='fdhz cz'>{item.ectitle}</View>
                  </View>
                  <View className='pt-time'>
                    <View className=''>{item.starttime}-{item.endtime && (item.endtime).split(' ') && (item.endtime).split(' ')[1]? (item.endtime).split(' ')[1] : ''}</View>
                  </View>
                  <View className='pt-etitle'>
                    <View className=''>{item.etitle}</View>
                  </View>
                </View>
                <View className='at-col at-col-2'>
                  <AtButton className='sub-btn' circle onClick={() => handleJoin(item)} size='small' type='primary' >加入</AtButton>
                  <View className='pt-curmember'>当前{item.curmember}人挑战</View>
                </View>
              </View>
            })
          }
          <View className='LeaseBottom'></View>

        </View>

      </View>
    </View>
  );
}

export default Lease;