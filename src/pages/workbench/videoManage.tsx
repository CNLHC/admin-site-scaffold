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
import { NewButton } from '../../components/Common/Button';
import ModalFormCreateVideo from '../../components/workbench/videoManage';
import { UploadFile } from 'antd/lib/upload/interface';
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
  const [modal, setModal] = useState(false);
  return (
    <MainLayout>
      <ModalFormCreateVideo
        onSubmit={e => {
          let fd = new FormData();
          Object.entries(e).forEach(([k, v]) => {
            if (k === 'file') fd.append(k, (v[0] as UploadFile).originFileObj);
            else fd.append(k, v);
          });
          console.log(Array.from(fd.entries()));
        }}
        modal={{
          title: '发布版本',
          visible: modal,
          onCancel: () => setModal(false),
        }}
      />
      <NewButton onClick={() => setModal(true)}> 添加视频</NewButton>
      <EditableFormTable data={videos.data} />
    </MainLayout>
  );
}

export default withAuthCheck(taskList);
