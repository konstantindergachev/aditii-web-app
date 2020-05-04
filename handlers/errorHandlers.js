module.exports = {
  errorHandler: (res, error) => {
    console.log('errorHandler res: ', res);
    console.log('errorHandler error: ', error);
    res
      .status(500)
      .json({ success: false, message: error.message ? error.message : error });
  },

  catchErrors: (fn) => {
    return function(req, res, next) {
      return fn(req, res, next).catch(next);
    };
  },
  notFound: (req, res, next) => {
    const err = new Error('Sorry. Sometime bad happens');
    err.status = 404;
    next(err);
  },
  flashValidationErrors: (err, req, res, next) => {
    // if there are no errors to show for flashes, ski it
    if (!err.errors) return next(err);
    // validation errors look like
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach((key) => req.flash('error', err.errors[key].message));
    res.redirect('back');
  },
  developmentErrors: (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
      message: err.message,
      status: err.status,
      stackHighlighted: err.stack.replace(
        /[a-z_-\d]+.js:\d+:\d+/gi,
        '<mark>$&</mark>'
      ),
    };
    res.status(err.status || 500);
    res.format({
      // Based on the `Accept` http header
      'text/html': () => {
        res.render('error', errorDetails);
      }, // Form Submit, Reload the page
      'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
    });
  },
  productionErrors: (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
    });
  },
};
