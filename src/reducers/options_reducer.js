function options(state = [], action) {
  switch (action.type) {
    case 'SEARCH_ITEMS':
      const searchState = { ...state };
      searchState.query = action.query;
      return searchState;

    case 'SORT_ITEMS':
      const sortState = { ...state };
      sortState.sortBy = action.sortBy;
      return sortState;

    case 'FILTER_ITEMS':
      const filterState = { ...state };
      filterState.filter = action.filter;
      return filterState;

    case 'CHANGE_VIEW_MODE':
      const viewState = { ...state };
      viewState.viewMode = action.viewMode;
      return viewState;
    default:
      return state;
  }
}

export default options;
