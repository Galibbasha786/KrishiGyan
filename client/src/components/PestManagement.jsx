// src/components/PestManagement.jsx
import React, { useState } from 'react';
import { Search, AlertTriangle, Calendar, MapPin } from 'lucide-react';

const PestManagement = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPest, setSelectedPest] = useState(null);

  const crops = [
    'Rice', 'Wheat', 'Corn', 'Cotton', 'Sugarcane', 'Tomato', 'Potato'
  ];

  const pestsData = {
    Rice: [
      {
        id: 1,
        name: 'Brown Plant Hopper',
        severity: 'High',
        symptoms: 'Yellowing leaves, hopper burn, sooty mold',
        treatment: 'Use Imidacloprid, maintain proper water level',
        prevention: 'Avoid excessive nitrogen, use resistant varieties',
        season: 'Kharif',
        image: '/api/placeholder/300/200'
      },
      {
        id: 2,
        name: 'Rice Blast',
        severity: 'Medium',
        symptoms: 'Diamond-shaped lesions on leaves',
        treatment: 'Apply Tricyclazole, avoid water stress',
        prevention: 'Use certified seeds, proper spacing',
        season: 'All seasons',
        image: '/api/placeholder/300/200'
      }
    ],
    Wheat: [
      {
        id: 1,
        name: 'Wheat Rust',
        severity: 'High',
        symptoms: 'Orange-brown pustules on leaves',
        treatment: 'Apply Propiconazole, remove infected plants',
        prevention: 'Use resistant varieties, crop rotation',
        season: 'Rabi',
        image: '/api/placeholder/300/200'
      }
    ],
    // Add more crops and pests...
  };

  const filteredPests = selectedCrop 
    ? pestsData[selectedCrop]?.filter(pest => 
        pest.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    : [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-green mb-2">Pest Management</h1>
        <p className="text-gray-600">Identify and manage crop pests effectively</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
            >
              <option value="">Choose a crop...</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Pests
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for pests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pests List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPests.map(pest => (
          <div 
            key={pest.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedPest(pest)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{pest.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pest.severity === 'High' 
                    ? 'bg-red-100 text-red-800' 
                    : pest.severity === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {pest.severity} Risk
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{pest.season}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{pest.symptoms}</p>
              
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="text-yellow-500" size={16} />
                <span className="text-gray-600">Click for treatment details</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCrop && filteredPests.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pests found</h3>
          <p className="text-gray-600">Try selecting a different crop or search term</p>
        </div>
      )}

      {!selectedCrop && (
        <div className="text-center py-12">
          <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a crop to view pests</h3>
          <p className="text-gray-600">Choose from the dropdown above to see common pests</p>
        </div>
      )}

      {/* Pest Detail Modal */}
      {selectedPest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedPest.name}</h2>
                <button 
                  onClick={() => setSelectedPest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Symptoms</h3>
                  <p className="text-gray-700 mb-4">{selectedPest.symptoms}</p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">Treatment</h3>
                  <p className="text-gray-700 mb-4">{selectedPest.treatment}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prevention</h3>
                  <p className="text-gray-700 mb-4">{selectedPest.prevention}</p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="text-yellow-600" size={20} />
                      <span className="font-semibold text-yellow-800">Severity: {selectedPest.severity}</span>
                    </div>
                    <p className="text-yellow-700 text-sm">Season: {selectedPest.season}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-primary-green text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                  Mark as Found in My Farm
                </button>
                <button 
                  onClick={() => setSelectedPest(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PestManagement;