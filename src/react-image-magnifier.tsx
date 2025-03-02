"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import ImageMagnifier from "./simple-image-magnifier"

type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down"

interface ReactImageMagnifierProps {
  srcPreview: string
  srcOriginal: string
  width?: number | string
  height?: number | string
  className?: string
  objectFit?: ObjectFit
}

const ReactImageMagnifier: React.FC<ReactImageMagnifierProps> = ({
  srcPreview,
  srcOriginal,
  width = 400,
  height = 600,
  className = "",
  objectFit = "cover",
}) => {
  const [isOriginalLoaded, setIsOriginalLoaded] = useState<boolean>(false)

  const container = useRef<HTMLDivElement>(null)
  const imgPreview = useRef<HTMLImageElement>(null)
  const imgOriginal = useRef<HTMLImageElement>(null)
  const refreshImage = useRef<() => void>(() => {})

  const handleOriginalImageLoad = useCallback(() => {
    setIsOriginalLoaded(true)
  }, [])

  const handleOriginalImageError = useCallback(() => {
    setIsOriginalLoaded(false)
    console.error("Failed to load original image:", srcOriginal)
  }, [srcOriginal])

  const setupImageMagnifier = useCallback(() => {
    if (
      container.current &&
      imgPreview.current &&
      imgOriginal.current &&
      isOriginalLoaded
    ) {
      refreshImage.current = ImageMagnifier(
        container.current as HTMLDivElement,
        imgPreview.current as HTMLImageElement,
        imgOriginal.current as HTMLImageElement
      )
    }
  }, [isOriginalLoaded])

  useEffect(() => {
    setupImageMagnifier()
  }, [setupImageMagnifier])

  useEffect(() => {
    const originalImage = imgOriginal.current

    if (originalImage) {
      originalImage.addEventListener("load", handleOriginalImageLoad)
      originalImage.addEventListener("error", handleOriginalImageError)
    }
    return () => {
      if (originalImage) {
        originalImage.removeEventListener("load", handleOriginalImageLoad)
        originalImage.removeEventListener("error", handleOriginalImageError)
      }
    }
  }, [handleOriginalImageLoad, handleOriginalImageError])

  useEffect(() => {
    refreshImage.current()
  }, [srcOriginal, srcPreview, width, height])

  return (
    <div
      ref={container}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        width: typeof width === "number" ? width + "px" : width ?? "100%",
        height: typeof height === "number" ? height + "px" : width ?? "100%",
      }}
    >
      <img
        ref={imgPreview}
        src={srcPreview}
        alt="Preview"
        style={{
          position: "relative",
          zIndex: "1",
          objectFit: objectFit ?? "cover",
          width: "100%",
          height: "100%",
          transitionProperty: "opacity",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "300ms",
        }}
      />
      <img
        ref={imgOriginal}
        src={srcOriginal}
        alt="Original"
        style={{ position: "absolute", maxWidth: "none", opacity: 0 }}
      />

      {!isOriginalLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            backgroundColor: "rgba(107 114 128 / 0.5)",
          }}
        >
          &#9201;
        </div>
      )}
    </div>
  )
}

export default ReactImageMagnifier
