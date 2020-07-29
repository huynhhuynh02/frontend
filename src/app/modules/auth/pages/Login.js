import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import { useDispatch } from 'react-redux';
import { Layout, Row, Col } from 'antd';
import { Form, Input, FormItem, SubmitButton, ResetButton } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useInjectReducer } from '../../../../_core/utils/injectReducer';
import { login, MODULE_STATE_NAME, reducer } from './reducer';
import * as authService from './auth.service';
import FormError from '../../../../_core/components/form/FormError';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Wrapper = styled.div`
  margin: auto;
  max-width: 600px;
  width: 90%;
  padding: 40px;
  border: 1px solid #cccccc;
  background: white;
`;

const Title = styled.h1`
  padding-bottom: 20px;
  text-align: center;
`;

function Login() {
  // useInjectSaga({key: MODULE_STATE_NAME, saga});
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  useInjectReducer({ key: MODULE_STATE_NAME, reducer });

  return (
    <Layout style={{ height: '100vh' }}>
      <Wrapper>
        <Title>Yocto ERP</Title>
        <FormError errors={errors} />
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={async values => {
            setErrors(null);
            try {
              console.log(values);
              const resp = await authService.login({
                username: values.username,
                password: values.password,
              });
              console.log(resp);
              dispatch(login(resp.token, resp.user));
            } catch (e) {
              console.error(e);
              setErrors(e);
            }
          }}
        >
          <Form {...layout} colon={false} labelAlign="right" name="basic">
            <FormItem name="username" required label="Username">
              <Input name="username" placeholder="Username" />
            </FormItem>
            <FormItem name="password" label="Password">
              <Input.Password placeholder="Password" name="password" />
            </FormItem>
            <Row style={{ paddingTop: 60 }}>
              <Col offset={8}>
                <Button.Group>
                  <ResetButton>Reset</ResetButton>
                  <SubmitButton>Submit</SubmitButton>
                </Button.Group>
              </Col>
            </Row>
          </Form>
        </Formik>
      </Wrapper>
    </Layout>
  );
}

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
