export function resetSettings() {
  return {
    type: 'RESET_SETTINGS',
  };
}
export function searchItems(query) {
  return {
    type: 'SEARCH_ITEMS',
    query,
  };
}
export function sortItems(sortBy) {
  return {
    type: 'SORT_ITEMS',
    sortBy: {
      sortBy: sortBy.sortBy,
      ascDesc: sortBy.ascDesc,
    },
  };
}
export function filterItems(filter) {
  return {
    type: 'FILTER_ITEMS',
    filter,
  };
}
export function viewMode(viewMode) {
  return {
    type: 'CHANGE_VIEW_MODE',
    viewMode,
  };
}
