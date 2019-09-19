"use strict";

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

// video schema:

const videoSchema = mongoose.Schema({
  person : {type: mongoose.Schema.ObjectId, ref: 'User'}, 
   vid: {
    videoId: {type: String}
  },
  snippet: {
    title: {type: String},
    description: {type: String},
    thumbnails: {type: String}
  }
}); 

videoSchema.virtual('personName').get(function(){
	return `${this.person.firstName} ${this.person.lastName}`.trim();
}); 

videoSchema.methods.serialize = function() {
  return {
    person: this.person,
    vid: this.id.videoId,
    snippet: {
      title: this.snippet.title,
      description: this.snippet.description,
      thumbnails: this.snippet.thumbnails
  }
  };
};


const Videos = mongoose.model("Videos", videoSchema);

module.exports = { Videos };
