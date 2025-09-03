// pages/api/dashboardProcument.js

import { query } from '../../lib/db.js';

export default async function handler(req, res) {
  try {
    const data = {
      totalCustomersVisitors: await query('SELECT month, visitors, transactions FROM monthly_visits'),
      salesByDivision: await query('SELECT division, sales FROM division_sales'),
      averagePriceAndUnits: await query('SELECT month, price_per_transaction, units_per_transaction FROM monthly_avg'),
      salesByCity: await query('SELECT city, percentage FROM sales_by_city'),
    };
    res.status(200).json(data);
  } catch (error) {
    console.error('Dashboard API error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
