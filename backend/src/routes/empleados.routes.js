const {Router} = require('express');
const router = Router();

const {getAllEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado} = require('../controllers/empleados.controller');

router.get('/', getAllEmpleados);
router.get('/:id', getEmpleado);
router.post('/', createEmpleado);
router.put('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);

module.exports = router;