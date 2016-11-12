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
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
var core_1 = require("@angular/core");
var AgentService = (function () {
    function AgentService(http) {
        this.http = http;
        this.agentsUrl = 'agents';
    }
    AgentService.prototype.getFemaleAgents = function () {
        return this.http.get(this.agentsUrl + "?gender=Female")
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    AgentService.prototype.getMaleAgents = function () {
        return this.http.get(this.agentsUrl + "?gender=Male")
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    AgentService = __decorate([
        __param(0, core_1.Inject(http_1.Http))
    ], AgentService);
    return AgentService;
}());
exports.AgentService = AgentService;
//# sourceMappingURL=agent.service.js.map