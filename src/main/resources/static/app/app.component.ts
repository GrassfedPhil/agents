import {Component, OnInit, Inject} from '@angular/core';
import {AgentService} from "./agent.service";
import {Agent} from "./agent";


@Component({
    selector: 'my-app',
    template: `
     <div id="mapid"></div>

    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let agent of agents">
        <span class="badge">{{agent.name}}</span>
      </li>
    </ul>

    `,

    styles: [`
    
  #mapid { height: 500px; }
    
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`],
    providers: [AgentService]

})
export class AppComponent implements OnInit {
    title = 'Tour of Heroes';
    agents: Agent[] = [];
    map;
    femaleMarker;
    maleMarker;


    constructor(@Inject(AgentService) private agentService: AgentService) {
        this.maleMarker = L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'man'
        });
        this.femaleMarker = L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'woman',
            markerColor: 'red'
        });
    }


    drawMap(): void {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }


    ngOnInit(): void {
        this.drawMap();
        this.agentService.getFemaleAgents().then(femaleAgents => {
            this.agents = this.agents.concat(femaleAgents);
            femaleAgents.forEach(femaleAgent => L.marker([femaleAgent.latitude, femaleAgent.longitude], {icon: this.femaleMarker}).addTo(this.map)
                .bindPopup('Name: ' + femaleAgent.name));
        });

        this.agentService.getMaleAgents().then(maleAgents => {
            this.agents = this.agents.concat(maleAgents);
            maleAgents.forEach(maleAgent => L.marker([maleAgent.latitude, maleAgent.longitude], {icon: this.maleMarker}).addTo(this.map)
                .bindPopup('Name: ' + maleAgent.name));
        })
    }
}
