import { useMemo, useCallback, CSSProperties } from "react";
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image'
import { IconButton } from "@mui/material";

interface Props {
  setValue: (arg1: "img", arg2: string) => void;
  watchImg?: string | Blob;
  text: string;
}

const MyDropzone = ({ setValue, watchImg, text }: Props) => {
  const onDrop = useCallback( (img: File[]) => {
    let reader = new FileReader();
    reader.onload = () => {
      setValue("img", reader.result as string)
    };
    reader.readAsDataURL(img[0])
  }, [setValue]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
    "image/jpeg": [".jpg", ".JPG", ".jpeg", ".JPEG"],
    "image/png": [".png", ".PNG"]
  }});

  const style = useMemo<CSSProperties>(() => ({
    // Base styles
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": "60px",
    "borderWidth": 2,
    "borderRadius": 2,
    "borderColor": '#ccc',
    "borderStyle": 'dashed',
    "backgroundColor": '#fafafa',
    "color": '#666',
    "outline": 'none',
    "transition": 'border .24s ease-in-out',
    // Dynamic styles
    ...(isFocused && {"borderColor": '#2196f3', "backgroundColor": '#f0f8ff'}),
    ...(isDragAccept && {"borderColor": '#00e676', "backgroundColor": '#f0fff0'}),
    ...(isDragReject && {"borderColor": '#ff1744', "backgroundColor": '#ffebee'}),
  }), [isFocused, isDragAccept, isDragReject]);

  const toBlob = (dataUrl: string | Blob) => {
    if (dataUrl && dataUrl instanceof Blob) {
      return dataUrl
    }
    const arr = dataUrl.split(',')
    const mimeMatch = arr[0].match(/:(.*?);/)
    if (!mimeMatch) {
      return null;
    }
    const mime = mimeMatch[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime})
  };

  const handleRemove = () => {
    setValue("img", "");
  };

  const Preview = () => {
    if (!watchImg) {
      return null;
    }
    const blobImg = toBlob(watchImg)
    if (!blobImg) {
      return null;
    }
    const url = URL.createObjectURL(blobImg);
    return (
      <div className="relative mx-auto inline-block">
        <Image src={url} alt="preview" className="file-preview shadow-md" width={200} height={200} />
        <IconButton className="absolute top-0 right-0 p-2" onClick={() => handleRemove()}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <>
      { watchImg ?
        <Preview/>:
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {isDragActive ?
            <p className="mb-4 text-lg text-center">Drop the files here ...</p> :
            <p className="mb-4 text-lg text-center">{text}</p>
          }
          <FileUploadIcon className="w-10 h-10 text-gray-600" />
        </div>
      }
    </>
  );
};

export default MyDropzone;
