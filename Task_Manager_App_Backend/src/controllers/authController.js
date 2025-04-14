const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../Data/users");

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey"; // fallback

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).json({ message: "User registered", user_id: newUser.id });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Create token
  const token = jwt.sign(
    { user_id: user.id, username: user.email },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ message: "Login successful", token, user_id: user.id });
};

module.exports = { register, login };
