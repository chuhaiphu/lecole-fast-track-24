export const responseData = (status, state, message, data, res) => {
  res.status(status).json({
    state,
    message,
    data
  });
};