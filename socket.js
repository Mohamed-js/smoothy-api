const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

const getIO = () => {
  return io;
};

const initializeSocket = (server) => {
  io.on("connection", (socket) => {
    // socket.on("salutations", (elem1, elem2, elem3) => {
    //   console.log(elem1, elem2, elem3);
    // });
    // // socket.send()
    // socket.emit(
    //   "salutations",
    //   "Hey!",
    //   { ms: "jane" },
    //   Buffer.from([4, 3, 3, 1])
    // );
  });
};

module.exports = { initializeSocket, getIO };
