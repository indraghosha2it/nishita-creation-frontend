
import { districts_en, upazilas_en, unions_en } from 'bangladesh-location-data';

export const dynamic = 'force-static';

export async function GET(request) {
  const locationData = {};
  
  // Define divisions with their districts - USING EXACT NAMES from the console log
  const divisions = {
    'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Gopalganj', 'Madaripur', 'Shariatpur', 'Rajbari', 'Faridpur'],
    'Chattogram': ['Chattogram', 'Coxsbazar', 'Rangamati', 'Khagrachhari', 'Bandarban', 'Noakhali', 'Feni', 'Lakshmipur', 'Chandpur', 'Brahmanbaria', 'Comilla'],
    'Rajshahi': ['Rajshahi', 'Chapainawabganj', 'Naogaon', 'Natore', 'Pabna', 'Sirajganj', 'Bogura', 'Joypurhat'],
    'Khulna': ['Khulna', 'Satkhira', 'Bagerhat', 'Jashore', 'Jhenaidah', 'Magura', 'Narail', 'Kushtia', 'Chuadanga', 'Meherpur'],
    'Barishal': ['Barisal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Jhalakathi', 'Barguna'],
    'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
  };

  // Build location data with divisions
  Object.values(districts_en).forEach((districts) => {
    if (!Array.isArray(districts)) return;
    
    districts.forEach((district) => {
      const cityName = district.title;
      const districtId = district.value;
      
      // Find which division this district belongs to
      let divisionName = 'Other';
      for (const [div, districtsList] of Object.entries(divisions)) {
        if (districtsList.includes(cityName)) {
          divisionName = div;
          break;
        }
      }
      
      // Get all upazilas (zones) for this district
      const upazilas = upazilas_en[districtId] || [];
      const zones = {};
      
      upazilas.forEach((upazila) => {
        const zoneName = upazila.title;
        const upazilaId = upazila.value;
        
        // Get all unions (areas) for this upazila
        const unions = unions_en[upazilaId] || [];
        const areas = unions.map(union => union.title);
        
        zones[zoneName] = areas;
      });
      
      locationData[cityName] = { 
        division: divisionName,
        zones 
      };
    });
  });

  // Get unique divisions and their districts (sorted)
  const divisionsData = {};
  Object.entries(locationData).forEach(([district, data]) => {
    const division = data.division;
    if (!divisionsData[division]) {
      divisionsData[division] = [];
    }
    divisionsData[division].push(district);
  });

  // Sort districts alphabetically within each division
  Object.keys(divisionsData).forEach(division => {
    divisionsData[division].sort();
  });

  // Sort divisions alphabetically
  const sortedDivisions = {};
  Object.keys(divisionsData).sort().forEach(key => {
    sortedDivisions[key] = divisionsData[key];
  });

  // Remove "Other" division if it exists (to hide the "Other" option)
  if (sortedDivisions['Other']) {
    delete sortedDivisions['Other'];
  }

  return new Response(JSON.stringify({ 
    locationData,
    divisions: sortedDivisions 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}