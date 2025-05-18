# ---- Base Node image ----
FROM node:18-alpine

# ---- Create app directory ----
WORKDIR /app

# ---- Copy dependency definitions ----
COPY package*.json ./

# ---- Install dependencies ----
RUN npm install --legacy-peer-deps

# ---- Copy the rest of the application code ----
COPY . .

# ---- Build client and server ----
RUN npm run build

# ---- Expose the SSR server port ----
EXPOSE 3010

# ---- Run the SSR server ----
CMD ["npm", "start"]
    