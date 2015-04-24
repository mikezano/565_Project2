module Services {
    export class AppealsService {
        public static $inject = ["$http"];
        constructor(private $http: any) {}

        public getGrade(id: number): ng.IPromise<any> {
            return this.$http.get("/Home/GetGrade?id=" + id).then((result: any) => {
                return result.data;
            });
        }

        public getAppeal(id: number): ng.IPromise<any> {
            return this.$http.get("api/Appeals?id="+id);                
        }
        public createAppeal(appeal: Models.Appeal): ng.IPromise<any> {
            return this.$http.post(appeal.actionUri, JSON.stringify(appeal) );
        }

        public updateAppeal(appeal: Models.Appeal): ng.IPromise<any> {
            return this.$http.put(appeal.actionUri, JSON.stringify(appeal));
        }

        public deleteAppeal(appeal: Models.Appeal): ng.IPromise<any> {
            return this.$http.delete(appeal.actionUri, JSON.stringify(appeal));
        }
    }

} 
app.registerService('AppealsService', Services.AppealsService);