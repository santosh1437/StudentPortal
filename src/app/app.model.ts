export interface Admin{
    id: number
    fullName:	string
    phone:	string
    email:	string
    adminPassword:	string
    adminType: string
}

export interface addAdmin{
  fullName:	string
  phone:	string
  email:	string
  adminPassword:	string
}

export interface Teachers{
  tID : string
  fullName : string
  email : string
  phone : string
  password : string
  isActive : boolean
  address : string
  empId : string
  empEmail : string
  joinedOn: Date
  currentCity: string
}

export interface addTeachers{
  fullName : string
  email : string
  phone : string
  password : string
  isActive : boolean
  address : string
  empId : string
  empEmail : string
  joinedOn: Date
  currentCity: string
}

export interface Student{
  sID : string
  name : string
  dob :  string
  phoneNo : string
  email : string
  password : string
  admissionDate : string
  parentName :  string
  parentPhoneNo : string
  parentMailId : string
  studentType: string
  address: string
  currentCity: string
  schoolOrCollege : string
  courseAssign: string
  segment : string
  grade : string
  curriculum : string
  degree : string
  expectedOrPassedOutYear : string
  cID : string
  createdOn: Date
  updatedOn: Date
}

export interface addStudent{
  name : string
  dob :  string
  phoneNo : string
  email : string
  password : string
  admissionDate : string
  parentName :  string
  parentPhoneNo : string
  parentMailId : string
  studentType: string
  address: string
  currentCity: string
  schoolOrCollege : string
  courseAssign: string
  segment : string
  grade : string
  curriculum : string
  degree : string
  expectedOrPassedOutYear : string
  cID : string
  createdOn: Date
  updatedOn: Date
}

export interface Counsellor{
  cID : string
  fullName : string
  password : string
  email : string
  phone : string
  isActive : boolean
  currentCity : string
  counsellorType : string
  address : string
  empId : string
  empEmail : string
  joinedOn : Date
  createdOn: Date
}

export interface addCounsellor{
  fullName : string
  password : string
  email : string
  phone : string
  isActive : boolean
  currentCity : string
  counsellorType : string
  address : string
  empId : string
  empEmail : string
  joinedOn : Date
  createdOn: Date
}

export interface Course{
  id : string
  courseID : string
  segment : string 
  course : string
  subCourse : string
  duration : string
  description : string
  currentPrice : string
  discountPrice : string
  discountPercentage : string
 
}
export interface AddCourse{
  id : string
  courseID : string
  segment : string 
  course : string
  subCourse : string
  duration : string
  description : string
  currentPrice : string
  discountPrice : string
  discountPercentage : string
}
export interface subCourse{
  id : string
  subCourseID : string
  segment : string 
  courseID : string
  subCourse : string
  subject : string
  duration : string
  description : string
  currentPrice : string
  discountPrice : string
  discountPercentage : string
}
export interface AddSubCourse{
  id : string
  subCourseID : string
  segment : string 
  courseID : string
  subCourse : string
  subject : string
  duration : string
  description : string
  currentPrice : string
  discountPrice : string
  discountPercentage : string
}

export interface Subject{
  courseId : string
  subject : string
}

export interface AddCourseToTeacher{
  tID: string
  segment: string
  course: string
  subCourse: string
  subject: string
}

export interface Batch{
  bId : string
  segment : string
  course: string
  subCourse: string
  durationOfCourse : string
  counsellor: string
  timings: string
  days: number
  startDate: Date
  notes: string
}

export interface addBatch{
  segment : string
  course: string
  subCourse: string
  durationOfCourse : string
  counsellor: string
  timings: string
  days: number
  startDate: Date
  notes: string
}

export interface SubBatch{
  sbId : string
  segment : string
  course: string
  subCourse: string
  teacher : string
  counsellor: string
  timings: string
  days: number
  startDate: Date
  notes: string
}

export interface addSubBatch{
  segment : string
  course: string
  subCourse: string
  teacher : string
  counsellor: string
  timings: string
  days: number
  startDate: Date
  notes: string
}

export interface ClassSchedule{
  admissionDate: Date
  name: string
  preferredTimings: string
  allottedTimings: string
  assignBatch: boolean
}

export interface SessionSchedule{
  name: string
  course: string
  subCourse: string
  counsellor: string
  startDate: Date
  deadlineDate: Date
  sessionsPerWeek: number
  totalSessions: number
  sessionsTaken: number
  sessionsremaining: number
}

export interface Interview{
  hostMail: string
  coHostMail: string
  date: Date
  time: string
  zoomAccount: string
  candidateName: string
  candidateMail: string
  meetingLink: string
  meetingID: string
}

export interface Counselling{
  student: string
  studentMailID: string
  parentMailID: string
  srCounsellorMailID: string
  coHostMailID: string
  date: Date
  time: string
  meetingLink: string
}

export interface LiveSession{
  student: string
  studentMailID: string
  hostMailID: string
  coHostMailID: string
  date: Date
  time: string
}

export interface LiveClass{
  student: string
  studentMailID: string
  hostMailID: string
  coHostMailID: string
  date: Date
  time: string
}

export interface AddOrEditPaymentToStudent{
  totalFee: number
  amountPaid: number
  paidOn: Date
  paymentMethod: string
  paymentType: string
  dueAmount: number
  dueDate: Date
}
export interface AddSegment{
  segmentname: string
}