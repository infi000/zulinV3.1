/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-27 00:02:44
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro  from '@tarojs/taro';
import { View } from '@tarojs/components';
import '../index.scss';


const TeacherVer = () => {
  const handleToOrder = (status) =>{
    Taro.navigateTo({ url:'/pages/Order/index?status='+status});
  }
  return (
   <View className='me-con' onClick={handleToOrder}>
    老师认证入口
    </View>
  );
};

export default TeacherVer;
