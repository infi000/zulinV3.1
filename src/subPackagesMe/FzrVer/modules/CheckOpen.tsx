/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-12-17 00:55:41
 * @FilePath: /zulinV3.1/src/pages/Me/modules/MyOrder.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useMemo } from "@tarojs/taro";
import { AtButton, AtDrawer, AtList, AtListItem } from "taro-ui";

import { Picker, View, Image, Block } from "@tarojs/components";
import "../index.scss";
import { getCheckCheckbaselistService, getCheckCheckedlistService } from "../services";
import { tea_wstatus } from "@/constants/index";
import { currentDate } from "@/utils/util";
import { CHECKSTATUS_BG_MAP, CHECKSTATUS_MAP } from "../constants";
import EditeFzr from "./EditeFzr";

const defaultForm: { [key: string]: any } = {};

type TCon = '编辑' | '列表';

interface IProps {
  cbtype: 1 | 2,
  changeTab: any;
}

const CheckOpen = (props: IProps) => {
  const { cbtype, changeTab } = props;
  const [showCon, setShowCon] = useState<{ type: TCon, data?: any }>({ type: '列表', data: {} });

  const [checkList, setCheckList] = useState<any>([]);// 全部
  const [checkedList, setCheckedList] = useState<any>([]); // 已检查
  const [checkDate, setCheckDate] = useState<any>(currentDate());
  const [drawerShow, setDrawerShow] = useState(false)
  const handleGetList = () => {
    const token = Taro.getStorageSync('fzrToken');
    getCheckCheckbaselistService({ token, cbtype }).then(res => {
      if (Array.isArray(res.checkbaselist) && res.checkbaselist.length > 0) {
        setCheckList(res.checkbaselist)
      } else {
        setCheckList([])
      }
    })
  }
  const handleCheckedList = (d?: any) => {
    const token = Taro.getStorageSync('fzrToken');
    getCheckCheckedlistService({ token, cbtype, checkdate: d || checkDate }).then(res2 => {
      if (Array.isArray(res2.checklist) && res2.checklist.length > 0) {
        setCheckedList(res2.checklist)
      } else {
        setCheckedList([])
      }
    })
  }

  const handleChangeDate = (e: any) => {
    console.log(e)
    setCheckDate(e.currentTarget.value)
    handleCheckedList(e.currentTarget.value);
  }

  useEffect(() => {
    console.log('useEffect')
    handleGetList()
  }, [])
  useEffect(() => {
    if (showCon.type === '列表') {
      handleCheckedList()
    }
  }, [showCon.type])

  const memoList = useMemo(() => {
    const total = checkList.length || '0';
    const uniqueCbids = new Set<number>();
    const uniqueCheckedList = checkedList.filter((item) => {
      if (!uniqueCbids.has(item.cbid)) {
        uniqueCbids.add(item.cbid);
        return true;
      }
      return false;
    });
    const hasCheck = uniqueCheckedList.length|| '0';
    const good = uniqueCheckedList.filter((item: any) => item.checkstatus == 1).length|| '0';
    const unGood = uniqueCheckedList.filter((item: any) => item.checkstatus == 2).length|| '0';
    return {
      total,
      hasCheck,
      good,
      unGood
    }
  }, [checkList, checkedList]);

  return (
    <Block>
      <View className='fzrVer-box-wrap'>
        <View>
          {
            showCon.type === '列表' && <View className="fzr-order-list">
              <View>
                <Picker mode='date' onChange={handleChangeDate} value={checkDate}>
                  <AtList>
                    <AtListItem title='请选择日期' extraText={checkDate} />
                  </AtList>
                </Picker>
              </View>
              {
                checkList.map(item => {
                  const { checkstatus, id, chkuname, ctime, checkedimg, remark } = checkedList.find((item2: any) => item2.cbid === item.id) || {};
                  const { firstcategory, secondcategory, checkcontent } = item;
                  const checkName = CHECKSTATUS_MAP[checkstatus] || '未检查';
                  const bgColorCls = CHECKSTATUS_BG_MAP[checkstatus] || ''
                  return <View className={`fzr-order-item ${bgColorCls}`} onClick={() => setShowCon({ type: '编辑', data: { ...item, checkstatus, checkedimg, remark, cbid: item.id, cid: id } })}>
                    <View className='at-row at-row__justify--between fzr-order-item-title'>
                      <View className='at-col'>{firstcategory}-{secondcategory}：{checkName}</View>
                    </View>
                    <View className="fzr-order-item-content">{checkcontent}</View>
                    <View className="fzr-order-item-content">检查人：{chkuname || '暂无'}
                      <View className="fzr-order-item-content-time">检查时间：{ctime || '暂无'}</View>
                    </View>

                  </View>
                })
              }
            </View>
          }
          {
            showCon.type === '编辑' && <EditeFzr cancel={() => setShowCon({ type: '列表', data: {} })} cbid={showCon.data.cbid} cid={showCon.data.cid} data={showCon.data} />
          }
        </View>
      </View>
      <View className='fzrVer-box-tj'>
        <AtButton type='secondary' onClick={() => setDrawerShow(true)}>
          汇总
        </AtButton>
      </View>
      <View className='fzrVer-box-back'>
        <AtButton type='secondary' onClick={() => changeTab('负责人主页')}>
          返回
        </AtButton>
      </View>
      <AtDrawer
        show={drawerShow}
        onClose={() => setDrawerShow(false)}
        mask
        right
        width = {'80%'}
      >
        <View className='fzr-drawer'>
        <View className='fzr-drawer-item'>检查日期：{checkDate}</View>
        <View className='fzr-drawer-item'>检查项目：{memoList.hasCheck}/{memoList.total}</View>
        <View className='fzr-drawer-item '>正常检查项：{memoList.good}</View>
        <View className='fzr-drawer-item fzr-drawer-item-red'>异常检查项：{memoList.unGood}</View>
        </View>

      </AtDrawer>
    </Block>
  );
};

export default CheckOpen;
