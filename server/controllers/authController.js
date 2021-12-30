const pool = require("../db/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const { createUserValidation } = require("../validation");

module.exports.createUser_post = async (req, res) => {
  const { name, email, password, yetki_id, baskanlik_id } = req.body;

  //validate informations
  const { error } = createUserValidation({ name, email, password });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // check if user exist (if exists throw err)
    const user = await pool.query("SELECT * FROM kullanicilar WHERE email=$1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("Bu kullanıcı zaten var");
    }

    // bcrypt the users passw
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // enter the new user inside db

    const newPerson = await pool.query(
      "INSERT INTO kullanicilar (name,email,password,yetki_id,baskanlik_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, email, bcryptPassword, yetki_id, baskanlik_id]
    );

    res.status(201).json(newPerson.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.signup_post = async (req, res) => {
  //validate informations
  const { error } = createUserValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;
  try {
    // check if user exists (if exists throw err)
    const user = await pool.query("SELECT * FROM kullanicilar WHERE email=$1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("Email already exists");
    }

    // bcrypt the users passw
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // enter the new user inside db
    const newUser = await pool.query(
      "INSERT INTO kullanicilar (name,email,password,yetki_id) VALUES ($1,$2,$3,4) RETURNING *",
      [name, email, bcryptPassword]
    );

    //create token
    const token = jwtGenerator(newUser.rows[0].kullanici_id);

    const sendUser = {
      kullanici_id: newUser.rows[0].kullanici_id,
      name: newUser.rows[0].name,
      baskanlik_id: newUser.rows[0].baskanlik_id,
      yetki_id: newUser.rows[0].yetki_id,
    };

    res.status(201).json({ token, user: sendUser });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    const person = await pool.query(
      "SELECT * FROM kullanicilar WHERE email = $1",
      [email]
    );

    if (person.rows.length === 0) {
      return res.status(401).json("Email veya Şifre Yanlış");
    }

    const validPassword = await bcrypt.compare(
      password,
      person.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Email veya Şifre Yanlış");
    }

    //create token
    const token = jwtGenerator(person.rows[0]);

    const user = {
      kullanici_id: person.rows[0].kullanici_id,
      name: person.rows[0].name,
      baskanlik_id: person.rows[0].baskanlik_id,
      yetki_id: person.rows[0].yetki_id,
    };

    return res.json({ token, user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error");
  }
};

module.exports.verifyUser_post = (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
