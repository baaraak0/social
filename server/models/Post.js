var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var PostSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  body: String,
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

PostSchema.plugin(uniqueValidator, {message: 'is already taken'});

PostSchema.pre('validate', function(next){
  this.slugify();

  next();
});

PostSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

PostSchema.methods.updateFavoriteCount = function() {
  var post = this;

  return User.count({favorites: {$in: [post._id]}}).then(function(count){
    post.favoritesCount = count;

    return post.save();
  });
};

PostSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Post', PostSchema);
