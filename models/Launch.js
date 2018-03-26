var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Launch = new keystone.List('Launch', {
	nocreate: true,
	noedit: true,
});

Launch.add({
	name: { type: Types.Name, required: false },
	email: { type: Types.Email, required: false },
	createdAt: { type: Date, default: Date.now },
});

Launch.defaultSort = '-createdAt';
Launch.defaultColumns = 'name, email, createdAt';
Launch.register();
