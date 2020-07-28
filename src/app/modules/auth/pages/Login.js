import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { login, MODULE_STATE_NAME, reducer } from './reducer';
import { selectAuth } from './selectors';
import { useInjectReducer } from '../../../../_core/utils/injectReducer';
import { useInjectSaga } from '../../../../_core/utils/injectSaga';

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
