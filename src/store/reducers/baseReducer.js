const defaultState = {
  appLoading: true,
};

export const baseApp = (state = defaultState, action) => {
  switch (action.type) {
    case "persist/REHYDRATE": {
      return { ...state, appLoading: false };
    }
    default:
      return state;
  }
};
