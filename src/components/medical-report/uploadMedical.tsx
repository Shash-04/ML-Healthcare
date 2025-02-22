"use client"

import { useState } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { toast, Toaster } from 'sonner'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ImageUploadProps {
  onUpload?: (file: File, type: string) => void
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageType, setImageType] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', {
          description: 'Please upload an image file.',
        })
        return
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large', {
          description: 'Please upload an image smaller than 5MB.',
        })
        return
      }

      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !imageType) {
      toast.error('Missing information', {
        description: 'Please select both an image and image type.',
      })
      return
    }

    setIsUploading(true)

    const uploadPromise = new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', imageType)

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) throw new Error('Upload failed')
          return response.json()
        })
        .then(() => {
          // Clear the form
          setSelectedFile(null)
          setPreviewUrl(null)
          setImageType("")
          
          // Call the onUpload callback if provided
          if (onUpload) {
            onUpload(selectedFile, imageType)
          }
          resolve('Success')
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          setIsUploading(false)
        })
    })

    toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Image uploaded successfully',
      error: 'Failed to upload image',
    })
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setImageType("")
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Medical Image Upload</h2>
        <p className="text-sm text-muted-foreground text-center">
          Upload X-rays or Lab Reports for analysis
        </p>
      </div>

      {/* Image Type Selection */}
      <Select value={imageType} onValueChange={setImageType}>
        <SelectTrigger>
          <SelectValue placeholder="Select image type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="xray">X-Ray</SelectItem>
          <SelectItem value="lab-report">Lab Report</SelectItem>
        </SelectContent>
      </Select>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-muted rounded-lg p-4 transition-colors hover:border-muted-foreground/50">
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative aspect-video">
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-lg object-contain w-full h-full"
              />
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {selectedFile?.name}
            </p>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="flex flex-col items-center gap-1 p-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*"
            />
          </label>
        )}
      </div>

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        className="w-full"
        disabled={!selectedFile || !imageType || isUploading}
      >
        {isUploading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
            <span>Uploading...</span>
          </div>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </>
        )}
      </Button>
    </div>
  )
}