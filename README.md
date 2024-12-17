# rails-nuxt3-sample

## Getting Start

- Build docker image

```bash
docker compose build --no-cache
```

- Install packages

```bash
# backend
docker compose run --rm backend npm install
# frontend
docker compose run --rm frontend npm install
```

- Run Docker

```bash
docker compose up
```

## Backend

```bash

# マイグレーションを実行
npm run migration:run

# マイグレーションを元に戻す
npm run migration:revert

# 新しいマイグレーションファイルを生成（空のマイグレーション）
npm run migration:create src/migrations/CreateNewTable

# エンティティの変更から自動的にマイグレーションを生成
npm run migration:generate src/migrations/UpdatePosts
```

## package 更新方法

```bash
# npm-check-updates のインストール
npm install -g npm-check-updates

# 更新可能なパッケージを確認
ncu

# 対話的に更新するパッケージを選択
ncu -i

# package.json を更新して実際にインストール
ncu -u
npm install
```
