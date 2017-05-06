var mongoose = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');
var User = mongoose.model('User');

var PostSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

PostSchema.plugin(uniqueValidator, {message: 'Slug is already taken'});

PostSchema.pre('validate', function(next){
  this.slugify();

  next();
});

PostSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

PostSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Post', PostSchema);
