define(['jasmine-injector'], function(injector) {
    describe('jasmine-injector', function() {
        describe('instance', function() {
            it('should be a function', function() {
                expect(typeof injector).toBe('function');
            });

            it('should expose a resolver function', function() {
                expect(typeof injector.resolver).toBe('function');
            });

            it('should call the resolver with arguments passed to injector', function() {
                spyOn(injector, 'resolver');

                injector('moduleId');

                expect(injector.resolver).toHaveBeenCalledWith('moduleId');
            });

            it('should return the result of calling the resolver', function() {
                spyOn(injector, 'resolver').andReturn('hi');

                expect(injector()).toBe('hi');
            });

            it('should throw an informative exception when using the default resolver', function() {
                expect(injector).toThrow('jasmine-injector needs to have a resolver set for your AMD library.');
            });
        });

        describe('mock', function() {
            it('should expose a mock function that will return a new object with jasmine mocks for all of the properties of the original object', function() {
                var result = injector.mock({
                    test: function() {},
                    test1: function() {}
                });

                expect(result.test.mostRecentCall).toBeDefined();
                expect(result.test1.mostRecentCall).toBeDefined();
            });

            it('should return a mock of constructor with prototype and constructor properties', function() {
                function someFunction() {}
                someFunction.prop1 = function() {};
                someFunction.prototype = {
                    test: function() {},
                    test1: function() {}
                };

                var result = injector.mock(someFunction);

                expect(jasmine.isSpy(result)).toBeTruthy();
                expect(jasmine.isSpy(result.prop1)).toBeTruthy();
                expect(jasmine.isSpy(result.prototype.test)).toBeTruthy();
                expect(jasmine.isSpy(result.prototype.test1)).toBeTruthy();
            });
        });

        describe('inject', function() {
            var moduleFactory;

            beforeEach(function() {
                moduleFactory = jasmine.createSpy();

                injector.resolver = function(moduleId) {
                    if (moduleId === 'moduleId') {
                        return moduleFactory;
                    }
                };
            });

            it('provides a simple inject function that will call the factory with the first argument and then the function it provides with the remaining arguments', function() {
                injector.inject('moduleId', 'a', 'b', 'c');

                expect(moduleFactory).toHaveBeenCalledWith('a', 'b', 'c');
            });
        });
    });
});
