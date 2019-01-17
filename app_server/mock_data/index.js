const form = require('./form_builder/form');
const forms = require('./form_builder/forms');
const templates = require('./form_builder/templates');

module.exports = function() {
  var data = {
    form: form(),
    forms: forms(),
    templates: templates()
  };
  return data;
};
