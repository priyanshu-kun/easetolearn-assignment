import { Loader2 } from "lucide-react"
import type { Documents, FormData, FormErrors } from "../../types/types"
import Upload from "../ui/upload"
import { useUploadFile } from "../../hooks/useUploadFile"
interface DocumentCollectionFormProps {
    formData: FormData
    updateFormData: (section: keyof FormData, data: any) => void
    errors: FormErrors
    updateErrors: (errors: FormErrors) => void
}

const DOCUMENT_FIELDS = [
    { key: "class10Marksheet", label: "Class 10 Marksheet", required: true },
    { key: "class12Marksheet", label: "Class 12 Marksheet", required: true },
    { key: "graduationMarksheet", label: "Graduation Marksheet", required: true },
    { key: "postGraduationMarksheet", label: "Post Graduation Marksheet", required: false },
    { key: "resume", label: "Resume/CV", required: true },
    { key: "recommendationLetter", label: "Recommendation Letter", required: false },
    { key: "salarySlips", label: "Salary Slips", required: false },
    { key: "others", label: "Others", required: false },
]

export default function DocumentCollectionForm({ formData, updateFormData, errors }: DocumentCollectionFormProps) {
    const { handleFileChange, uploading, removeFile } = useUploadFile(updateFormData)

    console.log("uploadedFiles", formData.documents)

    return (
        <div className="space-y-6">

            <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center opacity-60">Document Collection</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DOCUMENT_FIELDS.map((field) => (
                    <div key={field.key} className="space-y-2">

                        {
                            uploading[field.key] ? (
                                <div className="flex items-center  h-full justify-center">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            ) : (
                                <Upload
                                    label={field.label}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    required={field.required}
                                    onFileSelect={(files) => handleFileChange(field.key, files[0] || null)}
                                    onFileRemove={() => removeFile(field.key)}
                                    uploadedFile={formData.documents[field.key as keyof Documents]}
                                />
                            )
                        }

                        {errors[field.key] && <p className="text-sm text-red-500">{errors[field.key]}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}
