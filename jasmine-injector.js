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
            return mockFunction(obj);
        }
        return mockObject(obj);
    };

    /* This should return a factory for module */
    injector.resolver = function( /* moduleId */ ) {
        throw 'jasmine-injector needs to have a resolver set for your AMD library.';
    };

    function mockFunction(obj) {
        var spyFn = jasmine.createSpy(obj.name);
        Object.keys(obj).forEach(function(key) {
            spyFn[key] = jasmine.createSpy(obj, key);
        });
        spyFn.prototype = mockObject(obj.prototype);
        return spyFn;
    }

    function mockObject(obj) {
        var keys = Object.keys(obj);
        if (keys.length) {
            return jasmine.createSpyObj('spy', keys);
        }
        return obj;
    }

    return injector;
});
