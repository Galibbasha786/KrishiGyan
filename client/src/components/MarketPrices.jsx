// src/components/MarketPrices.jsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Download } from 'lucide-react';

const MarketPrices = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('weekly');

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 
    'Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal'
  ];

  const commodities = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 
    'Tomato', 'Potato', 'Onion', 'Turmeric', 'Chilli'
  ];

  const marketData = [
    {
      id: 1,
      commodity: 'Rice',
      variety: 'Basmati',
      market: 'Delhi Mandi',
      state: 'Delhi',
      price: 4500,
      previousPrice: 4200,
      unit: 'Quintal',
      timestamp: '2024-01-15',
      trend: 'up'
    },
    {
      id: 2,
      commodity: 'Wheat',
      variety: 'Sharbati',
      market: 'Kolkata Market',
      state: 'West Bengal',
      price: 2200,
      previousPrice: 2300,
      unit: 'Quintal',
      timestamp: '2024-01-15',
      trend: 'down'
    },
    {
      id: 3,
      commodity: 'Tomato',
      variety: 'Hybrid',
      market: 'Bangalore Market',
      state: 'Karnataka',
      price: 1200,
      previousPrice: 1500,
      unit: 'Quintal',
      timestamp: '2024-01-15',
      trend: 'down'
    },
    {
      id: 4,
      commodity: 'Potato',
      variety: 'Kufri',
      market: 'Pune Market',
      state: 'Maharashtra',
      price: 800,
      previousPrice: 750,
      unit: 'Quintal',
      timestamp: '2024-01-15',
      trend: 'up'
    },
    // Add more data...
  ];

  const filteredData = marketData.filter(item => {
    const matchesState = !selectedState || item.state === selectedState;
    const matchesCommodity = !selectedCommodity || item.commodity === selectedCommodity;
    const matchesSearch = !searchQuery || 
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesState && matchesCommodity && matchesSearch;
  });

  const calculateChange = (current, previous) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-green mb-2">Market Prices</h1>
        <p className="text-gray-600">Real-time agricultural commodity prices across markets</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Markets & Commodities
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search markets or commodities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
            </div>
          </div>

          {/* State Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Commodity Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commodity
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
            >
              <option value="">All Commodities</option>
              {commodities.map(commodity => (
                <option key={commodity} value={commodity}>{commodity}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="mt-4 flex items-center gap-4">
          <Filter size={20} className="text-gray-400" />
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium capitalize ${
                  timeRange === range
                    ? 'bg-primary-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market Data Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Current Market Prices ({filteredData.length} records)
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-dark transition-colors">
            <Download size={18} />
            Export Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commodity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => {
                const changePercent = calculateChange(item.price, item.previousPrice);
                const isPositive = item.trend === 'up';
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{item.commodity}</div>
                        <div className="text-sm text-gray-500">{item.variety}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {item.market}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {item.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span className="font-medium">
                          {isPositive ? '+' : ''}{changePercent}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      /{item.unit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Price Trends Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="font-semibold text-green-800">Top Gainer</span>
          </div>
          <p className="text-green-700 mt-2">Rice (+7.1%)</p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="text-red-600" size={20} />
            <span className="font-semibold text-red-800">Top Loser</span>
          </div>
          <p className="text-red-700 mt-2">Tomato (-20.0%)</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Filter className="text-blue-600" size={20} />
            <span className="font-semibold text-blue-800">Most Traded</span>
          </div>
          <p className="text-blue-700 mt-2">Wheat (45 markets)</p>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;