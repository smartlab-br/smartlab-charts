import TopoJsonChartBuilderService from './d3plus/topoJsonChartBuilderService';
import LineChartBuilderService from './d3plus/lineChartBuilderService';
import StackedLineChartBuilderService from './d3plus/stackedLineChartBuilderService';
import BarChartBuilderService from './d3plus/barChartBuilderService';
import TreemapChartBuilderService from './d3plus/treemapChartBuilderService';
import ScatterChartBuilderService from './d3plus/scatterChartBuilderService';
import BoxplotChartBuilderService from './d3plus/boxplotChartBuilderService';

import CalendarChartBuilderService from './d3/calendarChartBuilderService';
import SankeyChartBuilderService from './d3/sankeyChartBuilderService';

import BubblesChartBuilderService from './leaflet/bubblesChartBuilderService';
import ClusterChartBuilderService from './leaflet/clusterChartBuilderService';
import HeatChartBuilderService from './leaflet/heatChartBuilderService';
import PolygonsChartBuilderService from './leaflet/polygonsChartBuilderService';

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
                            builder = new TopoJsonChartBuilderService();
                            break;
                        case 'LINE':
                            builder = new LineChartBuilderService();
                            break;
                        case 'STACKED': // Unused
                            builder = new StackedLineChartBuilderService();
                            break;
                        case 'BAR':
                            builder = new BarChartBuilderService();
                            break;
                        case 'TREEMAP':
                            builder = new TreemapChartBuilderService();
                            break;
                        case 'SCATTERPLOT': // Unused
                            builder = new ScatterChartBuilderService();
                            break;
                        case 'BOXPLOT': // Unused
                            builder = new BoxplotChartBuilderService();
                            break;
                        // D3 based
                        case 'CALENDAR': // Unused
                            builder = new CalendarChartBuilderService();
                            break;
                        case 'SANKEYD3': // Unused
                            builder = new SankeyChartBuilderService();
                            break;
                        // Leaflet based
                        case 'MAP_BUBBLES':
                            builder = new BubblesChartBuilderService();
                            break;
                        case 'MAP_CLUSTER':
                            builder = new ClusterChartBuilderService();
                            break;
                        case 'MAP_HEAT':
                            builder = new HeatChartBuilderService();
                            break;
                        case 'MAP_POLYGON': // Unused
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