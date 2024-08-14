const resolveRoutes = (route) => {
  // There is a total of 826 (3) characters
  if (route.length <= 3) {
    let validRoute = route === "/" ? route : "/:id";

    return validRoute;
  }

  // /about
  return `/${route}`;
};

export default resolveRoutes;