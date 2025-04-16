import { View, Image } from '@tarojs/components';
import Taro, { useState, useEffect, useDidShow, useRouter, useMemo } from '@tarojs/taro';
import { AtButton, AtCalendar, AtFloatLayout } from 'taro-ui';
import '../index.scss';
import { getTeaworklistService } from '../services';

// status:1上班，2加班
const statusMap = {
  1: '上班',
  2: '加班'
}

const TeacherInfo = (props: any) => {
  const { choosedTea, onClose, isOpened } = props;
  const [list, setList] = useState([])
  useEffect(() => {
    if (choosedTea.id && isOpened) {
      getTeaworklistService({ teaid: choosedTea.id }).then((d: any) => {
        if (Array.isArray(d.teaworklist)) {
          setList(d.teaworklist)
        }
      })
    }
  }, [choosedTea.id])
  console.log({ list, choosedTea })
  return (
    <AtFloatLayout isOpened={isOpened} title={choosedTea.name} onClose={onClose}>
      {
        isOpened && <View className='at-article'>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <Image
                className='at-article__img'
                src={choosedTea.detailimg}
                mode='widthFix' />
            </View>
            <View className='at-article__section'>
              {
                list.map((item: any) => {
                  return (
                    <View className='teacher-info-wrap'>
                      {item.cdate} - {statusMap[item.status] || '-'}
                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>
      }
    </AtFloatLayout>
  );
};

export default TeacherInfo;
