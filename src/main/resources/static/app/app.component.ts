import {Component, OnInit, Inject, Input} from '@angular/core';
import {AgentService} from "./agent.service";
import {Agent} from "./agent";


@Component({
    selector: 'my-app',
    template: `
      <input [(ngModel)]="ageFilter" (keyup.enter)="filter()">
      <button (click)=filter()>Filter</button>
      
      <input [(ngModel)]="nameFilter"(keyup.enter)="filterName()">
      <button (click)=filterName()>Filter</button>
     <div id="mapid"></div>
    `,

    styles: [`
  #mapid { height: 500px; }

`],
    providers: [AgentService]

})
export class AppComponent implements OnInit {
    @Input
    ageFilter;

    @Input
    nameFilter;

    agents: Agent[] = [];
    femaleAgents: Agent[] = [];
    maleAgents: Agent[] = [];
    map;
    femaleLayerGroup = L.layerGroup([]);
    maleLayerGroup = L.layerGroup([]);
    maleMarker = L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: 'man'
    });
    femaleMarker = L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: 'woman',
        markerColor: 'red'
    });

    highlightedMaleMarker = L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: 'man',
        markerColor: 'orange'
    });

    highlightedFemaleMarker = L.AwesomeMarkers.icon({
        prefix: 'ion',
        icon: 'woman',
        markerColor: 'orange'
    });


    constructor(@Inject(AgentService) private agentService: AgentService) {
    }

    filter(): void {
        this.getAgentsFromServer();
    }

    filterName(): void {
        this.processMaleServerResults(this.maleAgents);
        this.processFemaleServerResults(this.femaleAgents);
    }

    highlightAgent(agent): boolean {
        return this.nameFilter && agent.name.toLowerCase().startsWith(this.nameFilter.toLowerCase());
    }

    drawMap(): void {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.femaleLayerGroup.addTo(this.map);
        this.maleLayerGroup.addTo(this.map);
    }


    ngOnInit(): void {
        this.drawMap();
        this.getAgentsFromServer();
    }

    getAgentsFromServer(): void {
        this.agentService.getFemaleAgents(this.ageFilter).then(femaleAgents => this.processFemaleServerResults(femaleAgents));
        this.agentService.getMaleAgents(this.ageFilter).then(maleAgents => this.processMaleServerResults(maleAgents))
    }

    generateFemaleLayerGroup(femaleAgents): void {
        let femaleMarkers = [];
        femaleAgents.forEach(femaleAgent => {
            var marker = L.marker([femaleAgent.latitude, femaleAgent.longitude], {icon: this.highlightAgent(femaleAgent) ? this.highlightedFemaleMarker : this.femaleMarker}).bindPopup('Name: ' + femaleAgent.name);
            femaleMarkers.push(marker);
        });
        this.femaleLayerGroup.clearLayers();
        this.femaleLayerGroup.addLayer(L.layerGroup(femaleMarkers));
    }

    generateMaleLayerGroup(maleAgents): void {
        let maleMarkers = [];
        maleAgents.forEach(maleAgent => {
            var marker = L.marker([maleAgent.latitude, maleAgent.longitude], {icon: this.highlightAgent(maleAgent) ? this.highlightedMaleMarker : this.maleMarker}).bindPopup('Name: ' + maleAgent.name);
            maleMarkers.push(marker);
        });
        this.maleLayerGroup.clearLayers();
        this.maleLayerGroup.addLayer(L.layerGroup(maleMarkers));
    }

    processMaleServerResults(maleAgents): void {
        this.maleAgents = maleAgents;
        this.generateMaleLayerGroup(maleAgents);
        // this.maleLayerGroup.addTo(this.map);
    }

    processFemaleServerResults(femaleAgents): void {
        this.femaleAgents = femaleAgents;
        this.generateFemaleLayerGroup(femaleAgents);
        // this.femaleLayerGroup.addTo(this.map);
    }
}
