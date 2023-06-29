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

// export interface ExternalStudents{
//   id : number
//   name : string
//   mailID : string
//   phoneNo : string
//   currentCity : string,
//   createdOn: Date
// }

export interface Students{
  id : number
  name : string
  mailID : string
  phoneNo : string
  studentType: string
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