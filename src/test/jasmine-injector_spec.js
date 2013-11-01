define(['../jasmine-injector'], function() {
    describe('jasmine-injector', function() {
        var factory = define.amd.factory('../jasmine-injector');

        it('should register itself via AMD', function() {
            expect(factory).toBeDefined();
        });

        it('should return a function when the factory is invoked', function() {
            expect(typeof factory()).toBe('function');
        });

        describe('instance', function() {
            var injector = factory();

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
            var injector = factory();

            it('should expose a mock function that will return a new object with jasmine mocks for all of the properties of the original object', function() {
                var result = injector.mock({test:function() {}});

                expect(result.test.mostRecentCall).toBeDefined();
            });
        })
    });
});