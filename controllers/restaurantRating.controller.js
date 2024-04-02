const db = require("../models/index");

const ratingRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    // Verificar que el restaurante exista
    const restaurant = await db.Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurante no encontrado" });
    }

    // encontramos todos los registros del restaurant en la bd
    const ratingData = await db.Rating.findAll({ where: { restaurantId } });

    // Calcular el promedio de calificación
    let totalRating = 0;
    for (let i = 0; i < ratingData.length; i++) {
      totalRating += parseInt(ratingData[i].rating);
    }
    const data = parseFloat((totalRating / ratingData.length).toFixed(1));

    res.status(200).json({ average: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const addRatingRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  const { userId, rating } = req.body;

  if (!userId || !rating) {
    return res.status(400).json({ error: "Faltan datos necesarios" });
  }

  if (rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: "La calificación debe estar entre 1 y 5" });
  }

  try {
    const restaurant = await db.Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurante no encontrado" });
    }

    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newRating = await db.Rating.create({
      userId: userId,
      restaurantId: restaurantId,
      rating: rating,
    });

    res.status(201).json({
      message: "Calificación agregada exitosamente",
      rating: newRating,
    });
  } catch (error) {
    console.error("Error al agregar calificación:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  ratingRestaurant,
  addRatingRestaurant,
};
