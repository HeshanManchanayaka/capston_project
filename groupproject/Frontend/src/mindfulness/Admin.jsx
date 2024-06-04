import React, { useState, useEffect } from 'react';

// Mock API functions - Replace these with real API calls
const api = {
  fetchPlans: async () => [
    { id: 1, type: 'meditation', name: 'Basic Meditation', description: 'This is a basic meditation plan.', items: [] },
    { id: 2, type: 'counseling', name: 'Basic Counseling', description: 'This is a basic counseling plan.', items: [] },
    { id: 3, type: 'musicTherapy', name: 'Basic Music Therapy', description: 'This is a basic music therapy plan.', items: [] },
    { id: 4, type: 'yoga', name: 'Basic Yoga', description: 'This is a basic yoga plan.', items: [] },
  ],
  addPlan: async (plan) => ({ ...plan, id: Math.random() }), // mock add with random id
  updatePlan: async (plan) => plan,
  deletePlan: async (id) => id,
  addItem: async (planId, item) => ({ ...item, id: Math.random() }), // mock add with random id
  updateItem: async (planId, item) => item,
  deleteItem: async (planId, itemId) => itemId,
};

function App() {
  const [plans, setPlans] = useState([]);
  const [selectedPlanType, setSelectedPlanType] = useState('meditation');
  const [newPlan, setNewPlan] = useState({ type: selectedPlanType, name: '', description: '' });
  const [editPlan, setEditPlan] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    api.fetchPlans().then(setPlans);
  }, []);

  const handleAddPlan = () => {
    api.addPlan(newPlan).then((addedPlan) => {
      setPlans([...plans, addedPlan]);
      setNewPlan({ type: selectedPlanType, name: '', description: '' });
    });
  };

  const handleUpdatePlan = (plan) => {
    api.updatePlan(plan).then((updatedPlan) => {
      setPlans(plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
      setEditPlan(null);
    });
  };

  const handleDeletePlan = (id) => {
    api.deletePlan(id).then(() => {
      setPlans(plans.filter((plan) => plan.id !== id));
    });
  };

  const handleAddItem = (planId) => {
    api.addItem(planId, newItem).then((addedItem) => {
      setPlans(plans.map((p) =>
        p.id === planId ? { ...p, items: [...p.items, addedItem] } : p
      ));
      setNewItem({ name: '', description: '' });
    });
  };

  const handleUpdateItem = (planId, item) => {
    api.updateItem(planId, item).then((updatedItem) => {
      setPlans(plans.map((p) =>
        p.id === planId ? { ...p, items: p.items.map(i => i.id === updatedItem.id ? updatedItem : i) } : p
      ));
      setEditItem(null);
    });
  };

  const handleDeleteItem = (planId, itemId) => {
    api.deleteItem(planId, itemId).then(() => {
      setPlans(plans.map((p) =>
        p.id === planId ? { ...p, items: p.items.filter(i => i.id !== itemId) } : p
      ));
    });
  };

  const filteredPlans = plans.filter(plan => plan.type === selectedPlanType);

  return (
    <div className="App">
      <h1>Admin Panel - Manage Plans</h1>

      <div className="plan-type-selector">
        <label>
          Select Plan Type:
          <select value={selectedPlanType} onChange={(e) => setSelectedPlanType(e.target.value)}>
            <option value="meditation">Meditation</option>
            <option value="counseling">Counseling</option>
            <option value="musicTherapy">Music Therapy</option>
            <option value="yoga">Yoga</option>
          </select>
        </label>
      </div>

      <div className="plan-form">
        <input
          type="text"
          placeholder="Plan Name"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
        />
        <textarea
          placeholder="Plan Description"
          value={newPlan.description}
          onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
        />
        <button onClick={handleAddPlan}>Add Plan</button>
      </div>

      <div className="plans-list">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="plan-item">
            {editPlan && editPlan.id === plan.id ? (
              <>
                <input
                  type="text"
                  value={editPlan.name}
                  onChange={(e) => setEditPlan({ ...editPlan, name: e.target.value })}
                />
                <textarea
                  value={editPlan.description}
                  onChange={(e) => setEditPlan({ ...editPlan, description: e.target.value })}
                />
                <button onClick={() => handleUpdatePlan(editPlan)}>Save</button>
                <button onClick={() => setEditPlan(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h2>{plan.name}</h2>
                <p>{plan.description}</p>
                <button onClick={() => setEditPlan(plan)}>Edit</button>
                <button onClick={() => handleDeletePlan(plan.id)}>Delete</button>
              </>
            )}

            <div className="items-list">
              <h3>{plan.type === 'musicTherapy' ? 'Audios' : 'Instructors'}</h3>
              {plan.items.map((item) => (
                <div key={item.id} className="item">
                  {editItem && editItem.id === item.id ? (
                    <>
                      <input
                        type="text"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                      />
                      <textarea
                        value={editItem.description}
                        onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                      />
                      <button onClick={() => handleUpdateItem(plan.id, editItem)}>Save</button>
                      <button onClick={() => setEditItem(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <button onClick={() => setEditItem(item)}>Edit</button>
                      <button onClick={() => handleDeleteItem(plan.id, item.id)}>Delete</button>
                    </>
                  )}
                </div>
              ))}

              <div className="item-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <button onClick={() => handleAddItem(plan.id)}>Add {plan.type === 'musicTherapy' ? 'Audio' : 'Instructor'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .App {
          font-family: Arial, sans-serif;
          margin: 20px;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .plan-type-selector {
          text-align: center;
          margin-bottom: 20px;
        }

        .plan-form {
          display: flex;
          flex-direction: column;
          max-width: 400px;
          margin: 0 auto 20px;
        }

        .plan-form input,
        .plan-form textarea {
          margin-bottom: 10px;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .plan-form button {
          padding: 10px;
          font-size: 16px;
          border: none;
          background-color: #28a745;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .plan-form button:hover {
          background-color: #218838;
        }

        .plans-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .plan-item {
          border: 1px solid #ddd;
          padding: 20px;
          margin-bottom: 10px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
        }

        .plan-item h2 {
          margin: 0 0 10px;
        }

        .plan-item p {
          margin: 0 0 10px;
        }

        .plan-item button {
          margin-top: 10px;
          padding: 8px;
          font-size: 14px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .plan-item button:hover {
          background-color: #0056b3;
        }

        .plan-item button:nth-child(2) {
          background-color: #dc3545;
          margin-left: 10px;
        }

        .plan-item button:nth-child(2):hover {
          background-color: #c82333;
        }

        .items-list {
          margin-top: 20px;
        }

        .item {
          border: 1px solid #eee;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
        }

        .item h4 {
          margin: 0 0 10px;
        }

        .item p {
          margin: 0 0 10px;
        }

        .item button {
          margin-top: 10px;
          padding: 8px;
          font-size: 14px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .item button:hover {
          background-color: #0056b3;
        }

        .item button:nth-child(2) {
          background-color: #dc3545;
          margin-left: 10px;
        }

        .item button:nth-child(2):hover {
          background-color: #c82333;
        }

        .item-form {
          margin-top: 10px;
        }

        .item-form input,
        .item-form textarea {
          margin-bottom: 10px;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .item-form button {
          padding: 10px;
          font-size: 16px;
          border: none;
          background-color: #28a745;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .item-form button:hover {
          background-color: #218838;
        }

        @media (max-width: 768px) {
          .plan-form,
          .plans-list {
            max-width: 100%;
            margin: 0 10px;
          }

          .plan-item {
            padding: 15px;
          }

          .plan-item h2 {
            font-size: 20px;
          }

          .plan-item p,
          .item p {
            font-size: 14px;
          }

          .plan-item button,
          .item button {
            font-size: 12px;
            padding: 6px;
          }

          .item h4 {
            font-size: 18px;
          }

          .item-form input,
          .item-form textarea {
            font-size: 14px;
          }

          .item-form button {
            font-size: 14px;
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          .plan-form,
          .plans-list {
            margin: 0 5px;
          }

          .plan-item h2 {
            font-size: 18px;
          }

          .plan-item button,
          .item button {
            font-size: 10px;
            padding: 5px;
          }

          .item h4 {
            font-size: 16px;
          }

          .item-form input,
          .item-form textarea {
            font-size: 12px;
          }

          .item-form button {
            font-size: 12px;
            padding: 6px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
