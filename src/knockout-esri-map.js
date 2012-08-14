(function (window, $, ko, dojo, esri) {
	"use strict";

    ko.esri = ko.esri || {};

    ko.esri.MapBinding = function () {
		var self = this;

		// name of accessors to use within binding...
		// <div id="map" data-bind="esriMap: { mapObject: ..., layers: ..., extent: ..., etc... }"></div>
		var mapObjectAccessor = 'mapObject';	// esri.Map object created
		var mapLoadedAccessor = 'isLoaded';		// boolean, true if map is loaded with at least 1 layer
		var extentAccessor = 'extent';			// current esri.geometry.Extent of the map, only set internally
		var layersAccessor = 'layers';			// array of esri.layers.Layer, current map layers, push to to add layer to map
		var onClickAccessor = 'onClick';		// command to perform on map click, parameters are typical map click args

		// map: esri.Map
		// layerArray: array of esri.layers.Layer
		var updateMapLayers = function (map, layerArray) {
			if (map && layerArray) {
				$.each(layerArray, function (index, layer) {
					if ($.inArray(layer.id, map.layerIds) === -1 && $.inArray(layer.id, map.graphicsLayerIds) === -1) {
						map.addLayer(layer, index);
					}

					// TODO: Handle removing, reordering
				});
			}
		};

		// add handlers to update map on browser resize
		// map: esri.Map
		// TODO: maybe this should be on map container resize instead?
		// TODO: does dojo.disconnect need to be called? does it matter?
		var handleMapReposition = function (map) {
			var timer;
			dojo.connect(map, 'onLoad', function (evt) {
				dojo.connect(window, 'onresize', function (evt) {
					if ($(map.container).is(':visible')) {
						window.clearTimeout(timer);
						timer = window.setTimeout(function () {
							map.resize();
							map.reposition();
						}, 100);
					}
				});
			});
		};

		var binding = {
			init: function (element, valueAccessor) {
				dojo.require('esri.map');

				var mapElementId = element.id;
				var va = valueAccessor();

				var mapOptions = {
					fadeOnZoom: true,
					fitExtent: true,
					logo: false
				};

				dojo.ready(function () {

					var map = new esri.Map(mapElementId, mapOptions);

					if (va[mapObjectAccessor]) {
						va[mapObjectAccessor](map);
					}

					handleMapReposition(map);

					if (va[mapLoadedAccessor]) {
						dojo.connect(map, 'onLoad', function (evt) {
							va[mapLoadedAccessor](map.loaded);
						});
					}

					if (va[onClickAccessor]) {
						dojo.connect(map, 'onClick', va[onClickAccessor]);
					}

					if (va[extentAccessor]) {
						dojo.connect(map, 'onExtentChange', function (newExtent) {
							va[extentAccessor](newExtent);
						});
					}

					if (va[layersAccessor]) {
						ko.computed(function () {
							updateMapLayers(map, va[layersAccessor]());
						});
					}

				});
			}
		};

		ko.bindingHandlers.esriMap = binding;
	};

	ko.esri.MapBinding = new ko.esri.MapBinding();

}(window, jQuery, ko, dojo, esri));