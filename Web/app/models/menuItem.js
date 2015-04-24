var Models;
(function (Models) {
    var Appeal = (function () {
        function Appeal(id, grade, gradeComments, appealTitle, appealComments, state) {
            this.id = id;
            this.grade = grade;
            this.gradeComments = gradeComments;
            this.appealTitle = appealTitle;
            this.appealComments = appealComments;
            this.state = state;
        }
        Appeal.parse = function (data) {
            return new Appeal(data.Id, data.Grade, data.GradeComments, data.AppealTitle, data.AppealComments, data.State);
        };
        Appeal.parseArray = function (data) {
            return Enumerable.From(data).Select(function (item) {
                return new Appeal(item.Id, item.Grade, item.GradeComments, item.AppealTitle, item.AppealComments, item.State);
            }).ToArray();
        };
        return Appeal;
    })();
    Models.Appeal = Appeal;
})(Models || (Models = {}));
//# sourceMappingURL=menuItem.js.map