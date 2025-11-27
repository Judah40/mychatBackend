module.exports = {
  fileTypeFromBuffer: jest.fn().mockResolvedValue({
    ext: "png",
    mime: "image/png",
  }),
};
