"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TemplatesGallery() {
  const router = useRouter();

  const templates = [
    {
      id: "classic",
      name: "Classic Resume",
      description: "Minimal, clean, ATS-ready formatting ideal for professional roles.",
      image: "/templates/classic.png",
      free: true,
    },
    {
      id: "modern",
      name: "Modern Resume",
      description: "Sleek two-column layout optimized for technical roles and designers.",
      image: "/templates/modern.png",
      free: true,
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white py-12">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-3 tracking-wide">
        Choose Your Resume Template
      </h1>
      <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
        Select a layout that aligns with your style and career goals. 
        More templates coming soon – including premium, AI-enhanced formats.
      </p>

      {/* TEMPLATE GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 px-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-[#1d254f]/60 border border-blue-500/20 p-4 pt-6 rounded-xl shadow-md hover:shadow-blue-500/20 hover:scale-[1.02] transition cursor-pointer"
          >
            {/* Preview Image */}
            <div className="relative h-[400px] w-full mb-4 rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={template.image}
                alt={template.name}
                fill
                className="object-contain p-3 hover:scale-105 transition"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold">{template.name}</h2>
            <p className="text-gray-300 text-sm mt-1">
              {template.description}
            </p>

            {/* Free Label */}
            {template.free && (
              <span className="inline-block text-xs font-bold text-green-400 mt-2">
                FREE
              </span>
            )}

            {/* CTA */}
            <button
              onClick={() =>
                router.push(`/resume/preview?template=${template.id}`)
              }
              className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
            >
              Use Template →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
