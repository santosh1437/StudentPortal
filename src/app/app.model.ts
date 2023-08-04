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
  fullName : string
  email : string
  password: string
  phoneNo : string
  studentType: string
  currentCity: string
  address: string
  parentPhoneNo: string
  createdOn: Date
  updatedOn: Date
}

export interface addStudent{
  fullName : string
  email : string
  password: string
  phoneNo : string
  studentType: string
  currentCity: string
  address: string
  parentPhoneNo: string
  updatedOn: Date
  createdOn: Date
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
  cId : string
  courseTitle : string
  courseName: string
  duration : string
  description: string
  currentPrice: number
  discountPerc: number
  discountPrice: number
  batches: string
  createdOn: Date
  updatedOn: Date
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
  counselor: string
  timings: string
  days: number
  startDate: Date
}

export interface addBatch{
  segment : string
  course: string
  subCourse: string
  durationOfCourse : string
  counselor: string
  timings: string
  days: number
  startDate: Date
}
