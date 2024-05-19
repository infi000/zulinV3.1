/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-01-07 23:54:14
 * @FilePath: /zulinV3.1/src/pages/GoodGoods/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { scope, Component, useState, useDidShow, useEffect, useRouter } from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import SearchBar from './modules/SearchBar';
import Area from './modules/Area3';
import Banner from './modules/Banner';
import List from './modules/List';
import TagBar from './modules/TagBar';
import { getClassifySearch } from './services';
import { isArray } from 'lodash';

import './index.scss';

const GoodGoods = () => {
  const [tagBarStyle, setTagBarStyle]: [null | object, Function] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter(); 
  console.log('routerrouterrouterrouter', router);
  const [areaList, setAreaList]: [any[], any] = useState([]);
  const onScroll = (e) => {
    const scrollHight = Math.ceil(areaList.length/2) * 140;
    const baseH = 250
    if (e.target.scrollTop >= scrollHight+baseH) {
      if (!tagBarStyle) {
        setTagBarStyle({
          position: 'fixed',
          top: 0,
          zIndex: 10,
          boxShadow: ' 1rpx 1rpx 10rpx #ccc',
          width: '100%',
          marginBottom: 0,
        });
      }
    } else {
      if (tagBarStyle) {
        setTagBarStyle(null);
      }
    }
  };
  const onScrollToLower = (e) => {
    console.log("onScrollToLoweronScrollToLoweronScrollToLower");
    dispatch({ type: 'goodGoods/getPageGoods'});
  }
  useEffect(() => {
    getClassifySearch({ ctype: 2 }).then((d) => {
      const arr = isArray(d) ? d : [];
      setAreaList(arr);
    });
  }, []);
  console.log('areaList', areaList);
  return (
    <View className='goodgoods-wrap'>
      <ScrollView scrollY={true} scrollWithAnimation style={{ height: '100%' }} onScroll={onScroll} onScrollToLower={onScrollToLower}>
        <SearchBar />
        <Banner />
        <Area areaList={areaList}/>
        <TagBar style={tagBarStyle} type={router.params.type} />
        <List />
      </ScrollView>
    </View>
  );
};
export default GoodGoods;
