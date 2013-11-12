define(['jasmine-injector'], function(injector) {
    var factoryList = {},
        factoryDepList = {},
        defined = {};

    requirejs.onResourceLoad = function(context, map, depArray) {
        factoryList[map.id] = context.registry[map.id].factory;
        factoryDepList[map.id] = depArray;
        if (depArray) {
            depArray.forEach(function(dependency) {
                var dependencyId = dependency.id;
                if (!defined[dependencyId]) {
                    defined[dependencyId] = context.defined[dependencyId];
                }
            });
        }
        defined[map.id] = context.defined[map.id];
    };

    var factoryFor = function(resourceName) {
        return factoryList[resourceName];
    };

    injector.resolver = function(moduleId) {
        function moduleFactory(factoryId) {
            return function(mockedDependencies) {
                var factory = factoryFor(factoryId),
                    factoryDependencies = factoryDepList[factoryId],
                    args = [];
                if (factoryDependencies) {
                    factoryDependencies.forEach(function(dependency) {
                        var dependencyId = dependency.id;

                        if (mockedDependencies && mockedDependencies[dependencyId]) {
                            args.push(mockedDependencies[dependencyId]);
                        } else {
                            args.push(defined[dependencyId]);
                        }
                    });
                }
                return factory.apply(null, args);
            };
        }
        return moduleFactory(moduleId);
    };
    return injector;
});
