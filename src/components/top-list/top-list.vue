<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'

    export default {
        name: "top-list",
        computed: {
          title() {
            return this.toplist.topTitle
          },
          bgImage() {
            if(this.songs.length) {
              return this.songs[0].image
            } else {
              return ''
            }
          },
          ...mapGetters([
            'toplist'
          ])
        },
        data() {
          return {
            songs: [],
            rank: true
          }
        },
        methods: {
          _getMusicList() {
            if(!this.toplist.id) {
              this.$router.push('/rank')
              return
            }
            getMusicList(this.toplist.id).then((res) => {
              if(res.code === ERR_OK) {
                this.songs = this._normalizeSongs(res.songlist)
              }
            })
          },
          _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                  const musicData = item.data
                  if(musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                  }
                })
            return ret
          }
        },
        created() {
              this._getMusicList()
        },
        components: {
          MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
