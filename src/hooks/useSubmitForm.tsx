export const useSubmitForm = (formData: any, validateCurrentStep: () => boolean, setIsSubmitting: (isSubmitting: boolean) => void) => {

 const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    try {
      const q3Array = formData.statementOfPurpose.q3.split(',').map((item: string) => item.trim()).filter((item: string) => item.length > 0)

      const payload = {
        ...formData,
        statementOfPurpose: {
          ...formData.statementOfPurpose,
          q3: q3Array
        },
        submittedAt: new Date().toISOString(),
      }

      const response = await fetch("https://assessments-xhy0.onrender.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        alert("Form submitted successfully!")
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit }
}