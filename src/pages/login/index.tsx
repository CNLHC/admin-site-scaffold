import { Input, Button, Row, Col, Form, Icon, Checkbox } from 'antd';
import styled from 'styled-components';

const RootRow = styled(Row)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
`;

const LoginColumn = styled(Col)`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 100%;
  background: #fff
`;

const Page = props => {
  const handleSubmit = e => {
    console.log(e);
  };
  return (
    <RootRow gutter={{ xs: 4, sm: 8 }}>
      <LoginColumn xs={20} sm={10} lg={5}>
        <LoginBox>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox>保持登陆</Checkbox>
                <a className="login-form-forgot" href="">
                  忘记密码
                </a>
              </div>
              <div>
                <Button block type="primary" className="login-form-button">
                  登陆
                </Button>
                <a href="">注册</a>
              </div>
            </Form.Item>
          </Form>
        </LoginBox>
      </LoginColumn>
    </RootRow>
  );
};

export default Page;
