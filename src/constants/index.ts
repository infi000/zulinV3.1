/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-01-23 23:35:47
 * @FilePath: /zulinV3.1/src/constants/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export const ROUTER_MAP = new Map([
//     ['Main','/pages/Main/index'],
//     ['GoodGoods','/pages/GoodGoods/index'],
//     ['Me','/pages/Me/index'],
// ])


export const ROUTER_NAME_MAP = {
    main:'Main',
    goodGoods:'GoodGoods',
    photowall:'PhotoWall',
    me:'Me',
    community:'Community',
    reserve:'Reserve',
    index:'Index',
    pinpai:'Pinpai',
    yuyue:'Index',
    shipin:'Shipin',
};

export const ORDER_OTYPE_MAP = new Map([
    ['全部订单',-99],
    ['待付款',1],
    ['待发货',2],
    ['待收货',3],
    ['交易完成',4],
])

export const ORDER_STATUS_MAP = new Map([
    ['待付款',0],
    ['待发货',1],
    ['待收货',2],
    ['交易完成',3],
])
// 0待审核，1审核成功，2审核不通过,退款中，3审核不通过,退款成功，4审核不通过,退款失败，5已售出下线，6用户下线
export const G_STATUS_MAP = new Map([
    ['待审核', '0'],
    ['审核成功', '1'],
    ['审核不通过', '2'],
    ['退款中', '2'],
    ['审核不通过', '3'],
    ['退款失败', '3'],
    ['已售出下线', '4'],
    ['待审用户下线核', '5'],
])

// "wstatus": "1",//上班状态，0不上班，1上班，2加班
// "dstatus": "1",//预约状态，1有预约，0空闲，2有休假


export const tea_wstatus={
  0:'不上班',
  1:'上班',
  2:'加班',
  }
export const tea_dstatus={
  0:'空闲',
  1:'忙碌',
  2:'休假',
  }
