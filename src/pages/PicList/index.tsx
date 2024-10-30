/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-05-22 22:25:06
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-08-29 23:25:02
 * @FilePath: \zulinV3.1\src\pages\LeaseList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect,useDidShow, useRouter } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard } from 'taro-ui'


import './index.scss';
import { getListData } from './services';

const PicList = () => {
    console.log('走到222这')

    const pageSize = 20;
    const [list, setList] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const router = useRouter();
      const { params } = router;
      const { cid } = params;
    useEffect(()=>{

    }, []);
    useDidShow(() =>{
        getList({ cid });

    })



    const getList = (params) => {
        getListData(params).then((res) => {
            if(res.pics.length > 0){
                setList(res.pics);
            }
            setTotal(res.total);
            setPage(page+1);
        });
    };

    return (
        <View className='PicList-warp'>
                {
                    list.map(item => {
                       return <Image  src={item.picpath} mode="widthFix" key={item.id} style={{ width : '100%'}} />

                    })
                }
        </View>
    );
}

export default PicList;