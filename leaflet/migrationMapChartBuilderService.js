const LeafletChartBuilderService = require('./leafletChartBuilderService');

class MigrationMapChartBuilderService extends LeafletChartBuilderService {
    constructor() {
        super();
        this.radius = { multiplier: 1600000, base: 5000 };
        this.fCircleSize = this.d3.scaleLog().range([1, 4001]);
    }

    fillLayers(dataset, options, boundsZoom = null) {
        // Sets the bubbles size handlers
        if (options && options.radius && options.radius.multiplier) this.radius.multiplier = options.radius.multiplier;
        if (options && options.radius && options.radius.base) this.radius.base = options.radius.base;
        
        if (boundsZoom == null) boundsZoom = this.chart.getZoom();
        let zoomIndex = boundsZoom > 5 ? Math.pow(boundsZoom/4,4) : 1;
          
        let multiplier = this.radius.multiplier / zoomIndex;

        let circleDataPoint = L.Circle.extend({ rowData: null });

        let value_field = options.value_field ? options.value_field : 'api_calc_ln_norm_pos_part';
        let loc_size_field = options.loc_size_field ? options.loc_size_field : 'api_calc_ln_norm_pos_part';
        let id_field = options.id_field ? options.id_field : 'cd_indicador';
          
        for (const ident of options.indicadores) {
            let group = L.layerGroup();
            group.addTo(this.chart);
            this.layers[ident] = group;
        }

        let builtCircles = {};
        let limits = {};

        // Iterates over the dataset, to build each circle and apply to the respective layer
        for(let each_row of dataset) {
            // get limits to normalize values
            if (limits[each_row[id_field]]) { // Alerady exists
                if (limits[each_row[id_field]].min > each_row[value_field]) limits[each_row[id_field]].min = each_row[value_field];
                if (limits[each_row[id_field]].max < each_row[value_field]) limits[each_row[id_field]].max = each_row[value_field];
            } else {
                limits[each_row[id_field]] = { min: each_row[value_field], max: each_row[value_field] }
            }

            // Evaluate and draw points
            if (each_row[options.source.lat] && each_row[options.source.long] &&
                each_row[options.source.lat] != 0 && each_row[options.source.long] != 0) {
                // Iterates over the layers
                for (const [pos, ident] of options.indicadores.entries()) {
                    // Checks if the row is for the layer (moves to next if different)
                    if (ident != each_row[id_field]) continue;

                    // Gets the value for each layer
                    let value = each_row[loc_size_field];
                    
                    // Builds the circle (if not already built)
                    let alreadyBuilt = false;
                    
                    for (let eachLayer in builtCircles) {
                        if (eachLayer == each_row[id_field] && builtCircles[eachLayer].includes(each_row[options.source.id])) {
                            alreadyBuilt = true;
                            break;
                        }
                    }

                    if(!alreadyBuilt) {
                        if (builtCircles[each_row[id_field]]) {
                            builtCircles[each_row[id_field]].push(each_row[options.source.id]);
                        } else {
                            builtCircles[each_row[id_field]] = [each_row[options.source.id]];
                        }

                        let eachCircle = new circleDataPoint(
                            [each_row[options.source.lat], each_row[options.source.long]],
                            { rowData: each_row,
                                color: options.color != null ? 
                                        options.color : 
                                        ( options.colorArray != null ? 
                                            options.colorArray[pos] :
                                            ( each_row.color != null ? each_row.color : '#4A148C' )
                                        ),
                                weight: options.weight != null ? options.weight : (each_row.weight != null ? each_row.weight : 0),
                                fillColor: options.fillColor != null ?
                                            options.fillColor : 
                                            ( options.colorArray != null ?
                                                options.colorArray[pos] :
                                                ( each_row.fillColor != null ? each_row.fillColor : '#4A148C' )
                                            ),
                                fillOpacity: options.fillOpacity != null ? 
                                                options.fillOpacity : 
                                                ( each_row.fillOpacity != null ? each_row.fillOpacity : 0.5 ),
                                radius: value != null ? value > 0 ? value * multiplier + this.radius.base : this.radius.base : 0,
                                customOptions: options
                            }
                        ).on("click", this.circleClick);

                        eachCircle.addTo(this.layers[ident]);
                    }
                }
            }
        }

        // Iterates over the dataset, to build connections to the circles
        let thetaOffset = (3.14/10),
            durationBase = (options && options.path && options.path.animation && options.path.animation.base_duration) ? options.path.animation.base_duration : 2000;
   	    
        for(let each_row of dataset) {
            if (each_row[options.source.lat] && each_row[options.source.long] &&
                each_row[options.source.lat] != 0 && each_row[options.source.long] != 0 &&
                each_row[options.target.lat] && each_row[options.target.long] &&
                each_row[options.target.lat] != 0 && each_row[options.target.long] != 0) {
                // Iterates over the layers
                for (const [pos, ident] of options.indicadores.entries()) {
                    // Checks if the row is for the layer (moves to next if different)
                    if (ident != each_row[id_field]) continue;

                    // Gets normalized value for each layer
                    if (limits[each_row[id_field]]) {
                        let value;
                        if (limits[each_row[id_field]].min == limits[each_row[id_field]].max) {
                            value = 1.5;
                        } else {
                            value = (((each_row[value_field] - limits[each_row[id_field]].min) / (limits[each_row[id_field]].max - limits[each_row[id_field]].min)) + 1) * ((options.path && options.path.multiplier) ? options.path.multiplier : 1);
                        }

                        // Calculating the curve
                        let latlng1 = [each_row[options.source.lat], each_row[options.source.long]],
	                        latlng2 = [each_row[options.target.lat], each_row[options.target.long]];

                        let offsetX = latlng2[1] - latlng1[1],
	                        offsetY = latlng2[0] - latlng1[0];

                        let r = Math.sqrt( Math.pow(offsetX, 2) + Math.pow(offsetY, 2) ),
	                        theta = Math.atan2(offsetY, offsetX);

                        let theta2 = theta + thetaOffset,
                            r2 = (r/2)/(Math.cos(thetaOffset)),
                            duration = Math.sqrt(Math.log(r)) * durationBase;;

                        let midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
                            midpointY = (r2 * Math.sin(theta2)) + latlng1[0];

                        var midpointLatLng = [midpointY, midpointX];

                        this.L.curve(
                            [
                                'M', latlng1,
                                'Q', midpointLatLng,
                                latlng2
                            ],
                            {
                                color: options.color != null ? 
                                    options.color : 
                                    ( options.colorArray != null ? 
                                        options.colorArray[pos] :
                                        ( each_row.color != null ? each_row.color : '#4A148C' )
                                    ),
                                opacity: options.fillOpacity != null ? 
                                    options.fillOpacity : 
                                    ( each_row.fillOpacity != null ? each_row.fillOpacity : 0.5 ),
                                weight: value,
                                animate: {
                                    "duration": duration,
                                    iterations: Infinity,
                                    easing: 'ease-in-out',
                                    direction: 'alternate'
                                }
                            }
                        ).addTo(this.layers[ident]);
                    }
                }
            }
        }

        this.adjustVisibleLayers(options.visibleLayers);
    }

    adjustVisibleLayers(enabled) {
        this.additionalOptions.visibleLayers = enabled;
        for (let indx in enabled) {
            if (enabled[indx]) {
                this.chart.addLayer(this.layers[indx]);
            } else {
                this.chart.removeLayer(this.layers[indx]);
            }
            // this.visibleLayers[indx] = options.enabled[indx];
        }
    }
      
}

module.exports = MigrationMapChartBuilderService