define(['test/fixtures/dependency', 'test/fixtures/dependencytwo'], function(dependency, dependencyTwo) {
    return dependency.name + ' and ' + dependencyTwo.name;
});
