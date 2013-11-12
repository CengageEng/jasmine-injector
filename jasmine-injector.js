define(function() {
    var slice = Array.prototype.slice;

    function injector() {
        return injector.resolver.apply(null, arguments);
    }

    injector.inject = function( /* moduleId, dependency1, dependency2, ... */ ) {
        return injector(arguments[0]).apply(null, slice.call(arguments, 1));
    };

    injector.mock = function(obj) {
        if (typeof obj === 'function') {
            var apis = [];
            for (var api in obj.prototype) {
                apis.push(api);
            }
            var spyFn = jasmine.createSpy();
            spyFn.prototype = jasmine.createSpyObj(obj.name, apis);
            return spyFn;
        }
        return jasmine.createSpyObj('spy', Object.keys(obj));
    };

    /* This should return a factory for module */
    injector.resolver = function( /* moduleId */ ) {
        throw 'jasmine-injector needs to have a resolver set for your AMD library.';
    };

    return injector;
});