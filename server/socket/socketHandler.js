import userService from '../service/userService.js';

export default function setupSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("update-secret-phrase", async (data) => {
      try {
        const { userId, newSecretPhrase, actorId } = data;
        const actor = await userService.getUserByUsername(actorId);

        if (!actor) {
          socket.emit("error", { error: `Actor not found: ${actorId}` });
          return;
        }

        if (actor.roles === "admin" || actorId === userId) {
          await userService.updateSecretPhrase(userId, newSecretPhrase);
          
          io.emit("secret-phrase-updated", { userId, newSecretPhrase });
          socket.emit("success", { message: "Secret phrase updated successfully" });
          socket.broadcast.emit("user-updated-secret-phrase", {
            message: `User ${userId} has updated his/her secret phrase`,
          });
        } else {
          socket.emit("error", { error: "You do not have permission to update this user's secret phrase" });
        }
      } catch (error) {
        socket.emit("error", { error: "Operation failed" });
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}