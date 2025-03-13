export const resizeProfileImage = (
    file: File,
    size = 256,
    quality = 0.8
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          if (!ctx) return reject(new Error("No se pudo obtener el contexto del canvas"));
  
          const sizeMin = Math.min(img.width, img.height);
          const startX = (img.width - sizeMin) / 2;
          const startY = (img.height - sizeMin) / 2;
  
          canvas.width = size;
          canvas.height = size;
  
          ctx.drawImage(img, startX, startY, sizeMin, sizeMin, 0, 0, size, size);
  
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
              } else {
                reject(new Error("No se pudo procesar la imagen"));
              }
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = reject;
      };
    });
  };
  