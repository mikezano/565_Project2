//http://davidwalsh.name/css-animation-callback
//http://brentvatne.ca/animation-obsession-and-ng-animate-1-3/
//https://www.youtube.com/watch?v=3hktBbxFxSM#t=69
var Web;
(function (Web) {
    var Client;
    (function (Client) {
        var HomeController = (function () {
            function HomeController($http, as) {
                this.$http = $http;
                this.as = as;
                this.output = [];
            }
            HomeController.prototype.runCase = function (e) {
                this.output = [];
                switch ($(e.target).text()) {
                    case 'Case 1: Happy':
                        this.happy();
                        break;
                    case 'Case 2: Abandoned':
                        this.abandoned();
                        break;
                    case 'Case 3: Forgotten':
                        this.forgotten();
                        break;
                    case 'Case 4: Bad':
                        this.bad();
                        break;
                    case 'Case 5: Bad Id':
                        this.badId();
                        break;
                }
            };
            HomeController.prototype.happy = function () {
                var _this = this;
                //Get your grade
                this.as.getGrade(1).then(function (result) {
                    //Create the appeal based off the retrieved grade
                    _this.appeal = Models.Appeal.parse(result);
                    _this.appeal.title = "APPEAL for A";
                    _this.appeal.comments = [];
                    _this.appeal.comments.push("Grade should be bumped up to A");
                    _this.appeal.state = "Created";
                    _this.output.push({ message: 'Grade appeal is being created', appealState: _this.appeal });
                    return _this.as.createAppeal(_this.appeal);
                }).then(function (result) {
                    //print out state of previous creation
                    _this.output.push({ message: 'Grade appeal created with response code: ' + result.status, appealState: null });
                    //Assume professor then visits site and gets the appeal
                    return _this.as.getAppeal(2);
                }).then(function (result) {
                    //Professor is now working with the appeal
                    _this.output.push({ message: 'Grade appeal is being reviewed', appealState: _this.appeal });
                    //Professor looks at grade on client side and updates appeal state
                    _this.appeal = Models.Appeal.parse(result.data);
                    _this.appeal.state = "Approved";
                    //Go to server to 'save' the appeal
                    return _this.as.updateAppeal(_this.appeal);
                }).then(function (result) {
                    //Student then visits site to get appeal status
                    return _this.as.getAppeal(2);
                }).then(function (result) {
                    //Appeal is successful
                    _this.appeal = Models.Appeal.parse(result.data);
                    if (_this.appeal.state == "Approved")
                        _this.output.push({ message: "Grade appeal has been accepted", appealState: _this.appeal });
                });
            };
            HomeController.prototype.abandoned = function () {
                var _this = this;
                this.as.getGrade(1).then(function (result) {
                    //Create the appeal based off the retrieved grade
                    _this.appeal = Models.Appeal.parse(result);
                    _this.appeal.title = "APPEAL for A";
                    _this.appeal.comments = [];
                    _this.appeal.comments.push("Grade should be bumped up to A");
                    _this.appeal.state = "Created";
                    _this.output.push({ message: 'Grade appeal is being created', appealState: _this.appeal });
                    return _this.as.createAppeal(_this.appeal);
                }).then(function (result) {
                    //Student then visits site to get appeal status
                    _this.output.push({ message: 'Grade appeal retreived with status code: ' + result.status, appealState: null });
                    return _this.as.getAppeal(2);
                }).then(function (result) {
                    //Student decides to abort appeal
                    _this.appeal = Models.Appeal.parse(result.data);
                    _this.appeal.state = "Cancel";
                    _this.output.push({ message: 'Grade appeal is being aborted', appealState: _this.appeal });
                    return _this.as.updateAppeal(_this.appeal);
                }).then(function (result) {
                    //Student then visits site to get appeal status
                    _this.output.push({ message: 'Grade appeal retreived with status code: ' + result.status, appealState: null });
                    return _this.as.getAppeal(2);
                }).then(function (result) {
                    //Confirming grade appeal has been aborted
                    _this.appeal = Models.Appeal.parse(result.data);
                    _this.output.push({ message: 'Grade appeal has been aborted', appealState: _this.appeal });
                });
            };
            HomeController.prototype.forgotten = function () {
                var _this = this;
                this.as.getGrade(1).then(function (result) {
                    //Create the appeal based off the retrieved grade
                    _this.appeal = Models.Appeal.parse(result);
                    _this.appeal.title = "APPEAL for A";
                    _this.appeal.comments = [];
                    _this.appeal.comments.push("Grade should be bumped up to A");
                    _this.appeal.state = "Created";
                    _this.output.push({ message: 'Grade appeal is being created', appealState: _this.appeal });
                    return _this.as.createAppeal(_this.appeal);
                }).then(function (result) {
                    //Student then visits site to get appeal status and notices that  along period of time has elapsed
                    _this.output.push({ message: 'Grade appeal retreived with status code: ' + result.status, appealState: null });
                    return _this.as.getAppeal(2);
                }).then(function (result) {
                    //Student follows up on appeal which has not been responded to
                    _this.appeal = Models.Appeal.parse(result.data);
                    _this.appeal.state = "Follow Up";
                    _this.appeal.comments.push("Have not heard back in a week, just following up");
                    _this.appeal.title += " (follow up)";
                    _this.output.push({ message: 'Grade appeal is followed up', appealState: _this.appeal });
                    return _this.as.updateAppeal(_this.appeal);
                });
            };
            HomeController.prototype.bad = function () {
                var _this = this;
                //Get your grade
                this.as.getGrade(1).then(function (result) {
                    //Create the appeal based off the retrieved grade
                    _this.appeal = Models.Appeal.parse(result);
                    _this.appeal.title = "APPEAL for A";
                    _this.appeal.comments = [];
                    _this.appeal.comments.push("Grade should be bumped up to A");
                    _this.appeal.state = "Created";
                    _this.appeal.actionUri = "/fakeuri"; //simulate a bad uri
                    _this.output.push({ message: 'Grade appeal is being created', appealState: _this.appeal });
                    return _this.as.createAppeal(_this.appeal);
                }).then(function (result) {
                    //never gets here because of the error in the uri
                }).catch(function (result) {
                    _this.output.push({
                        message: 'Bad Uri sent.  Response code: ' + result.status,
                        appealState: { status: result.status, config: result.config }
                    });
                });
            };
            HomeController.prototype.badId = function () {
                var _this = this;
                //Get your grade
                this.as.getGrade(1).then(function (result) {
                    //Create the appeal based off the retrieved grade
                    _this.appeal = Models.Appeal.parse(result);
                    _this.appeal.title = "APPEAL for A";
                    _this.appeal.comments = [];
                    _this.appeal.comments.push("Grade should be bumped up to A");
                    _this.appeal.state = "Created";
                    _this.output.push({ message: 'Grade appeal is being created', appealState: _this.appeal });
                    return _this.as.createAppeal(_this.appeal);
                }).then(function (result) {
                    //print out state of previous creation
                    _this.output.push({ message: 'Grade appeal created with response code: ' + result.status, appealState: null });
                    //Assume professor then visits site and gets the appeal
                    return _this.as.getAppeal(1);
                }).catch(function (result) {
                    _this.output.push({
                        message: 'Could not find correct appeal.  Response code: ' + result.status,
                        appealState: result
                    });
                }).catch(function (result) {
                    _this.output.push({
                        message: 'Bad Uri sent.  Response code: ' + result.status,
                        appealState: { status: result.status, config: result.config }
                    });
                });
            };
            HomeController.$inject = ['$http', 'AppealsService'];
            return HomeController;
        })();
        Client.HomeController = HomeController;
    })(Client = Web.Client || (Web.Client = {}));
})(Web || (Web = {}));
app.registerController('Web.Client.HomeController', Web.Client.HomeController);
app.registerAngularUiRoute(Web.Client.HomeController, 'vm', "initial", "/", "app/views/home.html");
//# sourceMappingURL=homeController.js.map