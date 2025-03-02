export default function SimpleImageMagnifier(
  containerElement: string | HTMLElement,
  imageElement: string | HTMLImageElement,
  imageOriginalElement: string | HTMLImageElement
): () => void {
  // Helper function to get an element, throwing an error if not found.
  const getElement = <T extends HTMLElement>(
    selectorOrElement: string | T,
    context?: HTMLElement
  ): T => {
    const element =
      typeof selectorOrElement === "string"
        ? (context || document).querySelector(selectorOrElement)
        : selectorOrElement

    if (!element) {
      throw new Error(
        `Element ${
          typeof selectorOrElement === "string"
            ? `with selector '${selectorOrElement}'`
            : "is"
        } not found`
      )
    }
    return element as T
  }

  const previewBoxEl = getElement<HTMLElement>(containerElement)
  const imageEl = getElement<HTMLImageElement>(imageElement, previewBoxEl)

  const imageOriginalEl = getElement<HTMLImageElement>(
    imageOriginalElement,
    previewBoxEl
  )

  let zoomW: number = 1
  let zoomH: number = 1

  const refreshImage = () => {
    if (!imageOriginalEl) {
      return
    }

    imageOriginalEl.style.width = imageOriginalEl.naturalWidth + "px"
    imageOriginalEl.style.height = imageOriginalEl.naturalHeight + "px"

    zoomW = imageOriginalEl.naturalWidth / previewBoxEl.clientWidth - 1
    zoomH = imageOriginalEl.naturalHeight / previewBoxEl.clientHeight - 1
  }

  const handleMouseEnter = () => {
    imageEl.style.opacity = "0"
    imageOriginalEl.style.opacity = "1"
  }

  const handleMouseLeave = () => {
    imageEl.style.opacity = "1"
    imageOriginalEl.style.opacity = "0"
  }

  const handleMouseMove = (e: MouseEvent) => {
    imageOriginalEl.style.top = `${-e.offsetY * zoomH}px`
    imageOriginalEl.style.left = `${-e.offsetX * zoomW}px`
  }

  const addEvents = () => {
    imageOriginalEl.addEventListener("load", refreshImage)
    previewBoxEl.addEventListener("mouseenter", handleMouseEnter)
    previewBoxEl.addEventListener("mouseleave", handleMouseLeave)
    previewBoxEl.addEventListener("mousemove", handleMouseMove)
  }

  addEvents()
  refreshImage()

  return refreshImage
}
