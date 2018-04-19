export const action = (url, type, payload) => ({
  type: `${type}_REQUEST`,
  payload,
  meta: {
    offline: {
      effect: {
        method: 'HEAD',
        url,
      },
      commit: {
        type: `${type}_COMMIT`,
        meta: payload,
      },
      rollback: {
        type: `${type}_ROLLBACK`,
        meta: payload,
      },
    },
  },
});

export const types = type => ({
  REQUEST: `${type}_REQUEST`,
  COMMIT: `${type}_COMMIT`,
  ROLLBACK: `${type}_ROLLBACK`,
});
