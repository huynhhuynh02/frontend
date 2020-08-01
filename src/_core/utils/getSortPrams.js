export default function getSortParams(field, order) {
  return `${field}:${order === 'ascend' ? 'asc' : 'desc'}`;
}
