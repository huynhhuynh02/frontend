import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from 'app/pages/warehouse/constants';

const WarehouseUIContext = createContext();

export function useWarehouseUIContext() {
  return useContext(WarehouseUIContext);
}

export const WarehouseUIConsumer = WarehouseUIContext.Consumer;

export function WarehouseUIProvider({ uiEvents, children }) {
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
    <WarehouseUIContext.Provider value={value}>
      {children}
    </WarehouseUIContext.Provider>
  );
}
