/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-05-22 22:25:06
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-06-23 18:45:48
 * @FilePath: \zulinV3.1\src\pages\LeaseOrderList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useDidShow, useRouter, useEffect } from '@tarojs/taro';
import { View, Image, ScrollView, Button, } from '@tarojs/components';
import { AtListItem, AtList, AtButton } from 'taro-ui'


import './index.scss';
import { getOrderList } from './services'
import Hx from './Modules/hx';

const img = "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";

const LeaseOrderList = () => {
  const [list, setList] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [showCon, setShowCon] = useState<{ type: '预约订单' | '去预约' | '已预约列表', data: any }>({ type: '预约订单', data: {} })


  useDidShow(() => {
    getList();
  });
  useEffect(() => {
    showCon.type === '预约订单' && getList();
  }, [showCon.type])


  const getList = () => {
    let params = {
      count: 999999,
    }
    getOrderList(params).then((res) => {
      console.log("订单列表", res)
      if (res.orders.length > 0) {
        setList(res.orders);
      }
      setTotal(res.total);
      setPage(page + 1);
    });
  };

  const handleToHx = (item) => {
    setShowCon({ type: '去预约', data: item })
  }

  // 滑动到底部翻页
  const onScrollToLower = (e) => {
    getList();
  }

  return <View>
    {
      showCon.type === '预约订单' && (
        <View className='LeaseOrderList-warp'>
          <View className='LeaseOrderList-list'>
            <AtList className='LeaseOrderList-list'>
              <ScrollView scrollY={true} scrollWithAnimation style={{ height: '100vh' }} onScrollToLower={onScrollToLower}>
                {list.map((item, index) => (
                  <View className='LeaseOrderList-img' key={index} data-id={item.id} data-title={item.title || ''} >
                    <View>
                      <View>{(item.ostatus == "0" ? '待支付 - ' : (item.ostatus == "1" ? '待核销 - ' : (item.ostatus == "2" ? '已核销 - ' : '已关闭 - '))) + (item.ctitle || '')}</View>
                      <View>实验大项目：{item.etitle || '-'}</View>
                      <View>备注信息：{item.message || '-'}</View>
                      <View>订单金额：{item.totalpay || '-'}</View>
                      <View>剩余时间：{item.leftduration || '-'}</View>
                    </View>
                    <AtButton
                      className="sub-btn"
                      onClick={() => handleToHx(item)}
                      type="primary"
                      size='small'
                    >
                      去核销
                    </AtButton>
                  </View>
                ))}
              </ScrollView>
            </AtList>

          </View>
        </View>
      )
    }
    {
      showCon.type === '去预约' && <Hx
        oid={showCon.data.id}
        eid={showCon.data.eid}
        cid={showCon.data.cid}
        duration={Number(showCon.data.leftduration)}
        categoryprice={showCon.data.categoryprice}
        show={true}
        handleBack={() => setShowCon({ type: '预约订单', data: {} })}
      />
    }
  </View>
}

export default LeaseOrderList;
