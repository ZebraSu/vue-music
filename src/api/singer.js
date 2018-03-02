import jsonp from 'common/js/jsonp'
import {commonParams,options} from "api/config";

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({},commonParams,{
    channel:'singer',
    page:'list',
    key:'all_all_all',
    pagesize:100,
    pagenum:1,
    hostUin:0,
    needNewCode:0,
    platform:'yqq',
    g_tk:5381
  })

  return jsonp(url, data, options)
}
export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const  data = Object.assign({}, commonParams,{
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order:'listen',
      begin: 0,
      num : 100,
      songstatus: 1,
      g_tk: 671981149,
      singermid: singerId
    });

  return jsonp(url, data, options)
}
export function getSingerVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({},commonParams,{
    g_tk: 5381,
    jsonpCallback: 'MusicJsonCallback08131552902083228',
    loginUin: '',
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: '205361747',
    callback: 'MusicJsonCallback08131552902083228',
    uin: '',
    songmid: songmid,
    filename: songmid+'.m4a',
    guid: 6451164912
  })
  return jsonp(url, data, options)
}

//http://dl.stream.qqmusic.qq.com/C400000YU69H3N55rZ.m4a?vkey=27CBCAA24AB3C30E3EBB736C5280A713D6115B4636B381692F57A091E126736FC8ADAEE0522BE51998B7668E183BDBC23E1A3D98A5FBD273&guid=6451164912&uin=0&fromtag=66
//D5F5BD3770A250A168E2672638327A2FC6A873409002F42B2AB3BE67D451DC1F32E69CA410D30A4EBC5D2AC25F790331D04AA3A3C9ECFAAB
