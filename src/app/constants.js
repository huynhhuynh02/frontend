export const DEBOUNCING_TIME_AUTO_SEARCH = 2000;
export const API_URL = '/api';
export const DEFAULT_PAGING = {
  page: 1,
  size: 10,
  sorts: [],
};

export const PERMISSION = {
  PRODUCT: {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4,
  },
  CUSTOMER: {
    CREATE: 5,
    READ: 6,
    UPDATE: 7,
    DELETE: 8,
  },
  ORDER: {
    SALE: {
      CREATE: 9,
      READ: 10,
      UPDATE: 11,
      DELETE: 12,
    },
    PURCHASE: {
      CREATE: 25,
      READ: 26,
      UPDATE: 27,
      DELETE: 28,
    },
  },
  INVENTORY: {
    GOODS_RECEIPT: {
      CREATE: 13,
      READ: 14,
      UPDATE: 15,
      DELETE: 16,
    },
    GOODS_ISSUE: {
      CREATE: 21,
      READ: 22,
      UPDATE: 23,
      DELETE: 24,
    },
  },
  WAREHOUSE: {
    CREATE: 17,
    READ: 18,
    UPDATE: 19,
    DELETE: 20,
  },
  COST: {
    CREATE: 29,
    READ: 30,
    UPDATE: 31,
    DELETE: 32,
  },
};
