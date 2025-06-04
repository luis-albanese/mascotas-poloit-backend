import HTTP_STATUS from "../utils/httpStatus.js";

// Función para validar schema de datos ingresados por el usuario
export const schemaValidator = (schema) => {
  // Recibimos el schema a validar
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Capturamos el error
    if (error) {
      const errorMessage = error.details.map((err) => err.message).join(", ");
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }
    next(); // Si no hay error sigue con el controlador
  };
};
