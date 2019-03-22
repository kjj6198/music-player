# Musikko

New Year Project

A simple music player for practicing React hooks, audio API and UI engineering.

## UI Details

- [ ] use ServiceWorker to cache request and image. (OfflinePlugin)
- [ ] loading placeholder
- [ ] backoff retry when API fails or error.
- [x] auto play next song when current song finished.
- [x] use streaming to download song.(just manually put url into src, fetch will download whole size of song by default if don't specify range.)
- [x] use LocalStorge to simulate likes.
- [x] add button UI feedback.
- [x] 可使用鍵盤操作暫停、播放（空白鍵）、上一首、下一首、靜音
- [ ] 靜音的 UI
- [ ] better theme management and font-sizing
