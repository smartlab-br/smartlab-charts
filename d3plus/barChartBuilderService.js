const D3PlusChartBuilderService = require('./d3plusChartBuilderService');

class BarChartBuilderService extends D3PlusChartBuilderService {
    constructor() {
        super();
    }

    prepareChart(viz, slicedDS, containerId, options, additionalOptions) {
        let colorArray = null;

        if(!options.colorScale && !options.color && !options.colorArray){ //default
            options.colorScale = {};
            options.colorScale.name = 'Set1';
        }

        if (options.colorScale && options.colorScale.name) {
            colorArray = additionalOptions.colorHandlers.getColorScale(options.colorScale.name, options.colorScale.type, options.colorScale.order, options.colorScale.levels);
        } else if (options.colorArray) {
            colorArray = options.colorArray;
        }
        
        if (colorArray != null) {
            let colorCat = {};
            let colorIndx = 0;
            for (let row of slicedDS) {
                if (colorCat[row[options.id]]) {
                    row.color = colorCat[row[options.id]];
                } else {
                    colorCat[row[options.id]] = colorArray[colorIndx];
                    row.color = colorArray[colorIndx];
                    colorIndx++;
                }
            }
        }

        if (options.accum) {
          if (options.orientation == "vertical"){
            slicedDS = this.sortDataset(slicedDS, options.x);
          } else {
            slicedDS = this.sortDataset(slicedDS, options.y);
          }
          slicedDS = this.prepareAccumData(slicedDS, options);
        }
  
        let grafico = viz
            .select(containerId)  // container DIV to hold the visualization
            .data(slicedDS)  // data to use with the visualization
            .label((d) => { //retira label se x < 0 - utilizado na pirâmide
                return (d[options.x] < 0)? "" :  additionalOptions.cleanLabel(d[options.text], options.removed_text_list);
            })
            .groupBy(options.id)
            .y(options.y)    // key to use for y-axis
            .x(options.x)         // key to use for x-axis
            .detectResize(true);

        return grafico;
    }
        
    generateViz(options, additionalOptions) {
        let tooltip_function = additionalOptions.tooltipFunction;
        let tooltip_context = additionalOptions.context ? additionalOptions.context : null;
        let removed_text_list = options.removed_text_list; 

        let barConfig = {
          labelConfig: {
            textAnchor: "left",
            fontFamily: additionalOptions.fontFamily ? additionalOptions.fontFamily : this._fontFamily,
            //fontSize: 20
            fontMin: 2,
            fontMax: 20,
            fontResize: true
          }
        };
        
        if (options.label_height !== undefined) barConfig.labelConfig.fontSize = options.label_height;
        if (options.orientation != 'vertical') barConfig.labelConfig.fontColor = "#fff";

        let viz = new this.d3plus.BarChart()
              //.data({"opacity":0.7})  // data to use with the visualization
            .shapeConfig({ 
                labelConfig: { fontFamily: additionalOptions.fontFamily ? additionalOptions.fontFamily : this._fontFamily },
                Bar: barConfig
            })
            .legendConfig({ 
                label: function (d) { return options.legend_field ? d[options.legend_field] : d[options.id] },
                shapeConfig:{
                    labelConfig: {
                        fontSize: 14,
                        fontColor: additionalOptions.colorHandlers.assessZebraTitleColor(additionalOptions.sectionIndex, additionalOptions.theme)
                    }
                }
            })
            .legendPosition("top")
            .tooltipConfig({
                body: function(d) {
                    if (tooltip_function instanceof String) {
                        return tooltip_context[tooltip_function].apply(tooltip_context, [d, additionalOptions.route, additionalOptions.headers, removed_text_list, options]);
                    } else {
                        return tooltip_function.apply(tooltip_context, [d, additionalOptions.route, additionalOptions.headers, removed_text_list, options]);
                    }
                },
                title: function(d) { return ""; }
            });
        
        if (options.color !== null && options.color !== undefined) {
            if(options.color == "accent"){
                let colorAccent = additionalOptions.theme.accent;
                viz = viz.color(() => { return colorAccent; });
            } else{
                viz = viz.color(() => { return options.color; });
            }
        } else if (options.multi === null || options.multi === undefined || !options.multi) {
            viz = viz.color(function(d) { return (d.color !== null && d.color !== undefined) ? d.color : '#2196F3'; });
        } else {
            viz = viz.colorScaleConfig({
                color: additionalOptions.colorHandlers.getColorScale(options.colorScale.name)
            });           
            viz = viz.color("color");
        } 

        if(options.stacked) viz = viz.stacked(true);

        let xConfig = this.constructor.getDefaultXYConfig(additionalOptions.axesStrokeClass);
        let yConfig = this.constructor.getDefaultXYConfig(additionalOptions.axesStrokeClass);

        if (options.show_x_axis !== undefined && options.show_x_axis !== null){ 
            if (!options.show_x_axis) xConfig= this.constructor.getTransparentXYConfig();
        } else if (options.orientation == 'vertical') {
            xConfig= this.constructor.getTransparentXYConfig();
        }

        if (options.show_y_axis != undefined && options.show_y_axis != null) {
            if (!options.show_y_axis) yConfig = this.constructor.getTransparentXYConfig();
        } else if (options.orientation != 'vertical') {
            yConfig = this.constructor.getTransparentXYConfig();
        }

        if (options.orientation == 'vertical') {
          viz = viz
            .discrete("x")
            .xConfig(xConfig)
            .yConfig(yConfig);
        } else {
          viz = viz
            .discrete("y")
            .xConfig(xConfig)
            .yConfig(yConfig);
        }

        return viz;
    }

