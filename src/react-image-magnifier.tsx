"use client"

import ImageMagnifier from "./simple-image-magnifier"
import React, { useEffect, useRef } from "react"

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
  const container = useRef<HTMLDivElement>(null)
  const imgPreview = useRef<HTMLImageElement>(null)
  const imgOriginal = useRef<HTMLImageElement>(null)
  const refreshImage = useRef<() => void>(() => {})

  const showImageMagnifier = async () => {
    if (container.current && imgPreview.current && imgOriginal.current) {
      imgOriginal.current.onload = () => {
        refreshImage.current = ImageMagnifier(
          container.current as HTMLDivElement,
          imgPreview.current as HTMLImageElement,
          imgOriginal.current as HTMLImageElement
        )
      }

      return
    }

    setTimeout(showImageMagnifier, 200)
  }

  useEffect(() => {
    showImageMagnifier()
  }, [])

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
        width: width ? width + "px" : "100%",
        height: height ? height + "px" : "100%",
      }}
    >
      <img
        ref={imgPreview}
        src={srcPreview}
        alt=""
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
        alt=""
        style={{ position: "absolute", maxWidth: "none" }}
      />
    </div>
  )
}

export default ReactImageMagnifier
