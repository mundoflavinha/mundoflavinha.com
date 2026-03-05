import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
} from "react";
import { Button } from "../ui/button";
import { uploadCmsImage } from "../../lib/supabase";

interface ImageCropUploaderProps {
  accessToken: string | null;
  currentUrl?: string;
  folder: string;
  aspectRatio: number;
  recommendedSize: string;
  onUploaded: (url: string) => void;
}

const controlLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b665d]";

const hiddenCanvasStyle: CSSProperties = {
  position: "absolute",
  width: 0,
  height: 0,
  overflow: "hidden",
  pointerEvents: "none",
  opacity: 0,
};

export default function ImageCropUploader({
  accessToken,
  currentUrl,
  folder,
  aspectRatio,
  recommendedSize,
  onUploaded,
}: ImageCropUploaderProps) {
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [sourceFilename, setSourceFilename] = useState("upload.jpg");
  const [zoom, setZoom] = useState(1.12);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const outputSize = useMemo(() => {
    const width = 1200;
    const height = Math.round(width / aspectRatio);
    return { width, height };
  }, [aspectRatio]);

  const drawImageToCanvas = useCallback(() => {
    const image = imageRef.current;
    const canvas = previewCanvasRef.current;
    if (!image || !canvas) return;

    const width = outputSize.width;
    const height = outputSize.height;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f5f1eb";
    ctx.fillRect(0, 0, width, height);

    const baseScale = Math.max(width / image.width, height / image.height);
    ctx.save();
    ctx.translate(width / 2 + offsetX, height / 2 + offsetY);
    ctx.rotate((rotationDeg * Math.PI) / 180);
    ctx.scale((flipX ? -1 : 1) * zoom * baseScale, (flipY ? -1 : 1) * zoom * baseScale);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
  }, [flipX, flipY, offsetX, offsetY, outputSize.height, outputSize.width, rotationDeg, zoom]);

  useEffect(() => {
    if (!sourceDataUrl) {
      imageRef.current = null;
      const canvas = previewCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      return;
    }

    let revoked = false;
    const image = new Image();
    image.onload = () => {
      if (revoked) return;
      imageRef.current = image;
      drawImageToCanvas();
    };
    image.src = sourceDataUrl;

    return () => {
      revoked = true;
    };
  }, [drawImageToCanvas, sourceDataUrl]);

  useEffect(() => {
    drawImageToCanvas();
  }, [drawImageToCanvas]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");

    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Selecione apenas arquivos de imagem.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : null;
      setSourceDataUrl(value);
      setSourceFilename(file.name);
      setZoom(1.12);
      setRotationDeg(0);
      setOffsetX(0);
      setOffsetY(0);
      setFlipX(false);
      setFlipY(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!accessToken) {
      setErrorMessage("Sessao expirada. Faca login novamente.");
      return;
    }

    const previewCanvas = previewCanvasRef.current;
    const exportCanvas = exportCanvasRef.current;
    if (!previewCanvas || !exportCanvas) {
      setErrorMessage("Nao foi possivel preparar a imagem.");
      return;
    }

    exportCanvas.width = previewCanvas.width;
    exportCanvas.height = previewCanvas.height;

    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) {
      setErrorMessage("Nao foi possivel preparar a imagem para upload.");
      return;
    }

    exportCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportCtx.drawImage(previewCanvas, 0, 0);

    setIsUploading(true);
    setErrorMessage("");

    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        exportCanvas.toBlob(
          (value) => {
            if (!value) {
              reject(new Error("Falha ao converter imagem para upload."));
              return;
            }
            resolve(value);
          },
          "image/jpeg",
          0.92,
        );
      });

      const imageUrl = await uploadCmsImage(accessToken, blob, {
        folder,
        filename: sourceFilename,
      });

      onUploaded(imageUrl);
      setSourceDataUrl(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao enviar imagem.";
      setErrorMessage(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-[#efe7e0] bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b665d]">
          Upload com crop
        </p>
        <p className="text-xs text-slate-500">Tamanho recomendado: {recommendedSize}</p>
      </div>

      <input
        accept="image/*"
        className="block w-full cursor-pointer text-sm text-slate-700 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#eb7a91] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#df6d86]"
        onChange={handleFileChange}
        type="file"
      />

      {sourceDataUrl ? (
        <div className="space-y-3 rounded-2xl border border-[#ece3db] bg-[#faf7f3] p-3">
          <div
            className="overflow-hidden rounded-xl border border-[#e5ddd6] bg-[#f5f1eb]"
            style={{ aspectRatio: `${outputSize.width} / ${outputSize.height}` }}
          >
            <canvas
              className="h-full w-full object-cover"
              ref={previewCanvasRef}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className={controlLabelClass}>Zoom</span>
              <input
                className="w-full"
                max={3}
                min={0.8}
                onChange={(event) => setZoom(Number(event.target.value))}
                step={0.01}
                type="range"
                value={zoom}
              />
            </label>
            <label className="space-y-1">
              <span className={controlLabelClass}>Rotacao</span>
              <input
                className="w-full"
                max={180}
                min={-180}
                onChange={(event) => setRotationDeg(Number(event.target.value))}
                step={1}
                type="range"
                value={rotationDeg}
              />
            </label>
            <label className="space-y-1">
              <span className={controlLabelClass}>Posicao X</span>
              <input
                className="w-full"
                max={480}
                min={-480}
                onChange={(event) => setOffsetX(Number(event.target.value))}
                step={1}
                type="range"
                value={offsetX}
              />
            </label>
            <label className="space-y-1">
              <span className={controlLabelClass}>Posicao Y</span>
              <input
                className="w-full"
                max={480}
                min={-480}
                onChange={(event) => setOffsetY(Number(event.target.value))}
                step={1}
                type="range"
                value={offsetY}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
              onClick={() => setFlipX((current) => !current)}
              type="button"
              variant="outline"
            >
              {flipX ? "Desfazer espelho horizontal" : "Espelhar horizontal"}
            </Button>
            <Button
              className="h-9 rounded-full border border-[#d7cec6] bg-white px-4 text-[#231814] hover:bg-[#f7f4f1]"
              onClick={() => setFlipY((current) => !current)}
              type="button"
              variant="outline"
            >
              {flipY ? "Desfazer espelho vertical" : "Espelhar vertical"}
            </Button>
            <Button
              className="h-9 rounded-full bg-[#eb7a91] px-4 text-white hover:bg-[#df6d86]"
              disabled={isUploading}
              onClick={handleUpload}
              type="button"
            >
              {isUploading ? "Enviando..." : "Enviar imagem"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#e2d9d1] bg-[#faf7f3] px-3 py-3 text-xs text-slate-500">
          Selecione uma imagem para abrir o editor de crop e ajustes.
        </div>
      )}

      {currentUrl ? (
        <a
          className="inline-flex text-xs font-semibold text-[#eb7a91] underline-offset-4 hover:underline"
          href={currentUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Ver imagem atual
        </a>
      ) : null}

      {errorMessage ? (
        <p className="rounded-xl border border-[#f0c6cf] bg-[#fff3f6] px-3 py-2 text-sm text-[#9f2146]">
          {errorMessage}
        </p>
      ) : null}

      <canvas ref={exportCanvasRef} style={hiddenCanvasStyle} />
    </div>
  );
}
