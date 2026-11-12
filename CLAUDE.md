# みおん式AI副業ノート 商品CM動画編（v2テンプレート複製）

> 設計の共通原則は `~/.claude/CLAUDE.md` に従う。デザイン基準は `docs/requirements.md`（この特典の要件。共通デザインは v2 テンプレートの仕様書）。

## プロジェクト設定

技術スタック: HTML5 / CSS3 / Vanilla JavaScript（ビルドなし）、GitHub Pages。backend・database・環境変数なし（`.env` 系は作らない）。

## 運用ルール

- 元のテンプレート `instagram-tokuten-template-v2` は編集しない。この特典の変更は `js/content.js` が中心
- 文章・画像・LINEリンクの単一の源は `js/content.js`。色・フォント・余白の単一の源は `css/style.css` の `:root`。特典ごとにCSSを足さない
- 旧テンプレート（`instagram-tokuten-template`・ピンク系）と既存特典は、明示指示がない限り変更しない
- 操作画面は実キャプチャのみ。ChatGPT/Geminiの画面は未掲載（提供待ち）
- 人物はバナーの本人イラスト（`インスタ関連/スマホを紹介する笑顔の女性.png`）のみ。絵コンテ内の人物はAI生成の作例。バナーは実フレーム・実フォントで合成（商品ラベルをAI生成しない）
- CTA: 冒頭と最後の2か所。最終CTA下に教科書バナー＋AI収益化サポート会の案内（目次画像は使わない）。OGP画像は指定がなければ設定しない

## 命名・品質

- ファイル kebab-case / 変数 camelCase / 関数100行・ファイル700行・複雑度10・行長120以下
- ローカル確認: `python3 -m http.server <port>` を1つだけ起動

## ドキュメント管理

許可: `docs/requirements.md` / `docs/SCOPE_PROGRESS.md` / `README.md` / `LICENSE.md`。他は要許諾。

## 品質ゲート

- 第一防壁: ローカル git hook（pre-commit: 秘密情報拒否＋JS構文）
- 最終防壁: GitHub Actions `verify`（JS構文・必須ファイル・index.htmlのリンク切れ）。main保護
- ブランチ: `main`＝公開 / `develop`＝編集

## この特典の追加仕様

- script.js/style.css は v2 から拡張済み: `hero.video`、`steps[].prompts`（複数・【】強調）、`figures[].zoom`、`point.source`、`summary.note`、最終CTAの悩み→つなぎ→解決策
- 動画 `assets/video/cm.mp4` はユーザー提供の完成CM。差し替える場合は poster も更新
- 読者向け文章に「確認していません」と書かない。未確認事項は `docs/SCOPE_PROGRESS.md` に記録
