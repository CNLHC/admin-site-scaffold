import React, { useMemo, useState, useCallback, useEffect } from 'react';
import MainLayout from '../../components/Layout';
import { GetColumns } from '../../components/workbench/videoList';
import { Form, message, Button } from 'antd';
import getEditableTable, {
  TActions,
} from '../../components/Common/EdiableTable';
import {
  Response as VideoResponse,
  APIListVideo,
} from '../../libs/API/videolist';
import styled from 'styled-components';
import { withAuthCheck } from '../../libs/withCSRAuth';
type Data = VideoResponse['data'][0];

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

function taskList() {
  const [videos, setVideos] = useState<VideoResponse>({
    code: 0,
    data: [],
  });
  const ListVideo = useCallback(
    () =>
      APIListVideo(
        res => setVideos(res.data),
        () => message.error('获取失败')
      ),
    []
  );

  useEffect(() => ListVideo(), []);

  const Columns = useMemo(() => GetColumns(), []);
  const Actions: TActions<Data> = ({ record, form, method }) => {
    const { edit, isEditing, cancel } = method;
    return !isEditing(record) ? (
      <ButtonBox>
        <Button type={'link'} onClick={() => edit(record)}>
          编辑
        </Button>
        <Button type={'link'}>下载</Button>
      </ButtonBox>
    ) : (
      <ButtonBox>
        <Button type={'link'} onClick={() => {}}>
          提交
        </Button>
        <Button type={'link'} onClick={() => cancel()}>
          取消
        </Button>
      </ButtonBox>
    );
  };

  const EditableFormTable = useMemo(
    () =>
      Form.create<any>()(
        getEditableTable(Actions, Columns, {
          rowKey: e => e.videoID.toString(),
        })
      ),
    [Columns]
  );
  return (
    <MainLayout>
      <EditableFormTable data={videos.data} />
    </MainLayout>
  );
}

export default withAuthCheck(taskList);
