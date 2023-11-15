const { ensureAuthenticated, getUser } = require("../helpers/auth-helpers");
const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    return next();
  }
  res.redirect("/signin");
};

module.exports = {
  authenticated,
};
