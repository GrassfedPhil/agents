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

    maleMarkers = {
        normal: L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'man'
        }),
        highlighted: L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'man',
            markerColor: 'orange'
        })
    };

    femaleMarkers = {
        normal: L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'woman',
            markerColor: 'red'
        }),


        highlighted: L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'woman',
            markerColor: 'orange'
        })
    };


    constructor(@Inject(AgentService) private agentService: AgentService) {
    }

    filter(): void {
        this.getAgentsFromServer();
    }

    filterName(): void {
        this.processServerResults(this.maleAgents, this.maleMarkers, this.maleLayerGroup);
        this.processServerResults(this.femaleAgents, this.femaleMarkers, this.femaleLayerGroup);
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
        this.agentService.getFemaleAgents(this.ageFilter).then(femaleAgents => {
            this.femaleAgents = femaleAgents;
            this.processServerResults(femaleAgents, this.femaleMarkers, this.femaleLayerGroup);
        });
        this.agentService.getMaleAgents(this.ageFilter).then(maleAgents => {
            this.maleAgents = maleAgents;
            this.processServerResults(maleAgents, this.maleMarkers, this.maleLayerGroup);
        })
    }

    processServerResults(agentArray, markers, layerGroup): void {
        let agentMarkersArray = [];
        agentArray.forEach(agent => {
            var marker = L.marker([agent.latitude, agent.longitude], {icon: this.highlightAgent(agent) ? markers.highlighted : markers.normal}).bindPopup('Name: ' + agent.name);
            agentMarkersArray.push(marker);
        });
        layerGroup.clearLayers();
        layerGroup.addLayer(L.layerGroup(agentMarkersArray));
    }
}
