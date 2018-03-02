import {getLyric} from "api/song"
import {ERR_OK} from "api/config"
import {Base64} from "js-base64"


export default class Song {
  constructor({id,mid,singer,name,album,duration,image,url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if(this.lyric){
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve,reject) =>{
      getLyric(this.mid).then((res) => {
        if(res.retcode === ERR_OK) {
          this.lyric =Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })

  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=F4042AA14A0CEFAFBCA169D8FB2B36E91A997048DAE342270FBFD8FF6AADB46B0DED77AA0850C66C41882839CE57B6F1903F2F68C0564144&guid=6451164912&uin=411284402&fromtag=66
    url:`http://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
  })
}



export  function filterSinger(singer) {
  let ret = [];
  if(!singer){
    return ''
  }
  singer.forEach((item) =>{
    ret.push(item.name)
  })
  return ret.join('/')
}
