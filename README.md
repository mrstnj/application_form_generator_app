## 目的
各社サービスの申込ページ/申込フォームを生成するSaaSシステムサービス

## 概要
### 課題
申込ページ/申込フォームを作成する際に、開発リソースの浪費や時間のロス、デザインの統一性の欠如、技術的なトラブルが発生している。
### 解決策
本サービスでは企業が効率的にカスタマイズ可能なフォームを作成し、顧客体験を向上させる。
これにより、開発コストや時間を削減し、迅速な展開とリリースを可能にする。

## 開発環境構築
```
$ docker-compose build

$ docker-compose run backend bundle install

$ docker-compose run frontend yarn install

$ docker-compose run backend bundle exec rails db:create

$ docker-compose run backend bundle exec rails db:migrate

$ docker-compose up
```
### 動作確認
- ブラウザで、`http://localhost:3001`にアクセス
- ブラウザで、`http://localhost:8080`にアクセス
- ブラウザで、`http://localhost:9001`にアクセス
  - Username: `minio_root`, Password: `minio_password` でログイン
  - Backet Name: `bucket` でバケットを作成する
### テスト
```
$ docker-compose run backend bundle exec rspec
```