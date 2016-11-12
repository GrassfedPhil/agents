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
        this.resetMapLayers();
        this.getAgentsFromServer();
    }

    filterName(): void {
        this.resetMapLayers();
        this.processMaleServerResults(this.maleAgents);
        this.processFemaleServerResults(this.femaleAgents);
    }

    filterByName(): void {
        let filteredMaleAgents = [];
        let filteredFemaleAgents = [];

        if(this.nameFilter){
            this.maleAgents.forEach(agent => {
                agent.name.toLowerCase().startsWith(this.nameFilter) ? agent.highlight = true : agent.highlight = false;
                filteredMaleAgents.push(agent);
                this.maleAgents = filteredMaleAgents;
            });
            this.femaleAgents.forEach(agent => {
                agent.name.toLowerCase().startsWith(this.nameFilter) ? agent.highlight = true : agent.highlight = false;
                filteredFemaleAgents.push(agent);
                this.femaleAgents = filteredFemaleAgents;
            });
        }
    }

    drawMap(): void {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
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
            var marker = L.marker([femaleAgent.latitude, femaleAgent.longitude], {icon: femaleAgent.highlight ? this.highlightedFemaleMarker : this.femaleMarker}).bindPopup('Name: ' + femaleAgent.name);
            femaleMarkers.push(marker);
        });
        this.femaleLayerGroup = L.layerGroup(femaleMarkers);
    }

    generateMaleLayerGroup(maleAgents): void {
        let maleMarkers = [];
        maleAgents.forEach(maleAgent => {
            var marker = L.marker([maleAgent.latitude, maleAgent.longitude], {icon: maleAgent.highlight ? this.highlightedMaleMarker : this.maleMarker}).bindPopup('Name: ' + maleAgent.name);
            maleMarkers.push(marker);
        });
        this.maleLayerGroup = L.layerGroup(maleMarkers);
    }

    processMaleServerResults(maleAgents): void {
        this.maleAgents = maleAgents;
        this.filterByName();
        this.generateMaleLayerGroup(this.maleAgents);
        this.maleLayerGroup.addTo(this.map);
    }

    processFemaleServerResults(femaleAgents): void {
        this.femaleAgents = femaleAgents;
        this.filterByName();
        this.generateFemaleLayerGroup(this.femaleAgents);
        this.femaleLayerGroup.addTo(this.map);
    }

    resetMapLayers(): void {
        this.map.removeLayer(this.femaleLayerGroup);
        this.map.removeLayer(this.maleLayerGroup);
    }
}
