export default function SimpleImageMagnifier(
  containerElement: string | HTMLElement,
  imageElement: string | HTMLImageElement,
  imageOriginalElement: string | HTMLImageElement
): () => void {
  let zoomW: number = 1
  let zoomH: number = 1

  const previewBoxEl: HTMLElement | HTMLDivElement | null =
    typeof containerElement == "string"
      ? document.querySelector(containerElement)
      : containerElement

  if (!previewBoxEl) {
    throw new Error("containerElement is not found")
  }

  const imageEl: HTMLImageElement | null =
    typeof imageElement == "string"
      ? previewBoxEl.querySelector(imageElement)
      : imageElement

  if (!imageEl) {
    throw new Error("imageElement is not found")
  }

  const imageOriginalEl: HTMLImageElement | null =
    typeof imageOriginalElement == "string"
      ? previewBoxEl.querySelector(imageOriginalElement)
      : imageOriginalElement

  if (!imageOriginalEl) {
    throw new Error("imageOriginalEl is not found")
  }

  const refreshImage = () => {
    if (!imageOriginalEl) {
      return
    }

    imageOriginalEl.style.width = imageOriginalEl.naturalWidth + "px"
    imageOriginalEl.style.height = imageOriginalEl.naturalHeight + "px"

    zoomW = imageOriginalEl.naturalWidth / previewBoxEl.clientWidth - 1
    zoomH = imageOriginalEl.naturalHeight / previewBoxEl.clientHeight - 1
  }

  const addEvents = () => {
    imageOriginalEl.addEventListener("load", refreshImage)

    previewBoxEl.addEventListener("mouseenter", () => {
      imageEl.style.opacity = "0"
    })

    previewBoxEl.addEventListener("mouseleave", () => {
      imageEl.style.opacity = "1"
    })

    previewBoxEl.addEventListener("mousemove", (e) => {
      imageOriginalEl.style.top = -e.offsetY * zoomH + "px"
      imageOriginalEl.style.left = -e.offsetX * zoomW + "px"
    })

    imageEl.addEventListener("mouseenter", () => {
      previewBoxEl.style.opacity = "0"
    })

    imageEl.addEventListener("mouseleave", () => {
      previewBoxEl.style.opacity = "1"
    })
  }

  addEvents()
  refreshImage()

  return refreshImage
}
