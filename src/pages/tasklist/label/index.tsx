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

type data = Response['data'];
export default function index() {
  const [taskInfos, setTaskinfo] = useState<TaskInfo[]>([]);
  const [meta, setMeta] = useState<data | undefined>(undefined);
  const router = useRouter();
  console.log(router.query);
  const id = router.query.id ? (router.query.id as string) : undefined;
  console.log(id);

  useEffect(() => {
    if (id) {
      APIGetRelationalSDK(id).then(res => {
        setTaskinfo(res.data.data.taskInfo);
        setMeta(res.data.data);
      });
    }
  }, []);

  return (
    <MainLayout>
      {taskInfos[0] ? (
        <LabelBox
          taskinfo={taskInfos[0]}
          onCommit={payload => console.log(payload)}
        />
      ) : null}
    </MainLayout>
  );
}
