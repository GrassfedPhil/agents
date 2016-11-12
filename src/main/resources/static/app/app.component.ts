import {Component, OnInit, Inject} from '@angular/core';
import {AgentService} from "./agent.service";
import {Agent} from "./agent";


@Component({
    selector: 'my-app',
    template: `
      <input #ageFilter (keyup.enter)="filterAge(ageFilter.value)">
      <button (click)=filterAge(ageFilter.value)>Filter</button>
     <div id="mapid"></div>
    `,

    styles: [`
  #mapid { height: 500px; }

`],
    providers: [AgentService]

})
export class AppComponent implements OnInit {
    title = 'Tour of Heroes';
    agents: Agent[] = [];
    femaleAgents: Agent[] = [];
    maleAgents: Agent[] = [];
    map;
    femaleLayerGroup;
    maleLayerGroup;
    maleMarker = L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: 'man'
    });
    femaleMarker = L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: 'woman',
        markerColor: 'red'
    });


    constructor(@Inject(AgentService) private agentService: AgentService) {
    }

    filterAge(ageToFilterBy): void {
        let filteredMaleAgents;
        let filteredFemaleAgents;
        if (!ageToFilterBy) {
            filteredMaleAgents = this.maleAgents;
            filteredFemaleAgents = this.femaleAgents;
        } else {
            ageToFilterBy = +ageToFilterBy;
            filteredMaleAgents = this.maleAgents.filter(agent => agent.age <= ageToFilterBy);
            filteredFemaleAgents = this.femaleAgents.filter(agent => agent.age <= ageToFilterBy);
        }

        this.resetMapLayers();
        this.generateFemaleLayerGroup(filteredFemaleAgents);
        this.generateMaleLayerGroup(filteredMaleAgents);

        this.femaleLayerGroup.addTo(this.map);
        this.maleLayerGroup.addTo(this.map);
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
            this.femaleAgents = femaleAgents;
            this.generateFemaleLayerGroup(femaleAgents);
            this.femaleLayerGroup.addTo(this.map);
        });

        this.agentService.getMaleAgents().then(maleAgents => {
            this.maleAgents = maleAgents;
            this.generateMaleLayerGroup(maleAgents);
            this.maleLayerGroup.addTo(this.map);
        })
    }

    generateFemaleLayerGroup(femaleAgents): void {
        let femaleMarkers = [];
        femaleAgents.forEach(femaleAgent => {
            var marker = L.marker([femaleAgent.latitude, femaleAgent.longitude], {icon: this.femaleMarker}).bindPopup('Name: ' + femaleAgent.name);
            femaleMarkers.push(marker);
        });
        this.femaleLayerGroup = L.layerGroup(femaleMarkers);
    }

    generateMaleLayerGroup(maleAgents): void {
        let maleMarkers = [];
        maleAgents.forEach(maleAgent => {
            var marker = L.marker([maleAgent.latitude, maleAgent.longitude], {icon: this.maleMarker}).bindPopup('Name: ' + maleAgent.name);
            maleMarkers.push(marker);
        });
        this.maleLayerGroup = L.layerGroup(maleMarkers);
    }

    resetMapLayers(): void {
        this.map.removeLayer(this.femaleLayerGroup);
        this.map.removeLayer(this.maleLayerGroup);
    }
}
