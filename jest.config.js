export default {
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  automock: false,
  setupFiles: [
    './test/setupJest.js'
  ]
};
