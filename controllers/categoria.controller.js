const db = require("../models/index.js");

const agregarCategoria = async (req, res) => {
  const { nombre, image_url } = req.body;

  const categoriaExist = await db.Categoria.findOne({
    where: { nombre },
  });

  if (categoriaExist) {
    return res
      .status(400)
      .json({ error: "Ya existe una categoria con ese nombre" });
  }

  if (!nombre || !image_url)
    return res
      .status(404)
      .json({ error: "todos los campos deben ser obligatorios" });

  try {
    const nuevaCategoria = await db.Categoria.create({
      image_url,
      nombre,
    });
    return res.status(201).json({ nuevaCategoria });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Hubo un error al agregar la categoria" });
  }
};
const obtenerCategoria = async (req, res) => {
  try {
    const categorias = await db.Categoria.findAll();
    return res.status(200).json({ categorias });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Hubo un error al obtener las categorias" });
  }
};

const actualizarCategoria = async (req, res) => {
  const { idcategoria } = req.params;
  const { image_url, nombre } = req.body;

  try {
    const categoria = await db.Categoria.findByPk(idcategoria);

    if (!categoria) {
      return res.status(500).send("la categoria no existe");
    }

    await db.Categoria.update(
      { image_url, nombre },
      {
        where: {
          id: idcategoria,
        },
      }
    );

    res.status(200).send("la categoria se ha actualizado correctamente");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Hubo un error al actualizar las categorias");
  }
};
const borrarCategoria = async (req, res) => {
  const { idcategoria } = req.params;

  const categoriaExists = await db.Categoria.findByPk(idcategoria);

  if (!categoriaExists) {
    return res.status(500).send("la categoria no existe");
  }

  try {
    await db.Categoria.destroy({
      where: {
        id: idcategoria,
      },
    });

    res.status(200).send("la categoria se ha borrado correctamente");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("hubo un error al eliminar la categoriaf");
  }
};

module.exports = {
  agregarCategoria,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
