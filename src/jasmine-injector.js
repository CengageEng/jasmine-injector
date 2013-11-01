define(function() {
    function injector() {
        return injector.resolver.apply(null, arguments);
    }

    injector.resolver = function() {
        throw 'jasmine-injector needs to have a resolver set for your AMD library.';
    };

    return injector;
});