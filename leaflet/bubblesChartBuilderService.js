import LeafletChartBuilderService from './leafletChartBuilderService';

class BubblesChartBuilderService extends LeafletChartBuilderService {
    radius = { multiplier: 1600000, base: 5000 };
    fCircleSize = d3.scaleLog().range([1, 4001]);

    constructor() {
        super();
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
        let id_field = options.id_field ? options.id_field : 'cd_indicador';
          
        for (const ident of options.indicadores) {
            let group = L.layerGroup();
            group.addTo(this.chart);
            this.layers[ident] = group;
        }

        // Iterates over the dataset, to build each circle and apply to the respective layer
        for(let each_row of dataset) {
            if (each_row[options.lat] && each_row[options.long] &&
                each_row[options.lat] != 0 && each_row[options.long] != 0) {
                // Iterates over the layers
                for (const [pos, ident] of options.indicadores.entries()) {
                    // Checks if the row is for the layer (moves to next if different)
                    if (ident != each_row[id_field]) continue;

                    // Gets the value for each layer
                    let value = each_row[value_field];
                    
                    // Builds the circle
                    let eachCircle = new circleDataPoint(
                        [each_row[options.lat], each_row[options.long]],
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

export default BubblesChartBuilderService