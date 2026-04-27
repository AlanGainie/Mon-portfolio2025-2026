import { useState } from "react";
import type { AdministrativeContent } from "../../../types/pageTypes";

export default function AdministrativeEditor({
  initialContent,
  onSave,
}: {
  initialContent?: AdministrativeContent;
  onSave?: (updatedContent: AdministrativeContent) => void;
}) {
  const [formData, setFormData] = useState<AdministrativeContent>(
    initialContent ?? {
      description: "",
      pdf: "",
      slides: "",
      image: "",
      folder: "",
    }
  );

  const handleChange = (
    field: keyof AdministrativeContent,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave?.(formData);
    console.log("Contenu sauvegardé :", formData);
  };

  return (
    <section className="p-4 border rounded-md space-y-4">
      <h2 className="text-xl font-bold">Administration</h2>

      <div>
        <label>Description</label>
        <textarea
          value={formData.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>PDF</label>
        <input
          type="text"
          value={formData.pdf ?? ""}
          onChange={(e) => handleChange("pdf", e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Slides</label>
        <input
          type="text"
          value={formData.slides ?? ""}
          onChange={(e) => handleChange("slides", e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Image</label>
        <input
          type="text"
          value={formData.image ?? ""}
          onChange={(e) => handleChange("image", e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <div>
        <label>Dossier</label>
        <input
          type="text"
          value={formData.folder ?? ""}
          onChange={(e) => handleChange("folder", e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sauvegarder
      </button>
    </section>
  );
}