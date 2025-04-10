export interface GetJobForCandidate {
    id: number,
    jobTitle: string,
    jobDescription: string,
    jobType: string,
    jobLevel: string,
    no_of_Openings: number,
    requirements: string,
    min_Years_of_Experience_Required: number,
    max_Years_of_Experience_Required: number,
    minimumSalary: number,
    maximumSalary: number,
    location: string,
    isActive: boolean,
    employerId: string,
    postedBy: string
}

export interface GetMyJob{
    id: number,
    jobTitle: string,
    jobDescription: string,
    jobType: string,
    jobLevel: string,
    no_of_Openings: number,
    requirements: string,
    min_Years_of_Experience_Required: number,
    max_Years_of_Experience_Required: number,
    minimumSalary: number,
    maximumSalary: number,
    location: string,
    isActive: boolean,
    employerId: string,
    jobApplications: {
        jobStatus: string,
        candidateId: string,
        candidateName : string
    }[]
}
