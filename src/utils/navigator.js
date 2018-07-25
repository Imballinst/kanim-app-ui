const getParentOfLastRoute = (state) => {
  const { routes, index } = state;
  const route = routes[index];

  if (route.index) {
    return getParentOfLastRoute(route);
  }

  return route;
};

const getLastRoute = (state) => {
  const { routes, index } = getParentOfLastRoute(state);

  return routes[index];
};

export {
  getParentOfLastRoute,
  getLastRoute,
};
