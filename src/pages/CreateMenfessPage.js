import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderTitle from "../components/atoms/typography/HeaderTitle";
import { useAuth } from "../context/AuthContext";

export default function CreateMenfessPage() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth(); // Pastikan token diambil dengan benar

  const handleCreateMenfess = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", message);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "https://api-tekkomfess.vercel.app/api/menfess",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("");
      setImage(null);
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

  return (
    <div className="px-5 min-h-[80vh]">
      <HeaderTitle
        title="Create Menfess"
        subtitle="Share unique stories in here"
      />

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
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#0288d1] text-sm text-white rounded-md"
        >
          {loading ? "Creating..." : "Create Menfess"}
        </button>
      </form>
    </div>
  );
}
