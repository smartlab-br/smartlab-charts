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
                            let TopoJsonChartBuilderService = require('./d3plus/topoJsonChartBuilderService');
                            builder = new TopoJsonChartBuilderService();
                            break;
                        case 'LINE':
                            let LineChartBuilderService = require('./d3plus/lineChartBuilderService');
                            builder = new LineChartBuilderService();
                            break;
                        case 'STACKED': // Unused
                            let StackedLineChartBuilderService = require('./d3plus/stackedLineChartBuilderService');
                            builder = new StackedLineChartBuilderService();
                            break;
                        case 'BAR':
                            let BarChartBuilderService = require('./d3plus/barChartBuilderService');
                            builder = new BarChartBuilderService();
                            break;
                        case 'TREEMAP':
                            let TreemapChartBuilderService = require('./d3plus/treemapChartBuilderService');
                            builder = new TreemapChartBuilderService();
                            break;
                        case 'SCATTERPLOT': // Unused
                            let ScatterChartBuilderService = require('./d3plus/scatterChartBuilderService');
                            builder = new ScatterChartBuilderService();
                            break;
                        case 'BOXPLOT': // Unused
                            let BoxplotChartBuilderService = require('./d3plus/boxplotChartBuilderService');
                            builder = new BoxplotChartBuilderService();
                            break;
                        // D3 based
                        case 'CALENDAR': // Unused
                            let CalendarChartBuilderService = require('./d3plus/calendarChartBuilderService');
                            builder = new CalendarChartBuilderService();
                            break;
                        case 'SANKEYD3': // Unused
                            let SankeyChartBuilderService = require('./d3plus/sankeyChartBuilderService');
                            builder = new SankeyChartBuilderService();
                            break;
                        // Leaflet based
                        case 'MAP_BUBBLES':
                            let BubblesChartBuilderService = require('./d3plus/bubblesChartBuilderService');
                            builder = new BubblesChartBuilderService();
                            break;
                        case 'MAP_CLUSTER':
                            let ClusterChartBuilderService = require('./d3plus/clusterChartBuilderService');
                            builder = new ClusterChartBuilderService();
                            break;
                        case 'MAP_HEAT':
                            let HeatChartBuilderService = require('./d3plus/heatChartBuilderService');
                            builder = new HeatChartBuilderService();
                            break;
                        case 'MAP_POLYGON': // Unused
                            let PolygonsChartBuilderService = require('./d3plus/polygonsChartBuilderService');
                            builder = new PolygonsChartBuilderService();
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