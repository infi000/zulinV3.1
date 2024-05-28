/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-26 09:12:54
 * @FilePath: /zulinv2/src/subPackages/Paidui/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtTag } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';
import { getExperimentnames } from './services';

const PinPai = () => {

    const [experimentName, setExperimentName] = useState<any>([]); // 选择的实验项目名
    const [choosedEid, setChoosedEid] = useState<any>(undefined); // 选择的实验项目id
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
    useEffect(() => {
        handleGetExperimentnames();
    }, [])
    return (
        <View className='Paidui-warp'>
            <View className='Paidui-rooms'>
                {experimentName.map((item, index) => (
                    // <View className='experimentNameTag' data-index={index}>{item.title}</View>
                    <View className='Paidui-experimentNameTag-con'>
                        <AtTag
                            key={item.id}
                            active={item.id !== choosedEid}
                            type={item.id == choosedEid ? 'primary' : ''}
                            circle
                            size='normal'
                            onClick={() => { handleChangeEid(item.id); }}
                        ><View className='Paidui-experimentNameTag-con jb-text'>{item.title}</View></AtTag>
                    </View>

                ))}
            </View>
            <Image style={{ width: '100%' }} src={HOST + '/Public/static/images/shuoming/001.png'} mode="widthFix" />
            <Image style={{ width: '100%' }} src={HOST + '/Public/static/images/shuoming/002.png'} mode="widthFix" />
            <Image style={{ width: '100%' }} src={HOST + '/Public/static/images/shuoming/003.png'} mode="widthFix" />
            <Image style={{ width: '100%' }} src={HOST + '/Public/static/images/shuoming/004.png'} mode="widthFix" />
            <Image style={{ width: '100%' }} src={HOST + '/Public/static/images/shuoming/005.png'} mode="widthFix" />
            <Image style={{ width: '100%' }} src={HOST + '/Public/static/images/shuoming/006.png'} mode="widthFix" />
            <Image style={{ width: '100%' }} src={HOST + '/Public/static/images/shuoming/007.png'} mode="widthFix" />

        </View>
    );
}

export default PinPai;