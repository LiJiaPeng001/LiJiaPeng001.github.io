---
layout: doc
title: Docker
---
# Docker
## 镜像操作
```bash
docker search IMAGE_NAME # 查询Docker Hub的镜像
docker pull IMAGE_NAME:Tag  #从Docker Hub下载镜像
docker images # 列出本地存在的镜像
docker rmi IMAGE_NAME # 删除本地的一个或多个镜像
```
## 容器操作命令

```bash
docker run -it IMAGE_NAME /bin/bash   # 在新容器中运行交互式shell
docker exec -it CONTAINER_ID /bin/bash  # 在运行中的容器中执行交互式shell
docker ps # 列出正在运行的容器
docker ps -a # 列出所有容器，包括停止的
docker ps -aq # 列出所有容器的容器id
docker start CONTAINER_ID # 启动一个容器
docker stop CONTAINER_ID # 停止运行容器
docker stop $(docker ps -aq) # 停止所有运行的容器
docker rm CONTAINER_ID # 删除一个容器
docker rm $(docker ps -aq) # 删除所有容器
docker restart CONTAINER_ID # 重启一个容器
```

## 容器日志和状态

```bash
# -f 实时跟踪容器日志输出  
docker logs -f CONTAINER_ID 
# --tail 10 显示最近10条日志  
docker logs --tail 10 CONTAINER_ID 
# --since -- until 指定显示日志的时间范围 
docker logs --since="2023-08-01" CONTAINER_ID
# --tail 10 显示最近10条日志  
docker inspect CONTAINER_ID
docker top CONTAINER_ID
```