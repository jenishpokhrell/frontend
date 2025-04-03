export class UserModel{
    newToken: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    address: string;
    contact: string;
    profilePhoto: string;
    gender: string;
    jobTitle: string;
    years_of_experience: number;
    roles: string
    
    constructor(){
        this.newToken = '',
        this.firstname = ''
        this.lastname = '',
        this.username = ''
        this.email = ''
        this.address = ''
        this.contact = ''
        this.profilePhoto = ''
        this.gender = ''
        this.jobTitle = ''
        this.years_of_experience = 0
        this.roles = ''
    }
}