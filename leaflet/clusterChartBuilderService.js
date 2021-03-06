const LeafletChartBuilderService = require('./leafletChartBuilderService');

class ClusterChartBuilderService extends LeafletChartBuilderService {
    constructor() {
        super();
    }

	fillLayers(dataset, options, boundsZoom = null) {
		//default icon = blue
		let defaultIcon = new this.L.Icon({
			iconUrl: '/static/markers/marker-icon-2x-blue.png',
			shadowUrl: '/static/markers/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});

		if (options.markerIcons && options.indicadores) {
			for (let indicator of options.indicadores) {
				
				if(options.markerIcons[indicator] && typeof options.markerIcons[indicator] == "string") {
					options.markerIcons[indicator] = new this.L.Icon({
						iconUrl: '/static/markers/marker-icon-2x-'+ options.markerIcons[indicator].toString() +'.png',
						shadowUrl: '/static/markers/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					});
				} 
			}
		}

		let mapLayer = this.L.markerClusterGroup();
		let id_field = options.id_field ? options.id_field : 'cd_indicador';
		
		for (let each_row of dataset) {
			if (options.visibleLayers[each_row[id_field]]) {
				mapLayer.addLayer(
					this.L.marker(
						[ each_row[options.lat], each_row[options.long] ],
						{ rowData: each_row,
						  icon: (options.markerIcons && options.markerIcons[each_row[id_field]] && typeof options.markerIcons[each_row[id_field]] !== "string") ? options.markerIcons[each_row[id_field]]: defaultIcon,
						  customOptions: options
						}
					).on("click", this.circleClick)
				);
			}
		}
		
		this.mapLayer = mapLayer;
		this.chart.addLayer(mapLayer);
    }
}

module.exports = ClusterChartBuilderService