import { DEFAULT_PAGING } from 'app/constants';

export const MODULE_STATE_NAME = 'yoctoErp__product';

export const initialFilter = {
  ...DEFAULT_PAGING,
  sorts: 'lastModifiedDate:desc',
  search: '',
  startDate: '',
  endDate: '',
};
