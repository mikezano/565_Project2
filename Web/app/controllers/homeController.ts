//http://davidwalsh.name/css-animation-callback
//http://brentvatne.ca/animation-obsession-and-ng-animate-1-3/
//https://www.youtube.com/watch?v=3hktBbxFxSM#t=69
module Web.Client {

    export class HomeController {

        public appeal: Models.Appeal;
        public output: { message: string; appealState: any }[] = [];

        public static $inject = ['$http', 'AppealsService'];
        constructor(public $http: any, private as: Services.AppealsService) { }

        public runCase(e: Event): void {

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
        }


        public happy(): void {

            //Get your grade
            this.as.getGrade(1).then((result: any) => {

                //Create the appeal based off the retrieved grade
                this.appeal = Models.Appeal.parse(result);
                this.appeal.title = "APPEAL for A";
                this.appeal.comments = [];
                this.appeal.comments.push("Grade should be bumped up to A");
                this.appeal.state = "Created";

                this.output.push({ message: 'Grade appeal is being created', appealState: this.appeal });
                return this.as.createAppeal(this.appeal);

            }).then((result: any) => {

                //print out state of previous creation
                this.output.push({ message: 'Grade appeal created with response code: ' + result.status, appealState: null });

                //Assume professor then visits site and gets the appeal
                return this.as.getAppeal(2);
            }).then((result: any) => {
                //Professor is now working with the appeal
                this.output.push({ message: 'Grade appeal is being reviewed', appealState: this.appeal });

                //Professor looks at grade on client side and updates appeal state
                this.appeal = Models.Appeal.parse(result.data);
                this.appeal.state = "Approved";

                //Go to server to 'save' the appeal
                return this.as.updateAppeal(this.appeal);
            }).then((result: any) => {
                //Student then visits site to get appeal status
                return this.as.getAppeal(2);
            }).then((result: any) => {

                //Appeal is successful
                this.appeal = Models.Appeal.parse(result.data);

                if (this.appeal.state == "Approved")
                    this.output.push({ message: "Grade appeal has been accepted", appealState: this.appeal });
            });
        }

        public abandoned(): void {

            this.as.getGrade(1).then((result: any) => {

                //Create the appeal based off the retrieved grade
                this.appeal = Models.Appeal.parse(result);
                this.appeal.title = "APPEAL for A";
                this.appeal.comments = [];
                this.appeal.comments.push("Grade should be bumped up to A");
                this.appeal.state = "Created";
                this.output.push({ message: 'Grade appeal is being created', appealState: this.appeal });
                return this.as.createAppeal(this.appeal);

            }).then((result: any) => {

                //Student then visits site to get appeal status
                this.output.push({ message: 'Grade appeal retreived with status code: ' + result.status, appealState: null });
                return this.as.getAppeal(2);

            }).then((result: any) => {

                //Student decides to abort appeal
                this.appeal = Models.Appeal.parse(result.data);
                this.appeal.state = "Cancel";
                this.output.push({ message: 'Grade appeal is being aborted', appealState: this.appeal });
                return this.as.updateAppeal(this.appeal);

            }).then((result: any) => {

                //Student then visits site to get appeal status
                this.output.push({ message: 'Grade appeal retreived with status code: ' + result.status, appealState: null });
                return this.as.getAppeal(2);

            }).then((result: any) => {

                //Confirming grade appeal has been aborted
                this.appeal = Models.Appeal.parse(result.data);
                this.output.push({ message: 'Grade appeal has been aborted', appealState: this.appeal });
            });
        }

        public forgotten(): void {

            this.as.getGrade(1).then((result: any) => {

                //Create the appeal based off the retrieved grade
                this.appeal = Models.Appeal.parse(result);
                this.appeal.title = "APPEAL for A";
                this.appeal.comments = [];
                this.appeal.comments.push("Grade should be bumped up to A");
                this.appeal.state = "Created";
                this.output.push({ message: 'Grade appeal is being created', appealState: this.appeal });
                return this.as.createAppeal(this.appeal);

            }).then((result: any) => {

                //Student then visits site to get appeal status and notices that  along period of time has elapsed
                this.output.push({ message: 'Grade appeal retreived with status code: ' + result.status, appealState: null });
                return this.as.getAppeal(2);

            }).then((result: any) => {

                //Student follows up on appeal which has not been responded to
                this.appeal = Models.Appeal.parse(result.data);
                this.appeal.state = "Follow Up";
                this.appeal.comments.push("Have not heard back in a week, just following up");
                this.appeal.title += " (follow up)";
                this.output.push({ message: 'Grade appeal is followed up', appealState: this.appeal });
                return this.as.updateAppeal(this.appeal);

            });
        }

        public bad(): void {

            //Get your grade
            this.as.getGrade(1).then((result: any) => {

                //Create the appeal based off the retrieved grade
                this.appeal = Models.Appeal.parse(result);
                this.appeal.title = "APPEAL for A";
                this.appeal.comments = [];
                this.appeal.comments.push("Grade should be bumped up to A");
                this.appeal.state = "Created";
                this.appeal.actionUri = "/fakeuri"; //simulate a bad uri

                this.output.push({ message: 'Grade appeal is being created', appealState: this.appeal });
                return this.as.createAppeal(this.appeal);

            }).then((result: any) => {

                //never gets here because of the error in the uri

            }).catch((result) => {
                this.output.push({
                    message: 'Bad Uri sent.  Response code: ' + result.status,
                    appealState: { status: result.status, config: result.config }
                });
            });
        }

        public badId(): void {

            //Get your grade
            this.as.getGrade(1).then((result: any) => {

                //Create the appeal based off the retrieved grade
                this.appeal = Models.Appeal.parse(result);
                this.appeal.title = "APPEAL for A";
                this.appeal.comments = [];
                this.appeal.comments.push("Grade should be bumped up to A");
                this.appeal.state = "Created";

                this.output.push({ message: 'Grade appeal is being created', appealState: this.appeal });
                return this.as.createAppeal(this.appeal);

            }).then((result: any) => {

                //print out state of previous creation
                this.output.push({ message: 'Grade appeal created with response code: ' + result.status, appealState: null });

                //Assume professor then visits site and gets the appeal
                return this.as.getAppeal(1);

            }).catch((result) => {
                this.output.push({
                    message: 'Could not find correct appeal.  Response code: ' + result.status, appealState: result
                });
            }).catch((result) => {
                this.output.push({
                    message: 'Bad Uri sent.  Response code: ' + result.status,
                    appealState: { status: result.status, config: result.config }
                });
            });
        }

    }
}
app.registerController('Web.Client.HomeController', Web.Client.HomeController);
app.registerAngularUiRoute(Web.Client.HomeController, 'vm', "initial", "/", "app/views/home.html");

