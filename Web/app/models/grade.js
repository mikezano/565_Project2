var Models;
(function (Models) {
    var Grade = (function () {
        function Grade(letter, comments) {
            this.letter = letter;
            this.comments = comments;
        }
        Grade.parse = function (data) {
            return new Grade(data.Letter, data.Comments);
        };
        return Grade;
    })();
    Models.Grade = Grade;
})(Models || (Models = {}));
//# sourceMappingURL=grade.js.map