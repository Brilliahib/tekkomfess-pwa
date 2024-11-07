import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import TopNavigation from "../components/atoms/navbar/TopNavigation";
import { generateFallbackFromName } from "../utils/misc";
import { ImagePlus } from "lucide-react"; // Import icon dari lucide-react

export default function CreateMenfessPage() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

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
      <TopNavigation title="New Menfess" />
      <form onSubmit={handleCreateMenfess} className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f5f5f5] text-gray-700 font-bold">
              {generateFallbackFromName(user.fullname)}
            </div>
          </div>
          <h1 className="font-semibold text-sm">{user.fullname}</h1>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's new?"
          required
          className="px-4 py-2 border border-gray-300 p-2 rounded-md text-sm w-full focus:outline-none focus:border-[#0288d1]"
        />

        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 cursor-pointer"
        >
          <ImagePlus size={20} />
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <span className="text-sm text-[#737373]">Upload an image</span>
        </label>

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
            className={`px-4 py-2 text-sm text-white rounded-md font-semibold ${
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
