const mongoose = require("mongoose");
const mongooseLeanGetters = require("mongoose-lean-getters");
const FKHelper = require("../helper/foreign-key-constraint");


const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },

    // Author should be a foreign key to user table
   /* author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (v) {
          return FKHelper(mongoose.model("User"), v);
        },
        message: `User doesn't exist`,
      },
    }, */

  },
  { timestamps: true }
);

postSchema.plugin(mongooseLeanGetters);



module.exports = mongoose.model("Post", postSchema);
