import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AgentService} from "./agent.service";
import {HttpModule, JsonpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, JsonpModule, MaterialModule.forRoot()],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [AgentService]
})
export class AppModule {
}
