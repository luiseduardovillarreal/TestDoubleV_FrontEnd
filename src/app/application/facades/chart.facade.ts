import { Injectable } from "@angular/core";
import { Chart } from "chart.js";
import { QuestionResultsResponse } from "../../domain/models/inquest/get-results/question.results.response";
import { ResponseResultsResponse } from "../../domain/models/inquest/get-results/response.results.response";

@Injectable({ providedIn: 'root' })
export class ChartFacade {
    private charts: Map<string, Chart> = new Map();

    CreateBarChart = (idChart: string, question: QuestionResultsResponse): void => {
        this.DestroyChart(idChart);
        const labels = Object.keys(this.ProcessResultResponses(question.responses));
        const data = Object.values(this.ProcessResultResponses(question.responses));
        const ctx = document.getElementById(idChart) as HTMLCanvasElement;
     
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'],
                        borderColor: ['#388E3C', '#FFA000', '#D32F2F', '#1976D2', '#7B1FA2'],
                        borderWidth: 2,
                        borderRadius: 10,
                        barPercentage: 0.6,
                        categoryPercentage: 0.8
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutBounce'
                    },
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: `${question.questionn} (${question.type})`,
                            font: { size: 18 },
                            padding: {
                                top: 5,
                                bottom: 40
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw as number;
                                    const dataset = context.dataset.data as number[];
                                    const total = dataset.reduce((sum, val) => sum + val, 0);
                                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                                    return `Conteo de respuestas: ${value} | Porcentage de respuesta: (${percentage})`;
                                }
                            },
                            backgroundColor: '#000',
                            titleFont: { size: 14 },
                            bodyFont: { size: 12 },
                            padding: 10
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 1
                            },
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                },
                plugins: [
                    {
                        id: 'customLabels',
                        afterDatasetsDraw(chart) {
                            const ctx = chart.ctx;
                            chart.data.datasets.forEach((dataset, i) => {
                                const meta = chart.getDatasetMeta(i);
                                meta.data.forEach((bar, index) => {
                                    const value = dataset.data[index];
                                    ctx.fillStyle = '#000';
                                    ctx.font = 'bold 14px Arial';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(value!.toString(), bar.x, bar.y - 10);
                                });
                            });
                        }
                    },
                    {
                        id: 'percentageLabels',
                        afterDatasetsDraw(chart) {
                            const ctx = chart.ctx;
                            const dataset = chart.data.datasets[0].data as number[];
                            const total = dataset.reduce((sum, val) => sum + val, 0);

                            chart.data.datasets.forEach((dataset, i) => {
                                const meta = chart.getDatasetMeta(i);
                                meta.data.forEach((bar: any, index) => {
                                    const value = dataset.data[index] as number;
                                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                                    ctx.font = 'bold 14px Arial';
                                    ctx.textAlign = 'center';
                                    const x = bar.x;
                                    const barHeight = bar.base - bar.y;
                                    const y = bar.y + barHeight / 2;
                                    ctx.fillText(percentage, x, y);
                                });
                            });
                        }
                    }
                ]
            });

            this.charts.set(idChart, chart);
        }
    }

    CreateLineChart(idChart: string, question: QuestionResultsResponse) {
        this.DestroyChart(idChart);
        const labels = Object.keys(this.ProcessResultResponses(question.responses));
        const data = Object.values(this.ProcessResultResponses(question.responses));

        const ctx = document.getElementById(idChart) as HTMLCanvasElement;
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: question.questionn,
                        data: data,
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: `${question.questionn} (${question.type})` }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true }
                    }
                }
            });

            this.charts.set(idChart, chart);
        }
    }

    CreatePieChart = (idChart: string, question: QuestionResultsResponse): void => {
        this.DestroyChart(idChart);
        const labels = Object.keys(this.ProcessResultResponses(question.responses));
        const data = Object.values(this.ProcessResultResponses(question.responses));
        const ctx = document.getElementById(idChart) as HTMLCanvasElement;

        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'],
                        borderColor: '#ffffff',
                        borderWidth: 2
                    }]
                },                
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { font: { size: 14 } }
                        },
                        title: {
                            display: true,
                            text: `${question.questionn} (${question.type})`,
                            font: { size: 18 },
                            padding: { top: 10, bottom: 20 }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw as number;
                                    const dataset = context.dataset.data as number[];
                                    const total = dataset.reduce((sum, val) => sum + val, 0);
                                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                                    return `Conteo de respuestas: ${value} | Porcentage de respuesta: (${percentage})`;
                                }
                            },
                            backgroundColor: '#000',
                            titleFont: { size: 14 },
                            bodyFont: { size: 12 },
                            padding: 10
                        }
                    }
                },
                plugins: [
                    {
                        id: 'percentageLabels',
                        afterDatasetsDraw(chart) {
                            const ctx = chart.ctx;
                            const dataset = chart.data.datasets[0].data as number[];
                            const total = dataset.reduce((sum, val) => sum + val, 0);
                            chart.data.datasets.forEach((dataset, i) => {
                                const meta = chart.getDatasetMeta(i);
                                meta.data.forEach((arc : any, index) => {
                                    const value = dataset.data[index] as number;
                                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                                    const model = arc.tooltipPosition();
                                    const x = model.x;
                                    const y = model.y;
                                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                                    ctx.font = 'bold 14px Arial';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(percentage, x, y);
                                });
                            });
                        }
                    }
                ]
            });

            this.charts.set(idChart, chart);
        }
    }

    CreateRadarChart(idChart: string, question: QuestionResultsResponse) {
        this.DestroyChart(idChart);
        const labels = Object.keys(this.ProcessResultResponses(question.responses));
        const data = Object.values(this.ProcessResultResponses(question.responses));

        const ctx = document.getElementById(idChart) as HTMLCanvasElement;
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: question.questionn,
                        data: data,
                        borderColor: '#FF5733',
                        backgroundColor: 'rgba(255, 87, 51, 0.4)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true },
                        title: { display: true, text: `${question.questionn} (${question.type})` }
                    },
                    scales: {
                        r: { beginAtZero: true }
                    }
                }
            });

            this.charts.set(idChart, chart);
        }
    }

    private DestroyChart(idChart: string): void {
        if (this.charts.has(idChart)) {
            this.charts.get(idChart)?.destroy();
            this.charts.delete(idChart);
        }
    }
        
    private ProcessResultResponses = (responses: ResponseResultsResponse[]): Record<string, number> =>
        responses.reduce((acc: Record<string, number>, item) => {
            acc[item.response] = (acc[item.response] || 0) + 1;
            return acc;
        }, {});
}