import { useState } from "react"

export const useUploadFile = (updateFormData: any) => {
    const [uploading, setUploading] = useState<Record<string, boolean>>({})

     const handleFileChange = async (field: string, file: File | null) => {
        if (!file) {
            updateFormData("documents", { [field]: "" })
            return
        }

        setUploading((prev) => ({ ...prev, [field]: true }))

        try {
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("https://assessments-xhy0.onrender.com/upload-file", {
            method: "POST",
            body: formData,
          })

          if (response.ok) {
            const result = await response.json()
            updateFormData("documents", { [field]: result.url })
          } else {
            throw new Error("Upload failed")
          }
        } catch (error) {
          console.error("Upload error:", error)
          alert("Failed to upload file. Please try again.")
        } finally {
          setUploading((prev) => ({ ...prev, [field]: false }))
        }
    }

    const removeFile = (field: string) => {
        updateFormData("documents", { [field]: "" })
    }



    return { handleFileChange, uploading, removeFile }
}
    