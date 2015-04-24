module Models {
    export class Appeal {


        constructor(
            public id: string,
            public grade: Grade,
            public title: string,
            public comments: string[],
            public state: string,
            public actionUri: string
            ) { }

        public static parse(data: any): Appeal {

            return new Appeal(
                data.Id,
                Models.Grade.parse(data.Grade),
                data.Title,
                data.Comments,
                data.State,
                data.ActionUri);
        }
    }
} 