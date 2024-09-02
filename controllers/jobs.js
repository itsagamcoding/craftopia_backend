const getJob = async (req,res)=>{
  res.send('get job');
}
const getAllJobs = async (req,res)=>{
  res.send('get all jobs');
}
const deleteJob = async (req,res)=>{
  res.send('delete job');
}
const updateJob = async (req,res)=>{
  res.send('update job');
}
const createJob = async (req,res)=>{
  res.json(req.body);
}

module.exports ={
  getJob,
  getAllJobs,
  deleteJob,
  updateJob,
  createJob,
}