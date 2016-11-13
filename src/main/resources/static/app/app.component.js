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
        this.femaleLayerGroup = L.layerGroup([]);
        this.maleLayerGroup = L.layerGroup([]);
        this.maleMarkers = {
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
        this.femaleMarkers = {
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
    }
    AppComponent.prototype.filter = function () {
        this.getAgentsFromServer();
    };
    AppComponent.prototype.filterName = function () {
        this.processServerResults(this.maleAgents, this.maleMarkers, this.maleLayerGroup);
        this.processServerResults(this.femaleAgents, this.femaleMarkers, this.femaleLayerGroup);
    };
    AppComponent.prototype.highlightAgent = function (agent) {
        return this.nameFilter && agent.name.toLowerCase().startsWith(this.nameFilter.toLowerCase());
    };
    AppComponent.prototype.drawMap = function () {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.femaleLayerGroup.addTo(this.map);
        this.maleLayerGroup.addTo(this.map);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.drawMap();
        this.getAgentsFromServer();
    };
    AppComponent.prototype.getAgentsFromServer = function () {
        var _this = this;
        this.agentService.getFemaleAgents(this.ageFilter).then(function (femaleAgents) {
            _this.femaleAgents = femaleAgents;
            _this.processServerResults(femaleAgents, _this.femaleMarkers, _this.femaleLayerGroup);
        });
        this.agentService.getMaleAgents(this.ageFilter).then(function (maleAgents) {
            _this.maleAgents = maleAgents;
            _this.processServerResults(maleAgents, _this.maleMarkers, _this.maleLayerGroup);
        });
    };
    AppComponent.prototype.processServerResults = function (agentArray, markers, layerGroup) {
        var _this = this;
        var agentMarkersArray = [];
        agentArray.forEach(function (agent) {
            var marker = L.marker([agent.latitude, agent.longitude], { icon: _this.highlightAgent(agent) ? markers.highlighted : markers.normal }).bindPopup('Name: ' + agent.name);
            agentMarkersArray.push(marker);
        });
        layerGroup.clearLayers();
        layerGroup.addLayer(L.layerGroup(agentMarkersArray));
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