//TODO: do this in a non-duplicated way - see store.js :/
const defautSettings = {
  viewMode: 'grid',
  query: '',
  sortBy: {
    sortBy: 'artist',
    ascDesc: 'asc'
  },
  filter: 'all'
};

function options(state = [], action) {
  switch (action.type) {
    case 'RESET_SETTINGS':
      window.scrollTo(0, 0);
      return defautSettings;

    case 'SEARCH_ITEMS':
      const searchState = { ...state };
      searchState.query = action.query;
      return searchState;

    case 'SORT_ITEMS':
      const sortState = { ...state };
      //TODO: surely do in line line:
      sortState.sortBy = action.sortBy;
      sortState.ascDesc = action.ascDesc;
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
