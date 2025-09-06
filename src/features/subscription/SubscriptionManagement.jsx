import React, { useState, useEffect } from "react";
import { Check, Plus, X, Pencil, AlertTriangle } from "lucide-react";

// Toast function for dummy notifications
const toast = {
  success: (message) => console.log("SUCCESS:", message),
  error: (message) => console.log("ERROR:", message),
};

function SubscriptionManagement() {
  const initialPlan = {
    premium: {
      id: "premium",
      name: "premium",
      displayName: "Premium Plan",
      price: "8.99",
      period: "month",
      features: [
        { id: 1, text: "Priority listing" },
        { id: 2, text: "Customer messaging" },
        { id: 3, text: "Advanced analytics" },
        { id: 4, text: "Premium support" },
        { id: 5, text: "Unlimited listings" },
      ],
    },
  };

  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [plans, setPlans] = useState(initialPlan);

  // Modals state
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  // Form states
  const [newPrice, setNewPrice] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [tempFeatures, setTempFeatures] = useState([]);

  // Update form values when selected plan changes
  useEffect(() => {
    if (plans[selectedPlan]) {
      setNewPrice(plans[selectedPlan].price);
      setNewPeriod(plans[selectedPlan].period);
    }
  }, [selectedPlan, plans]);

  // Initialize temp features when modal opens
  useEffect(() => {
    if (isFeatureModalOpen && plans[selectedPlan]) {
      setTempFeatures([...plans[selectedPlan].features]);
    }
  }, [isFeatureModalOpen, selectedPlan, plans]);

  // Open price update modal
  const handleOpenPriceModal = () => {
    setNewPrice(plans[selectedPlan].price);
    setNewPeriod(plans[selectedPlan].period);
    setIsPriceModalOpen(true);
  };

  // Open feature management modal
  const handleOpenFeatureModal = () => {
    setIsFeatureModalOpen(true);
    setNewFeature("");
  };

  // Add new feature
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const newId = Math.max(...tempFeatures.map((f) => f.id), 0) + 1;
      setTempFeatures([
        ...tempFeatures,
        { id: newId, text: newFeature.trim() },
      ]);
      setNewFeature("");
      toast.success("Feature added successfully!");
    }
  };

  // Remove feature
  const handleRemoveFeature = (featureId) => {
    setTempFeatures(tempFeatures.filter((feature) => feature.id !== featureId));
    toast.success("Feature removed successfully!");
  };

  // Save updated price
  const handleSavePrice = () => {
    const updatedPlans = {
      ...plans,
      [selectedPlan]: {
        ...plans[selectedPlan],
        price: newPrice,
        period: newPeriod,
      },
    };

    setPlans(updatedPlans);
    setIsPriceModalOpen(false);
    toast.success("Price updated successfully!");

    // Log data for backend integration
    console.log("Updated price data:", {
      planId: selectedPlan,
      price: newPrice,
      period: newPeriod,
    });
  };

  // Save updated features
  const handleSaveFeatures = () => {
    const updatedPlans = {
      ...plans,
      [selectedPlan]: {
        ...plans[selectedPlan],
        features: [...tempFeatures],
      },
    };

    setPlans(updatedPlans);
    setIsFeatureModalOpen(false);
    toast.success("Features updated successfully!");

    // Log data for backend integration
    console.log("Updated features data:", {
      planId: selectedPlan,
      features: tempFeatures,
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl text-white font-bold">
          Subscription Management
        </h1>
        <p className="text-white mt-2">
          Manage your subscription plan, pricing, and features
        </p>
      </div>

      {/* Plan Content */}
      <div className="border-2 border-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-white border-dashed">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl text-white font-bold">
                  {plans.premium.displayName}
                </h2>
                <p className="text-white">
                  Subscription details and features
                </p>
              </div>
              <button
                onClick={handleOpenPriceModal}
                className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] cursor-pointer !text-white px-4 py-2 rounded-md flex items-center"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Update Price
              </button>
            </div>
            <div className="mb-6">
              <span className="text-white text-4xl font-bold">
                $ {plans.premium.price}
              </span>
              <span className="text-white ml-1">
                /{plans.premium.period}
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Features</h3>
              <button
                onClick={handleOpenFeatureModal}
                className="border bg-[var(--secondary-color)] !text-white border-[var(--secondary-color)] cursor-pointer hover:bg-[var(--secondary-color)] hover:!text-white px-4 py-2 rounded-md flex items-center"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Manage Features
              </button>
            </div>

            <ul className="space-y-3 mt-4">
              {plans.premium.features.map((feature) => (
                <li key={feature.id} className="flex items-center gap-2">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[var(--secondary-color)] flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-white">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Price Update Modal */}
      {isPriceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Update Subscription Price</h2>
              <p className="text-gray-600">
                Update the price and billing period for the Premium Plan.
              </p>
            </div>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="period" className="block text-sm font-medium">
                  Billing Period
                </label>
                <select
                  id="period"
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsPriceModalOpen(false)}
                className="border-red-200 bg-red-50 cursor-pointer text-red-500 hover:bg-red-100 hover:text-red-600 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrice}
                className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] cursor-pointer !text-white py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Management Modal */}
      {isFeatureModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Manage Features</h2>
              <p className="text-gray-600">
                Add, edit, or remove features for the Premium Plan.
              </p>
              <p className="p-1 flex items-center animate-pulse gap-1 bg-yellow-100 rounded-md text-xs mt-2">
                <AlertTriangle size={18} />
                Please add the feature and save it.
              </p>
            </div>

            <div className="py-4">
              <div className="flex items-center space-x-2 gap-2 mb-4">
                <input
                  placeholder="Add a new feature..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                  className="flex-1 border rounded-md p-2"
                />
                <button
                  onClick={handleAddFeature}
                  className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] cursor-pointer !text-white p-2 rounded-md"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {tempFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`flex items-center justify-between p-3 border rounded-md ${!plans.premium.features.some(
                      (f) => f.id === feature.id
                    )
                        ? "bg-green-50 border-green-200"
                        : ""
                      }`}
                  >
                    <span>{feature.text}</span>
                    <button
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 rounded-full flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {tempFeatures.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No features added yet.
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsFeatureModalOpen(false)}
                className="border-red-200 bg-red-50 text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-600 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFeatures}
                className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] cursor-pointer !text-white py-2 rounded-md"
              >
                Save Features
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionManagement;