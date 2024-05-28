/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-26 11:02:52
 * @FilePath: /zulinv2/src/subPackages/ShipinDetail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, ScrollView, Image, Video } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtTag, AtDivider, AtButton } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';
import { getExperimentnames, getExperimentvideodetail, getExperimentvideos } from './services';
import { useDispatch } from '@tarojs/redux';

const ShipinDetail = () => {
    const dispatch = useDispatch();

    const route = useRouter();
    const [videoDetail, setVideoDetail] = useState<any>(undefined);
    useDidShow(() => {
        let vid = route.params.vid;
        if (vid) {

            getExperimentvideodetail({vid}).then((res)=>{
                setVideoDetail(res);
            })
        }

    })

    const handleOrder = () => {
        Taro.navigateBack({ delta: 1 }).then(() => {
            dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 1})
          })
    }
    return (
        <View className='ShipinDetail-warp'>

            <View className='ShipinDetail-VideoList-con'>
                <View className=' at-row at-row__justify--between'>
                    <View className='at-col at-col-7'></View>
                    <View className='at-col at-col-3'><AtButton size='small' type='primary' onClick={handleOrder} >预约</AtButton></View>
                </View>
                {videoDetail ? <View className='ShipinDetail-Video-con'>
                    <Video
                        className='index-video'
                        style={"width:100%"}
                        src={videoDetail.url}
                        controls={false}
                        autoplay={true}
                        poster={videoDetail.thumbinal}
                        initialTime={0}
                        id='video'
                        loop={true}
                        muted={false}
                        showMuteBtn={true}
                    />
                    <View className='ShipinDetail-Video-name'>标题：{videoDetail.ctitle}</View>
                    <View className='ShipinDetail-Video-time'>编辑于：{videoDetail.ctime}</View>
                    <View className='ShipinDetail-Video-desc'>描述：{videoDetail.des}</View>
                </View>
                    : <AtDivider fontColor='#c0c0c0' lineColor='#c0c0c0' fontSize='26' content='暂无数据' />
                }

            </View>

        </View>
    );
}

export default ShipinDetail;