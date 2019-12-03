import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Response as TestVersionResponse } from '../../libs/API/testversion';
import { APIListTestVersion } from '../../libs/API/testversion';
import { message, Table, Button } from 'antd';
import GetColumns from '../../components/workbench/testversion';
import MainLayout from '../../components/Layout';
import styled from 'styled-components';
import { withAuthCheck } from '../../libs/withCSRAuth';
import { withRedux } from '../../libs/withRedux';
import ModalFormCreateTestVersion from '../../components/workbench/testversion/form';
import { NewButton } from '../../components/Common/Button';
import { Moment } from 'moment';
import { APICreateTestVersions } from '../../libs/API/create_testversion';
type data = TestVersionResponse['data'][0];
const VertBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemBox = styled.div`
  margin: 0.5rem;
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function testVersion() {
  const [versions, setVersions] = useState<TestVersionResponse>({
    code: 0,
    data: [],
  });
  const GetTestVersionList = useCallback(() => {
    APIListTestVersion(
      res => setVersions(res.data),
      () => message.error('网络错误')
    );
  }, []);
  const Actions: (props: { record: data }) => JSX.Element = ({ record }) => {
    const Item = (props: { name: string; value: string }) => (
      <ItemBox>
        <span>{props.name}:</span>
        <span>{props.value}</span>
        <Button shape={'circle'} icon={'download'} type="primary" />
      </ItemBox>
    );

    return (
      <VertBox>
        {record.fullPackName.length > 0 ? (
          <Item name={'全量包'} value={record.fullPackName} />
        ) : null}
        {record.firmwareName.length > 0 ? (
          <Item name={'固件包'} value={record.firmwareName} />
        ) : null}
        {record.algorithmName.length > 0 ? (
          <Item name={'算法包'} value={record.algorithmName} />
        ) : null}
      </VertBox>
    );
  };
  const columns = useMemo(() => GetColumns(Actions), [Actions]);
  const [modal, setModal] = useState(false);
  useEffect(() => GetTestVersionList(), []);

  return (
    <MainLayout>
      <ModalFormCreateTestVersion
        onSubmit={e => {
          const payload = {
            ...e,
            createTime: (e.createTime as Moment).format('YYYY-MM-DD'),
          };
          APICreateTestVersions(payload)
            .then(res => {
              message.success('创建成功');
              GetTestVersionList();
              setModal(false);
            })
            .catch(() => message.error('网络错误'));
        }}
        modal={{
          title: '发布版本',
          visible: modal,
          onCancel: () => setModal(false),
        }}
      />
      <NewButton onClick={() => setModal(true)}>创建测试版本</NewButton>
      <Table dataSource={versions.data} columns={columns} />
    </MainLayout>
  );
}

export default withAuthCheck(withRedux(testVersion));
