CarrierWave.configure do |config|
  config.fog_provider = "fog/aws"
  config.cache_storage = :fog
  config.asset_host = "http://localhost:9000/bucket"
  config.fog_directory  = "bucket"
  config.fog_credentials = {
    provider:              "AWS",
    aws_access_key_id:     "minio_root",
    aws_secret_access_key: "minio_password",
    region:                "ap-northeast-1",
    endpoint:              "http://minio:9000",
    path_style:            true
  }
end