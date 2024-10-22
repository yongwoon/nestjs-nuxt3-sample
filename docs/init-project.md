# How to create project ?

## common

- Create Network (only one time)

```bash
docker network create dev_nest_nuxt_sample_network
```

- Build Image

```bash
docker compose build --no-cache
```

## Create Nestjs Project (Backend)

- Create Project

```bash
docker compose run --rm backend nest generate application
```

## Create Nuxt Project (Frontend)

- Create Project

```bash
# npx nuxi@latest init <project-name>
docker compose run --rm frontend npx nuxi@latest init frontend
```

- 一個上の directory (app) に作成された file をすべて移動
- `src` directory 作成
- `src` directory に `page`, `styles` directory を入れる
