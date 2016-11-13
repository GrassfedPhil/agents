"use strict";
var Markers = (function () {
    function Markers(icon, normalColor, highlightedColor) {
        this.normal = L.AwesomeMarkers.icon({ prefix: 'ion', icon: icon, markerColor: normalColor });
        this.highlighted = L.AwesomeMarkers.icon({ prefix: 'ion', icon: icon, markerColor: highlightedColor });
    }
    return Markers;
}());
exports.Markers = Markers;
//# sourceMappingURL=markers.js.map