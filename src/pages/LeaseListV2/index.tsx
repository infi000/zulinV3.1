/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-05-22 22:25:06
 * @LastEditors: infi000_at_home 113079767@qq.com
 * @LastEditTime: 2024-09-01 23:10:30
 * @FilePath: \zulinV3.1\src\pages\LeaseListV2\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtList, AtListItem, AtCard, AtTag } from "taro-ui";

import "./index.scss";
import { getExperimentcategorys, getListData } from "./services";
import { falsyParamsFilter } from "@/utils/util";
import { useSelector } from "@tarojs/redux";

const img =
  "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";
const LeaseListV2 = () => {
  const { yuYueTabIndex } = useSelector((state) => state.main);
  const pageSize = 20;
  const [list, setList] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [categorys, setCategorys] = useState<any>(undefined); // 实验项目下小分类列表

  const [choosedItem, setChoosdItem] = useState<any>({}); // 选择的实验项目id
  const router = useRouter();
  useEffect(() => {
    console.log("走到这",router.params);
    getList();
  }, []);
  useDidShow(() => {
    console.log("走到3333这");
  });
  const handleChangeE = (e: any) => {
    setChoosdItem(e);
    getExperimentcategorys(falsyParamsFilter({ eid: e.id })).then(res => {
      if (res.experimentcategorys && Array.isArray(res.experimentcategorys)) {
        setCategorys(res.experimentcategorys);
      }
    });
  };

  const getList = () => {
    let params = {
      pageNum: page,
      pageSize: pageSize
    };
    getListData(params).then(res => {
      if (res.experiments.length > 0) {
        setList(res.experiments);
        const choosed = res.experiments.find( i => i.id ==yuYueTabIndex ) || res.experiments[0];
        console.log('choosedchoosed',choosed)
        setChoosdItem(choosed);
        getExperimentcategorys(
          falsyParamsFilter({ eid: choosed.id })
        ).then(res => {
          if (
            res.experimentcategorys &&
            Array.isArray(res.experimentcategorys)
          ) {
          
            setCategorys(res.experimentcategorys);
          }
        });
      }
      setTotal(res.total);
      setPage(page + 1);
    });
  };

  const dumpLease = event => {
    console.log(event);
    let id = choosedItem.id;
    // let title = event.currentTarget.dataset.title;
    // let swiper = event.currentTarget.dataset.swiper;
    Taro.navigateTo({
      url: "/pages/Lease/index?eid=" + id
    });
  };
  const handleClickImg = item => {
    const { id, duration, price } = item;
    const eid = choosedItem.id
    // let title = event.currentTarget.dataset.title;
    // let swiper = event.currentTarget.dataset.swiper;
    Taro.navigateTo({
      url: "/pages/Lease/index?eid=" + eid + "&cid=" + id + "&duration=" + duration + "&categoryprice=" + price,
    });
  };

  console.log("choosedItem", choosedItem);
  return (
    <View className="LeaseListV2-warp">
      <View className="lease-rooms">
        {list.map((item, index) => (
          <View className="experimentNameTag-con">
            <AtTag
              className="e-tg"
              key={item.id}
              active={item.id !== choosedItem.id}
              type={item.id == choosedItem.id ? "primary" : ""}
              size="normal"
              onClick={() => {
                handleChangeE(item);
              }}
            >
              <View className="experimentNameTag jb-text">{item.title}</View>
            </AtTag>
          </View>
        ))}

        
      </View>
      {/* <View className="LeaseListV2-desc">{choosedItem.des}</View> */}
      <View className="LeaseListV2-img">
        <Image
          src={choosedItem.thumbinal}
          mode="widthFix"
          style={{ width: "100%" }}
        />
      </View>
      <View className="LeaseListV2-cate-img-con">
        {
            categorys.map((item) => {
                return       <View className="LeaseListV2-cate-img" onClick={()=>handleClickImg(item)}>
                <Image
                  src={item.pic}
                  mode="aspectFit"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            })
        }
  
      </View>
    </View>
  );
};

export default LeaseListV2;
