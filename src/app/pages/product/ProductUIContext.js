import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from 'app/pages/product/constants';

const ProductUIContext = createContext();

export function useProductUIContext() {
  return useContext(ProductUIContext);
}

export const ProductUIConsumer = ProductUIContext.Consumer;

export function ProductUIProvider({ uiEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    onNew: uiEvents.onNew,
    onEdit: uiEvents.onEdit,
    onDelete: uiEvents.onDelete,
    onCancel: uiEvents.onCancel,
  };

  return (
    <ProductUIContext.Provider value={value}>
      {children}
    </ProductUIContext.Provider>
  );
}
