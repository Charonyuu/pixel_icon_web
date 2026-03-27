# 像素圖示庫（Vite）

## 功能

- 全中文介面
- 搜尋圖示
- 分類導覽（點分類會滑到對應區塊）
- 點圖示下載單張 PNG
- 一鍵下載整包 `icons_all.zip`
- 每個分類可下載各自 ZIP
- 不提供複製名稱

## 開發

```bash
npm install
npm run dev
```

## 打包（可上傳靜態空間）

```bash
npm run build
```

輸出在 `dist/`。

## 更新圖示（不用 Python）

1. 把圖示放到 `public/categories/分類名稱/`
2. 重新產生分類清單：

```bash
node -e "const fs=require('fs');const path=require('path');const b='public/categories';const cats=fs.readdirSync(b).filter(n=>fs.statSync(path.join(b,n)).isDirectory()).sort((a,b)=>a.localeCompare(b,'zh-Hant'));const sections=[];for(const c of cats){const files=fs.readdirSync(path.join(b,c)).filter(f=>f.endsWith('.png')).sort((a,b)=>a.localeCompare(b,'zh-Hant'));sections.push({category:c,count:files.length,items:files.map(f=>({name:path.parse(f).name,file:f,url:'/categories/'+encodeURIComponent(c)+'/'+encodeURIComponent(f)}))});}fs.writeFileSync('public/categories-manifest.json',JSON.stringify({totalCategories:sections.length,sections},null,2));console.log(sections.length);"
```

3. 重新產生分類 ZIP：

```bash
mkdir -p public/category-downloads
cd public/categories && for d in *; do [ -d "$d" ] && zip -rq "../category-downloads/${d}.zip" "$d"; done
```

4. 重新產生總 ZIP：

```bash
cd public/categories && zip -rq ../downloads/icons_all.zip .
```
