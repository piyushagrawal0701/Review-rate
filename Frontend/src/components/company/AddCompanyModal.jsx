import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";

import { createCompany } from "../../services/companyService";

const AddCompanyModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [logo, setLogo] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    city: "",
    foundedOn: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogo(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("name", formData.name);

      payload.append("description", formData.description);

      payload.append("location", formData.location);

      payload.append("city", formData.city);

      payload.append("foundedOn", formData.foundedOn);

      if (logo) {
        payload.append("logo", logo);
      }

      await createCompany(payload);

      toast.success("Company Added Successfully");
      setFormData({
        name: "",
        description: "",
        location: "",
        city: "",
        foundedOn: "",
      });

      setLogo(null);
      setPreview("");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl">
        <div className="p-6 border-b">
          <h2 className="text-3xl font-bold">Add Company</h2>

          <p className="text-gray-500 mt-1">Create a new company profile</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Company Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                placeholder="Google"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                placeholder="Bangalore"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                placeholder="Bangalore, Karnataka, India"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Founded On</label>

              <input
                type="date"
                name="foundedOn"
                value={formData.foundedOn}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Company Logo</label>

              <label className="border-2 border-dashed rounded-xl h-[120px] flex flex-col items-center justify-center cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <FaCamera size={28} />
                    <span className="mt-2 text-sm">Upload Logo</span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Description</label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 resize-none"
                placeholder="Write company description..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white"
            >
              {loading ? "Saving..." : "Save Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
