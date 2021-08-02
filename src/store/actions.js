import requestHandler from '../helpers/requestHandler';

export const init = (data) => {
  return dispatch => {
      dispatch({ type: 'INIT', data });
  }
};

export const setPrerequisites = (prerequisites) => {
  return dispatch => {
    dispatch({ type: 'SET_PREREQUISITES', prerequisites });
  }
};

export const setMortgage = (mortgage) => {
  return dispatch => {
    dispatch({ type: 'SET_MORTGAGE', mortgage });
  }
};

export const deleteMortgage = (id) => {
  return dispatch => {
    dispatch({ type: 'DELETE_MORTGAGE', id });
  };
};

export const setRealty = (realty) => {
  return dispatch => {
    dispatch({ type: 'SET_REALTY', realty });
  }
};

export const deleteRealty = (id) => {
  return dispatch => {
    dispatch({ type: 'DELETE_REALTY', id });
  };
};

export const deleteAllRealties = () => {
  return dispatch => {
    dispatch({ type: 'DELETE_ALL_REALTIES' })
  };
};

export const setPlans = (requestData, successFunction, failFunction) => {
  return dispatch => {
    requestHandler({
      method: 'post',
      url: '/count',
      requestData,
      actions: {
        success: (response) => {
          dispatch({ type: 'SET_PLANS', response })
          if (successFunction && typeof successFunction === 'function') successFunction(response);
        },
        fail: (error) => {
          if (failFunction && typeof failFunction === 'function') failFunction(error);
        }
      }
    });
  };
};

export const deletePlans = (realties, mortgages) => {
  return dispatch => {
    dispatch({ type: 'DELETE_PLANS', realties, mortgages });
  };
};

export const deleteAllPlans = () => {
  return dispatch => {
    dispatch({ type: 'DELETE_ALL_PLANS' });
  };
};
