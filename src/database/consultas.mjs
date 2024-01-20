export default {
    getAllpedidos:'SELECT * FROM pedidos',
    insertPedidos: 'INSERT INTO pedidos (platillo, cantidad, cliente, precio, observaciones, estado) VALUES ( ?, ?, ?, ?, ?, ?)',
    actualizarEstados:'UPDATE pedidos SET estado = "?" WHERE id_pedido = ?;',
    eliminarPedido:'DELETE FROM `pedidos` WHERE ?'
}

