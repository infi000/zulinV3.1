import Taro, {
  useState,
  useEffect,
  useDidShow,
  useRouter,
  useMemo
} from "@tarojs/taro";
import {
  View
} from "@tarojs/components";
import {
  AtInput,
  AtButton,
  AtInputNumber,
  AtCalendar,
  AtFloatLayout,
  AtAvatar
} from "taro-ui";
import { useSelector } from "@tarojs/redux";
import {
  currentDate,
  falsyParamsFilter,
  showSuccessToast,
  showToast
} from "@/utils/util";

import "../../Lease/index.scss";

import {
  getExperimentDetailService,
  getEquipmentsService,
  getToolsService,
  orderadd,
  getExperimentnames,
  getExperimentcategorys,
  getTeacherStatusList
} from "../../Lease/services";
import { postXlPreOrder } from "../services";
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

interface IProps {
  oid: string;
  eid: string;
  cid: string;
  duration: any;
  categoryprice: any;
  handleBack: any;
  show: boolean
}
const HX = (props: IProps) => {
  const { eid, cid, duration, categoryprice, show, handleBack, oid } = props || {};
  console.log('{ eid, cid, duration, categoryprice } ', { eid, cid, duration, categoryprice })
  const [timer, setTimer] = useState(1); // 预约市场，单位：小时
  const [maxAtInputNumber, setMaxAtInputNumber] = useState(duration); // 可选择最大时长
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
  const [teacherList, setTeacherList] = useState<any>(undefined);
  const [choosedTea, setChoosedTea] = useState<any>({})
  const [teacherShow, setTeacherShow] = useState(false)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 10);
  const maxDate = formatDate(tomorrow);


  const memoTea = useMemo(() => {
    let t: any = [];
    if (Array.isArray(teacherList) && teacherList.length > 0) {
      t = teacherList
    }
    return t;
  }, [JSON.stringify(teacherList)])
  // 预留信息
  const phoneChange = value => {
    setPhone(value);
    return value;
  };
  const remarkChange = value => {
    setRemark(value);
    return value;
  };

  useEffect(() => {
    if(show){
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
    }
  },[show]);
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
    const { starttime, endtime } = opt || {};

    if (cid && starttime && endtime) {
      getTeacherStatusList(falsyParamsFilter({ cid, starttime, endtime })).then(res => {
        if (res.teacherlist && Array.isArray(res.teacherlist)) {
          setTeacherList(res.teacherlist);
        }
      });
    }

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

      if (timer > _max) {
        showToast("预约时长不足" + timer + "小时", 200);
        return
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


  const handleChooseTeacher = (item) => {
    const { id } = item;
    if (id == choosedTea.id) {
      setChoosedTea({});
    } else {
      setTeacherShow(true)
      setChoosedTea(item);
    }
  };

  const submitOrder = async () => {

    if (!startTimeSel) {
      showToast("请选择开始时间");
      return;
    }
    if (!endTimeSel) {
      showToast("请选择时长时间");
      return;
    }

    let p = {
      oid,
      starttime: dateSel + " " + startTimeSel,
      endtime: dateSel + " " + endTimeSel,
    }

    if (p.starttime == " 请选择开始时间") {
      showToast("请选择开始时间");
      return;
    }
    if (p.endtime == " --") {
      showToast("请选择时长");
      return;
    }

    console.log("接口请求参数：", p);
    postXlPreOrder(p).then(res => {
      showSuccessToast('提交成功');
      setTimeout(() => {
        handleBack();
      }, 500);
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
                max={duration}
                step={1}
                value={timer}
                onChange={timerChange}
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
          <View className="LeaseHr"></View>
          {/* 实验小项列表 */}
          {/* <View className="sy-wrap">
            <View className="at-article lease-title">
              <View className="at-article lease-h2">
                <View className="lease-h2-icon"></View>
                请选择授权老师
              </View>
              <View className='at-row at-row--wrap'>
                {
                  memoTea.map((item, index) => {
                    let dis = item.dstatus == 0 ? '' : 'teacherChooseDisabled';
                    let choose = item.id === choosedTea.id ? 'teacherChooseCon-choose' : '';
                    return <View className={'at-col at-col-4 teacherChooseCon ' + dis + '' + choose} key={index} onClick={() => handleChooseTeacher(item)}>
                      <AtAvatar image={item.head} className="teacherChooseCon-img" size="normal"></AtAvatar>
                      <View className="teacherChooseCon-name">{item.teaname}</View>
                      <View className="teacherChooseCon-price">{item.price}/课时</View>
                    </View>
                  })
                }
              </View>
            </View>
          </View> */}
          <View className="LeaseHr"></View>
          {/* 实验小项列表 */}
          <View className="sy-wrap">
            {/* <View className="at-article lease-title">
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
            </View> */}
            <View className="LeaseBottom">
            <AtButton
                className="sub-btn"
                onClick={submitOrder}
                type="primary"
              >
                提交
              </AtButton>
            </View>
            <View className="LeaseBottom"></View>

            <View className="LeaseHr"></View>
            <View className="LeaseBottom">
            <AtButton
                className="sub-btn"
                onClick={handleBack}
                type="primary"
              >
                返回
              </AtButton>
            </View>
            <View className="LeaseBottom"></View>
            <View className="LeaseBottom"></View>
          </View>
        </View>
      </View>
      <AtFloatLayout isOpened={teacherShow} title={choosedTea.name} onClose={() => setTeacherShow(false)}>
        <View className='at-article'>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <View className='at-article__h3'>{choosedTea.teaname}</View>
              <View className='at-article__p'>{choosedTea.remark}</View>
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  );
};

export default HX;
