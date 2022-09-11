import { Flex, Image } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

interface ImageUploadProps {
  onInput: () => void
}

const ImageUpload: FC<ImageUploadProps> = ({ onInput }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleInput = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
    onInput(e.target.files[0])
  }

  return (
    <Flex gap={10}>
      <Image
        src={preview}
        width='250px'
        fallbackSrc='https://www.sarthakstudio.com/wp-content/plugins/ht-mega-for-elementor/assets/images/image-placeholder.png'
      />
      <input onInput={handleInput} type='file'></input>
    </Flex>
  )
}

export default ImageUpload
