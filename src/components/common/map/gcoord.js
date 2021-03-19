import gcoord from 'gcoord';

export const transformAMap = (target) => {
    return gcoord.transform(
        target,
        gcoord.WGS84,
        gcoord.AMap
    )
}