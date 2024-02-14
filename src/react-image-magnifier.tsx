'use client'

import ImageMagnifier from './simple-image-magnifier'
import React from 'react'

interface ReactImageMagnifierProps {
    srcPreview: string
    srcOriginal: string
    width?: number | string
    height?: number | string
    className?: string
}

const ReactImageMagnifier: React.FC<ReactImageMagnifierProps> = ({
    srcPreview,
    srcOriginal,
    width = 400,
    height = 600,
    className = '',
}) => {
    const container = React.useRef<HTMLDivElement>(null)
    const imgPreview = React.useRef<HTMLImageElement>(null)
    const imgOriginal = React.useRef<HTMLImageElement>(null)
    const refreshImage = React.useRef<() => void>(() => {})

    React.useEffect(() => {
        if (container.current && imgPreview.current && imgOriginal.current) {
            refreshImage.current = ImageMagnifier(container.current, imgPreview.current, imgOriginal.current)
        }
    }, [])

    React.useEffect(() => {
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
