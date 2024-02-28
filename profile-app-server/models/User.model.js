const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  campus: { type: String,
            required: true,
            enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin",
                  "Amsterdam", "México", "Sao Paulo", "Lisbon", "Remote"]
          },
  course: { type: String,
            required: true,
            enum: ["Web Dev", "UX/UI", "Data Analytics","Cyber Security"]
          },
  image: { type: String }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

module.exports = model("User", userSchema);
