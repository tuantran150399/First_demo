import Queue from 'bull';
const EmailQueue = new Queue('send new email', 'redis://127.0.0.1:6379');



EmailQueue.process(async (job, done) => {
    job.progress(42);
    console.log(job.data);
    done();
  });


export const sendEmail = async(data:any)=>{
  console.log(data)
  EmailQueue.add(data)
}



//   export const getUsers = async (req: Request, res: ResponseToolkit) => {

