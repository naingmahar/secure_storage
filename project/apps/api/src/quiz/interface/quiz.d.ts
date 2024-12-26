interface IQuiz{
  id?: number;
  ans: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
  q6?: string;
  image?: string;
  admin: Admin;
  isTesting?:boolean;
  description: string;
}


export  {IQuiz}