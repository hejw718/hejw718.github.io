# 巴黎行程網站更新指南

## 📝 修改內容後如何更新到網站

### 方法一: 使用部署腳本 (推薦)

```bash
# 在專案目錄執行
./deploy.sh
```

這個腳本會自動:
1. 建置專案 (`npm run build`)
2. 將建置結果推送到 `gh-pages` 分支
3. GitHub Pages 會自動部署更新

---

### 方法二: 手動部署

如果部署腳本遇到問題,可以手動執行:

```bash
# 1. 建置專案
npm run build

# 2. 進入 dist 目錄
cd dist

# 3. 初始化 git (首次需要)
git init
git checkout -b gh-pages

# 4. 設定 remote (首次需要)
git remote add origin https://github.com/hejw718/hejw718.github.io.git

# 5. 提交並推送
git add -A
git commit -m 'deploy'
git push -f origin gh-pages

# 6. 返回專案根目錄
cd ..
```

---

## 🔄 完整更新流程

### 1. 修改程式碼
編輯你想要修改的檔案,例如:
- `src/data/itinerary.js` - 修改行程內容
- `src/data/todos.js` - 修改待辦事項
- `src/assets/main.css` - 修改樣式
- `src/components/*.vue` - 修改元件

### 2. 本地測試
```bash
npm run dev
```
在瀏覽器中檢查修改是否正確

### 3. 提交到 Git
```bash
git add .
git commit -m "描述你的修改"
git push
```

### 4. 部署到 GitHub Pages
```bash
./deploy.sh
```

### 5. 確認更新
等待 1-2 分鐘後,訪問網站確認更新:
https://hejw718.github.io/paris-trip/

---

## 📂 常見修改項目

### 修改行程內容
編輯 `src/data/itinerary.js`

### 修改待辦事項
編輯 `src/data/todos.js`

### 修改樣式
編輯 `src/assets/main.css`

### 修改天氣 API 金鑰
編輯 `.env` 檔案中的 `VITE_WEATHER_API_KEY`

---

## ⚠️ 注意事項

1. **環境變數**: `.env` 檔案不會被提交到 Git,部署時會使用建置時的環境變數
2. **快取問題**: 如果更新後看不到變化,試著清除瀏覽器快取或使用無痕模式
3. **部署時間**: GitHub Pages 通常需要 1-2 分鐘來部署更新

---

## 🆘 遇到問題?

### 部署腳本失敗
如果 `./deploy.sh` 失敗,使用「方法二: 手動部署」

### 網站沒有更新
1. 檢查 GitHub 的 Actions 頁面,確認部署是否成功
2. 清除瀏覽器快取
3. 等待幾分鐘再試

### 本地開發伺服器無法啟動
```bash
# 重新安裝依賴
npm install

# 重新啟動
npm run dev
```
