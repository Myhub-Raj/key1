var keystone = require('keystone');
var Launch = keystone.list('Launch');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'invite';

	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;


	locals.data = {
		signups: []
	};


	//	console.log(locals.formData);

	// On POST requests, add the Launch item to the database
	view.on('post', { action: 'invite' }, function (next) {

		var newLaunch = new Launch.model();
		var updater = newLaunch.getUpdateHandler(req);


		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});


	// Load all the invitees
	view.on('init', function (next) {

	  var q = keystone.list('Launch').paginate({
	    page: req.query.page || 1,
	    perPage: 10,
	    maxPages: 10,
	    // filters: {
	    // 	state: 'published',
	    // },
	  })
	    // .sort('-publishedDate')
	    // .populate('author categories');

	   if (locals.data.signups.name) {
	    q.where('name').in([locals.data.signups]);
	   }

	  q.exec(function (err, results) {
	    locals.data.signups = results.results;
			console.log(results.results);
	    next(err);
	  });
	});

	view.render('invite');
};
