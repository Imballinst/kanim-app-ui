import { LIST_KANIM, GET_OFFICE_QUOTA, CONFIRM_QUOTA } from '../../actions/kanim';

const defaultState = {
  listKanimAttempt: false,
  listKanimError: '',
  offices: [],
  getOfficeQuotaAttempt: false,
  getOfficeQuotaError: '',
  office: undefined,
  confirmQuotaAttempt: false,
  confirmQuotaError: '',
  confirmation: undefined,
};

const kanim = (state = defaultState, action) => {
  switch (action.type) {
    case LIST_KANIM.ATTEMPT: {
      return {
        ...state,
        listKanimAttempt: true,
        listKanimError: '',
      };
    }
    case LIST_KANIM.SUCCESS: {
      return {
        ...state,
        offices: action.payload,
        listKanimAttempt: false,
      };
    }
    case LIST_KANIM.INVALID: {
      return {
        ...state,
        listKanimAttempt: false,
        listKanimError: action.message,
      };
    }
    case GET_OFFICE_QUOTA.ATTEMPT: {
      return {
        ...state,
        office: {
          info: state.offices.find(({ MO_ID }) => MO_ID === action.payload),
          quota: {},
        },
        getOfficeQuotaAttempt: true,
        getOfficeQuotaError: '',
        confirmQuotaAttempt: false,
        confirmQuotaError: '',
        confirmation: undefined,
      };
    }
    case GET_OFFICE_QUOTA.SUCCESS: {
      const newOfficeProperty = {
        ...state.office,
        quota: action.payload,
      };

      return {
        ...state,
        office: newOfficeProperty,
        getOfficeQuotaAttempt: false,
      };
    }
    case GET_OFFICE_QUOTA.INVALID: {
      return {
        ...state,
        getOfficeQuotaAttempt: false,
        getOfficeQuotaError: action.message,
      };
    }
    case CONFIRM_QUOTA.ATTEMPT: {
      return {
        ...state,
        confirmQuotaAttempt: true,
      };
    }
    case CONFIRM_QUOTA.SUCCESS: {
      return {
        ...state,
        confirmQuotaAttempt: false,
        confirmation: action.payload,
      };
    }
    case CONFIRM_QUOTA.INVALID: {
      return {
        ...state,
        confirmQuotaAttempt: false,
        confirmQuotaError: action.message,
      };
    }
    default: return state;
  }
};

export { defaultState };
export default kanim;
