// this will to give all file paths to the client.
// that way it won't come to unneeded requests!
Inject.obj('translator-namespaces', function (req) {
  var result = {};
  _.each(Translator._namespaces, function (locales, namespace) {
    var namespaceObj = result[namespace] = {};
    _.each(locales, function (_, locale) {
      namespaceObj[locale] = 1; // set locale exists
    });
  });
  return result;
});
