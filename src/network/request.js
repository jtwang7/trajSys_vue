import {baseRequest} from './index'
import axios from 'axios'

export const getRecordLens = async (user) => {
    return baseRequest({
        url: `/totalnum/${user}`,
    })
}

export const getTraj = async (user, id) => {
    return baseRequest({
        url: `/traj/${user}/${id}`,
    })
}

export const globalTraj = async (user) => {
    return baseRequest({
        url: `/globaltraj/${user}`,
    })
}

export const reqMonthDayData = async(user) => {
    const res = axios.all([
        baseRequest({
            url: `/month/${user}`,
        }),
        baseRequest({
            url: `/day/${user}`,
        })
    ])
    return res
}