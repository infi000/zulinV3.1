import Taro, { useState, useDidShow, useRouter, useEffect } from '@tarojs/taro';
import { View, Image, ScrollView, Button } from '@tarojs/components';
import { AtListItem, AtList, AtButton } from 'taro-ui';

import '../index.scss';
import { getUserxlprebookchlist } from '../services';


interface IProps {
  handleBack: () => void;
  oid: any
}
const HxList = (props: IProps) => {
  const { oid, handleBack } = props;
  const [list, setList] = useState([])
  useEffect(() => {
    if (oid) {
      getUserxlprebookchlist({ oid }).then((d: any) => {
        if (Array.isArray(d.orders)) {
          setList(d.orders)
        }
      })
    }
  }, [oid])



  return (
    <View className='hx-list-wrap'>
      {list.map((item:any, index) => (
        <View className='LeaseOrderList-img' key={index} data-id={item.id} data-title={item.title || ''}>
          <View className='at-row at-row--wrap'>
            <View className='at-col at-col-12 LeaseOrderList-font'>
             使用时长:{item.useduration}
            </View>
            <View className='at-col at-col-12 LeaseOrderList-font'>
              开始时间:{item.starttime}
            </View>
            <View className='at-col at-col-12 LeaseOrderList-font'>
              结束时间:{item.endtime}
            </View>
          </View>
          <View></View>
        </View>
      ))}
      <View className='hx-list-btn-wrap'>
        <AtButton
          className="sub-btn"
          onClick={handleBack}
          type="primary"
        >
          返回
        </AtButton>
      </View>
    </View>
  );
};

export default HxList;
