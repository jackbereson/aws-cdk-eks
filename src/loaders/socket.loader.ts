export const initSocketHttp = (app) => {
  const http = require("http").Server(app);

  let io = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    io.local.emit("all", "init_sock");
  });

  global.io = io;

  return http;
};

