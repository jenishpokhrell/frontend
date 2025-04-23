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
    postedBy: string,
    createdAt: Date,
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
        id: number,
        jobStatus: string,
        candidateId: string,
        candidateName : string
    }[]
}

export interface MyJobApplications{
    jobStatus: string,
    message: string,
    job: {
      id: number,
      jobTitle: string,
      postedBy: string,
      isActive: boolean,
      jobType: string
    }
}

export interface Job{
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
    isActive: true,
}


export interface GetShortlistedCandidate{
    candidateId: string,
    candidateName: string,
    employerId: string,
    jobId: number,
    jobTitle: string
}

export interface UpdateJobApplication{
    jobStatus: string,
    updatedAt: Date
}

export interface AllJobs{
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
