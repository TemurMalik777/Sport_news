const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require('node-device-detector/helper');
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

const addNewUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      interests,
      bookmarks,
      phone_number,
    } = req.body;
    const newUser = await pool.query(
      `INSERT INTO users(first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks, phone_number) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8, $9) RETURNING *`,
      [
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        interests,
        bookmarks,
        phone_number,
      ]
    );
    console.log(newUser);
    console.log(newUser.rows[0]);
    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      user: newUser.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
    // console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userAgent = req.headers["user-agent"];
    // console.log(userAgent);
    const result = detector.detect(userAgent);
    console.log("result parse", result);
    console.log(DeviceHelper.isDesktop(result));
    const users = await pool.query(`SELECT * FROM users`);
    res
      .status(200)
      .send({ message: "Barcha foydalanuvchilar", users: users.rows });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    res
      .status(200)
      .send({ message: `${id} ID li foydalanuvchi`, user: user.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      is_active,
      interests,
      bookmarks,
    } = req.body;
    const updatedUser = await pool.query(
      `UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4, role=$5, is_active=$6, interests=$7, bookmarks=$8 WHERE id=$9 RETURNING *`,
      [
        first_name,
        last_name,
        email,
        password,
        role,
        is_active,
        interests,
        bookmarks,
        id,
      ]
    );
    res.status(200).send({
      message: `${id} ID li foydalanuvchi yangilandi`,
      user: updatedUser.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await pool.query(
      `DELETE FROM users WHERE id=$1 RETURNING *`,
      [id]
    );
    res.status(200).send({
      message: `${id} ID li foydalanuvchi o'chirildi`,
      user: deletedUser.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//-----------------------------------------------------------------
const logOutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi" });
    }

    const user = await pool.query(
      `UPDATE users SET refresh_token = '' WHERE refresh_token = $1 RETURNING *`,
      [refreshToken]
    );

    if (user.rowCount === 0) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "User succesfully logged out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi" });
    }

    const decodedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const user = await pool.query(
      `SELECT * FROM users WHERE refresh_token = $1`,
      [refreshToken]
    );

    if (user.rowCount === 0) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }

    const payload = {
      id: user.rows[0].id,
      email: user.rows[0].email,
      role: user.rows[0].role,
    };

    const tokens = jwtService.generateTokens(payload);
    
    await pool.query(
      `INSERT INOT davice_token (user_id, os, client, device, token) 
      VALUES($1, $2, $3, $4)`,
      [result.os, result.client, result.device, token.accessToken]
    )
    await pool.query(`UPDATE users SET refresh_token = $1 WHERE id = $2`, [
      tokens.refreshtoken,
      user.rows[0].id,
    ]);

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tokenlar yangilandi",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }

    const validPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: user.rows[0].id,
      email: user.rows[0].email,
      role: user.rows[0].role,
    };

    const tokens = jwtService.generateTokens(payload);

    await pool.query(`UPDATE users SET refresh_token = $1 WHERE id = $2`, [
      tokens.refreshtoken,
      user.rows[0].id,
    ]);

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activaeUSER = async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE activation_link = $1`,
      [req.params.link]
    );

    if (user.rowCount === 0) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }

    await pool.query(
      `UPDATE users SET is_active = true WHERE activation_link = $1`,
      [req.params.link]
    );

    res.send({
      message: "Foydalanuvchi faollashtirildi",
      status: true,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//--------------------------------------------------------------------------

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  logOutUser,
  refreshTokenUser,
  loginUser,
  activaeUSER,
};
