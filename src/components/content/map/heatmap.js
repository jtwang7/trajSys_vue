const generalFunc = (chart, data, period, sec) => {
    // let option = chart.getOption();
    // option.series[4].data = data[0];
    // chart.setOption(option);

    // let i = 1
    // const timer = setInterval(() => {
    //     if (i === period) {
    //         i = 0
    //     }
    //     // 每次都要获取option最新状态，因为地图移动等会改变option的中心位置
    //     // 若不获取最新option,一些对地图的操作会被重置
    //     let option = chart.getOption();
    //     option.series[4].data = data[i];
    //     chart.setOption(option);

    //     i += 1
    // }, sec)
    let option = chart.getOption();
    option.series[4].data = data.shift();
    chart.setOption(option);
    data.push(option.series[4].data)

    const timer = setInterval(() => {
        // 每次都要获取option最新状态，因为地图移动等会改变option的中心位置
        // 若不获取最新option,一些对地图的操作会被重置
        let option = chart.getOption();
        option.series[4].data = data.shift();
        chart.setOption(option);
        data.push(option.series[4].data);
    }, sec)
    return timer
}

export const funcHMbymonth = (chart, data) => {
    const timer = generalFunc(chart, data, 12, 1000)
    return timer
}

export const funcHMbyday = (chart, data) => {
    const timer = generalFunc(chart, data, 7, 1000)
    return timer
}

export const clearHeatmap = (chart) => {
    let option = chart.getOption();
    option.series[4].data = [];
    chart.setOption(option);
}


/////////////// 热力图统计表循环播放 //////////////////
//////////////// 月统计图 //////////////////////
const setMonthStatistics = (chart, data, xAxis, min, max) => {
    const level = Math.ceil((max - min) / 4);

    chart.setOption({
        title: {
            text: "活动强度统计(月)",
            left: "1%",
        },
        tooltip: {
            trigger: "axis",
        },
        grid: {
            left: '10%',
            right: "30%",
            bottom: "15%",
        },
        xAxis: {
            type: 'category',
            axisTick: {
                interval: 0,
            },
            axisLabel: {
                interval: 1,
                rotate: 45,
                showMinLabel:true,
                showMaxLabel:true,
            },
            data: xAxis,
        },
        yAxis: {
            min: min - 50,
            max: max + 50,
        },
        toolbox: {
            right: 10,
            feature: {
                dataZoom: {
                    yAxisIndex: "none",
                },
                saveAsImage: {},
            },
        },
        visualMap: {
            top: 50,
            right: 10,
            pieces: [
                {
                    gt: min,
                    lte: (min + level),
                    color: "#93CE07",
                },
                {
                    gt: (min + level),
                    lte: (min + level * 2),
                    color: "#FBDB0F",
                },
                {
                    gt: (min + level * 2),
                    lte: (min + level * 3),
                    color: "#FC7D02",
                },
                {
                    gt: (min + level * 3),
                    lte: (min + level * 4),
                    color: "#FD0100",
                },
                {
                    gt: (min + level * 4),
                    lte: max,
                    color: "#AA069F",
                },
                {
                    gt: max,
                    color: "#AC3B2A",
                },
            ],
            outOfRange: {
                color: "#999",
            },
        },
        series: {
            type: "line",
            data: data,
            markLine: {
                silent: true,
                lineStyle: {
                    color: "#333",
                },
                data: [
                    {
                        yAxis: (min + level),
                    },
                    {
                        yAxis: (min + level * 2),
                    },
                    {
                        yAxis: (min + level * 3),
                    },
                    {
                        yAxis: (min + level * 4),
                    },
                    {
                        yAxis: max,
                    },
                ],
            },
        },
    })

    // 此处要调用 echartsInstance.resize()
    // Tip: 有时候图表会放在多个标签页里，那些初始隐藏的标签在初始化图表的时候因为获取不到容器的实际高宽，可能会绘制失败。
    // 因此在切换到该标签页时需要手动调用 resize 方法获取正确的高宽并且刷新画布，或者在 opts 中显示指定图表高宽。
    chart.resize()
}

export const dymRenderMonth = (chart, data, xAxis) => {
    const max = Math.max(...data);
    const min = Math.min(...data);

    const timer = setInterval(() => {
        // 要将重新渲染放在中间，否则会导致开头删除添加至末尾也存在渲染动画
        let subdata = data.shift()
        let subxAxis = xAxis.shift()

        setMonthStatistics(chart, data, xAxis, min, max);

        data.push(subdata)
        xAxis.push(subxAxis)
    }, 1000)
    return timer;
}

//////////////// 周统计图 //////////////////////
const setDayStatistics = (chart, data, xAxis, min, max) => {
    // 此处要调用 echartsInstance.resize()
    // Tip: 有时候图表会放在多个标签页里，那些初始隐藏的标签在初始化图表的时候因为获取不到容器的实际高宽，可能会绘制失败。
    // 因此在切换到该标签页时需要手动调用 resize 方法获取正确的高宽并且刷新画布，或者在 opts 中显示指定图表高宽。
    chart.resize()

    const level = Math.ceil((max - min) / 4);

    chart.setOption({
        title: {
            text: "活动强度统计(周)",
            left: "1%",
        },
        tooltip: {
            trigger: "axis",
        },
        grid: {
            left: '10%',
            right: "30%",
            bottom: "15%",
        },
        xAxis: {
            type: 'category',
            axisTick: {
                interval: 0,
            },
            axisLabel: {
                interval: 0,
                rotate: 45,
                showMinLabel:true,
                showMaxLabel:true,
            },
            data: xAxis,
        },
        yAxis: {
            min: min - 50,
            max: max + 50,
        },
        toolbox: {
            right: 10,
            feature: {
                dataZoom: {
                    yAxisIndex: "none",
                },
                saveAsImage: {},
            },
        },
        visualMap: {
            top: 50,
            right: 10,
            pieces: [
                {
                    gt: min,
                    lte: (min + level),
                    color: "#93CE07",
                },
                {
                    gt: (min + level),
                    lte: (min + level * 2),
                    color: "#FBDB0F",
                },
                {
                    gt: (min + level * 2),
                    lte: (min + level * 3),
                    color: "#FC7D02",
                },
                {
                    gt: (min + level * 3),
                    lte: (min + level * 4),
                    color: "#FD0100",
                },
                {
                    gt: (min + level * 4),
                    lte: max,
                    color: "#AA069F",
                },
                {
                    gt: max,
                    color: "#AC3B2A",
                },
            ],
            outOfRange: {
                color: "#999",
            },
        },
        series: {
            type: "line",
            data: data,
            markLine: {
                silent: true,
                lineStyle: {
                    color: "#333",
                },
                data: [
                    {
                        yAxis: (min + level),
                    },
                    {
                        yAxis: (min + level * 2),
                    },
                    {
                        yAxis: (min + level * 3),
                    },
                    {
                        yAxis: (min + level * 4),
                    },
                    {
                        yAxis: max,
                    },
                ],
            },
        },
    })

    
}

export const dymRenderDay = (chart, data, xAxis) => {
    const max = Math.max(...data);
    const min = Math.min(...data);

    const timer = setInterval(() => {
        // 要将重新渲染放在中间，否则会导致开头删除添加至末尾也存在渲染动画
        let subdata = data.shift()
        let subxAxis = xAxis.shift()

        setDayStatistics(chart, data, xAxis, min, max);

        data.push(subdata)
        xAxis.push(subxAxis)
    }, 1000)
    return timer;
}