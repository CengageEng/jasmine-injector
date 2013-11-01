define(function() {
    var slice = Array.prototype.slice;

    function injector() {
        return injector.resolver.apply(null, arguments);
    }

    injector.inject = function() {
        injector(arguments[0]).apply(null, slice.call(arguments, 1));
    };

    injector.mock = function(obj) {
        return jasmine.createSpyObj('spy', Object.keys(obj));
    };

    injector.resolver = function() {
        throw 'jasmine-injector needs to have a resolver set for your AMD library.';
    };

    return injector;
});