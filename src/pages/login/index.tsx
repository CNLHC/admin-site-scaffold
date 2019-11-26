import { Input, Button, Row, Col, Form, Icon, Checkbox, message } from 'antd';
import styled from 'styled-components';
import { FormProps } from 'antd/lib/form';
import Axios from 'axios';
import Router from 'next/router';

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
  background: #fff;
  padding: 2rem 2rem 1rem 2rem;
  border-radius: 0.5rem;
`;

const TitleBox = styled.div`
  font-size: 24pt;
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
`;

const Page = ({ form }: FormProps) => {
  const { getFieldDecorator } = form;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, value) => {
      if (err) return;
      Axios.post('/api/login', value)
        .then(res => {
          console.log(`sttOken ${res.data.token}`);
          sessionStorage.setItem('jwt', res.data.token);
          Router.replace('/index');
        })
        .catch(e => {
          form.resetFields();
          return message.error('登陆错误');
        });
    });
  };
  return (
    <RootRow gutter={{ xs: 4, sm: 8 }}>
      <LoginColumn xs={20} sm={10} lg={5}>
        <LoginBox>
          <TitleBox>FastEval</TitleBox>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', { rules: [{ required: true }] })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', { rules: [{ required: true }] })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox>保持登陆</Checkbox>
                <a className="login-form-forgot" href="">
                  忘记密码
                </a>
              </div>
              <div>
                <Button
                  block
                  type="primary"
                  className="login-form-button"
                  onClick={handleSubmit}
                >
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

export default Form.create()(Page);
