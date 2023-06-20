const Item = require('../models/items');
const { connectToDatabase } = require('../utills/database');

// Connect to the database
connectToDatabase();

async function getTotalItemsSold(req, res) {
  const { start_date, end_date, department } = req.query;

  // Validate input parameters
  // ...

  try {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const totalItemsSold = await Item.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
          department,
        },
      },
      {
        $group: {
          _id: null,
          totalSeatsSold: { $sum: '$seats' },
        },
      },
      {
        $project: {
          _id: 0,
          totalSeatsSold: 1,
        },
      },
    ]);

    if (totalItemsSold.length === 0) {
      return res.status(404).json({ error: 'No items found' });
    }

    res.json({ totalItemsSold: totalItemsSold[0].totalSeatsSold });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getNthMostSoldItem(req, res) {
  const { item_by, start_date, end_date, n } = req.query;

  // Validate input parameters
  // ...

  try {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    let sortField;
    if (item_by === 'quantity') {
      sortField = 'seats';
    } else if (item_by === 'price') {
      sortField = 'amount';
    } else {
      return res.status(400).json({ error: 'Invalid item_by parameter' });
    }

    const result = await Item.find({
      date: { $gte: startDate, $lte: endDate },
    })
      .sort(`-${sortField}`)
      .skip(n - 1)
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: 'No items found' });
    }

    res.json({ item: result[0].software });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPercentageSoldItems(req, res) {
  const { start_date, end_date } = req.query;

  // Validate input parameters
  // ...

  try {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const departmentCounts = await Item.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$department',
          totalSeatsSold: { $sum: '$seats' },
        },
      },
      {
        $project: {
          _id: 0,
          department: '$_id',
          percentage: { $multiply: [{ $divide: ['$totalSeatsSold', { $sum: '$totalSeatsSold' }] }, 100] },
        },
      },
    ]);

    if (departmentCounts.length === 0) {
      return res.status(404).json({ error: 'No items found' });
    }

    const percentageSoldItems = {};
    departmentCounts.forEach((department) => {
      percentageSoldItems[department.department] = department.percentage;
    });

    res.json(percentageSoldItems);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getMonthlySales(req, res) {
  const { product, year } = req.query;

  // Validate input parameters
  // ...

  try {
    const salesData = await Item.aggregate([
      {
        $match: {
          software: product,
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          totalSales: { $sum: { $multiply: ['$seats', '$amount'] } },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          totalSales: 1,
        },
      },
    ]);

    if (salesData.length === 0) {
      return res.status(404).json({ error: 'No sales data found' });
    }

    const sales = salesData.map((month) => month.totalSales);
    res.json(sales);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getTotalItemsSold,
  getNthMostSoldItem,
  getPercentageSoldItems,
  getMonthlySales,
};
