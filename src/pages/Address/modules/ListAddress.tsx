import Taro, { useRouter } from '@tarojs/taro';
import { View, Block, Text } from '@tarojs/components';
import { AtButton, AtIcon, AtModal, AtTag } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';
import { useCheckBoxList } from '@/utils/hooks';
import '../index.scss';


const { useEffect, useState } = Taro;
const ListAddress = (props: { from: string }) => {
  const { from } = props;
  const { address } = useSelector((state) => state.address);
  const [alertModal, setAlertOpen]: [any, any] = useState({ show: false, data: {} });
  const dispatch = useDispatch();
  /**
   * 添加新地址
   */
  const handleAddAddress = () => {
    dispatch({ type: 'address/updateModal', payload: { show: true, type: 'create', data: {} } });
  };
  /**
   * 编辑
   */
  const handleEditAddress = (item) => {
    dispatch({ type: 'address/updateModal', payload: { show: true, type: 'edit', data: item } });
  };
  /**
   * 删除提示
   */
  const handleAlertDel = (item) => {
    setAlertOpen({ show: true, data: item })
  }
  /**
   * 删除
   */
  const handleDelAddress = (item) => {
    const { id } = alertModal.data || {};
    dispatch({ type: 'address/delMyAddress', params: { id } });
    setAlertOpen({ show: false, data: {} })
  };
  /**
   * 设为默认地址
   */
  const handleSetDefaultAddr = (item) => {
    const { id } = item;
    dispatch({ type: 'address/setDefaultMyAddress', params: { id } });
    if (from === 'buyPage') {
      Taro.navigateBack();
    }
  };
  /**
   * 获取微信默认地址
   */
  const handleGetWx = () => {
    if (Taro.chooseAddress) {
      Taro.chooseAddress({
        success: function (res) {
          console.log("成功", res);
          const params = {
            uname: res.userName,
            phone: res.telNumber,
            province: res.provinceName,
            city: res.cityName,
            area: res.countyName,
            address: res.detailInfo
          }
          dispatch({ type: 'address/saveAddress', params });
        },
        fail: function (err) {
          console.log("失败", err);
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  };

  useEffect(() => {
    dispatch({ type: 'address/getAddress' });
  }, [dispatch]);
  return (
    <View className='address-edit-wrap'>
      <AtModal
        isOpened={alertModal.show}
        title='注意'
        cancelText='取消'
        confirmText='确认'
        onCancel={() => setAlertOpen({ show: false, data: {} })}
        onConfirm={handleDelAddress}
        content='确认删除？'
      />
      {address.list.map((item) => {
        const { realname, cellphone, address: addr, province, city, area, status = '0' } = item;
        return (
          <View key={addr} className='address-con'>
            <View className='at-row address-con-top'>
              <View className='at-col at-col-1 at-col--auto jb-text'>{realname}</View>
              <View className='at-col jb-text'>{cellphone}</View>
              {status == 0 ? (
                <View
                  className='at-col'
                  onClick={() => {
                    handleSetDefaultAddr(item);
                  }}
                >
                  <AtTag size='small' circle>设为默认</AtTag>
                </View>
              ) : (
                <View className='at-col'><AtTag size='small' type='primary' circle>默认地址</AtTag></View>
              )}
              <View className='at-col add-btn-con'>
                <View className='add-icon-con'>
                  <AtIcon value='edit' onClick={() => handleEditAddress(item)} size='16' color='#c0c0c0'></AtIcon>
                </View>
                <View className='add-icon-con'>
                  <AtIcon value='trash' onClick={() => handleAlertDel(item)} size='16' color='#c0c0c0'></AtIcon>
                </View>
              </View>
            </View>

            <View className='at-row  address-con-mid'>
              <View className='at-col-12'>
                <Text className='addr-text'> {province}</Text>
                <Text className='addr-text'> {city}</Text>
                <Text className='addr-text'> {area}</Text>
                <Text className='addr-text'> {addr}</Text>
              </View>
            </View>
          </View>
        );
      })}
      {
        address && address.length > 0 ?
          <View className='addnew-wrap'>
            <View className='addnew-btn-top'>
              <AtButton type='primary' size='small' circle onClick={handleAddAddress}>
                +添加新地址
              </AtButton>
            </View>
            <AtButton type='primary' size='small' circle onClick={handleGetWx}>
              +选择微信默认地址
            </AtButton>
          </View> :
          <View className='addnew-wrap addnew-wrap-bottom'>
            <View className='addnew-btn-top'>
              <AtButton type='primary' size='small' circle onClick={handleAddAddress}>
                +添加新地址
              </AtButton>
            </View>
          </View>
      }

    </View>
  );
};

export default ListAddress;
