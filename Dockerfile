FROM node:17-alpine3.14
ENV NODE_ENV=production

WORKDIR /app
# COPY . .
RUN npm install --legacy-peer-deps

# RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# CMD ["sleep", "3h"]