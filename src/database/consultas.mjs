export default {
    getAllpedidos:'SELECT * FROM pedidos',
    insertPedidos: '      INSERT INTO pedidos (platillo, cantidad, cliente, precio, observaciones, estado) VALUES ( ?, ?, ?, ?, ?, ?)'
}

