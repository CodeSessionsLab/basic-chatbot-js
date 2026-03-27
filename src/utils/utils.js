export function guardarArchivo(
  contenido,
  nombre = "archivo",
  extension = "md"
) {
  const mime =
    extension === "md"
      ? "text/markdown;charset=utf-8"
      : "text/plain;charset=utf-8";

  const blob = new Blob([contenido], { type: mime });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${nombre}.${extension}`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}
