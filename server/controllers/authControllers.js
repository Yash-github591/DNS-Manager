const UserModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const register = async (req, res) => {
  const { username, projectId, password } = req.body;
  const isExisting = await UserModel.findOne({ username });

  if (isExisting) {
    console.log("User already exists");
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const userDoc = await UserModel.create({
      username,
      projectId,
      password: bcrypt.hashSync(password, saltRounds),
    });

    // generate a token
    jwt.sign(
      { username, projectId, id: userDoc._id },
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          console.log("error in jwt", err);
          res.status(400).json(err);
        } else {
          // sends a cookie to the client with the token as the value of the cookie.
          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true, // The "secure" attribute is also required for cookies with SameSite="None"
            })
            .json({ username, projectId, id: userDoc._id });
        }
      }
    );
  } catch (error) {
    console.log("error in register");
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await UserModel.findOne({ username });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      // Generate a token
      jwt.sign(
        { username, projectId: userDoc.projectId, id: userDoc._id },
        process.env.SECRET_KEY,
        { expiresIn: "4h" },
        (err, token) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res
              .cookie("token", token, {
                sameSite: "none",
                secure: true, // The "secure" attribute is also required for cookies with SameSite="None"
              })
              .json({
                username,
                projectId: userDoc.projectId,
                id: userDoc._id,
              });
          }
        }
      );
    } else {
      res.status(400).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(400).json({ error: "Invalid username or password" });
  }
};

const updateProfile = async (req, res) => {
  const { username, projectId, password } = req.body;
  const { id } = req.user;

  // check if the user exists and the password is correct

  const userDoc = await UserModel.findById(id);
  if (!userDoc) {
    return res.status(404).json({ error: "User not found" });
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (!passOk) {
    return res.status(400).json({ error: "Invalid password" });
  }
  try {
    const userDoc = await UserModel.findByIdAndUpdate(
      id,
      { username, projectId },
      { new: true }
    );
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    // generate a token with the updated user info
    jwt.sign(
      { username, projectId, id: userDoc._id },
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true, // The "secure" attribute is also required for cookies with SameSite="None"
            })
            .json({ username, projectId });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res) => {
  res
    .cookie("token", "", {
      sameSite: "none",
      secure: true, // The "secure" attribute is also required for cookies with SameSite="None"
    })
    .json("ok");
};

const getProfile = (req, res) => {
  res.json(req.user);
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserModel.findById(id);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ username: userData.username, projectId: userData.projectId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  getProfileById,
  updateProfile,
};
