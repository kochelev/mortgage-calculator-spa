// TODO: make reducer as a dictionary

const initialState = {
  prerequisites: null,
  mortgages: {},
  realties: {},
  plans: {},
};

const handler = (updatedState) => {
  sessionStorage.setItem('data', JSON.stringify(updatedState));
  return updatedState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'INIT':
      const state_init = {
        ...state,
      };
      for (const [key, value] of Object.entries(action.data)) {
        state_init[key] = value;
      }
      return handler(state_init);

    case 'SET_PREREQUISITES':
      const state_set_prerequisites = {
        ...state,
        prerequisites: action.prerequisites
      };
      return handler(state_set_prerequisites);
    
    case 'SET_MORTGAGE':
      const state_set_mortgage = {
        ...state,
      };
      state_set_mortgage.mortgages[action.mortgage.id] = action.mortgage;
      return handler(state_set_mortgage);

    case 'DELETE_MORTGAGE':
      const new_mortgages = {
        ...state.mortgages,
      };
      delete new_mortgages[action.id.toString()];
      return handler({
        ...state,
        mortgages: new_mortgages,
      });

    case 'SET_REALTY':
      const state_set_realty = {
        ...state,
      };
      state_set_realty.realties[action.realty.id] = action.realty;
      return handler(state_set_realty);

    case 'DELETE_REALTY':
      const new_realties = {
        ...state.realties,
      };
      delete new_realties[action.id.toString()];
      return handler({
        ...state,
        realties: new_realties,
      });

    case 'DELETE_ALL_REALTIES':
      return handler({
        ...state,
        realties: {},
      });

    case 'SET_PLANS':
      const state_set_plans = {
        ...state,
        isRealtyListUpdated: true
      };
      for (const [rk, rlt] of Object.entries(action.response)) {
        if (rlt.without_mortgage) {
          if (state_set_plans.plans[rk.toString()]) {
            state_set_plans.plans[rk.toString()].without_mortgage = rlt.without_mortgage;
          } else {
            state_set_plans.plans[rk.toString()] = {};
            state_set_plans.plans[rk.toString()].without_mortgage = rlt.without_mortgage;
          }
        }
        if (rlt.with_mortgage) {
          for (const [mk, mrg] of Object.entries(rlt.with_mortgage)) {
            if (state_set_plans.plans[rk.toString()]) {
              if (state_set_plans.plans[rk.toString()].with_mortgage) {
                state_set_plans.plans[rk.toString()].with_mortgage[mk] = mrg;
              } else {
                state_set_plans.plans[rk.toString()].with_mortgage = {};
                state_set_plans.plans[rk.toString()].with_mortgage[mk] = mrg;
              }
            } else {
              state_set_plans.plans[rk.toString()] = {};
              state_set_plans.plans[rk.toString()].with_mortgage = {};
              state_set_plans.plans[rk.toString()].with_mortgage[mk] = mrg;
            }
          }
        }
      }
      return handler(state_set_plans);

    case 'DELETE_PLANS':
      const new_plans = {
        ...state.plans
      }
      if (action.realties) {
        action.realties.forEach(id => {
          delete new_plans[id.toString()];
        });
      }
      if (action.mortgages && Object.entries(new_plans).length > 0) {
        action.mortgages.forEach(id => {
          for (const key of Object.keys(new_plans)) {
            delete new_plans[key.toString()].with_mortgage[id.toString()];
            if (Object.entries(new_plans[key.toString()].with_mortgage).length === 0) {
              delete new_plans[key.toString()].with_mortgage;
            }
          }
        });
      }
      const state_deletePlans = {
        ...state,
        plans: new_plans,
      }
      return handler(state_deletePlans);
            
    case 'DELETE_ALL_PLANS':
      return handler({
        ...state,
        plans: {},
      });

    default:
      break;

  }
  
  return state;
};

export default reducer;
