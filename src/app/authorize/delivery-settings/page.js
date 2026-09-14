
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  FaTruck, 
  FaSave, 
  FaSpinner, 
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
  FaSearch,
  FaCog,
  FaLayerGroup
} from 'react-icons/fa';
import { 
  Sparkles,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

import ProtectedRoute from '@/app/components/ProtectedRoute';
export default function DeliverySettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    insideDhaka: '',
    outsideDhaka: '',
    subCityCharges: [],
    unionCharges: [] // NEW
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dhakaUpazilas, setDhakaUpazilas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationData, setLocationData] = useState({});
  
  // Sub-city charge form (Upazila level)
  const [subCityForm, setSubCityForm] = useState({
    upazila: '',
    charge: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Union charge form (Union/Area level)
  const [unionForm, setUnionForm] = useState({
    upazila: '',
    union: '',
    charge: ''
  });
  const [unionSearchTerm, setUnionSearchTerm] = useState('');
  const [selectedUpazilaUnions, setSelectedUpazilaUnions] = useState([]);

  // Fetch delivery settings and location data
  useEffect(() => {
    fetchSettings();
    fetchLocationData();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/delivery/settings');
      const result = await response.json();
      if (result.success) {
        setSettings({
          insideDhaka: result.data.insideDhaka,
          outsideDhaka: result.data.outsideDhaka,
          subCityCharges: result.data.subCityCharges || [],
          unionCharges: result.data.unionCharges || [] // NEW
        });
      } else {
        toast.error('Failed to load delivery settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationData = async () => {
    setLocationLoading(true);
    try {
      const response = await fetch('/api/locations');
      const result = await response.json();
      setLocationData(result.locationData || {});
      
      // Extract Dhaka's upazilas from location data
      const dhakaUpazilasList = [];
      if (result.locationData['Dhaka'] && result.locationData['Dhaka'].zones) {
        const zones = Object.keys(result.locationData['Dhaka'].zones);
        dhakaUpazilasList.push(...zones);
      }
      
      setDhakaUpazilas(dhakaUpazilasList.sort());
    } catch (error) {
      console.error('Error fetching location data:', error);
    } finally {
      setLocationLoading(false);
    }
  };

  // Get unions for a specific upazila
  const getUnionsForUpazila = (upazila) => {
    if (locationData['Dhaka'] && locationData['Dhaka'].zones && locationData['Dhaka'].zones[upazila]) {
      return locationData['Dhaka'].zones[upazila];
    }
    return [];
  };

  // Update unions when upazila changes in union form
  useEffect(() => {
    if (unionForm.upazila) {
      const unions = getUnionsForUpazila(unionForm.upazila);
      setSelectedUpazilaUnions(unions);
      setUnionForm(prev => ({ ...prev, union: '' }));
    } else {
      setSelectedUpazilaUnions([]);
    }
  }, [unionForm.upazila]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!settings.insideDhaka && !settings.outsideDhaka) {
      toast.error('Please enter delivery charges');
      return;
    }
    
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/delivery/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          insideDhaka: settings.insideDhaka || 0,
          outsideDhaka: settings.outsideDhaka || 0,
          subCityCharges: settings.subCityCharges,
          unionCharges: settings.unionCharges // NEW
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Delivery settings updated successfully');
        await fetchSettings();
      } else {
        toast.error(result.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseInt(value)
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === '' || value === null) {
      setSettings(prev => ({
        ...prev,
        [name]: 0
      }));
    }
  };

  // ========== SUB-CITY CHARGE (Upazila level) ==========
  const addSubCityCharge = () => {
    if (!subCityForm.upazila) {
      toast.error('Please select an upazila/thana');
      return;
    }
    if (!subCityForm.charge || parseInt(subCityForm.charge) < 0) {
      toast.error('Please enter a valid charge amount');
      return;
    }

    if (settings.subCityCharges.some(sc => sc.upazila === subCityForm.upazila)) {
      toast.error('This upazila already has a custom charge');
      return;
    }

    setSettings(prev => ({
      ...prev,
      subCityCharges: [
        ...prev.subCityCharges,
        { upazila: subCityForm.upazila, charge: parseInt(subCityForm.charge) }
      ]
    }));

    setSubCityForm({ upazila: '', charge: '' });
    setSearchTerm('');
  };

  const removeSubCityCharge = (upazila) => {
    setSettings(prev => ({
      ...prev,
      subCityCharges: prev.subCityCharges.filter(sc => sc.upazila !== upazila)
    }));
  };

  // ========== UNION CHARGE (Union/Area level) ==========
  const addUnionCharge = () => {
    if (!unionForm.upazila) {
      toast.error('Please select an upazila/thana');
      return;
    }
    if (!unionForm.union) {
      toast.error('Please select a union/area');
      return;
    }
    if (!unionForm.charge || parseInt(unionForm.charge) < 0) {
      toast.error('Please enter a valid charge amount');
      return;
    }

    if (settings.unionCharges.some(
      uc => uc.upazila === unionForm.upazila && uc.union === unionForm.union
    )) {
      toast.error('This union already has a custom charge');
      return;
    }

    setSettings(prev => ({
      ...prev,
      unionCharges: [
        ...prev.unionCharges,
        { upazila: unionForm.upazila, union: unionForm.union, charge: parseInt(unionForm.charge) }
      ]
    }));

    setUnionForm({ upazila: '', union: '', charge: '' });
    setUnionSearchTerm('');
  };

  const removeUnionCharge = (upazila, union) => {
    setSettings(prev => ({
      ...prev,
      unionCharges: prev.unionCharges.filter(
        uc => !(uc.upazila === upazila && uc.union === union)
      )
    }));
  };

  const filteredUpazilas = dhakaUpazilas.filter(upazila => 
    upazila.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !settings.subCityCharges.some(sc => sc.upazila === upazila)
  );

  const filteredUnions = selectedUpazilaUnions.filter(union => 
    union.toLowerCase().includes(unionSearchTerm.toLowerCase()) &&
    !settings.unionCharges.some(uc => uc.upazila === unionForm.upazila && uc.union === union)
  );

  if (loading || locationLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#FFF5F6]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#73856B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading delivery settings...</p>
        </div>
      </div>
    );
  }

  return (
     <ProtectedRoute pageKey="delivery_settings">
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#73856B]/20 shadow-lg sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <FaTruck className="w-6 h-6 text-[#73856B]" />
                  <h1 className="text-xl font-bold text-[#2D1B2E]">Delivery Charge Settings</h1>
                </div>
                <p className="text-sm text-[#73856B]/60 mt-1">Configure shipping costs for different zones</p>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-[#73856B]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#73856B]/20 overflow-hidden">
          <div className="p-6 bg-[#73856B]">
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              <FaTruck className="w-5 h-5" />
              Configure Shipping Costs
            </h2>
            <p className="text-white/80 text-sm mt-1">Set delivery charges for different zones</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Inside Dhaka */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B2E]">
                <div className="p-1.5 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg">
                  <FaMapMarkerAlt className="w-4 h-4 text-emerald-600" />
                </div>
                Inside Dhaka City (Default)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#73856B] font-semibold">৳</span>
                <input
                  type="number"
                  name="insideDhaka"
                  value={settings.insideDhaka === 0 ? '' : settings.insideDhaka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="10"
                  placeholder="Enter default delivery charge for Dhaka"
                  className="w-full pl-8 pr-4 py-3 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent transition-all bg-white hover:border-[#73856B]/30"
                />
              </div>
              <p className="text-xs text-[#73856B]/60 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                Default delivery charge for Dhaka city (applies unless overridden)
              </p>
            </div>

            {/* Sub-city Charges for Dhaka (Upazila level) */}
            <div className="space-y-3 border-t border-[#F7C7D3]/40 pt-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B2E]">
                  <div className="p-1.5 bg-[#F7C7D3]/30 rounded-lg">
                    <FaLayerGroup className="w-4 h-4 text-[#73856B]" />
                  </div>
                  Upazila/Thana Level Charges
                </label>
                <p className="text-xs text-[#73856B]/60 mt-1">
                  Set custom delivery charges for specific upazilas/thanas within Dhaka city
                </p>
              </div>

              {/* Add new sub-city charge */}
              <div className="bg-[#FFF5F6] rounded-lg p-4 border border-[#73856B]/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                      Upazila/Thana
                    </label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#73856B]/40 w-3.5 h-3.5" />
                      <select
                        value={subCityForm.upazila}
                        onChange={(e) => setSubCityForm(prev => ({ ...prev, upazila: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white text-sm"
                      >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map(upazila => (
                          <option key={upazila} value={upazila}>{upazila}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                      Custom Charge (৳)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#73856B] font-semibold">৳</span>
                      <input
                        type="number"
                        value={subCityForm.charge}
                        onChange={(e) => setSubCityForm(prev => ({ ...prev, charge: e.target.value }))}
                        min="0"
                        step="10"
                        placeholder="Enter charge"
                        className="w-full pl-8 pr-3 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addSubCityCharge}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#73856B] text-white rounded-lg hover:shadow-lg hover:shadow-[#73856B]/25 transition-all text-sm font-medium"
                    >
                      <FaPlus className="w-3.5 h-3.5" />
                      Add Charge
                    </button>
                  </div>
                </div>
              </div>

              {/* List of sub-city charges */}
              {settings.subCityCharges.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#2D1B2E]">Upazila Charges Applied:</p>
                  {settings.subCityCharges.map((sc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#73856B]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FFF5F6] rounded-full flex items-center justify-center">
                          <FaMapMarkerAlt className="w-4 h-4 text-[#73856B]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#2D1B2E]">{sc.upazila}</p>
                          <p className="text-xs text-[#73856B]/60">Custom charge: <span className="font-semibold text-[#73856B]">৳{sc.charge}</span></p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubCityCharge(sc.upazila)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* NEW: Union/Area Level Charges */}
            <div className="space-y-3 border-t border-[#F7C7D3]/40 pt-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B2E]">
                  <div className="p-1.5 bg-purple-100 rounded-lg">
                    <FaCog className="w-4 h-4 text-purple-600" />
                  </div>
                  Union/Area Level Charges
                </label>
                <p className="text-xs text-[#73856B]/60 mt-1">
                  Set custom delivery charges for specific unions/areas within Dhaka upazilas
                </p>
              </div>

              {/* Add new union charge */}
              <div className="bg-[#FFF5F6] rounded-lg p-4 border border-[#73856B]/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                      Upazila/Thana
                    </label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#73856B]/40 w-3.5 h-3.5" />
                      <select
                        value={unionForm.upazila}
                        onChange={(e) => setUnionForm(prev => ({ ...prev, upazila: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white text-sm"
                      >
                        <option value="">Select Upazila</option>
                        {dhakaUpazilas.map(upazila => (
                          <option key={upazila} value={upazila}>{upazila}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                      Union/Area
                    </label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#73856B]/40 w-3.5 h-3.5" />
                      <select
                        value={unionForm.union}
                        onChange={(e) => setUnionForm(prev => ({ ...prev, union: e.target.value }))}
                        disabled={!unionForm.upazila}
                        className="w-full pl-9 pr-3 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">{unionForm.upazila ? "Select Union/Area" : "Select Upazila First"}</option>
                        {filteredUnions.map(union => (
                          <option key={union} value={union}>{union}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
                      Custom Charge (৳)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#73856B] font-semibold">৳</span>
                      <input
                        type="number"
                        value={unionForm.charge}
                        onChange={(e) => setUnionForm(prev => ({ ...prev, charge: e.target.value }))}
                        min="0"
                        step="10"
                        placeholder="Enter charge"
                        className="w-full pl-8 pr-3 py-2.5 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent outline-none bg-white text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={addUnionCharge}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    <FaPlus className="w-3.5 h-3.5" />
                    Add Union Charge
                  </button>
                </div>
              </div>

              {/* List of union charges */}
              {settings.unionCharges.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#2D1B2E]">Union Charges Applied:</p>
                  {settings.unionCharges.map((uc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#73856B]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <FaMapMarkerAlt className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#2D1B2E]">{uc.union} <span className="text-xs text-[#73856B]/60">({uc.upazila})</span></p>
                          <p className="text-xs text-[#73856B]/60">Custom charge: <span className="font-semibold text-purple-600">৳{uc.charge}</span></p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeUnionCharge(uc.upazila, uc.union)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Outside Dhaka */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#2D1B2E]">
                <div className="p-1.5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                  <FaTruck className="w-4 h-4 text-orange-600" />
                </div>
                Outside Dhaka (Other Districts)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#73856B] font-semibold">৳</span>
                <input
                  type="number"
                  name="outsideDhaka"
                  value={settings.outsideDhaka === 0 ? '' : settings.outsideDhaka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="10"
                  placeholder="Enter delivery charge for outside Dhaka"
                  className="w-full pl-8 pr-4 py-3 border border-[#F7C7D3]/50 rounded-lg focus:ring-2 focus:ring-[#73856B] focus:border-transparent transition-all bg-white hover:border-[#73856B]/30"
                />
              </div>
              <p className="text-xs text-[#73856B]/60 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-orange-400"></span>
                Delivery charge for addresses outside Dhaka city
              </p>
            </div>

            {/* Preview Section */}
            <div className="bg-[#FFF5F6] rounded-lg p-4 border border-[#73856B]/20">
              <h3 className="text-sm font-semibold text-[#2D1B2E] mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#73856B]" />
                Preview
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg border border-[#73856B]/20">
                  <span className="text-[#2D1B2E] flex items-center gap-2">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-emerald-500" />
                    Inside Dhaka (Default):
                  </span>
                  <span className="font-semibold text-emerald-600">৳{settings.insideDhaka || 0}</span>
                </div>
                
                {settings.subCityCharges.length > 0 && (
                  <div className="p-2 bg-white/50 rounded-lg border border-[#73856B]/20">
                    <p className="text-xs text-[#73856B]/60 mb-2">Upazila Charges:</p>
                    {settings.subCityCharges.map((sc, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-[#73856B]/10 last:border-0">
                        <span className="text-[#2D1B2E] text-xs flex items-center gap-1">
                          <FaMapMarkerAlt className="w-3 h-3 text-[#73856B]" />
                          {sc.upazila}:
                        </span>
                        <span className="font-semibold text-[#73856B] text-xs">৳{sc.charge}</span>
                      </div>
                    ))}
                  </div>
                )}

                {settings.unionCharges.length > 0 && (
                  <div className="p-2 bg-white/50 rounded-lg border border-[#73856B]/20">
                    <p className="text-xs text-[#73856B]/60 mb-2">Union Charges:</p>
                    {settings.unionCharges.map((uc, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-[#73856B]/10 last:border-0">
                        <span className="text-[#2D1B2E] text-xs flex items-center gap-1">
                          <FaMapMarkerAlt className="w-3 h-3 text-purple-500" />
                          {uc.union} ({uc.upazila}):
                        </span>
                        <span className="font-semibold text-purple-600 text-xs">৳{uc.charge}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg border border-[#73856B]/20">
                  <span className="text-[#2D1B2E] flex items-center gap-2">
                    <FaTruck className="w-3.5 h-3.5 text-orange-500" />
                    Outside Dhaka:
                  </span>
                  <span className="font-semibold text-orange-600">৳{settings.outsideDhaka || 0}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#73856B] text-white rounded-lg hover:shadow-lg hover:shadow-[#73856B]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-medium"
              >
                {saving ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
     </ProtectedRoute >
  );
}