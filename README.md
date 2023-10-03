## Usage:
### For development:

* Clone repository inside a projects directory:
```
git clone git@github.com:Valeriy-F/shop-demo-server.git

mkdir shop-demo-server
```

* Run `docker-compose` command:
```
docker-compose -f docker-compose-dev.yaml up -d && docker-compose logs -f
```

### For production:

Use docker image https://hub.docker.com/repository/docker/vfomin/shop-demo-server/general

## API Endpoints:
https://github.com/Valeriy-F/shop-demo-server/blob/dev/API.md
