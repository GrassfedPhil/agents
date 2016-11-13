"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var agent_service_1 = require("./agent.service");
var markers_1 = require("./markers");
var AppComponent = (function () {
    function AppComponent(agentService) {
        this.agentService = agentService;
        this.femaleAgents = [];
        this.maleAgents = [];
        this.femaleLayerGroup = L.layerGroup([]);
        this.maleLayerGroup = L.layerGroup([]);
        this.maleMarkers = new markers_1.Markers('man', 'blue', 'orange');
        this.femaleMarkers = new markers_1.Markers('woman', 'red', 'orange');
    }
    AppComponent.prototype.ngOnInit = function () {
        this.drawMap();
        this.getAgentsFromServer();
    };
    AppComponent.prototype.filterByAge = function () {
        this.getAgentsFromServer();
    };
    AppComponent.prototype.filterByName = function () {
        this.processAgents(this.maleAgents, this.maleMarkers, this.maleLayerGroup);
        this.processAgents(this.femaleAgents, this.femaleMarkers, this.femaleLayerGroup);
    };
    AppComponent.prototype.drawMap = function () {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.femaleLayerGroup.addTo(this.map);
        this.maleLayerGroup.addTo(this.map);
    };
    AppComponent.prototype.getAgentsFromServer = function () {
        var _this = this;
        this.agentService.getFemaleAgents(this.ageFilter).then(function (femaleAgents) {
            _this.femaleAgents = femaleAgents;
            _this.processAgents(femaleAgents, _this.femaleMarkers, _this.femaleLayerGroup);
        });
        this.agentService.getMaleAgents(this.ageFilter).then(function (maleAgents) {
            _this.maleAgents = maleAgents;
            _this.processAgents(maleAgents, _this.maleMarkers, _this.maleLayerGroup);
        });
    };
    AppComponent.prototype.processAgents = function (agentArray, markers, layerGroup) {
        var agentMarkersArray = this.generateMarkers(agentArray, markers);
        this.addMarkersToMap(layerGroup, agentMarkersArray);
    };
    AppComponent.prototype.addMarkersToMap = function (layerGroup, agentMarkersArray) {
        layerGroup.clearLayers();
        layerGroup.addLayer(L.layerGroup(agentMarkersArray));
    };
    AppComponent.prototype.generateMarkers = function (agentArray, markers) {
        var _this = this;
        var agentMarkersArray = [];
        agentArray.forEach(function (agent) {
            var marker = L.marker([agent.latitude, agent.longitude], { icon: _this.highlightAgent(agent) ? markers.highlighted : markers.normal }).bindPopup('Name: ' + agent.name + '<br>Age: ' + agent.age);
            agentMarkersArray.push(marker);
        });
        return agentMarkersArray;
    };
    AppComponent.prototype.highlightAgent = function (agent) {
        return this.nameFilter && agent.name.toLowerCase().startsWith(this.nameFilter.toLowerCase());
    };
    __decorate([
        core_1.Input
    ], AppComponent.prototype, "ageFilter");
    __decorate([
        core_1.Input
    ], AppComponent.prototype, "nameFilter");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n      <md-input type=\"number\" [(ngModel)]=\"ageFilter\" (keyup.enter)=\"filterByAge()\"></md-input>\n      <button md-button (click)=filterByAge()>Filter by age</button>\n      \n      <md-input [(ngModel)]=\"nameFilter\"(keyup.enter)=\"filterByName()\"></md-input>\n      <button md-button (click)=filterByName()>Filter by name</button>\n     <div id=\"mapid\"></div>\n    ",
            styles: ["\n  #mapid { height: 90%; }\n\n"],
            providers: [agent_service_1.AgentService]
        }),
        __param(0, core_1.Inject(agent_service_1.AgentService))
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map