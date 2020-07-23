import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from './constants';

const InventoryWarehoursesUIContext = createContext();

export function useInventoryWarehousesUIContext() {
  return useContext(InventoryWarehoursesUIContext);
}

export const InventoryWarehousesUIConsumer =
  InventoryWarehoursesUIContext.Consumer;

export function InventoryWarehousesUIProvider({ uiEvents, children }) {
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
    <InventoryWarehoursesUIContext.Provider value={value}>
      {children}
    </InventoryWarehoursesUIContext.Provider>
  );
}
