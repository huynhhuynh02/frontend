import loadable from '_core/utils/loadable';

import React from 'react';

const CostPageLazy = loadable(() => import('./CostMainPage'));

function CostManagementLazyPage(props) {
  return <CostPageLazy {...props} />;
}

export default CostManagementLazyPage;
