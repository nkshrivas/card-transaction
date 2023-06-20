const express = require('express');
const {
  getTotalItemsSold,
  getNthMostSoldItem,
  getPercentageSoldItems,
  getMonthlySales,
} = require('../controllers/controllers');

const router = express.Router();

router.get('/total_items', getTotalItemsSold);
router.get('/nth_most_total_item', getNthMostSoldItem);
router.get('/percentage_of_department_wise_sold_items', getPercentageSoldItems);
router.get('/monthly_sales', getMonthlySales);

module.exports = router;
