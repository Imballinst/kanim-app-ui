import { LOGIN } from '../actionTypes';
import { GET_OFFICES, GET_OFFICE_QUOTA, CHECK_QUOTA } from '../actionTypes';

const defaultState = {
  getOfficesAttempt: false,
  getOfficesError: '',
  offices: [],
  getOfficeQuotaAttempt: false,
  getOfficeQuotaError: '',
  office: undefined,
  confirmQuotaAttempt: false,
  confirmQuotaError: '',
  confirmation: undefined
};

const kanim = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS: {
      return { ...defaultState };
    }
    case GET_OFFICES.ATTEMPT: {
      return {
        ...state,
        getOfficesAttempt: true,
        getOfficesError: ''
      };
    }
    case GET_OFFICES.SUCCESS: {
      return {
        ...state,
        offices: action.payload,
        getOfficesAttempt: false
      };
    }
    case GET_OFFICES.INVALID: {
      return {
        ...state,
        getOfficesAttempt: false,
        getOfficesError: action.message
      };
    }
    case GET_OFFICE_QUOTA.ATTEMPT: {
      return {
        ...state,
        office: {
          info: state.offices.find(({ MO_ID }) => MO_ID === action.payload),
          quota: {}
        },
        getOfficeQuotaAttempt: true,
        getOfficeQuotaError: '',
        confirmQuotaAttempt: false,
        confirmQuotaError: '',
        confirmation: undefined
      };
    }
    case GET_OFFICE_QUOTA.SUCCESS: {
      const newOfficeProperty = {
        ...state.office,
        quota: action.payload
      };

      return {
        ...state,
        office: newOfficeProperty,
        getOfficeQuotaAttempt: false
      };
    }
    case GET_OFFICE_QUOTA.INVALID: {
      return {
        ...state,
        getOfficeQuotaAttempt: false,
        getOfficeQuotaError: action.message
      };
    }
    case CHECK_QUOTA.ATTEMPT: {
      return {
        ...state,
        confirmQuotaAttempt: true,
        confirmQuotaError: '',
        confirmation: undefined
      };
    }
    case CHECK_QUOTA.SUCCESS: {
      return {
        ...state,
        confirmQuotaAttempt: false,
        confirmation: action.payload
      };
    }
    case CHECK_QUOTA.INVALID: {
      return {
        ...state,
        confirmQuotaAttempt: false,
        confirmQuotaError: action.message
      };
    }
    default:
      return state;
  }
};

export { defaultState };
export default kanim;
