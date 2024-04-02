const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Sequelize } = require("sequelize");
dotenv.config();

// Puerto e inicializacion de la app
const port = process.env.PORT || 3000;
const app = express();

const authRoute = require("./routes/auth.route.js");
const profile = require("./routes/profile.route.js");
const mainScreen = require("./routes/mainScreen.route.js");
const userAddress = require("./routes/userAdress.route.js");
const restaurant = require("./routes/restaurant.route.js");
const restaurantProfile = require("./routes/restaurantProfile.route.js");
const terminosYCondiciones = require("./routes/terminosYCondiciones.route.js");
const categoria = require("./routes/categoria.route.js");
const errorController = require("./controllers/errorController.js");
const productos = require("./routes/productos.route.js");
const dateCategoria = require("./routes/dataCategoria.route.js");
const homeData = require("./routes/homeData.route.js");
const ratingRestaurant = require("./routes/restaurantRating.route.js");
const search = require("./routes/search.route.js");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// direccion principal

app.get("/", (req, res) => {
  res.json({ message: "welcome to the api delivery" });
});

// conexion a la base de datos
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect:
      "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
);

// verificar si la conexion fue exitosa
const conexion = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.status(500).json({
      message: "unable to connect to the database",
      error: error.message,
    });
  }
};

conexion();

//pantalla principal data
app.use("/api/v1", mainScreen);
app.use("/api/v1", authRoute);
app.use("/api/v1", profile);
app.use("/api/v1", userAddress);
app.use("/api/v1", terminosYCondiciones);
app.use("/api/v1", restaurant);
app.use("/api/v1", restaurantProfile);
app.use("/api/v1", categoria);
app.use("/api/v1", productos);
app.use("/api/v1", dateCategoria);
app.use("/api/v1", homeData);
app.use("/api/v1", ratingRestaurant);
app.use("/api/v1", search);
// global error
app.use(errorController);

app.listen(port, () => {
  console.log(`server ejecutandose en el puerto ${port} `);
});
