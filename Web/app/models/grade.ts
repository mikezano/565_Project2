module Models {
    export class Grade {


        constructor(
            public letter: string,
            public comments: string
            ) { }

        public static parse(data: any): Grade {

            return new Grade(
                data.Letter,
                data.Comments);
        }
    }
}  