var Services;
(function (Services) {
    var AppealsService = (function () {
        function AppealsService($http) {
            this.$http = $http;
        }
        AppealsService.prototype.getGrade = function (id) {
            return this.$http.get("/Home/GetGrade?id=" + id).then(function (result) {
                return result.data;
            });
        };
        AppealsService.prototype.getAppeal = function (id) {
            return this.$http.get("api/Appeals?id=" + id);
        };
        AppealsService.prototype.createAppeal = function (appeal) {
            return this.$http.post(appeal.actionUri, JSON.stringify(appeal));
        };
        AppealsService.prototype.updateAppeal = function (appeal) {
            return this.$http.put(appeal.actionUri, JSON.stringify(appeal));
        };
        AppealsService.prototype.deleteAppeal = function (appeal) {
            return this.$http.delete(appeal.actionUri, JSON.stringify(appeal));
        };
        AppealsService.$inject = ["$http"];
        return AppealsService;
    })();
    Services.AppealsService = AppealsService;
})(Services || (Services = {}));
app.registerService('AppealsService', Services.AppealsService);
//# sourceMappingURL=appealsService.js.map