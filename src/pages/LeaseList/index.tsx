/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-05-22 22:25:06
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-07-23 01:22:46
 * @FilePath: \zulinV3.1\src\pages\LeaseList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect,useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard } from 'taro-ui'


import './index.scss';
import { getListData } from './services';

const img = "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";
const LeaseList = () => {
    console.log('走到222这')

    const pageSize = 20;
    const [list, setList] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    useEffect(()=>{
        console.log('走到这')
        getList();
    }, []);
    useDidShow(() =>{
        console.log('走到3333这')

    })

    const getList = () => {
        let params = {
            pageNum: page,
            pageSize: pageSize,
        }
        getListData(params).then((res) => {
            if(res.experiments.length > 0){
                setList(res.experiments);
            }
            setTotal(res.total);
            setPage(page+1);
        });
    };

    const dumpLease = (event) => {
        console.log(event);
        let id = event.currentTarget.dataset.id;
        // let title = event.currentTarget.dataset.title;
        // let swiper = event.currentTarget.dataset.swiper;
        Taro.navigateTo({
          url: "/pages/Lease/index?eid="+id
        });
    }

    // 滑动到底部翻页
    const onScrollToLower = (e) => {
        getList();
    }

    return (
        <View className='LeaseList-warp'>
                <AtList>
                    <ScrollView  scrollY={true} scrollWithAnimation style={{ height: '88vh' }} onScrollToLower={onScrollToLower}>
                        {list.map((item, index)=>(
                            <View className='LeaseList-img' key={index} data-id={item.id} data-title={item.title} data-swiper={item.pics} onClick={dumpLease}>

                                {/* <AtCard
                                    note={item.des}
                                    title={item.title ? item.title : ''}
                                    // thumb={item.thumbinal}
                                >
                                <Image  src={item.thumbinal} mode="aspectFit" />
                                </AtCard> */}
                                <Image  src={item.thumbinal} mode="aspectFit" style={{ width:'100%', height:'100%'}} />
                            </View>
                        ))}
                    </ScrollView>
                </AtList>
        </View>
    );
}

export default LeaseList;