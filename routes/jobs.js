const express = require('express');
const router = express.Router();

const { getJob, getAllJobs, deleteJob, updateJob, createJob } = require('../controllers/jobs');
router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').post(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;