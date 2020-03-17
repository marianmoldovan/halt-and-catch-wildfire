start-redis:
	docker run --name redis -p 6379:6379 -d redis

stop-redis:
	docker stop redis
	docker rm redis
