import { useState } from 'react'
import Topbar from './components/topbar/topbar'
import Bottombar from './components/bottombar/bottombar'
import BasicDetailsForm from './components/forms/basic-details-form'
import type { FormErrors, FormData } from './types/types'
import DocumentCollectionForm from './components/forms/document-collection-form'
import StatementOfPurposeForm from './components/forms/statement-of-purpose-form'
import InterviewAvailabilityForm from './components/forms/interview-availability-form'
import { useSubmitForm } from './hooks/useSubmitForm'
export const STEPS = [
  { id: 1, title: "Basic Details", component: BasicDetailsForm },
  { id: 2, title: "Document Collection", component: DocumentCollectionForm },
  { id: 3, title: "Statement of Purpose", component: StatementOfPurposeForm },
  { id: 4, title: "Interview Availability", component: InterviewAvailabilityForm },
]

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    basicDetails: {
      name: "",
      email: "",
      mobileNumber: "",
      dateOfBirth: "",
    },
    documents: {
      class10Marksheet: "",
      class12Marksheet: "",
      graduationMarksheet: "",
      postGraduationMarksheet: "",
      resume: "",
      recommendationLetter: "",
      salarySlips: "",
      others: "",
    },
    statementOfPurpose: {
      q1: "",
      q2: "",
      q3: "",
    },
    interviewAvailability: {
      email: "",
      location: "",
      interviewDate: "",
      interviewTime: "",
      timeZone: "",
      interviewMedium: "",
    },
  })

  console.log("formData", formData)
  const [errors, setErrors] = useState<FormErrors>({})

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...data } }))
  }

  const updateErrors = (newErrors: FormErrors) => {
    setErrors(newErrors)
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const validateCurrentStep = (): boolean => {
    const currentErrors: FormErrors = {}

    switch (currentStep) {
      case 1:
        if (!formData.basicDetails.name.trim()) {
          currentErrors.name = "Name is required"
        }
        if (!formData.basicDetails.email.trim()) {
          currentErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.basicDetails.email)) {
          currentErrors.email = "Email is invalid"
        }
        if (!formData.basicDetails.mobileNumber.trim()) {
          currentErrors.mobileNumber = "Mobile number is required"
        }
        if (!formData.basicDetails.dateOfBirth) {
          currentErrors.dateOfBirth = "Date of birth is required"
        }
        break

      case 2:
        if (!formData.documents.class10Marksheet) {
          currentErrors.class10Marksheet = "Class 10 Marksheet is required"
        }
        if (!formData.documents.class12Marksheet) {
          currentErrors.class12Marksheet = "Class 12 Marksheet is required"
        }
        if (!formData.documents.graduationMarksheet) {
          currentErrors.graduationMarksheet = "Graduation Marksheet is required"
        }
        if (!formData.documents.resume) {
          currentErrors.resume = "Resume/CV is required"
        }
        break

      case 3:
        if (!formData.statementOfPurpose.q1.trim()) {
          currentErrors.q1 = "This answer is required"
        } else if (formData.statementOfPurpose.q1.split(" ").length > 300) {
          currentErrors.q1 = "Answer must be within 300 words"
        }
        if (!formData.statementOfPurpose.q2.trim()) {
          currentErrors.q2 = "This answer is required"
        } else if (formData.statementOfPurpose.q2.split(" ").length > 300) {
          currentErrors.q2 = "Answer must be within 300 words"
        }
        if (!formData.statementOfPurpose.q3.trim()) {
          currentErrors.q3 = "This answer is required"
        } else if (formData.statementOfPurpose.q3.split(" ").length > 300) {
          currentErrors.q3 = "Answer must be within 300 words"
        }
        break

      case 4:
        if (!formData.interviewAvailability.email.trim()) {
          currentErrors.interviewEmail = "Email is required"
        }
        if (!formData.interviewAvailability.location.trim()) {
          currentErrors.location = "Location is required"
        }
        if (!formData.interviewAvailability.interviewDate) {
          currentErrors.interviewDate = "Interview date is required"
        }
        if (!formData.interviewAvailability.interviewTime) {
          currentErrors.interviewTime = "Interview time is required"
        }
        if (!formData.interviewAvailability.timeZone) {
          currentErrors.timeZone = "Time zone is required"
        }
        if (!formData.interviewAvailability.interviewMedium) {
          currentErrors.interviewMedium = "Interview medium is required"
        }
        break
    }

    setErrors(currentErrors)
    return Object.keys(currentErrors).length === 0
  }

  const { handleSubmit } = useSubmitForm(formData, validateCurrentStep, setIsSubmitting)

  const CurrentStepComponent = STEPS[currentStep - 1]?.component

  // const handleSubmit = async () => {
  //   if (!validateCurrentStep()) return

  //   setIsSubmitting(true)
  //   try {
  //     const q3Array = formData.statementOfPurpose.q3.split(',').map((item: string) => item.trim()).filter((item: string) => item.length > 0)

  //     const payload = {
  //       ...formData,
  //       statementOfPurpose: {
  //         ...formData.statementOfPurpose,
  //         q3: q3Array
  //       },
  //       submittedAt: new Date().toISOString(),
  //     }

  //     const response = await fetch("https://assessments-xhy0.onrender.com/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     })

  //     if (response.ok) {
  //       alert("Form submitted successfully!")
  //     } else {
  //       throw new Error("Failed to submit form")
  //     }
  //   } catch (error) {
  //     console.error("Submission error:", error)
  //     alert("Failed to submit form. Please try again.")
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Topbar currentStep={currentStep} />
      <div className='flex flex-1 my-24 overflow-auto items-center justify-center'>
        {typeof CurrentStepComponent === 'function' ? (
          <CurrentStepComponent formData={formData} updateFormData={updateFormData} errors={errors} updateErrors={updateErrors} />
        ) : (
          CurrentStepComponent
        )}
      </div>
      <Bottombar currentStep={currentStep} isSubmitting={isSubmitting} handleSubmit={handleSubmit} handleNext={handleNext} handlePrevious={handlePrevious} />
    </div>
  )
}

export default App
