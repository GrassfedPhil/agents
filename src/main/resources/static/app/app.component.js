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
            _this.agents = _this.agents.concat(femaleAgents);
            femaleAgents.forEach(function (femaleAgent) { return L.marker([femaleAgent.latitude, femaleAgent.longitude], { icon: _this.femaleMarker }).addTo(_this.map)
                .bindPopup('Name: ' + femaleAgent.name); });
        });
        this.agentService.getMaleAgents().then(function (maleAgents) {
            _this.agents = _this.agents.concat(maleAgents);
            maleAgents.forEach(function (maleAgent) { return L.marker([maleAgent.latitude, maleAgent.longitude], { icon: _this.maleMarker }).addTo(_this.map)
                .bindPopup('Name: ' + maleAgent.name); });
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n     <div id=\"mapid\"></div>\n\n    <h1>{{title}}</h1>\n    <h2>My Heroes</h2>\n    <ul class=\"heroes\">\n      <li *ngFor=\"let agent of agents\">\n        <span class=\"badge\">{{agent.name}}</span>\n      </li>\n    </ul>\n\n    ",
            styles: ["\n    \n  #mapid { height: 500px; }\n    \n  .selected {\n    background-color: #CFD8DC !important;\n    color: white;\n  }\n  .heroes {\n    margin: 0 0 2em 0;\n    list-style-type: none;\n    padding: 0;\n    width: 15em;\n  }\n  .heroes li {\n    cursor: pointer;\n    position: relative;\n    left: 0;\n    background-color: #EEE;\n    margin: .5em;\n    padding: .3em 0;\n    height: 1.6em;\n    border-radius: 4px;\n  }\n  .heroes li.selected:hover {\n    background-color: #BBD8DC !important;\n    color: white;\n  }\n  .heroes li:hover {\n    color: #607D8B;\n    background-color: #DDD;\n    left: .1em;\n  }\n  .heroes .text {\n    position: relative;\n    top: -3px;\n  }\n  .heroes .badge {\n    display: inline-block;\n    font-size: small;\n    color: white;\n    padding: 0.8em 0.7em 0 0.7em;\n    background-color: #607D8B;\n    line-height: 1em;\n    position: relative;\n    left: -1px;\n    top: -4px;\n    height: 1.8em;\n    margin-right: .8em;\n    border-radius: 4px 0 0 4px;\n  }\n"],
            providers: [agent_service_1.AgentService]
        }),
        __param(0, core_1.Inject(agent_service_1.AgentService))
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map