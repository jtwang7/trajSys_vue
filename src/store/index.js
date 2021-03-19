import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { getRecordLens, getTraj, globalTraj, reqMonthDayData } from '@/network/request'
import { transformAMap } from '@/components/common/map/gcoord';
import { colorBar } from '@/components/common/colorbar'
import axios from 'axios';

Vue.use(Vuex)

const state = {
  // 侧边栏样式
  siderStyle: 'dark',

  // 用户信息面板
  infoBoxShow: false,
  // 是否选择用户
  isSelectUser: false,
  // 轨迹展示面板
  trajBoxShow: {
    pre: false,
    fulfilled: false,
  },
  // 全局轨迹展示面板
  glbTrajBoxShow: {
    pre: false,
    fulfilled: false,
  },
  // 是否弹出警告框
  modalBox: false,
  // heatmap弹窗
  heatmapPopups: false,

  // 存放已展示OD
  existOD: [],
  curUserid: '',
  globalTrajList: [],

  user: {
    '399313': {
      id: 399313,
      nums: 0,
      data: {
        org: [],
        dest: [],
        traj: [],
      },
    },
    '934778': {
      id: 934778,
      nums: 0,
      data: {
        org: [],
        dest: [],
        traj: [],
      },
    },
    '1517739': {
      id: 1517739,
      nums: 0,
      data: {
        org: [],
        dest: [],
        traj: [],
      },
    },
    '1520884': {
      id: 1520884,
      nums: 0,
      data: {
        org: [],
        dest: [],
        traj: [],
      },
    },
  }
}

export default new Vuex.Store({
  state,
  mutations: {
    // Style Button点击
    select(state, payload) {
      switch (payload) {
        case '0':
          if (state.siderStyle === 'dark') {
            state.siderStyle = 'light';
            document.getElementById('sider').style.backgroundColor = '#fff';
          } else if (state.siderStyle === 'light') {
            state.siderStyle = 'dark';
            document.getElementById('sider').style.backgroundColor = '#515a6e';
          }
          break;
        case '1':
          router.push('/gaode');
          break;
        case '2':
          router.push('/mapbox');
          break;

        default:
          break;
      }
    },
    // 菜单点击
    menuSelect(state, payload) {
      switch (payload) {
        case '1-1':
          state.infoBoxShow = true;
          break;
        case '1-2':
          state.trajBoxShow.pre = true;
          if (state.isSelectUser) {
            state.trajBoxShow.fulfilled = true;
          } else {
            state.modalBox = true;
          }
          break;
        case '1-3':
          state.glbTrajBoxShow.pre = true;
          if (state.isSelectUser) {
            state.glbTrajBoxShow.fulfilled = true;
          } else {
            state.modalBox = true;
          }
          break;

        default:
          break;
      }
    },
    clearUser(state) {
      state.isSelectUser = false;
      state.curUserid = '';
      state.trajBoxShow.fulfilled = false
      state.glbTrajBoxShow.fulfilled = false;
    },
    // 存储请求的数据，同时打开菜单选项权限
    reqTrajNum(state, payload) {
      state.curUserid = payload.userid
      state.user[payload.userid].nums = payload.res
      state.isSelectUser = true
      if (state.trajBoxShow.pre) {
        state.trajBoxShow.fulfilled = true;
      }
      if (state.glbTrajBoxShow.pre) {
        state.glbTrajBoxShow.fulfilled = true;
      }
    },
    // 获取一条指定轨迹数据
    reqTraj(state, payload) {
      // 清空之前的轨迹数据
      state.user[payload.userid].data.traj = []
      const res = payload.res
      state.user[payload.userid].data.org = transformAMap(res.org);
      state.user[payload.userid].data.dest = transformAMap(res.dest);
      for (let i in payload.res.lngs) {
        state.user[payload.userid].data.traj.push(transformAMap([res.lngs[i], res.lats[i]]))
      }
    },
    glbTraj(state, res) {
      const color = colorBar;
      state.globalTrajList = [].concat.apply([], res.map(function (item, idx) {
        // item: [[x1,x2],[y1,y2],..]
        let res = item.map(function (v) {
          return transformAMap(v)
        })
        // return {
        //     coords: res,
        // };
        return {
          coords: res,
          lineStyle: {
            // color: color[idx % color.length],
            color: color[Math.round(Math.random() * colorBar.length)]
          }
        };
      }));
    },
    // 显示热力图相关弹窗
    showHeatmapPopups(state) {
      state.heatmapPopups = true
    },
    // 隐藏热力图相关弹窗
    hidHeatmapPopups(state) {
      state.heatmapPopups = false
    },
    // 不正确操作出发警告框
    modalClick(state) {
      state.modalBox = false;
      state.infoBoxShow = true;
    },
    // userid为空，则关闭菜单选项
    watchUserid(state, payload) {
      if (!payload) {
        state.isSelectUser = false
      }
    }
  },
  actions: {
    reqTrajNum(ctx, payload) {
      getRecordLens(payload).then((res) => {
        console.log('traj number request: success');
        ctx.commit('reqTrajNum', {
          res,
          userid: parseInt(payload),
        })
      }).catch((err) => {
        console.log(err);
      })
    },
    reqTraj(ctx, payload) {
      getTraj(payload.userid, payload.tid).then(res => {
        console.log('traj request: success');
        ctx.commit('reqTraj', {
          res,
          userid: payload.userid,
        })
      }).catch(err => {
        console.log(err);
      })
    },
    reqGlobalTraj(ctx, userid) {
      globalTraj(userid).then(res => {
        console.log('global traj request: success');
        ctx.commit('glbTraj', res)
      }).catch(err => {
        console.log(err);
      })
    },
  },
  modules: {
  }
})
