import { useQuery } from '@tanstack/react-query';

const fetchHousingData = async () => {
  // This is a placeholder for government API integration
  // In production, this would call the backend API which in turn calls government APIs
  const response = await fetch('http://localhost:5000/api/housing/report');
  if (!response.ok) {
    throw new Error('Failed to fetch housing data');
  }
  return response.json();
};

export default function HousingReport() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['housingReport'],
    queryFn: fetchHousingData,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Housing Data</h3>
          <p className="text-red-600">{error.message}</p>
          <p className="text-sm text-gray-600 mt-2">
            Make sure the backend API is running on http://localhost:5000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          OzHaus - Housing Report
        </h1>
        <p className="text-gray-600 mb-8">
          Comprehensive housing insights powered by government data and AI analysis
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.properties?.map((property, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {property.address}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Price:</span> ${property.price?.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Type:</span> {property.type}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Bedrooms:</span> {property.bedrooms}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Bathrooms:</span> {property.bathrooms}
                </p>
              </div>
              {property.aiInsights && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-blue-600 font-medium mb-1">AI Insights:</p>
                  <p className="text-sm text-gray-700">{property.aiInsights}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {(!data?.properties || data.properties.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No housing data available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
