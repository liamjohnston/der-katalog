export function searchItems(query) {
  return {
    type: 'SEARCH_ITEMS',
    query
  };
}
export function sortItems(sortBy) {
  return {
    type: 'SORT_ITEMS',
    sortBy
  };
}
export function filterItems(filter) {
  return {
    type: 'FILTER_ITEMS',
    filter
  };
}
export function viewMode(viewMode) {
  return {
    type: 'CHANGE_VIEW_MODE',
    viewMode
  };
}
