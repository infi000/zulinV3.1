/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-01-07 23:57:51
 * @FilePath: /zulinV3.1/src/pages/GoodGoods/modules/TagBar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtTabs, AtTabsPane, AtGrid } from 'taro-ui';
import '../index.scss';

const { useState, useEffect, useMemo } = Taro;
const DEFAULT_TAG = [
  {
    title: '推荐',
    stype: '1', // stype不为空时，商品搜索传参{stype:xx}。type为空传参{ctype:xxx}
  },
  // {
  //   title: '最热',
  //   stype: '2',
  // },
  // {
  //   title: '最新',
  //   stype: '3',
  // },
];

const TagBar = (props) => {
  const  { style ={}, type } = props;

  const [tabCurrent, SetTabCurrent] = useState(0);
  const { allCtypeList,goodsData } = useSelector((state) => state.goodGoods);
  const dispatch = useDispatch();
  const formatList = () => {
    if (allCtypeList && allCtypeList.length > 0) {
      return [].concat(
        allCtypeList.filter(item=> item.c_type).map((item) => {
          const { c_type: title } = item;
          item.title = title;
          return item;
        })
      );
    }
    return DEFAULT_TAG;
  };
  const handleClickTab = (index) => {
    SetTabCurrent(index);
  };
  // 根据tab选项调接口
  useEffect(() => {
    const item = formatList()[tabCurrent];
    const { stype, title } = item;
    const payload = stype ? { stype } : { ctype: title };
    dispatch({ type: 'goodGoods/updateGoodsDataParams', payload });
    dispatch({ type: 'goodGoods/getSearchGoods' });
  }, [tabCurrent]);

  useDidShow(() => {
    if(type === 'zulin'){
      dispatch({ type: 'goodGoods/getAllCtype', payload: { cid: '243'} });
    }else{
      dispatch({ type: 'goodGoods/getAllCtype' });
    }
  });
  return (
    <View className='tagbar-wrap' style={style}>
      <AtTabs current={tabCurrent} scroll tabList={formatList()} onClick={handleClickTab}></AtTabs>
    </View>
  );
};

export default TagBar;
