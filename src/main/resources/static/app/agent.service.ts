import { Agent } from './agent';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Inject} from "@angular/core";

export class AgentService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private agentsUrl = 'agents';
    constructor(@Inject(Http) private http: Http) { }


    getFemaleAgents(): Promise<Agent[]> {
        return this.http.get(this.agentsUrl + "?gender=Female")
            .toPromise()
            .then(response => response.json() as Agent[]);
    }

    getMaleAgents(): Promise<Agent[]> {
        return this.http.get(this.agentsUrl + "?gender=Male")
            .toPromise()
            .then(response => response.json() as Agent[]);
    }

}