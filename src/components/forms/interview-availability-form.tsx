import type { FormData, FormErrors } from "../../types/types"
import Input from "../ui/input"
import Dropdown from "../ui/dropdown"

interface InterviewAvailabilityFormProps {
  formData: FormData
  updateFormData: (section: keyof FormData, data: any) => void
  errors: FormErrors
  updateErrors: (errors: FormErrors) => void
}

const TIME_ZONES = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:00",
  "UTC-08:00",
  "UTC-07:00",
  "UTC-06:00",
  "UTC-05:00",
  "UTC-04:00",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+04:00",
  "UTC+05:00",
  "UTC+05:30 (IST)",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
]

const INTERVIEW_MEDIUMS = [
  "Video Call (Zoom)",
  "Video Call (Google Meet)",
  "Video Call (Microsoft Teams)",
  "Phone Call",
  "In-Person",
  "Other",
]

export default function InterviewAvailabilityForm({
  formData,
  updateFormData,
  errors,
}: InterviewAvailabilityFormProps) {
  const handleChange = (field: string, value: string) => {
    updateFormData("interviewAvailability", { [field]: value })
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center opacity-60">Interview Availability</h2>


      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> All fields in this section are mandatory. Please ensure you provide accurate
          information for scheduling your interview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Input
            id="interviewEmail"
            label="Email"
            required={true}
            value={formData.interviewAvailability.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.interviewEmail ? "border-red-500" : ""}
            placeholder="Enter your email for interview"
          />
          {errors.interviewEmail && <p className="text-sm text-red-500">{errors.interviewEmail}</p>}
        </div>

        <div className="space-y-2">
          <Input
            id="location"
            label="Location"
            required={true}
            value={formData.interviewAvailability.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className={errors.location ? "border-red-500" : ""}
            placeholder="Enter your location"
          />
          {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
        </div>

        <div className="space-y-2">
          <Input
            id="interviewDate"
            type="date"
            label="Interview Date"
            required={true}
            value={formData.interviewAvailability.interviewDate}
            onChange={(e) => handleChange("interviewDate", e.target.value)}
            className={errors.interviewDate ? "border-red-500" : ""}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.interviewDate && <p className="text-sm text-red-500">{errors.interviewDate}</p>}
        </div>

        <div className="space-y-2">
          <Input
            id="interviewTime"
            type="time"
            label="Interview Time"
            required={true}
            value={formData.interviewAvailability.interviewTime}
            onChange={(e) => handleChange("interviewTime", e.target.value)}
            className={errors.interviewTime ? "border-red-500" : ""}
          />
          {errors.interviewTime && <p className="text-sm text-red-500">{errors.interviewTime}</p>}
        </div>

        <div className="space-y-2">
          <Dropdown
            label="Time Zone"
            required={true}
            value={formData.interviewAvailability.timeZone}
            onChange={(value) => handleChange("timeZone", Array.isArray(value) ? value[0] || '' : value || '')}
            options={TIME_ZONES.map((tz) => ({ value: tz, label: tz }))}
          />
          {errors.timeZone && <p className="text-sm text-red-500">{errors.timeZone}</p>}
        </div>

        <div className="space-y-2">
          <Dropdown
            label="Interview Medium"
            required={true}
            value={formData.interviewAvailability.interviewMedium}
            onChange={(value) => handleChange("interviewMedium", Array.isArray(value) ? value[0] || '' : value || '')}
            options={INTERVIEW_MEDIUMS.map((medium) => ({ value: medium, label: medium }))}
          />
          {errors.interviewMedium && <p className="text-sm text-red-500">{errors.interviewMedium}</p>}
        </div>
      </div>

    </div>
  )
}
