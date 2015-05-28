module.exports = function(roleService) {
  return {
      getList: function(req, res, next) {
          roleService.getList()
              .then(function(roles) {
                  res.json(roles);
              })
              .catch(function(err) {
                  next(err);
              });
      }
  }
};