    // Custom functions
    sortDataset(dataset, sort_field = "nu_competencia"){
        //array temporário que armazena o índice e o valor para ordenação
        let map = dataset.map((d, i) => { return { index: i, value: parseInt(d[sort_field]) }; });
        
        //ordenação do array temporario
        map.sort((a, b) => { return +(a.value > b.value) || +(a.value === b.value) - 1; });
        
        //ordenaçao do dataset baseado no array temporário ordenado
        let nuDataset = map.map((d) => { return dataset[d.index]; });
        
        return nuDataset;
    }

    prepareAccumData(dataset, options) {
        var accum = 0
        
        var originalLength = dataset.length;

        var accumDataType = options.accumDataType ? options.accumDataType : "inteiro";
        var accumDataPrecision = options.accumDataPrecision ? options.accumDataPrecision : 1;
        var accumDataCollapse = options.accumDataCollapse ? options.accumDataCollapse : false;
        if (options.desc_field == undefined) options.desc_field = "ds_indicador_radical" 

        for (var i = 0; i < originalLength; i++) { 
            var d = {}; 
            dataset[i].id = 2;
            
            // d.cd_indicador = dataset[i].cd_indicador;
            d[options.desc_field] = dataset[i][options.desc_field] + ' - Acumulado';
            d[options.legend_field] = dataset[i][options.legend_field] + ' - Acumulado';
            if (options.orientation == 'vertical') {
              d[options.x] = dataset[i][options.x];
              d.id = 1;
              var vl_indicador = dataset[i][options.y];
              d[options.y] = accum;
              d[options.text] = this.formatNumber(accum, accumDataType, accumDataPrecision, 1, accumDataCollapse, true, false)
              accum = accum + vl_indicador;
            } else {
              d[options.y] = dataset[i][options.y];
              d.id = 1;
              var vl_indicador = dataset[i][options.x];
              d[options.x] = accum;
              d[options.text] = this.formatNumber(accum, accumDataType, accumDataPrecision, 1, accumDataCollapse, true, false)
              accum = accum + vl_indicador;
            }

            dataset.push(d);
        }

        return dataset;
    }

    formatNumber(value, format, num_digits, multiplier = 1, collapse = null, signed = false, uiTags = true){

        if (format == 'cep'){
          value = ('00000000' + value.toString()).slice(-8);
          value = value.slice(0,5) + '-' + value.slice(-3);
          return value;
        }
    
    
        if (multiplier === null || multiplier === undefined) {
          multiplier = 1;
        }
    
        if (signed === null || signed === undefined) {
          signed = false;
        }
    
        if (uiTags === null || uiTags === undefined) {
          uiTags = true;
        }
    
        var openUiTags = '';
        var closeUiTags = '';
    
        let unitPrefix = '';
    
        if(value === null || value === undefined){
          return "-"; 
        }
        value = parseFloat(value) * multiplier;
        
        // Verifica a ordem de grandeza do número, para poder reduzir o tamanho da string
        let collapseSuffix = '';
        let magnitude = 0;
        if (collapse) {
          magnitude = Math.floor((Math.floor(Math.abs(value)).toString().length - 1)/3);
    
          if (magnitude > 0) {
            if ((collapse.uiTags === null || collapse.uiTags === undefined || collapse.uiTags) && uiTags) {
              uiTags = true;
            } else {
              uiTags = false;
            }
    
          }
    
          if (uiTags) {
            openUiTags = '<span>';
            closeUiTags = '</span>';
          }
    
          value = value / Math.pow(10, magnitude * 3);
          // Define o termo usado no final da string
          switch (magnitude) {
            case 1:
              collapseSuffix = openUiTags + 'mil' + closeUiTags;
              break;
            case 2:
              collapseSuffix = openUiTags + 'mi' + closeUiTags;
              break;
            case 3:
              collapseSuffix = openUiTags + 'bi' + closeUiTags;
              break;
            case 4:
              collapseSuffix = openUiTags + 'tri' + closeUiTags;
              break;
          }
    
          // Se contrair o dado, ver o format resultante
          if (magnitude > 0) {
            num_digits = collapse.num_digits ? collapse.num_digits : null;
            format = collapse.format ? collapse.format : null;
          }
          unitPrefix = format == 'monetario' ? openUiTags + "R$" + closeUiTags : '';
          // if (magnitude > 0) {
          //   unitPrefix = "&plusmn;" + unitPrefix;
          // }
        } else {
          if (uiTags) {
            openUiTags = '<span>';
            closeUiTags = '</span>';
          }
    
          // Define um prefixo de unidade
          unitPrefix = format == 'monetario' ? openUiTags + "R$" + closeUiTags : '';
          if (signed && value > 0) {
            unitPrefix = "+";
          }
        }
        
        num_digits = num_digits ? num_digits : 1;
        // Define a configuração do locale
        let localeConfig = {
          maximumFractionDigits: num_digits
        }
    
    
        if (format == 'inteiro') {
          localeConfig.maximumFractionDigits = 0;
        } else {
          // if (format == 'real' || format == 'porcentagem' || format == 'monetario') {
          //   if (Math.floor((value - Math.floor(value))*(Math.pow(10, num_digits))) == 0) {
          //     // Se o número for efetivamente um inteiro e não tiver collapse, retira a casa decimal
          //     localeConfig.maximumFractionDigits = 0;
          //   }
          // }
          localeConfig.minimumFractionDigits = localeConfig.maximumFractionDigits;
        }
    
        // Substitui o collapseConfig apenas na porcentagem
        if (format == 'porcentagem') collapseSuffix = openUiTags + "%" + closeUiTags;
        return unitPrefix + value.toLocaleString('pt-br', localeConfig) + collapseSuffix;
      }
    
}

module.exports = BarChartBuilderService