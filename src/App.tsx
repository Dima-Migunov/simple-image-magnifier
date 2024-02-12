import ImageMagnifier from './image-magnifier'
import imagePreview from './assets/image-preview.jpg'
import imageOriginal from './assets/image-original.jpg'
import { useEffect } from 'react'

function App() {
    useEffect(() => {
        ImageMagnifier('.preview-box', '.image-preview', '.image-original')
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='preview-box w-[400px] h-[600px] bg-gray-200 relative overflow-hidden'>
                <img
                    src={imagePreview}
                    alt=''
                    className='w-full h-full object-cover image-preview transition relative z-10'
                />
                <img src={imageOriginal} alt='' className='absolute image-original max-w-none' />
            </div>
        </div>
    )
}

export default App
