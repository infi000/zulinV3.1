/*
 * @Author: infi000_at_home 113079767@qq.com
 * @Date: 2024-05-22 22:25:06
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-08-29 23:31:31
 * @FilePath: \zulinV3.1\src\pages\Index\Modules\Club.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import '../index.scss';
import { dumpByType } from '../services';


const Club = (props) => {
    // 跳转
    const moreDump = (e) => {
        let gotype = e.currentTarget.dataset.gotype;
        if(gotype == 3){
            gotype = 5
        }else if(gotype == 4){
            gotype = 6
        }
        dumpByType(gotype, {})
    }
    const imgDump = (e) => {
        let gotype = e.currentTarget.dataset.gotype;
        let title = e.currentTarget.dataset.title;
        let eid = e.currentTarget.dataset.eid;
        let cid = e.currentTarget.dataset.cid;
        let gid = e.currentTarget.dataset.gid;
        let pid = e.currentTarget.dataset.pid;
        dumpByType(gotype, {
            title: title,
            gid: gid,
            cid: cid,
            eid: eid,
            pid
        })
    }
console.log('props.dat',props.data)
    return (
        <View className='index-club-one'>
            <Image 
                data-title={props.data.goods[0].title?props.data.goods[0].title:''} 
                data-eid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-cid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-gid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-pid={props.data.id}
                data-gotype={props.data.gotype} 
                onClick={imgDump} 
                className='index-club-one-img' 
                src={props.data.fpath} mode="widthFix" 
            />
            {props.data.showmore == "1"?(
                <View data-gotype={props.data.gotype} className='more' onClick={moreDump}>
                    <Text>更多</Text>
                    <View className='at-icon at-icon-search'></View>
                </View>
            ):''}
            
        </View>
    );
}

export default Club;