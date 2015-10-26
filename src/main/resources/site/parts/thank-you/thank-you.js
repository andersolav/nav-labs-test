var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var content = require('/lib/xp/content');
var utils = require("/lib/utilities.js");
var TestModel = require("/lib/TestModel.js");

exports.get = function() {

  var view = resolve('thank-you.html');
  var model = portal.getContent();
  var siteConfig = portal.getSiteConfig(); 

  model.displayName = model.displayName === "" ? "Tittel kommer her" : model.displayName;
  model.data.body = model.data.body || siteConfig.defualtThankYouText || "<p>Tekst kommer her.</p>";
  var body = thymeleaf.render(view, model);

  return {
    body: body,
    contentType: 'text/html'
  };

}; 