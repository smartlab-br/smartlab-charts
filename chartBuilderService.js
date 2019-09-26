class ChartBuilderService {
    constructor() {}

    static generateChart(type, containerId, dataset, options, additionalOptions = {}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let container = document.getElementById(containerId);
                if (container) {
                    let builder;
                    container.innerHTML = '';
                    switch (type) {
                        // D3Plus based
                        case 'MAP_TOPOJSON':
                            let clsDef = require('./d3plus/topoJsonChartBuilderService');
                            builder = new clsDef.clsDef.TopoJsonChartBuilderService();
                            break;
                        case 'LINE':
                            let clsDef = require('./d3plus/lineChartBuilderService');
                            builder = new clsDef.LineChartBuilderService();
                            break;
                        case 'STACKED': // Unused
                            let clsDef = require('./d3plus/stackedLineChartBuilderService');
                            builder = new clsDef.StackedLineChartBuilderService();
                            break;
                        case 'BAR':
                            let clsDef = require('./d3plus/barChartBuilderService');
                            builder = new clsDef.BarChartBuilderService();
                            break;
                        case 'TREEMAP':
                            let clsDef = require('./d3plus/treemapChartBuilderService');
                            builder = new clsDef.TreemapChartBuilderService();
                            break;
                        case 'SCATTERPLOT': // Unused
                            let clsDef = require('./d3plus/scatterChartBuilderService');
                            builder = new clsDef.ScatterChartBuilderService();
                            break;
                        case 'BOXPLOT': // Unused
                            let clsDef = require('./d3plus/boxplotChartBuilderService');
                            builder = new clsDef.BoxplotChartBuilderService();
                            break;
                        // D3 based
                        case 'CALENDAR': // Unused
                            let clsDef = require('./d3plus/calendarChartBuilderService');
                            builder = new clsDef.CalendarChartBuilderService();
                            break;
                        case 'SANKEYD3': // Unused
                            let clsDef = require('./d3plus/sankeyChartBuilderService');
                            builder = new clsDef.SankeyChartBuilderService();
                            break;
                        // Leaflet based
                        case 'MAP_BUBBLES':
                            let clsDef = require('./d3plus/bubblesChartBuilderService');
                            builder = new clsDef.BubblesChartBuilderService();
                            break;
                        case 'MAP_CLUSTER':
                            let clsDef = require('./d3plus/clusterChartBuilderService');
                            builder = new clsDef.ClusterChartBuilderService();
                            break;
                        case 'MAP_HEAT':
                            let clsDef = require('./d3plus/heatChartBuilderService');
                            builder = new clsDef.HeatChartBuilderService();
                            break;
                        case 'MAP_POLYGON': // Unused
                            let clsDef = require('./d3plus/polygonsChartBuilderService');
                            builder = new clsDef.PolygonsChartBuilderService();
                            break;
                        default:
                            break;
                    }
                    if (builder) {
                        try {
                            let chart = builder.generateChart(containerId, dataset, options, additionalOptions);
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