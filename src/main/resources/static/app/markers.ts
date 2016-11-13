export class Markers {

    normal: L.AwesomeMarkers.icon;
    highlighted: L.AwesomeMarkers.icon;

    constructor(icon: string, normalColor: string, highlightedColor: string) {
        this.normal = L.AwesomeMarkers.icon({prefix: 'ion', icon: icon, markerColor: normalColor});
        this.highlighted = L.AwesomeMarkers.icon({prefix: 'ion', icon: icon, markerColor: highlightedColor});
    }
}