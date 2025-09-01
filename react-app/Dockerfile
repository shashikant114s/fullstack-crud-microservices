# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# ARG define karo
ARG VITE_API_BASE_URL

# ENV me daal do
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .

# Build me env pass hoga
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

