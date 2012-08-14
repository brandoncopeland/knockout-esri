# Knockout ESRI Bindings

Custom [knockout.js](http://knockoutjs.com/) bindings for [ESRI Javascript API](http://help.arcgis.com/en/webapi/javascript/arcgis) widgets (currently just the map widget).

## Usage

	<div id="map" data-bind="esriMap: { mapObject: mapWidget, isLoaded: isMapLoaded,
		extent: currentMapExtent, layers: mapLayers, onClick: doSomething }"></div>
	 
	<script type="text/javascript">
	    var viewModel = {
	    	mapWidget: ko.observable(),
	    	isMapLoaded: ko.observable(),
	    	currentMapExtent: ko.observable(),
	    	mapLayers: ko.observableArray([]),
	    	doSomething: function () {
	    		alert('i did it');
	    	}
	    };
	</script>

## Parameters

Parameters are all optional.

__mapObject__: esri.Map, ESRI map widget

__isLoaded__: boolean, true if map has successfully loaded with at least 1 layer

__extent__: esri.geometry.Extent, current map extent (intended for reading only)

__layers__: array of esri.layers.Layer, current map layers, push to array to add layers to the map

__onClick__: command to fire on map click, args are identical to esri.map onClick event

## Requirements

* [jQuery](http://jquery.com/)
* [knockout.js](http://knockoutjs.com/)
* [ESRI Javascript API](http://help.arcgis.com/en/webapi/javascript/arcgis)