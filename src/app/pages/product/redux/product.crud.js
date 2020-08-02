import { crudRequest } from '_core/utils/api.util';

const API_ENDPOINT_URL = `product`;
const productApi = crudRequest(API_ENDPOINT_URL);

export default productApi;
