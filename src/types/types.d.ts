export interface FormErrors {
  [key: string]: string
}

export interface BasicDetails {
  name: string
  email: string
  mobileNumber: string
  dateOfBirth: string
}

export interface Documents {
  class10Marksheet: string
  class12Marksheet: string
  graduationMarksheet: string
  postGraduationMarksheet: string
  resume: string
  recommendationLetter: string
  salarySlips: string
  others: string
}

export interface StatementOfPurpose {
  q1: string
  q2: string
  q3: string
}

export interface InterviewAvailability {
  email: string
  location: string
  interviewDate: string
  interviewTime: string
  timeZone: string
  interviewMedium: string
}

export interface FormData {
  basicDetails: BasicDetails
  documents: Documents
  statementOfPurpose: StatementOfPurpose
  interviewAvailability: InterviewAvailability
}

export interface FormErrors {
  [key: string]: string
}