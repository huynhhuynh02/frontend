import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import { useDispatch } from 'react-redux';
import { login, MODULE_STATE_NAME, reducer } from './reducer';
import { useInjectReducer } from '../../../../_core/utils/injectReducer';

const Wrapper = styled.div`
  margin: auto;
  width: 400px;
  padding: 20px;
  text-align: center;
`;

function Login() {
  // useInjectSaga({key: MODULE_STATE_NAME, saga});
  const dispatch = useDispatch();

  useInjectReducer({ key: MODULE_STATE_NAME, reducer });

  return (
    <Wrapper>
      <h1>Login Page</h1>
      <Button
        onClick={() =>
          dispatch(
            login('test Token', {
              name: 'Le Canh',
            }),
          )
        }
      >
        Login
      </Button>
    </Wrapper>
  );
}

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
