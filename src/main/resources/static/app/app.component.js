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
var AppComponent = (function () {
    function AppComponent(agentService) {
        this.agentService = agentService;
        this.agents = [];
        this.femaleAgents = [];
        this.maleAgents = [];
        this.maleMarker = L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'man'
        });
        this.femaleMarker = L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'woman',
            markerColor: 'red'
        });
        this.highlightedMaleMarker = L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'man',
            markerColor: 'orange'
        });
        this.highlightedFemaleMarker = L.AwesomeMarkers.icon({
            prefix: 'ion',
            icon: 'woman',
            markerColor: 'orange'
        });
    }
    AppComponent.prototype.filter = function () {
        this.resetMapLayers();
        this.getAgentsFromServer();
    };
    AppComponent.prototype.filterName = function () {
        this.resetMapLayers();
        this.processMaleServerResults(this.maleAgents);
        this.processFemaleServerResults(this.femaleAgents);
    };
    AppComponent.prototype.filterByName = function () {
        var _this = this;
        var filteredMaleAgents = [];
        var filteredFemaleAgents = [];
        if (this.nameFilter) {
            this.maleAgents.forEach(function (agent) {
                agent.name.toLowerCase().startsWith(_this.nameFilter) ? agent.highlight = true : agent.highlight = false;
                filteredMaleAgents.push(agent);
                _this.maleAgents = filteredMaleAgents;
            });
            this.femaleAgents.forEach(function (agent) {
                agent.name.toLowerCase().startsWith(_this.nameFilter) ? agent.highlight = true : agent.highlight = false;
                filteredFemaleAgents.push(agent);
                _this.femaleAgents = filteredFemaleAgents;
            });
        }
    };
    AppComponent.prototype.drawMap = function () {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.drawMap();
        this.getAgentsFromServer();
    };
    AppComponent.prototype.getAgentsFromServer = function () {
        var _this = this;
        this.agentService.getFemaleAgents(this.ageFilter).then(function (femaleAgents) { return _this.processFemaleServerResults(femaleAgents); });
        this.agentService.getMaleAgents(this.ageFilter).then(function (maleAgents) { return _this.processMaleServerResults(maleAgents); });
    };
    AppComponent.prototype.generateFemaleLayerGroup = function (femaleAgents) {
        var _this = this;
        var femaleMarkers = [];
        femaleAgents.forEach(function (femaleAgent) {
            var marker = L.marker([femaleAgent.latitude, femaleAgent.longitude], { icon: femaleAgent.highlight ? _this.highlightedFemaleMarker : _this.femaleMarker }).bindPopup('Name: ' + femaleAgent.name);
            femaleMarkers.push(marker);
        });
        this.femaleLayerGroup = L.layerGroup(femaleMarkers);
    };
    AppComponent.prototype.generateMaleLayerGroup = function (maleAgents) {
        var _this = this;
        var maleMarkers = [];
        maleAgents.forEach(function (maleAgent) {
            var marker = L.marker([maleAgent.latitude, maleAgent.longitude], { icon: maleAgent.highlight ? _this.highlightedMaleMarker : _this.maleMarker }).bindPopup('Name: ' + maleAgent.name);
            maleMarkers.push(marker);
        });
        this.maleLayerGroup = L.layerGroup(maleMarkers);
    };
    AppComponent.prototype.processMaleServerResults = function (maleAgents) {
        this.maleAgents = maleAgents;
        this.filterByName();
        this.generateMaleLayerGroup(this.maleAgents);
        this.maleLayerGroup.addTo(this.map);
    };
    AppComponent.prototype.processFemaleServerResults = function (femaleAgents) {
        this.femaleAgents = femaleAgents;
        this.filterByName();
        this.generateFemaleLayerGroup(this.femaleAgents);
        this.femaleLayerGroup.addTo(this.map);
    };
    AppComponent.prototype.resetMapLayers = function () {
        this.map.removeLayer(this.femaleLayerGroup);
        this.map.removeLayer(this.maleLayerGroup);
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
            template: "\n      <input [(ngModel)]=\"ageFilter\" (keyup.enter)=\"filter()\">\n      <button (click)=filter()>Filter</button>\n      \n      <input [(ngModel)]=\"nameFilter\"(keyup.enter)=\"filterName()\">\n      <button (click)=filterName()>Filter</button>\n     <div id=\"mapid\"></div>\n    ",
            styles: ["\n  #mapid { height: 500px; }\n\n"],
            providers: [agent_service_1.AgentService]
        }),
        __param(0, core_1.Inject(agent_service_1.AgentService))
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map