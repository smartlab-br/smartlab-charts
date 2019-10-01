class ChartBuilderService {
    constructor() {}

    static generateChart(type, containerId, dataset, options, additionalOptions = {}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let container = document.getElementById(containerId);
                if (container) {
                    let Builder;
                    container.innerHTML = '';
                    switch (type) {
                        // D3Plus based
                        case 'MAP_TOPOJSON':
                            Builder = require('./d3plus/topoJsonChartBuilderService');
                            break;
                        case 'LINE':
                            Builder = require('./d3plus/lineChartBuilderService');
                            break;
                        case 'STACKED': // Unused
                            Builder = require('./d3plus/stackedLineChartBuilderService');
                            break;
                        case 'BAR':
                            Builder = require('./d3plus/barChartBuilderService');
                            break;
                        case 'TREEMAP':
                            Builder = require('./d3plus/treemapChartBuilderService');
                            break;
                        case 'SCATTERPLOT': // Unused
                            Builder = require('./d3plus/scatterChartBuilderService');
                            break;
                        case 'BOXPLOT': // Unused
                            Builder = require('./d3plus/boxplotChartBuilderService');
                            break;
                        // D3 based
                        case 'CALENDAR': // Unused
                            Builder = require('./d3/calendarChartBuilderService');
                            break;
                        case 'SANKEYD3': // Unused
                            Builder = require('./d3/sankeyChartBuilderService');
                            break;
                        // Leaflet based
                        case 'MAP_BUBBLES':
                            Builder = require('./leaflet/bubblesChartBuilderService');
                            break;
                        case 'MAP_CLUSTER':
                            Builder = require('./leaflet/clusterChartBuilderService');
                            break;
                        case 'MAP_HEAT':
                            Builder = require('./leaflet/heatChartBuilderService');
                            break;
                        case 'MAP_POLYGON': // Unused
                            Builder = require('./leaflet/polygonsChartBuilderService');
                            break;
                        default:
                            break;
                    }
                    if (builder) {
                        try {
                            let chart = (new Builder()).generateChart(containerId, dataset, options, additionalOptions);
                            resolve(chart);
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        reject("Falha ao gerar o gráfico")
                    }
                }
            }, 0);
        })
    }

    static regenerateChart(chartHandler, type, containerId, dataset, options, additionalOptions = {}) {
        if (['MAP_TOPOJSON', 'LINE', 'STACKED', 'BAR', 'TREEMAP', 'SCATTERPLOT', 'BOXPLOT', 'CALENDAR', 'SANKEYD3'].includes(type)) {
            return ChartBuilderService.generateChart(type, containerId, dataset, options, additionalOptions);
        } else if (['MAP_BUBBLES', 'MAP_CLUSTER', 'MAP_HEAT', 'MAP_POLYGON'].includes(type)) {
            chartHandler.removeChart();
            return ChartBuilderService.generateChart(type, containerId, dataset, options, additionalOptions);
        }
    }
}

module.exports = ChartBuilderService