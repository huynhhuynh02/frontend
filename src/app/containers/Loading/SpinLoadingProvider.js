import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { makeLoadingSelector } from 'app/containers/Loading/loading.selector';

function SpinLoadingProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const isLoading = useSelector(makeLoadingSelector);
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      {children}
    </Spin>
  );
}

SpinLoadingProvider.propTypes = {};
SpinLoadingProvider.defaultProps = {};

export default SpinLoadingProvider;
