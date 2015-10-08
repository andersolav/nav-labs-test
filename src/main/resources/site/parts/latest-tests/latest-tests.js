var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var moment = require("../node_modules/moment/moment.js");
var content = require('/lib/xp/content');
moment.locale("nb");

exports.get = function() {

	var body = "<p>Det finnes ingen tester</p>";
	var view = resolve("../../views/content-list.html");
	var component = portal.getComponent();

	var result = content.query({
		count: Math.round(component.config.numberOfTests) || 5, 
		contentTypes: ["no.nav.navlabs:test"]
	});

	if(result.count > 0) {
		body = thymeleaf.render(view, {
			hits: result.hits,
			title: component.config.title || "Tidligere tester"
		});
	}

	return {
		body: body,
		contentType: 'text/html'
	};

};