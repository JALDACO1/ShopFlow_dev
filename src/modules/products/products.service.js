const { Product, Category} = require('../../models');

const getAll = async ({ page = 1, limit = 20, category_id } = {}) => {
    // Calcula el desplazamiento para traer solo la página solicitada.
    const offset = (page - 1) * limit;
    // Solo mostramos productos activos; si viene categoría, filtramos también por ella.
    const where = {active: true};
    if (category_id) where.category_id = category_id;

    const { count, rows } = await Product.findAndCountAll({
        where,
        include: [{model: Category, attributes: ['id', 'name', 'slug']}],
        limit: Number(limit),
        offset: Number(offset),
        order: [['createdAt', 'DESC']]
    })

    return {
        total: count,
        page: Number(page),
        pages: Math.ceil(count / limit),
        products: rows                                                                            
    }
}

const getById = async (id) => {
    // Buscamos únicamente productos activos con su categoría asociada.
    const product = await Product.findOne({
        where: {id, active: true},
        include: [{model: Category, attributes: ['id', 'name', 'slug']}]
    });

    if (!product) {
        // Mismo mensaje para no exponer detalles internos de la consulta.
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error;
    }

    return product;
}

const create = async (data) => {
    // Antes de crear, validamos que la categoría exista.
    const category = await Category.findOne({where: {id: data.category_id}});
    if (!category) {
        // Si la categoría no existe, devolvemos un error controlado.
        const error = new Error('Categoría no encontrada');
        error.status = 404;
        throw error;
    }

    const product = await Product.create(data);
    return product;
}

const update = async (id, data) => {
    // Verificamos que el producto siga activo antes de modificarlo.
    const product = await Product.findOne({where: {id, active: true}});
    if (!product) {
        // Mantiene la misma respuesta cuando el producto ya no está disponible.
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error;
    }

    // Esta implementación actual hace soft delete en lugar de actualizar campos.
    await product.update({active: false});
    return { message: 'Producto no encontrado ' };

}

const deleteProduct = async (id) => {
    // Reutiliza la misma lógica de soft delete para no eliminar físicamente el registro.
    const product = await Product.findOne({where: {id, active: true}});
    if (!product) {
        // Se conserva un mensaje consistente para productos inexistentes o inactivos.
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error;
    }

    // Marcamos el producto como inactivo en vez de borrarlo de la base.
    await product.update({active: false});
    return { message: 'Producto desactivado correctamente' };
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteProduct
}

