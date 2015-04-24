/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />

module Web.Client {
    export class App {
        private app: ng.IModule;
        private services: ng.IModule;
        public appName: string = 'angularApp';

        constructor() {
            this.services = angular.module("angularServices", []);
            this.app = angular.module(this.appName, [
                'ngRoute',          // routing,
                'ui.router'  
            ])
                .config([
                    '$compileProvider',
                    ($compileProvider) => {
                        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sip):/);
                    }
                ]);

            //this.defaultRoute('/');
            this.registerAngularUiRouteDefault('/');
        }

        registerController(controllerName: string, controllerConstructor: Function) {
            this.app.controller(controllerName, controllerConstructor);
        }

        registerService(serviceName: string, serviceConstructor: Function) {
            this.app.service(serviceName, serviceConstructor);
        }

        private getControllerName(controllerConstructor: Function): string {

            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec(controllerConstructor.toString());
            return (results && results.length > 1) ? results[1] : "";

        }

        registerRoute(path: string, controllerName: string, template: string) {
            this.app.config(($routeProvider: ng.route.IRouteProvider) => {
                $routeProvider.when(path, {
                    controller: controllerName,
                    templateUrl: template
                });
            });
        }

        registerAngularUiRoute(controller: Function, controllerAs: string, state: string, url: string, template: string): void {
            this.app.config(($stateProvider, $urlRouterProvider) => {
                $stateProvider.state(state, {
                    url: url,
                    templateUrl: template,
                    controller: controller,
                    controllerAs: controllerAs
                });
            });      
        }

        registerAngularUiRouteDefault(path:string): void {
            this.app.config(($stateProvider, $urlRouterProvider) => {
                $urlRouterProvider.otherwise(path);
            });
        }

        registerDirective(name: string, directiveFactory: ($timeout) => any) {
            this.app.directive(name, directiveFactory);
        }

        registerConstant(name: string, value: any) {
            this.app.constant(name, value);
        }

        defaultRoute(path: string) {
            this.app.config(($routeProvider: ng.route.IRouteProvider) => {
                $routeProvider.otherwise({ redirectTo: path });
            });
        }

        run(document: Document) {
            angular.bootstrap(document, [this.appName]);
        }

    }
}

// used by rest of app to register controllers and services
var app: Web.Client.App = new Web.Client.App();

