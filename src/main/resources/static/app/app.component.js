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
        this.title = 'Tour of Heroes';
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
    }
    AppComponent.prototype.filterAge = function (ageToFilterBy) {
        var filteredMaleAgents;
        var filteredFemaleAgents;
        if (!ageToFilterBy) {
            filteredMaleAgents = this.maleAgents;
            filteredFemaleAgents = this.femaleAgents;
        }
        else {
            ageToFilterBy = +ageToFilterBy;
            filteredMaleAgents = this.maleAgents.filter(function (agent) { return agent.age <= ageToFilterBy; });
            filteredFemaleAgents = this.femaleAgents.filter(function (agent) { return agent.age <= ageToFilterBy; });
        }
        this.resetMapLayers();
        this.generateFemaleLayerGroup(filteredFemaleAgents);
        this.generateMaleLayerGroup(filteredMaleAgents);
        this.femaleLayerGroup.addTo(this.map);
        this.maleLayerGroup.addTo(this.map);
    };
    AppComponent.prototype.drawMap = function () {
        this.map = L.map('mapid').setView([41.49, -99.9], 3);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drawMap();
        this.agentService.getFemaleAgents().then(function (femaleAgents) {
            _this.femaleAgents = femaleAgents;
            _this.generateFemaleLayerGroup(femaleAgents);
            _this.femaleLayerGroup.addTo(_this.map);
        });
        this.agentService.getMaleAgents().then(function (maleAgents) {
            _this.maleAgents = maleAgents;
            _this.generateMaleLayerGroup(maleAgents);
            _this.maleLayerGroup.addTo(_this.map);
        });
    };
    AppComponent.prototype.generateFemaleLayerGroup = function (femaleAgents) {
        var _this = this;
        var femaleMarkers = [];
        femaleAgents.forEach(function (femaleAgent) {
            var marker = L.marker([femaleAgent.latitude, femaleAgent.longitude], { icon: _this.femaleMarker }).bindPopup('Name: ' + femaleAgent.name);
            femaleMarkers.push(marker);
        });
        this.femaleLayerGroup = L.layerGroup(femaleMarkers);
    };
    AppComponent.prototype.generateMaleLayerGroup = function (maleAgents) {
        var _this = this;
        var maleMarkers = [];
        maleAgents.forEach(function (maleAgent) {
            var marker = L.marker([maleAgent.latitude, maleAgent.longitude], { icon: _this.maleMarker }).bindPopup('Name: ' + maleAgent.name);
            maleMarkers.push(marker);
        });
        this.maleLayerGroup = L.layerGroup(maleMarkers);
    };
    AppComponent.prototype.resetMapLayers = function () {
        this.map.removeLayer(this.femaleLayerGroup);
        this.map.removeLayer(this.maleLayerGroup);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n      <input #ageFilter (keyup.enter)=\"filterAge(ageFilter.value)\">\n      <button (click)=filterAge(ageFilter.value)>Filter</button>\n     <div id=\"mapid\"></div>\n    ",
            styles: ["\n  #mapid { height: 500px; }\n\n"],
            providers: [agent_service_1.AgentService]
        }),
        __param(0, core_1.Inject(agent_service_1.AgentService))
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map