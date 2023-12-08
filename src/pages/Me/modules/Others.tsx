import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { showSuccessToast } from '@/utils/util';
import { subMsg, getAllTemplate } from '../services';
import '../index.scss';
import { isArray } from 'lodash';
import { useSelector } from '@tarojs/redux';
import { AtGrid, AtIcon } from 'taro-ui'
import { grzx, hycz, hykgm, yydd, zgkf, dzgl, } from '@/static/images';

const LIST_URL_MAP = [
  // { name: '抽奖', url: '/pages/Choujiang/index' },
  // { name: '照片墙', url: '/pages/PhotoWall/index' },
  // { name: '个人中心', url: '/subPackagesMe/UserInfoManage/index', icon: { val: 'user', color: '#FF9800' } },
  { name: '年卡会员购买', url: '/subPackagesMe/BuyVip/index', icon: { val: 'money', color: '#FF9800' } },
  { name: '购买积分', url: '/subPackagesMe/BuyTabi/index', icon: { val: 'sketch', color: '#FF9800' } },
  { name: '寄卖', url: '/subPackages/ConsignmentMenu/index', icon: { val: 'mail', color: '#F44336' } },
  // { name: '收藏', url: '/pages/Collect/index' },
  // { name: '我的藏品', url: '/pages/MyVip/index' },
  { name: '地址管理', url: '/pages/Address/index', icon: { val: 'tag', color: '#2196F3' } },
  // { name: '寄卖列表', url: '/subPackages/Consignment/index' },
  // { name: '寄卖售出列表', url: '/subPackages/ConsignmentSaleList/index' },
  // { name: '寄卖购买列表', url: '/subPackages/ConsignmentBuyList/index' },
  // { name: '发布寄卖', url: '/subPackages/ConsignmentCreate/index' },

  // { name: '', url: '/subPackages/Consignment/index' },
  // { name: '客服', url: '/pages/Kefu/index' },

];

// const tmplIds = ['vqWshHTalxdFaNqhdSWJ8Mkb7HsysV39m1h9Yk-94hY', '05mTNKODj3164t8tEgu60oLUyqddSUHtjAOS6i1S0Zs'];
const Others = () => {
  // const [tmplIds, setTmplIds]: [string[], any] = useState([]);
  const { wxUserInfo, userInfo } = useSelector((state) => state.main);

  const handleClickItem = (url) => {
    Taro.navigateTo({ url });
  };

  const handleCarm = () => {
    // eslint-disable-next-line no-undef
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("扫码结果：", res);
        Taro.navigateTo({ url: res.result });
      }
    })
  }
  const handleLeaseOrder = () => {
    Taro.navigateTo({ url: "/pages/LeaseOrderList/index" });
  }
  // const handleTaskList = () => {
  //   Taro.navigateTo({ url: "/pages/TaskList/index" });
  // }
  useEffect(() => {
    // getAllTemplate().then(d => {
    //   const temids = isArray(d) ? d.map(item => item.templateid) : [];
    //   // setTmplIds(temids);
    // })
  }, [])

  const handleCl = (opt: any) => {
    console.log(opt);
    const { value } = opt;
    switch (value) {
      case '个人中心':
        Taro.navigateTo({ url: '/subPackagesMe/UserInfoManage/index' });
        break;
      case '会员卡购买':
        Taro.navigateTo({ url: '/subPackagesMe/BuyVip/index' });
        break;
      case '购买积分':
        Taro.navigateTo({ url: '/subPackagesMe/BuyTabi/index' });
        break;
      case '地址管理':
        Taro.navigateTo({ url: '/pages/Address/index' });
        break;
      case '预约订单':
        Taro.navigateTo({ url: '/pages/LeaseOrderList/index' });
        break;
      case '追光客服':
        Taro.navigateTo({ url: '/pages/Kefu/index' });
        break;
      default:
        break;
    }
  }

  return (
    <View className='me-other-wrap'>
      <View className='at-grid-con'>
        <AtGrid hasBorder={false} onClick={handleCl} data={
          [
            {
              image: grzx,
              value: '个人中心',
            },
            {
              image: hykgm,
              value: '会员卡购买'
            },
            {
              image: hycz,
              value: '购买积分'
            },
            {
              image: yydd,
              value: '地址管理'
            },
            {
              image: yydd,
              value: '预约订单'
            },
            {
              image: zgkf,
              value: '追光客服'
            }
          ]
        } />
      </View>
    </View>
  );
};

export default Others;
