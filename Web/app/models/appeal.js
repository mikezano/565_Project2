var Models;
(function (Models) {
    var Appeal = (function () {
        function Appeal(id, grade, title, comments, state, actionUri) {
            this.id = id;
            this.grade = grade;
            this.title = title;
            this.comments = comments;
            this.state = state;
            this.actionUri = actionUri;
        }
        Appeal.parse = function (data) {
            return new Appeal(data.Id, Models.Grade.parse(data.Grade), data.Title, data.Comments, data.State, data.ActionUri);
        };
        return Appeal;
    })();
    Models.Appeal = Appeal;
})(Models || (Models = {}));
//# sourceMappingURL=appeal.js.map