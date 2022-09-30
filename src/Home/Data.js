import { urlApi } from "../utils/config";
const data = [
  {
    title: "Ordenes",
    button: "Ver Ordenes",
    description: "Visualizar y actualizar ordenes.",
    route: "/orders",
    image: urlApi + "/images/orders.jpg",
  },
  {
    title: "Usuarios Registrados",
    button: "Gestionar usuarios",
    description: "Visualizar y eliminar usuarios registrados.",
    route: "/users",
    image: urlApi + "/images/users.jpg",
  },
  {
    title: "Agregar Producto",
    button: "Agregar",
    description: "Agrega un producto a tu tienda.",
    route: "/inventory/add",
    image: urlApi + "/images/add_product.jpg",
  },
  {
    title: "Categorias",
    button: "Gestionar",
    description: "Agrega un categoria o visualiza a tu tienda.",
    route: "/inventory/category",
    image: urlApi + "/images/category.jpg",
  },
  {
    title: "Ver Productos",
    button: "Visualizar",
    description: "Puedes modificar fotos y detalles. Gestión de stock",
    route: "/inventory",
    image: urlApi + "/images/update_product.jpg",
  },
  {
    title: "Mi cuenta",
    button: "Cambiar datos",
    description:
      "Visualiza y realiza cambios en tu cuenta. Gestiona las notificaciones. Cambia la contraseña",
    route: "/setting",
    image: urlApi + "/images/account.jpg",
  },
];
export default data;