//ADD FUNCTION TO CATCH ALL ERRORS FROM ASYNC FUNCTION INSTED OF MAKE CATCH FOR EACH FUNCTION
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
