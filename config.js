"use strict";
exports.DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://youVideo:youVideo12345@ds363996.mlab.com:63996/videos' ; 
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost:27017/run";
exports.PORT = process.env.PORT || 8080;

global.DATABASE_URL || 'mongodb://youVideo:youVideo12345@ds363996.mlab.com:63996/videos'
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';







//"mongodb://video_saved:videoSaved2019@ds141088.mlab.com:41088/videos";

//'mongodb://youVideo:youVideo12345@ds363996.mlab.com:63996/videos'



















