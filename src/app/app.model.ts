export interface Admin{
    id: number
    fullName:	string
    phoneNo:	string
    userName:	string
    password:	string
    createdOn:	string
    updatedOn:	string
    isDeleted:	boolean,
    adminType: string
  }
  
  export interface addAdmin{
  fullName:	string
  phoneNo:	string
  userName:	string
  password:	string
  adminType: string
  }