# Stage 1 — compila il frontend Vite
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2 — runtime: Express serve API + frontend compilato
FROM node:22-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend/ ./
# il backend cerca il frontend in ../../frontend/dist rispetto a src/
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "src/index.js"]
