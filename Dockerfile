# frontend-app/Dockerfile

# 使用官方的 Node.js 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /usr/src/app

# 将package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将前端代码复制到工作目录
COPY . .

# 构建Angular项目
RUN npm run build

# 使用nginx来服务构建好的前端文件
FROM nginx:alpine

# 将构建好的文件从构建阶段复制到nginx的html目录
COPY --from=0 /usr/src/app/dist/frontend-app /usr/share/nginx/html

# 暴露端口8001
EXPOSE 8001

CMD ["nginx", "-g", "daemon off;"]

