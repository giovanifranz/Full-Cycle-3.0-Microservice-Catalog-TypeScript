FROM node:14.19.1-slim

USER node 

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && tail -f /dev/null"]