import type { FormData, FormErrors } from "../../types/types"
import Input from "../ui/input"

interface BasicDetailsFormProps {
    formData: FormData
    updateFormData: (section: keyof FormData, data: any) => void
    errors: FormErrors
    updateErrors: (errors: FormErrors) => void
}

export default function BasicDetailsForm({ formData, updateFormData, errors }: BasicDetailsFormProps) {
    const handleChange = (field: string, value: string) => {
        updateFormData("basicDetails", { [field]: value })
    }

    return (
        <div className="space-y-6 w-[30%]">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center opacity-60">Basic Details</h2>
            <div className="grid grid-cols-1 w-full md:grid-cols-1 gap-6">
                <div className="space-y-2">
                    <Input
                        id="name"
                        label="Name"
                        required={true}
                        value={formData.basicDetails.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Input
                        id="email"
                        label="Email"
                        required={true}
                        value={formData.basicDetails.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Input
                        id="mobileNumber"
                        label="Mobile"
                        value={formData.basicDetails.mobileNumber}
                        onChange={(e) => handleChange("mobileNumber", e.target.value)}
                        placeholder="Enter your mobile number"
                    />
                </div>

                <div className="space-y-2">

                    <Input
                        id="dateOfBirth"
                        type="date"
                        label="Date of Birth"
                        value={formData.basicDetails.dateOfBirth}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                        placeholder="Select your date of birth"
                    />
                </div>
            </div>
        </div>
    )
}
