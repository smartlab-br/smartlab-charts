const LeafletChartBuilderService = require('./leafletChartBuilderService');

class PolygonsChartBuilderService extends LeafletChartBuilderService {
    constructor() {
		super();
		this.topojson = require('../../../../node_modules/topojson/dist/topojson.min.js');
		this.range = [null, null];
    }

    fillLayers(dataset, options, boundsZoom = null) {
      	// https://blog.webkid.io/maps-with-leaflet-and-topojson/
		// Gera o range
		let range = [null, null];
		if (options.colorScale && options.colorScale.range && options.colorScale.range.min_value){
			range[0] = options.colorScale.range.min_value;
		}
		if (options.colorScale && options.colorScale.range && options.colorScale.range.max_value){
			range[1] = options.colorScale.range.max_value;
		}

		for (let each_row of dataset) {
			if (range[0] === null || range[0] > each_row[options.value_field]) range[0] = each_row[options.value_field];
			if (range[1] === null || range[1] < each_row[options.value_field]) range[1] = each_row[options.value_field];
		}

		if (options.colorScale && options.colorScale.range && options.colorScale.range.mid_value !== undefined){
			if ((range[1] - options.colorScale.range.mid_value) > (options.colorScale.range.mid_value - range[0])){
				range[0] = options.colorScale.range.mid_value - (range[1] - options.colorScale.range.mid_value);
			} else if ((range[1] - options.colorScale.range.mid_value) < (options.colorScale.range.mid_value - range[0])){
				range[1] = options.colorScale.range.mid_value + (options.colorScale.range.mid_value - range[0]);
			}
		}

		this.range = range;

		let this_ = this;
		this.L.TopoJSON = this.L.GeoJSON.extend({  
			addData: function(jsonData) {    
				if (jsonData.type === 'Topology') {
					for (let key in jsonData.objects) {
						let geojson = this_.topojson.feature(jsonData, jsonData.objects[key]);
						this_.L.GeoJSON.prototype.addData.call(this, geojson);               
					}
				} else {
					this_.L.GeoJSON.prototype.addData.call(this, jsonData);
				}
			}  
		});
		
		try {
			let layer = new this.L.TopoJSON();
			layer.addData(options.topology);
			layer.addTo(this.chart);
			layer.eachLayer(this.handlePolygon, this);

			if (options.show_legend){

				let scaleName = "RdYlBu";
				if (options.colorScale && options.colorScale.name){
					scaleName = options.colorScale.name;
				}
				if (options.colorScaleSelectedName){
					scaleName = options.colorScaleSelectedName;
				} 

				if (this.d3chrom['interpolate' + scaleName] == null || this.d3chrom['interpolate' + scaleName] == undefined){
					scaleName = "RdYlBu"
				}
	
				let legend = L.control({position: 'topright'})
				let d3chrom = this.d3chrom;
				
				legend.onAdd = function (map) {
				
						let div = L.DomUtil.create('div', 'legend');
						let value = 0;
						for (var i = range[0]; i <= range[1]; i = i + (range[1]-range[0])/20 ) {
							if (options.scale_order === undefined || options.scale_order === 'ASC') {
								value = (i - range[0]) / (range[1] - range[0]);
							} else {
								value = 1 - (i - range[0]) / (range[1] - range[0]);
							}
			
							div.innerHTML +=
									'<span style="display:inline-flex">' +
									'<div style="width:9px;height:18px;display:inline-block;background:' + 
									d3chrom['interpolate' + scaleName](value) + '"></div></span>';
						}
						
						div.style.padding = '6px 8px';
						div.style.background = 'rgba(255,255,255,0.8)';
						div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
						div.style.borderRadius = '5px';

						return div;
				};
				
				legend.addTo(this.chart);            
			}

		}
		catch(err){
			options.fnSendError(err);
		}		
	}
	
	handlePolygon(layer) {
		let dataset = this.dataset;
		let range = this.range;
		let options = this.options;
		let value = null;
		let row = dataset.filter( function(obj) { if (obj[options.id_field] == layer.feature.properties[options.topo_key]) return obj;});
		if (row.length !== 0){
			row = row[0];
			if (range && (range[0] !== range[1])){
				if (options.scale_order === undefined || options.scale_order === 'ASC') {
					value = (row[options.value_field] - range[0]) / (range[1] - range[0]);
				} else {
					value = 1 - (row[options.value_field] - range[0]) / (range[1] - range[0]);
				}
			} else {
				value = row[options.value_field];
			}
			
			let scaleName = "RdYlBu";
			if (options.colorScale && options.colorScale.name){
				scaleName = options.colorScale.name;
			}
			if (options.colorScaleSelectedName){
				scaleName = options.colorScaleSelectedName;
			} 


			let fillColor = "";
			if (this.d3chrom['interpolate' + scaleName]){
				fillColor = (value != null ? this.d3chrom['interpolate' + scaleName](value) : 'transparent');
			}	else {
				fillColor = (value != null ? this.d3chrom.interpolateRdYlBu(value) : 'transparent');
			}

			layer.options.rowData =  row;
			layer.options.customOptions = options;

			layer.setStyle({
				fillColor: fillColor,
				fillOpacity: 0.8,
				color: 'black',
				weight: 0.2,
				opacity: 1
			});
			layer.on({ 
				mouseover: function( event ) { this.setStyle({ weight: 4, opacity: 1, fillOpacity: 1 }); },
				mouseout: function( event ) { this.setStyle({ weight: 0.2, opacity: 1, fillOpacity: 0.8 }); },
				"click": this.circleClick
			});
		}
		if (value == null) {
			layer.setStyle({
				fillColor: 'transparent',
				fillOpacity: 0,
				color: 'black',
				weight: 0.2,
				opacity: 1
			});
        }
    }

}

module.exports = PolygonsChartBuilderService