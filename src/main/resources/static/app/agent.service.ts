import { Agent } from './agent';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Inject} from "@angular/core";

export class AgentService {

    private agentsUrl = 'agents';
    constructor(@Inject(Http) private http: Http) { }


    getFemaleAgents(ageFilter): Promise<Agent[]> {
        var url = this.agentsUrl + "?gender=Female";
        if(ageFilter) {
            url += "&ageToFilterBy=" + ageFilter;
        }
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Agent[]);
    }

    getMaleAgents(ageFilter): Promise<Agent[]> {
        var url = this.agentsUrl + "?gender=Male";
        if(ageFilter) {
            url += "&ageToFilterBy=" + ageFilter;
        }
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Agent[]);
    }

}