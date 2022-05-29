// Export Constants
export const TOGGLE_ADD_CAMPAIGN = 'TOGGLE_ADD_CAMPAIGN';

export const ADD_CAMPAIGN_REQUEST = 'ADD_CAMPAIGN_REQUEST';
export const ADD_CAMPAIGN_SUCCESS = 'ADD_CAMPAIGN_SUCCESS';
export const ADD_CAMPAIGN_FAILURE = 'ADD_CAMPAIGN_FAILURE';

// Export Actions
export function toggleAddCampaign() {
  return {
    type: TOGGLE_ADD_CAMPAIGN,
  };
}

function addCampaignRequest() {
  return {
    type: ADD_CAMPAIGN_REQUEST,
  };
}

function addCampaignFailure() {
  return {
    type: ADD_CAMPAIGN_FAILURE,
  };
}

function addCampaignSuccess(campaign) {
  return {
    type: ADD_CAMPAIGN_SUCCESS,
    campaign,
  };
}

export function addCampaign(campaign) {
  return (dispatch) => {
    dispatch(signupRequest());
    return fetch(`${API_URL}/users/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          chatName: user.chatName,
          email: user.email,
          password: user.password,
        },
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        dispatch(signupSuccess(response.token, response.user));
      })
      .catch((error) => {
        if (error) {
          dispatch(signupFailure());
        }
      });
  };
}
