import React, { useState, useEffect } from "react";

function AgencyDashboard() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    id: "",
    name: "",
    color: "",
    price: "",
    image: "",
    description: "",
    features: {
      seats: "",
      fuel: "",
      transmission: "",
      mileage: "",
    },
  })

  // Load cars from localStorage
  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("agencyCars")) || [];
    setCars(storedCars);
  }, []);

  // Save cars to localStorage
  useEffect(() => {
    localStorage.setItem("agencyCars", JSON.stringify(cars))
  }, [cars])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (["seats", "fuel", "transmission", "mileage"].includes(name)) {
      setNewCar({
        ...newCar,
        features: { ...newCar.features, [name]: value },
      });
    } else {
      setNewCar({ ...newCar, [name]: value });
    }
  }

  const handleAddCar = (e) => {
    e.preventDefault();

    if (!newCar.name || !newCar.color || !newCar.price || !newCar.image) {
      alert("⚠️ Please fill all required fields!")
      return
    }

    // Prevent duplicate car names
    if (cars.some((c) => c.name.toLowerCase() === newCar.name.toLowerCase())) {
      alert("⚠️ Car with this name already exists!")
      return
    }

    const carWithId = { ...newCar, id: Date.now() }
    setCars([...cars, carWithId])

    // Reset form
    setNewCar({
      id: "",
      name: "",
      color: "",
      price: "",
      image: "",
      description: "",
      features: { seats: "", fuel: "", transmission: "", mileage: "" },
    })
  }

  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id)
    setCars(updatedCars)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">🚗 Agency Dashboard</h1>

        {/* Add Car Form */}
        <form onSubmit={handleAddCar} className="space-y-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Car Name *</label>
            <input
              type="text"
              name="name"
              value={newCar.name}
              onChange={handleChange}
              placeholder="Enter car name"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Colour *</label>
            <input
              type="text"
              name="color"
              value={newCar.color}
              onChange={handleChange}
              placeholder="Enter car colour"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Price *</label>
            <input
              type="number"
              name="price"
              value={newCar.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Image URL *</label>
            <input
              type="text"
              name="image"
              value={newCar.image}
              onChange={handleChange}
              placeholder="Paste car image URL"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Seats</label>
              <input
                type="text"
                name="seats"
                value={newCar.features.seats}
                onChange={handleChange}
                placeholder="e.g. 5 Seater"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Fuel</label>
              <input
                type="text"
                name="fuel"
                value={newCar.features.fuel}
                onChange={handleChange}
                placeholder="Petrol / Diesel"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Transmission</label>
              <input
                type="text"
                name="transmission"
                value={newCar.features.transmission}
                onChange={handleChange}
                placeholder="Manual / Automatic"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Mileage</label>
              <input
                type="text"
                name="mileage"
                value={newCar.features.mileage}
                onChange={handleChange}
                placeholder="15 km/l"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={newCar.description}
              onChange={handleChange}
              placeholder="Enter car description"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            ➕ Add Car
          </button>
        </form>

        {/* Cars List */}
        <h2 className="text-xl font-semibold mb-3">📋 Added Cars</h2>
        {cars.length === 0 ? (
          <p className="text-gray-500">No cars added yet.</p>
        ) : (
          <ul className="space-y-3">
            {cars.map((car) => (
              <li
                key={car.id}
                className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  {car.image && (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  )}
                  <div>
                    <p className="font-medium text-lg">{car.name}</p>
                    <p className="text-sm text-gray-600">
                      Colour: {car.color} | ₹{car.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Seats: {car.features?.seats || "-"} | Fuel:{" "}
                      {car.features?.fuel || "-"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {car.features?.transmission || "-"} | Mileage:{" "}
                      {car.features?.mileage || "-"}
                    </p>
                    {car.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {car.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="mt-3 md:mt-0 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AgencyDashboard;
