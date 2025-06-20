"use client"

import type { FormData, FormErrors } from "../../types/types"
import Input from "../ui/input"

interface StatementOfPurposeFormProps {
    formData: FormData
    updateFormData: (section: keyof FormData, data: any) => void
    errors: FormErrors
    updateErrors: (errors: FormErrors) => void
}

const QUESTIONS = [
    {
        key: "q1",
        text: "Tell me about a time you were asked to do something you had never done before. How did you react? What did you learn?",
    },
    {
        key: "q2",
        text: "Tell me about the last time something significant didn't go according to plan at work. What was your role? What was the outcome?",
    },
    {
        key: "q3",
        text: "What are the three things that are most important to you in a job?",
    },
]

export default function StatementOfPurposeForm({ formData, updateFormData, errors }: StatementOfPurposeFormProps) {
    const handleChange = (field: string, value: string) => {
        updateFormData("statementOfPurpose", { [field]: value })
    }

    const getWordCount = (text: string) => {
        return text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length
    }

    return (
        <div className="space-y-8">

            <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center opacity-60">Statement of Purpose</h2>


            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> All questions are mandatory and each answer must be within 300 words.
                </p>
            </div>

            {QUESTIONS.map((question, index) => {
                const fieldValue = formData.statementOfPurpose[question.key as keyof typeof formData.statementOfPurpose]
                const wordCount = getWordCount(fieldValue)
                const isOverLimit = wordCount > 300

                return (
                    <div key={question.key} className="">
                        <Input
                            value={fieldValue}
                            label={`Question ${index + 1}`}
                            inputType="textarea"
                            required={true}
                            onChange={(e: any) => handleChange(question.key, e.target.value)}
                            className={`min-h-[120px] ${errors[question.key] || isOverLimit ? "border-red-500" : ""}`}
                            placeholder="Type your answer here..."
                        />

                        <div className="flex justify-between items-center text-sm">
                            <div>{errors[question.key] && <span className="text-red-500">{errors[question.key]}</span>}</div>
                            <span className={`${isOverLimit ? "text-red-500" : "text-gray-500"}`}>{wordCount}/300 words</span>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
