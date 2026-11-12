import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { X, ZoomIn, ZoomOut } from "lucide-react";

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

// Découpe la zone choisie et la redimensionne (max `maxSize` px de large)
const cropImage = async (src, area, maxSize) => {
  const img = await loadImage(src);
  const scale = Math.min(1, maxSize / area.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(area.width * scale);
  canvas.height = Math.round(area.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    img,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return canvas.toDataURL("image/webp", 0.85);
};

const ImageCropModal = ({
  src,
  aspect = 1,
  round = false,
  maxSize = 800,
  title = "Recadrer la photo",
  onCancel,
  onConfirm,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState(null);
  const [busy, setBusy] = useState(false);

  const onCropComplete = useCallback((_, pixels) => setArea(pixels), []);

  const confirm = async () => {
    if (!area) return;
    setBusy(true);
    try {
      onConfirm(await cropImage(src, area, maxSize));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="font-serif text-lg text-[#1a365d]">{title}</h2>
          <button type="button" onClick={onCancel} aria-label="Fermer">
            <X size={20} className="text-[#5c7188]" />
          </button>
        </div>

        <div className="relative h-80 bg-[#1a1a1a]">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            minZoom={1}
            maxZoom={4}
            aspect={aspect}
            cropShape={round ? "round" : "rect"}
            showGrid={!round}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <ZoomOut size={16} className="text-[#5c7188]" />
          <input
            type="range"
            min={1}
            max={4}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-[#f5a623]"
            aria-label="Zoom"
          />
          <ZoomIn size={16} className="text-[#5c7188]" />
        </div>

        <div className="flex justify-end gap-3 border-t border-[#edf2f7] px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#dfe7ef] px-4 py-2.5 text-sm font-semibold text-[#1e3a5f]"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={busy || !area}
            className="rounded-xl bg-[#f5a623] px-4 py-2.5 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f4b644] disabled:opacity-50"
          >
            {busy ? "Traitement…" : "Valider"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;

/**
 * Champ d'upload + recadrage réutilisable.
 * Usage : <ImageCropInput aspect={1} onChange={setUrl}>{children cliquables}</ImageCropInput>
 */
export const ImageCropInput = ({
  aspect = 1,
  round = false,
  maxSize = 800,
  onChange,
  className = "",
  children,
}) => {
  const [pending, setPending] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // permet de re-choisir le même fichier
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPending(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label className={`cursor-pointer ${className}`}>
        {children}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </label>
      {pending && (
        <ImageCropModal
          src={pending}
          aspect={aspect}
          round={round}
          maxSize={maxSize}
          onCancel={() => setPending(null)}
          onConfirm={(url) => {
            onChange(url);
            setPending(null);
          }}
        />
      )}
    </>
  );
};
