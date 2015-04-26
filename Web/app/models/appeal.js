var Models;
(function (Models) {
    var Appeal = (function () {
        function Appeal(Id, Grade, Title, Comments, State, ActionUri) {
            this.Id = Id;
            this.Grade = Grade;
            this.Title = Title;
            this.Comments = Comments;
            this.State = State;
            this.ActionUri = ActionUri;
        }
        Appeal.parse = function (data) {
            var converter = new X2JS({
                arrayAccessFormPaths: ['Appeal.Comments']
            });
            data = converter.xml_str2json(data);
            data = data.Appeal;
            return new Appeal(data.Id, Models.Grade.parse(data.Grade), data.Title, data.Comments, data.State, data.ActionUri);
        };
        Appeal.empty = function () {
            return new Appeal('', null, '', [], '', '');
        };
        return Appeal;
    })();
    Models.Appeal = Appeal;
})(Models || (Models = {}));
//# sourceMappingURL=appeal.js.map