import { ChevronRight, Check } from "lucide-react";
import { STEPS } from "../../App";


const Topbar = ({ currentStep }: { currentStep: number }) => {

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 border-b border-gray-300 py-4 bg-gray-50">
      <div className="flex justify-center ">
        {STEPS.map((step, index) => (
          <div key={step.id} className={`flex items-center ${index < STEPS.length - 1 ? "mr-4" : ""}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.id <= currentStep ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-600"
                }`}
            >
              {
                step.id <= currentStep ? <Check className="w-4 h-4" /> : step.id
              }
            </div>
            <span className={`ml-2 text-sm ${step.id <= currentStep ? "text-blue-400" : "text-gray-500"}`}>
              {step.title}
            </span>
            {index < STEPS.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
          </div>
        ))}
      </div>
    </div>

  );
};

export default Topbar;