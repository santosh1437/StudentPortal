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
  id : number
  fullName : string
  email : string
  phoneNo : string
  password : string
  isActive : boolean
  subject : string
  course : string
  createdOn: Date
}

export interface addTeachers{
  fullName : string
  email : string
  phoneNo : string
  password : string
  isActive : boolean
  subject : string
  course : string
  createdOn: Date
}

export interface Student{
  id : number
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
  id : number
  name : string
  mailID : string
  phoneNo : string
  currentCity: string
  createdOn: Date
}

export interface addCounsellor{
  name : string
  mailID : string
  phoneNo : string
  currentCity: string
}