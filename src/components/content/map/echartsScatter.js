import { color } from "echarts";

const confirm = async (org, dest) => {
    return new Promise((resolve, reject) => {
        if (org.length && dest.length) {
            resolve(
                { org, dest }
            )
        }
    })
}

const getTraj = async (chart, start, end, data) => {
    // chart: 实例，start\end: OD点，data: 轨迹数据
    // echartsins.getOption() 获取当前echarts实例的option设置
    let option = chart.getOption();
    const { org, dest } = await confirm(start, end)
    // 在获取的option上做相应修改
    option.series[0].data = [org, dest]
    option.series[1].data = [data];
    // 重新渲染
    chart.setOption(option);
}

const clearTraj = (chart) => {
    let option = chart.getOption();
    option.series[0].data = []
    option.series[1].data = []
    chart.setOption(option)
}


//居中定位
function getZoom(maxLng, minLng, maxLat, minLat, vmAmap) {
    const { AMap } = vmAmap;
    let zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000", "200000", "500000", "1000000", "2000000"];// 级别18到3。
    let pointMax = new AMap.LngLat(maxLng, maxLat);
    let pointMin = new AMap.LngLat(minLng, minLat);
    let dist = AMap.GeometryUtil.distance(pointMax, pointMin).toFixed(1);
    for (let i = 0; i < zoom.length; i++) {
        if (zoom[i] - dist > 0) {
            return 18 - i + 3;
        }
    }
}
function setZoom(points, vmAmap) {
    const { map, AMap } = vmAmap;
    console.log(map);
    if (points.length > 0) {
        let maxLng = points[0][0];
        let minLng = points[0][0];
        let maxLat = points[0][1];
        let minLat = points[0][1];
        let res;
        for (let i = points.length - 1; i >= 0; i--) {
            res = points[i];
            if (res[0] > maxLng) maxLng = res[0];
            if (res[0] < minLng) minLng = res[0];
            if (res[1] > maxLat) maxLat = res[1];
            if (res[1] < minLat) minLat = res[1];
        }
        let cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
        let cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
        let zoom = getZoom(maxLng, minLng, maxLat, minLat, vmAmap);
        map.setZoomAndCenter(zoom, new AMap.LngLat(cenLng, cenLat));
    } else {
        //没有坐标，显示全中国
        map.setZoomAndCenter(5, new AMap.LngLat(103.388611, 35.563611));
    }
}

export {
    getTraj,
    clearTraj,
    setZoom,
}

