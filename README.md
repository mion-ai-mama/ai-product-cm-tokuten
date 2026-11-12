# みおん式AI副業ノート 商品CM動画編

商品写真1枚から、ChatGPTとGeminiで10秒のCM動画を作る特典ページ（Instagramリール用）。v2テンプレート（白×黒×グレージュ）の複製。

## 編集
- 文章・画像・動画・LINEリンク: `js/content.js` のみ
- 色・フォント・余白: `css/style.css` の `:root`
- 動画: `assets/video/cm.mp4`（ポスター `assets/images/cm-poster.jpg`）

## ローカル確認
`python3 -m http.server <port>`（動画の再生・シークには Range 対応のサーバーが望ましい。GitHub Pages は対応済み）

## 公開
GitHub Pages（main）。公開は承認後。詳細は `docs/SCOPE_PROGRESS.md`。
