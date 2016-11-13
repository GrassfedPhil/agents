import {Component, OnInit, Inject, Input} from '@angular/core';
import {AgentService} from "./agent.service";
import {Agent} from "./agent";
import {Markers} from "./markers";


@Component({
    selector: 'my-app',
    template: `
      <md-input type="number" [(ngModel)]="ageFilter" (keyup.enter)="filterByAge()"></md-input>
      <button md-button (click)=filterByAge()>Filter by age</button>
      
      <md-input [(ngModel)]="nameFilter"(keyup.enter)="filterByName()"></md-input>
      <button md-button (click)=filterByName()>Filter by name</button>
     <div id="mapid"></div>
    `,

    styles: [`
  #mapid { height: 90%; }

`],
    providers: [AgentService]

})
export class AppComponent implements OnInit {
    @Input
    ageFilter;

    @Input
    nameFilter;

    femaleAgents: Agent[] = [];
    maleAgents: Agent[] = [];

    map: L.map;
    femaleLayerGroup = L.layerGroup([]);
    maleLayerGroup = L.layerGroup([]);
    maleMarkers: Markers;
    femaleMarkers: Markers;

    constructor(@Inject(AgentService) private agentService: AgentService) {
        this.maleMarkers = new Markers('man', 'blue', 'orange');
        this.femaleMarkers = new Markers('woman', 'red', 'orange');
    }

    ngOnInit(): void {
        this.drawMap();
        this.getAgentsFromServer();
    }

    filterByAge(): void {
        this.getAgentsFromServer();
    }

    filterByName(): void {
        this.processAgents(this.maleAgents, this.maleMarkers, this.maleLayerGroup);
        this.processAgents(this.femaleAgents, this.femaleMarkers, this.femaleLayerGroup);
    }

    drawMap(): void {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.femaleLayerGroup.addTo(this.map);
        this.maleLayerGroup.addTo(this.map);
    }

    getAgentsFromServer(): void {
        this.agentService.getFemaleAgents(this.ageFilter).then(femaleAgents => {
            this.femaleAgents = femaleAgents;
            this.processAgents(femaleAgents, this.femaleMarkers, this.femaleLayerGroup);
        });

        this.agentService.getMaleAgents(this.ageFilter).then(maleAgents => {
            this.maleAgents = maleAgents;
            this.processAgents(maleAgents, this.maleMarkers, this.maleLayerGroup);
        })
    }

    processAgents(agentArray, markers, layerGroup): void {
        var agentMarkersArray = this.generateMarkers(agentArray, markers);
        this.addMarkersToMap(layerGroup, agentMarkersArray);
    }

    addMarkersToMap(layerGroup: L.layerGroup, agentMarkersArray: {}): void {
        layerGroup.clearLayers();
        layerGroup.addLayer(L.layerGroup(agentMarkersArray));
    }

    generateMarkers(agentArray: Agent[], markers: {}): L.marker[] {
        let agentMarkersArray = [];
        agentArray.forEach(agent => {
            var marker = L.marker([agent.latitude, agent.longitude], {icon: this.highlightAgent(agent) ? markers.highlighted : markers.normal}).bindPopup('Name: ' + agent.name + '<br>Age: ' + agent.age);
            agentMarkersArray.push(marker);
        });
        return agentMarkersArray;
    }

    highlightAgent(agent: Agent): boolean {
        return this.nameFilter && agent.name.toLowerCase().startsWith(this.nameFilter.toLowerCase());
    }
}
