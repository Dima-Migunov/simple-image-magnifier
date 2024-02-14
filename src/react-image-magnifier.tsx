'use client'

import ImageMagnifier from './simple-image-magnifier'
import { useEffect, useRef } from 'react'

function ReactImageMagnifier({
    width = 400,
    height = 600,
    srcPreview,
    srcOriginal,
    className = '',
}: {
    width?: number | string
    height?: number | string
    srcPreview: string
    srcOriginal: string
    className?: string
}) {
    const container = useRef<HTMLDivElement>(null)
    const imgPreview = useRef<HTMLImageElement>(null)
    const imgOriginal = useRef<HTMLImageElement>(null)
    const refreshImage = useRef<() => void>(() => {})

    useEffect(() => {
        if (container.current && imgPreview.current && imgOriginal.current) {
            refreshImage.current = ImageMagnifier(container.current, imgPreview.current, imgOriginal.current)
        }
    }, [])

    useEffect(() => {
        refreshImage.current()
    }, [srcOriginal, srcPreview, width, height])

    return (
        <div
            ref={container}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: width ? width + 'px' : '100%',
                height: height ? height + 'px' : '100%',
            }}
        >
            <img
                ref={imgPreview}
                src={srcPreview}
                alt=''
                style={{
                    position: 'relative',
                    zIndex: '1',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    transitionProperty: 'opacity',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDuration: '300ms',
                }}
            />
            <img ref={imgOriginal} src={srcOriginal} alt='' style={{ position: 'absolute', maxWidth: 'none' }} />
        </div>
    )
}

export default ReactImageMagnifier
