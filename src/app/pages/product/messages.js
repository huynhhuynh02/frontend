import { defineMessages } from 'react-intl';
import { MODULE_STATE_NAME } from 'app/pages/product/constants';

export const scope = MODULE_STATE_NAME;

export default defineMessages({
  menuTitle: {
    id: `${scope}.menuTitle`,
    defaultMessage: 'Product',
  },
});
