import { TOGGLE_ADD_CAMPAIGN } from './DashboardActions';

// Initial State
const initialState = {
  showCampaignDialog: false,
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_CAMPAIGN:
      return {
        ...state,
        showCampaignDialog: !state.showCampaignDialog,
      };

    default:
      return state;
  }
};

/* Selectors */
export const getDashboardState = (state) => state;

// Export Reducer
export default DashboardReducer;
