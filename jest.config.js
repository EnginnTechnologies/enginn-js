module.exports = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  automock: false,
  setupFiles: [
    './test/setupJest.js'
  ]
};
