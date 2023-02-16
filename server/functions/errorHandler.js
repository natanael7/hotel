export default (error, res) => {
  console.log(error);
  res.status(400).json({ message: error.message });
};
