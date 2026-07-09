const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error('No tienes permiso para esto');
      error.status = 403;
      return next(error);
    }
    next();
  };
};

module.exports = requireRole;