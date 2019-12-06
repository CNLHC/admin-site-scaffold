import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/Layout';
import {
  SubmitButton,
  ImageCol,
  ImageRow,
  CheckAbleImage,
} from '../../../components/tasklist/Common';
import {
  APIGetRelationalSDK,
  Response,
  TaskInfo,
} from '../../../libs/API/get_relationalsdk';
import { useRouter } from 'next/router';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { StaticRoot } from '../../../libs/constant/conf';
import styled from 'styled-components';
import LabelBox from '../../../components/tasklist/label/LabelBox';
import { APICommit } from '../../../libs/API/commit';
import { message, Modal } from 'antd';
import { APIFilterCapture } from '../../../libs/API/filter_capture';
import { withRedux } from '../../../libs/withRedux';

type data = Response['data'];
function index() {
  const [taskInfos, setTaskinfo] = useState<TaskInfo[]>([]);
  const [meta, setMeta] = useState<data | undefined>(undefined);
  const [allCap, setAllCap] = useState<string[]>();

  const router = useRouter();
  const id = router.query.id ? (router.query.id as string) : undefined;
  const Jump = () =>
    Modal.warning({
      title: '已经完成标注',
      content: '点击确定跳转到检查页面',
      onOk() {
        router.push(`/tasklist/check?id=${id}`);
      },
    });
  useEffect(() => {
    if (id)
      APIFilterCapture(id)
        .then(res => setAllCap(res.data.data.capture))
        .catch(() => message.error('错误'));
  }, [id]);

  useEffect(() => {
    if (id) {
      APIGetRelationalSDK(id).then(res => {
        const { taskInfo } = res.data.data;
        if (taskInfo.length > 0) {
          setTaskinfo(res.data.data.taskInfo);
          setMeta(res.data.data);
        } else {
          Jump();
        }
      });
    }
  }, [id]);

  return (
    <MainLayout>
      {taskInfos[0] ? (
        <LabelBox
          taskinfo={taskInfos[0]}
          AllCap={allCap}
          onCommit={payload =>
            APICommit({
              taskid: meta.taskID.toString(),
              ...payload,
            })
              .then(() => {
                message.success('标注成功');
                if (taskInfos.length === 1) {
                  Jump();
                } else {
                  setTaskinfo(e => [...e.slice(1, e.length)]);
                }
              })
              .catch(err => message.error('网络错误'))
          }
        />
      ) : null}
    </MainLayout>
  );
}

export default withRedux(index);
