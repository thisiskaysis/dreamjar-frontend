import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";

import postDonation from "../../api/post-donation"

function DonationForm({ campaignId }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [credentials, setCredentials] = useState({
    amount:"",
    comment:"",
    donor_name:"",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({}); // clear previous errors

    postDonation(credentials)
    .then((response) => {
      navigate("/donate/success");
    }) 
    .catch ((error) => {
          setErrors(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Main container */}
      <div className="flex items-center gap-8 max-w-5xl w-full px-8">
        {/* Form section */}
        <div className="flex-1 relative">

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <motion.h1
              className="text-xl font-bold text-[#8B7BA8] text-center mb-8 mt-10 mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Make a Donation
            </motion.h1>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={credentials.amount}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                id="comment"
                value={credentials.comment}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Donor Name */}
            <div>
              <label htmlFor="donor_name" className="block text-sm font-medium text-gray-700">
                Donor Name
              </label>
              <input
                type="text"
                id="donor_name"
                value={credentials.donor_name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />

            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Donate
              </button>
            </div>

            {/* Display errors if any */}
            {errors && (
              <div className="text-red-500 text-sm mt-4">
                {Object.values(errors).flat().join(" ")}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DonationForm;