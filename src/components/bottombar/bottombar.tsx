import Button from "../ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { STEPS } from "../../App"
function Bottombar({ currentStep, isSubmitting, handleSubmit, handleNext, handlePrevious }: { currentStep: number, isSubmitting: boolean, handleSubmit: () => void, handleNext: () => void, handlePrevious: () => void   }) {
  const progress = (currentStep / STEPS.length) * 100
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white flex justify-between items-center py-4 px-8  border-t border-gray-300">
        <Button disabled={currentStep === 1} onClick={handlePrevious} variant="secondary" size="md" leftIcon={<ChevronLeft className="w-5 h-5" />}>Previous</Button>    
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Step {currentStep} of {STEPS.length}
                </span>
                <span className="mx-4 opacity-50">/</span>
                <span><span className="text-sm text-blue-500">{Math.round(progress)}%</span> Complete</span>
              </div>
              {
                currentStep === STEPS.length ? (
                  <Button disabled={isSubmitting} onClick={handleSubmit} variant="primary" className="bg-green-500" size="md" rightIcon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}>{
                    isSubmitting ? "Submitting..." : "Submit"
                  }</Button>
                ) : (
                  <Button  onClick={handleNext} variant="primary" size="md" rightIcon={<ChevronRight className="w-5 h-5" />}>Next</Button>
                )
              }
    </div>
  )
}

export default Bottombar