define(['test/fixtures/mymodule',
    'test/fixtures/module_two_dependencies',
    'resolvers/requirejs-resolver'
], function(myModule, moduleWithTwo, injector) {
    describe('injector.inject', function() {

        it('should create a module using a mocked dependency', function() {
            var myModuleWithMockedDependency = injector.inject(
                'test/fixtures/mymodule', {
                    'test/fixtures/dependency': {
                        name: "mocked dependency"
                    }
                }
            );

            expect(myModule).toBe('dependency');
            expect(myModuleWithMockedDependency).toBe('mocked dependency');
        });

        it('should create a module using multiple mocked dependencies', function() {
            var moduleWithTwoWithMockedDependency = injector.inject(
                'test/fixtures/module_two_dependencies', {
                    'test/fixtures/dependency': {
                        name: "mocked dependency"
                    },
                    'test/fixtures/dependencytwo': {
                        name: "mocked dependency two"
                    }
                }
            );

            expect(moduleWithTwo).toBe('dependency and dependency two');
            expect(moduleWithTwoWithMockedDependency).toBe('mocked dependency and mocked dependency two');
        });

        it('should create a module using one mocked dependency and one real dependency', function() {
            var moduleWithTwoWithMockedDependency = injector.inject(
                'test/fixtures/module_two_dependencies', {
                    'test/fixtures/dependency': {
                        name: "mocked dependency"
                    }
                }
            );
            expect(moduleWithTwo).toBe('dependency and dependency two');
            expect(moduleWithTwoWithMockedDependency).toBe('mocked dependency and dependency two');
        });
    });
});
