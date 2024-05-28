/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-26 10:52:50
 * @FilePath: /zulinv2/src/subPackages/Shipin/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtTag, AtDivider } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';
import { getExperimentnames, getExperimentvideos } from './services';

const Shipin = () => {

    const [experimentName, setExperimentName] = useState<any>([]); // 选择的实验项目名
    const [choosedEid, setChoosedEid] = useState<any>([]); // 选择的实验项目id
    const [videoList, setVideoList] = useState([])
    // 获取实验项目名
    const handleGetExperimentnames = () => {
        getExperimentnames().then((res) => {
            if (res.experiments && Array.isArray(res.experiments)) {
                setExperimentName(res.experiments);
                const firstEid = res.experiments[0].id;
                setChoosedEid(firstEid);
            }
        })
    }
    const handleChangeEid = (eid: string) => {
        setChoosedEid(eid);
    }

    const handleGoto = (vid:string) => {
        Taro.navigateTo({ url: '/subPackages/ShipinDetail/index?vid=' + vid  });

    }
    useEffect(() => {
        handleGetExperimentnames();
    }, [])

    useEffect(() => {
        if (choosedEid) {
            getExperimentvideos({ eid: choosedEid }).then((res) => {

                if (res.videos && Array.isArray(res.videos)) {
                    setVideoList(res.videos);
                }
            })
        }
    }, [choosedEid])

    return (
        <View className='Shipin-warp'>
            <View className='Shipin-rooms'>
                {experimentName.map((item, index) => (
                    // <View className='experimentNameTag' data-index={index}>{item.title}</View>
                    <View className='Shipin-experimentNameTag-con'>
                        <AtTag
                            key={item.id}
                            active={item.id !== choosedEid}
                            type={item.id == choosedEid ? 'primary' : ''}
                            circle
                            size='normal'
                            onClick={() => { handleChangeEid(item.id); }}
                        ><View className='Shipin-experimentNameTag-con jb-text'>{item.title}</View></AtTag>
                    </View>

                ))}
            </View>
            <View className='Shipin-VideoList-con'>
            {
                videoList.map(item => {
                    const { thumbinal, ctitle, des, ctime, id } = item;
                    const fTime = new Date(parseInt(ctime) * 1000).toLocaleDateString();
                    return <View className='Shipin-Video-con' onClick={() => handleGoto(id)}>
                        <Image style={{ width: '100%' }} src={thumbinal} />
                        <View className='Shipin-Video-name at-row at-row__justify--between'>
                            <View className='at-col at-col-8'>{ctitle}</View>
                            <View className='at-col at-col-2'>{fTime}</View>
                        </View>
                        <View className='Shipin-Video-desc'>{des}</View>
                    </View>
                })
            }
            {videoList.length === 0 && <AtDivider fontColor='#c0c0c0' lineColor='#c0c0c0' fontSize='26' content='暂无更多' />}
            </View>
           
        </View>
    );
}

export default Shipin;