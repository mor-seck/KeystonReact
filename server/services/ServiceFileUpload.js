const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const path = require('path');

const fileAdapter = new LocalFileAdapter({
  path: '/uploads',
  src: process.env.DATA_DIR ? `${process.env.DATA_DIR}/uploads` : "./uploads",
  getFilename: data => {
    const fileName = (new Date().getTime()) + "-" + data.originalFilename;
    return fileName;
  }
});

module.exports = fileAdapter;