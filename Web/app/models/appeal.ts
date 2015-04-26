
module Models {
    export class Appeal {


        constructor(
            public Id: string,
            public Grade: Grade,
            public Title: string,
            public Comments: string[],
            public State: string,
            public ActionUri: string
            ) { }

        public static parse(data: any): Appeal {

            var converter = new X2JS({
                arrayAccessFormPaths: ['Appeal.Comments']
            });
            data = converter.xml_str2json(data);
            data = data.Appeal;

            return new Appeal(
                data.Id,
                Models.Grade.parse(data.Grade),
                data.Title,
                data.Comments,
                data.State,
                data.ActionUri);
        }

        public static empty(): Appeal {

            return new Appeal(
                '',
                null,
                '',
                [],
                '',
                '');
        }
    }
} 