describe("Directive: Go To URL", function () {

    var scope, element, compile;
    beforeEach(module("BrowserSync"));
    beforeEach(module("test.templates"));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope;
        compile = $compile;
    }));

    describe("Syncing URLS", function () {
        beforeEach(inject(function ($templateCache) {

            // Set the user on the parent scope to simulate how it'd happen in your app
            scope.options = {
                server: {
                    baseDir: "./"
                },
                "urls": {
                    "local": "http://localhost:3000",
                    "external": "http://192.168.0.2:3000",
                    "tunnel": "https://trjjcleffl.localtunnel.me"
                }
            };

            // Pass in the user object to the directive
            element = angular.element("<url-sync options=\"options\"></url-sync>");

            // Compile & Digest as normal
            compile(element)(scope);
            scope.$digest();
        }));

        it("should render the input box", function () {
            assert.equal(element.find("input").length, 1);
        });
        it("should render the input box", function () {
            assert.equal(element.find("input").length, 1);
        });
        it("should render the reload all button", function () {
            assert.equal(element.find("button").length, 1);
        });
        it("should have the url property at start, but be empty", function () {
            var isolatedScope = scope.$$childHead;
            assert.deepEqual(isolatedScope.urls.current, "");
        });
        it("has a reload all method", function () {
            var isolatedScope = scope.$$childHead;
            assert.deepEqual(typeof isolatedScope.reloadAll, "function");
        });
        it("Emits the reload-all event", inject(function ($injector) {

            var socket = $injector.get("Socket");
            var stub   = sinon.stub(socket, "emit");

            var isolatedScope = scope.$$childHead;

            isolatedScope.reloadAll();

            sinon.assert.calledWithExactly(stub, "cp:browser:reload");

            stub.restore();
        }));
    });
});