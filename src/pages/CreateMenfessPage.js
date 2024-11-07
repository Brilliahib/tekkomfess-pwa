import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderTitle from "../components/atoms/typography/HeaderTitle";
import { useAuth } from "../context/AuthContext";

export default function CreateMenfessPage() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleCreateMenfess = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", message);
      if (image) {
        formData.append("images", image);
      }

      await axios.post(
        "https://api-tekkomfess.vercel.app/api/menfess",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("");
      setImage(null);
      setPreview(null);
      toast.success("Menfess created successfully!", {
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error creating menfess: ", error);
      toast.error("Failed to create menfess!", {
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="px-5 min-h-[80vh]">
      <HeaderTitle title="Create Menfess" />

      <form onSubmit={handleCreateMenfess} className="space-y-4 mb-6">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here"
          required
          className="px-4 py-2 border border-gray-300 p-2 rounded-md text-sm w-full focus:outline-none focus:border-[#0288d1]"
        />

        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full p-2 border rounded-md"
        />

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Image Preview"
              className="mt-2 rounded-md max-h-48 object-cover"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm text-white rounded-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0288d1]"
            }`}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
