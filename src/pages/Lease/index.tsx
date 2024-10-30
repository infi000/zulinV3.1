import Taro, {
  useState,
  useEffect,
  useDidShow,
  useRouter,
  useMemo
} from "@tarojs/taro";
import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Video,
  Button
} from "@tarojs/components";
import {
  AtList,
  AtListItem,
  AtInput,
  AtButton,
  AtInputNumber,
  AtCalendar,
  AtFloatLayout,
  AtTag,
  AtAvatar
} from "taro-ui";
import { useSelector, useDispatch } from "@tarojs/redux";
import {
  currentDate,
  currentHour,
  falsyParamsFilter,
  showToast
} from "@/utils/util";

import "./index.scss";
import LeaseRadio from "./Modules/LeaseRadio";
import LeaseTools from "./Modules/tools";
import Residue from "./Modules/residue";

import {
  getExperimentDetailService,
  getEquipmentsService,
  getToolsService,
  getToolService,
  getEquipmentBookTimes,
  orderadd,
  getExperimentnames,
  getExperimentcategorys
} from "./services";
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  return `${year}/${month}/${day}`;
}

const roomDefault = [
  { num: "可约", money: 800, timer: "10:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "11:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "12:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "13:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "14:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "15:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "16:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "17:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "18:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "19:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "20:00", status: "Residue-warp" },
  { num: "可约", money: 800, timer: "21:00", status: "Residue-warp" }
  // { num: '可约', money: 800, timer: "22:00", status: 'Residue-warp' }
];
const Lease = () => {
  const router: any = useRouter();
  const { eid, cid, duration, categoryprice } = router.params;
  console.log("router.params", router.params);
  const [timer, setTimer] = useState(duration ? Number(duration) : 1); // 预约市场，单位：小时
  const [maxAtInputNumber, setMaxAtInputNumber] = useState(15); // 可选择最大时长
  const [curDate, setCurDate] = useState(""); // 今日日期

  const [startTimeSel, setStartTimeSel] = useState(""); // 选择开始时间
  const [endTimeSel, setEndTimeSel] = useState(""); // 选择结束时间
  const [dateSel, setDateSel] = useState(""); // 选择的日期

  const { userInfo } = useSelector(state => state.main);

  const [experimentName, setExperimentName] = useState<any>([]); // 选择的实验项目名
  const [equipments, setEquipments] = useState<any>([]); // 工位列表
  const [choosedEid, setChoosedEid] = useState<any>(undefined); // 选择的实验项目id
  const [categorys, setCategorys] = useState<any>(undefined); // 实验项目下小分类列表
  const [phone, setPhone] = useState(""); // 手机号
  const [remark, setRemark] = useState(""); // 备注信息
  const [chooseCate, setChooseCate] = useState<any>(undefined);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 10);
  const maxDate = formatDate(tomorrow);
  // 预留信息
  const phoneChange = value => {
    setPhone(value);
    return value;
  };
  const remarkChange = value => {
    setRemark(value);
    return value;
  };

  useDidShow(() => {
    console.log("走到这", eid);
    if (!eid) {
      Taro.navigateTo({ url: "/pages/Main/index" });
      return;
    }
    setResidue(roomDefault);
    // const { params } = router;
    // const { eid } = params;
    // getData({ eid });
    handleGetExperimentnames();
    // handleGetEquipments();
    // 获取当前日期
    let curdate = currentDate();
    console.log("获取当前日期", curdate);
    // 设置当前日期可选择范围
    setCurDate(curdate);
    setDateSel(curdate);
  });
  // 获取实验项目名
  const handleGetExperimentnames = () => {
    getExperimentnames().then(res => {
      if (res.experiments && Array.isArray(res.experiments)) {
        setExperimentName(res.experiments);
        const firstEid = res.experiments[0].id;
        setChoosedEid(eid || firstEid);
      }
    });
  };

  // 获取工位列表（设备列表）
  const handleGetEquipments = (opt?: {
    eid: string;
    starttime?: string;
    endtime?: string;
  }) => {
    getEquipmentsService(falsyParamsFilter(opt)).then(res => {
      if (res.equipments && Array.isArray(res.equipments)) {
        setEquipments(res.equipments);
      }
    });
    const { eid } = opt || {};
    getExperimentcategorys(falsyParamsFilter({ eid })).then(res => {
      if (res.experimentcategorys && Array.isArray(res.experimentcategorys)) {
        setCategorys(res.experimentcategorys);
        if (cid) {
          const choosed = res.experimentcategorys.find(item => item.id == cid);
          setChooseCate(choosed);
        }
      }
    });
  };

  // 是否能预约
  const memoCanOrder = useMemo(() => {
    const res = equipments.find(item => item.canbook == 1) || false; // TODO

    return res;
  }, [equipments]);

  useEffect(() => {
    console.log({ startTimeSel, endTimeSel });
    if (choosedEid) {
      const starttime =
        dateSel && startTimeSel ? dateSel + " " + startTimeSel : undefined;
      const endtime =
        dateSel && endTimeSel ? dateSel + " " + endTimeSel : undefined;
      handleGetEquipments({ eid: choosedEid, starttime, endtime });
    }
  }, [choosedEid, dateSel, startTimeSel, endTimeSel, experimentName]);

  const handleChangeEid = (eid: string) => {
    setChoosedEid(eid);
  };

  const [residue, setResidue] = useState<any>([]); // 当日时间段剩余信息

  // 选择开始时间
  const residueClick = event => {
    let index = event.currentTarget.dataset.index;
    const _residue = [] as any[];
    let cur = { timer: "" };
    for (let i = 0; i < residue.length; i++) {
      // residue.length > 0 && residue[i]['status'] == 'Residue-warp-selector'
      if (residue[i].status != "Residue-warp-disabled") {
        if (i == index) {
          residue[i].status = "Residue-warp-selector";
          cur = residue[i];
        } else {
          residue[i].status = "Residue-warp";
        }
      }
      _residue.push(residue[i]);
    }

    setResidue([..._residue]);
    if (cur.timer) {
      // 计算可以选择的时长
      let _max = 1;
      for (let i = 0; i < _residue.length; i++) {
        if (parseInt(cur.timer) < parseInt(_residue[i].timer)) {
          if (_residue[i].status == "Residue-warp-disabled") {
            break;
          }
          _max++;
        }
      }

      setMaxAtInputNumber(_max);
      setStartTimeSel(cur.timer); // 设置开始时间
      if (timer > _max) {
        setTimer(_max);
        setEndTimeSel(parseInt(cur.timer) + _max + ":00"); // 设置结束时间
      } else {
        setEndTimeSel(parseInt(cur.timer) + timer + ":00");
      }
    } else {
      setStartTimeSel("请选择开始时间"); // 设置开始时间
      setEndTimeSel("--");
    }
    // 关闭选择开始时间弹窗
    // startTimeLayoutCloseFunc();
    // 开启选择时长弹层
    // setTimerLayout(true);
  };

  // 选择预约日期
  const onDateChange = e => {
    setDateSel(e.value);
  };

  const timerChange = value => {
    setTimer(value);
    setEndTimeSel(parseInt(startTimeSel) + value + ":00"); // 设置结束时间
    return value;
  };

  // useEffect(() => {
  //   setResidue(roomDefault);
  //   // const { params } = router;
  //   // const { eid } = params;
  //   // getData({ eid });
  //   handleGetExperimentnames();
  //   // handleGetEquipments();
  //   // 获取当前日期
  //   let curdate = currentDate();
  //   console.log("获取当前日期", curdate);
  //   // 设置当前日期可选择范围
  //   setCurDate(curdate);
  //   setDateSel(curdate);

  //   // 设置当前选中日期
  //   // onDateChange({value: curdate})
  //   // dispatch({ type: 'lease/getExperimentDetail', payload: { eid } });
  // }, []);

  const submitOrder = async () => {
    if (!chooseCate) {
      showToast("请选择项目");
      return;
    }

    if (!startTimeSel) {
      showToast("请选择开始时间");
      return;
    }
    if (!endTimeSel) {
      showToast("请选择时长时间");
      return;
    }
    if (!phone) {
      showToast("请填写手机");
      return;
    }
    const cate = chooseCate;
    const ep = memoCanOrder;
    const eid = cate.eid;
    // 获取实验详情
    const experimentsDetail = await getExperimentDetailService({ eid });
    console.log("experimentsDetail", experimentsDetail);
    // 获取工具
    const toolsBox = await getToolsService({ eid, istools: 1, ecid: cid });
    console.log("toolsBox", toolsBox);
    const choosedTools = toolsBox.toolboxs[0].tools;
    const toolsTotal = choosedTools.reduce((res,i) => {return parseFloat(i.price) +res} , 0);
    let eptotalprice = 0 as any;

    // let countPrice = parseFloat(eptotalprice) + (parseFloat(room.price)+parseFloat(experimentsDetail.deposit)) * timer;
    let h = timer;
    if (timer > 3) {
      h = 3;
    }
    // 设备租赁总价格
    console.log("开台费/设备费:", ep.price);
    console.log("时长：", h);
    console.log("门票：", experimentsDetail.deposit);
    console.log("押金", eptotalprice);
    console.log("工具金额之和", toolsTotal);
    let shebei = parseFloat(ep.price) * h;
    // 总价格
    let countPrice =
      parseFloat(eptotalprice) +
      parseFloat(categoryprice) +
      parseFloat(toolsTotal) +
      shebei +
      parseFloat(experimentsDetail.deposit) * 3; // * timer;

    // remark 大实验项目+小试验项目
    const remark1 = remark || experimentsDetail.title + " " + cate.title;
    let params = {
      eid: experimentsDetail.id,
      edeposit: parseFloat(experimentsDetail.deposit) * 3, //parseFloat(eptotalprice),// 押金 parseFloat(experimentsDetail.deposit),//*timer,//parseFloat(eptotalprice),
      epid: ep.id,
      eptotalprice: shebei,
      categoryprice:categoryprice,
      starttime: dateSel + " " + startTimeSel,
      endtime: dateSel + " " + endTimeSel,
      uphone: phone || userInfo.mobile || 13333333333,
      title: experimentsDetail.title,
      total: countPrice,
      totalpay: countPrice,
      tools: JSON.stringify({tools: choosedTools}),
      ecid: cate.id,
      remark: remark1
    };

    if (!params.epid) {
     // showToast("请选择工作台");
     showToast("已过选择时间，请选择正确时间")
      return;
    }
    if (params.starttime == " 请选择开始时间") {
      showToast("请选择开始时间");
      return;
    }
    if (params.endtime == " --") {
      showToast("请选择时长");
      return;
    }
    if (!params.uphone) {
      showToast("请填写手机号");
      return;
    }
    console.log("接口请求参数：", params);
    orderadd(params).then(res => {
      Taro.navigateTo({
        url:
          "/pages/LeaseOrder/index?orderId=" +
          res.oid +
          "&identity=my" +
          "&xly=" +
          JSON.stringify(res.xly)
      });
    });
  };
  console.log("memoCanOrder", memoCanOrder);
  return (
    <View className="lease-warp">
      <View className="lease-warp-inner">
        <View className="at-article lease-title">
          <View className="lease-calendar">
            <AtCalendar
              size="small"
              isSwiper
              minDate={curDate}
              onDayClick={onDateChange}
              maxDate={maxDate}
            />
          </View>
          <View className="lease-rooms">
            {residue.map((item, index) => (
              <View key={index} onClick={residueClick} data-index={index}>
                <View className={`${item.status}`}>
                  <View className="Residue-money"></View>
                  <View className="Residue-timer">
                    <View className="jb-text">{item.timer}</View>
                  </View>
                  <View className="Residue-name"></View>
                </View>
              </View>
            ))}
          </View>
          <View className="lease-selector-timer">
            <View className="lease-selector-timer-num">
              <View className="jb-text">时长：</View>
              <AtInputNumber
                type="number"
                disabledInput
                min={1}
                max={maxAtInputNumber}
                step={1}
                value={timer}
                onChange={timerChange}
                disabled
              />
              <View className="jb-text">（工时）</View>
            </View>
            <View className="lease-selector-res">
              <View className="start-time">
                <View className="start-time-num fdhz">
                  {startTimeSel || "请选择开始时间"}
                </View>
                <View className="start-time-desc fdhz">起始时间</View>
              </View>
              <View className="center-symbol">~</View>
              <View className="end-time">
                <View className="end-time-num fdhz">{endTimeSel || "--"}</View>
                <View className="end-time-desc fdhz">结束时间</View>
              </View>
            </View>
          </View>
          {/* <View className='lease-rooms'>
                        {experimentName.map((item, index) => (
                            // <View className='experimentNameTag' data-index={index}>{item.title}</View>
                            <View className='experimentNameTag-con'>
                                <AtTag
                                    key={item.id}
                                    active={item.id !== choosedEid}
                                    type={item.id == choosedEid ? 'primary' : ''}
                                    circle
                                    size='normal'
                                    onClick={() => { handleChangeEid(item.id); }}
                                ><View className='experimentNameTag jb-text'>{item.title}</View></AtTag>
                            </View>

                        ))}
                    </View> */}
          <View className="LeaseHr"></View>
          {/* 实验小项列表 */}
          <View className="sy-wrap">
            {/* {(categorys || []).map((item, index) => {
              return (
                <View
                  className={
                    chooseCate.id === item.id
                      ? "sy-line at-row  at-row__align--center sy-line-choose"
                      : "sy-line at-row  at-row__align--center"
                  }
                  key={item.id}
                  onClick={() => setChooseCate(item)}
                >
                  <View className="at-col at-col-6" style={{ height: "100%" }}>
                    <Image
                      mode="aspectFill"
                      src={item.pic}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>
                  <View className="at-col at-col-1"></View>
                  <View
                    className="at-col at-col-5"
                    style={{ overflowX: "scroll" }}
                  >
                    <View className="sy-title">
                      <View className="fdhz cz">{item.title}</View>
                    </View>
                    <View className="sy-desc">
                      <View className="fdhz">{item.des}</View>
                    </View>
                  </View>
                </View>
              );
            })} */}

            <View className="at-article lease-title">
              <View className="at-article lease-h2">
                <View className="lease-h2-icon"></View> {chooseCate.remark || ""}
              </View>
            </View>
            <View className="at-article lease-title">
              {/* <View className="at-article lease-h2">
                <View className="lease-h2-icon"></View>预留信息
              </View> */}
              <View className="lease-selector-timer">
                <AtInput
                  name="phone"
                  border={false}
                  title="手机号码"
                  type="phone"
                  placeholder="手机号码"
                  value={phone}
                  onChange={phoneChange}
                />
                <AtInput
                  name="remark"
                  title="备注"
                  type="text"
                  placeholder="请填写备注信息"
                  value={remark}
                  onChange={remarkChange}
                />
              </View>
            </View>
            <View className="lease-sub-info">
              <View className="title">{chooseCate.title || ""}</View>
              <AtButton
                className="sub-btn"
                onClick={submitOrder}
                type="primary"
              >
                提交
              </AtButton>
            </View>
            <View className="LeaseBottom"></View>
            <View className="LeaseBottom"></View>
            <View className="LeaseBottom"></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Lease;
