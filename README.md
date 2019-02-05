# Musikko

New Year Project

A simple music player for practicing React hooks, audio API and UI engineering.

一個簡單的音樂播放器，用來練習 React hooks, audio API 跟 UI 需要注意的細節。

## UI Details

- [ ] 使用 ServiceWorker 快取請求 (OfflinePlugin)
- [ ] 在 Loading 時使用 Placeholder
- [ ] 當請求失敗時，使用 backoff 的方式重試
- [x] 當歌曲播放結束時，自動播放下一首
- [x] 使用 streaming 的方式下載歌曲。（一般的 fetch 會把整首歌抓下來）
- [ ] 點選愛心時，會根據 LocalStorage 狀態判斷喜愛。使用 optimisic UI 以及提示框，提供使用者復原操作。
- [ ] Button 點擊的 UI 反饋，把 Button 拆成通用的元件
- [ ] 可使用鍵盤操作暫停、播放（空白鍵）、上一首、下一首、靜音
- [ ] 靜音的 UI
