/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
var Web;
(function (Web) {
    var Client;
    (function (Client) {
        var App = (function () {
            function App() {
                this.appName = 'angularApp';
                this.services = angular.module("angularServices", []);
                this.app = angular.module(this.appName, [
                    'ngRoute',
                    'ui.router'
                ]).config([
                    '$compileProvider',
                    function ($compileProvider) {
                        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sip):/);
                    }
                ]);
                //this.defaultRoute('/');
                this.registerAngularUiRouteDefault('/');
            }
            App.prototype.registerController = function (controllerName, controllerConstructor) {
                this.app.controller(controllerName, controllerConstructor);
            };
            App.prototype.registerService = function (serviceName, serviceConstructor) {
                this.app.service(serviceName, serviceConstructor);
            };
            App.prototype.getControllerName = function (controllerConstructor) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec(controllerConstructor.toString());
                return (results && results.length > 1) ? results[1] : "";
            };
            App.prototype.registerRoute = function (path, controllerName, template) {
                this.app.config(function ($routeProvider) {
                    $routeProvider.when(path, {
                        controller: controllerName,
                        templateUrl: template
                    });
                });
            };
            App.prototype.registerAngularUiRoute = function (controller, controllerAs, state, url, template) {
                this.app.config(function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state(state, {
                        url: url,
                        templateUrl: template,
                        controller: controller,
                        controllerAs: controllerAs
                    });
                });
            };
            App.prototype.registerAngularUiRouteDefault = function (path) {
                this.app.config(function ($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider.otherwise(path);
                });
            };
            App.prototype.registerDirective = function (name, directiveFactory) {
                this.app.directive(name, directiveFactory);
            };
            App.prototype.registerConstant = function (name, value) {
                this.app.constant(name, value);
            };
            App.prototype.defaultRoute = function (path) {
                this.app.config(function ($routeProvider) {
                    $routeProvider.otherwise({ redirectTo: path });
                });
            };
            App.prototype.run = function (document) {
                angular.bootstrap(document, [this.appName]);
            };
            return App;
        })();
        Client.App = App;
    })(Client = Web.Client || (Web.Client = {}));
})(Web || (Web = {}));
// used by rest of app to register controllers and services
var app = new Web.Client.App();
//# sourceMappingURL=app.js.map