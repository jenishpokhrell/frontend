export interface UserModel{
    newToken: string;
    id: string,
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    address: string;
    contact: string;
    profilePhoto: string;
    gender: string;
    jobTitle: string;
    years_Of_Experience: number
    isApproved: boolean,
    roles: string[]
}

export interface UpdateUser{
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    address: string;
    contact: string;
    profilePhoto: string;
    gender: string;
    jobTitle: string;
    years_Of_Experience: number;
}