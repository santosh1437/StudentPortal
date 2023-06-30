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
  currentCity : string
  address : string
  empId : string
  empEmail : string
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
  currentCity : string
  address : string
  empId : string
  empEmail : string
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
  createdOn: Date
}