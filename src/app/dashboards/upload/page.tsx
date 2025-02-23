"use client"

import { useState, useCallback } from "react"
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
import React from "react"

interface FileUploadProps {
    onUpload?: (file: File, type: string) => void | Promise<void>
    maxSizeMB?: number
    allowedTypes?: string[]
}

export default function FileUpload({
    onUpload,
    maxSizeMB = 5,
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [imageType, setImageType] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)

    // Cleanup function for the preview URL
    const cleanupPreview = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    const validateFile = (file: File): string | null => {
        if (!allowedTypes.includes(file.type)) {
            return 'Please upload a valid image file (JPEG, PNG, GIF, or SVG).'
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            return `Please upload an image smaller than ${maxSizeMB}MB.`
        }
        return null
    }

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const error = validateFile(file)
        if (error) {
            toast.error('Invalid file', { description: error })
            event.target.value = '' // Reset input
            return
        }

        cleanupPreview() // Cleanup previous preview
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
    }, [cleanupPreview, maxSizeMB, allowedTypes])

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const file = event.dataTransfer.files[0]
        if (!file) return

        const error = validateFile(file)
        if (error) {
            toast.error('Invalid file', { description: error })
            return
        }

        cleanupPreview() // Cleanup previous preview
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
    }, [cleanupPreview, maxSizeMB, allowedTypes])

    const handleUpload = async () => {
        if (!selectedFile || !imageType) {
            toast.error('Missing information', {
                description: 'Please select both an image and image type.',
            })
            return
        }

        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append('type', imageType)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            await response.json()

            // Call the onUpload callback if provided
            if (onUpload) {
                await onUpload(selectedFile, imageType)
            }

            // Clear the form
            handleClear()
            toast.success('Image uploaded successfully')
        } catch (error) {
            toast.error('Failed to upload image', {
                description: error instanceof Error ? error.message : 'Unknown error occurred',
            })
        } finally {
            setIsUploading(false)
        }
    }

    const handleClear = useCallback(() => {
        cleanupPreview()
        setSelectedFile(null)
        setPreviewUrl(null)
        setImageType("")
    }, [cleanupPreview])

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            cleanupPreview()
        }
    }, [cleanupPreview])

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

            <Select value={imageType} onValueChange={setImageType}>
                <SelectTrigger>
                    <SelectValue placeholder="Select image type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="xray">X-Ray</SelectItem>
                    <SelectItem value="lab-report">Lab Report</SelectItem>
                </SelectContent>
            </Select>

            <div
                className="border-2 border-dashed border-muted rounded-lg p-4 transition-colors hover:border-muted-foreground/50"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                role="button"
                tabIndex={0}
                aria-label="Upload area"
            >
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
                                aria-label="Clear selection"
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
                                SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                            accept={allowedTypes.join(',')}
                        />
                    </label>
                )}
            </div>

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