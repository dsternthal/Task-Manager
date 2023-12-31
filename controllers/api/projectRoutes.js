const router = require('express').Router();
const { Project,User } = require('../../models');
const withAuth = require('../../utils/auth');

//http://localhost:3001/api/projects/
router.post('/', withAuth, async (req, res) => {
  const body=req.body
  try {
    console.log(req.body)
    const newProject = await Project.create({
      ...body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

//optional
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//http://localhost:3001/api/projects/
router.get("/", withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    res.status(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log(req.params.id)
    const projectData = await Project.update(req.body, {
      where:{
        id: req.params.id
      }
    });

    res.status(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
})
module.exports = router;
