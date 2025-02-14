import About from '../models/about.js'

const sendErrorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({ message, error: error?.message })
}

export const CreateNewAbout = async (req, res) => {
  try {
    const newAbout = new About(req.body)
    await newAbout.save()
    return res
      .status(201)
      .json({ message: 'About created successfully', data: newAbout })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Create new about err:7',
      error
    )
  }
}

export const GetAllAbout = async (_, res) => {
  try {
    const About = await About.find()
    if (About.length === 0) {
      return res.status(404).json({ message: 'No about found.' })
    }
    return res.status(200).json({ data: About })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Get all about err:24',
      error
    )
  }
}

export const GetOneAbout = async (req, res) => {
  const { id } = req.params
  try {
    const About = await About.findById(id)
    if (!About) {
      return res.status(404).json({ message: 'About not found.' })
    }
    return res.status(200).json({ data: About })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error. Get one about err:41',
      error: error.message
    })
  }
}

export const UpdateAbout = async (req, res) => {
  const { id } = req.params
  try {
    const updatedAbout = await About.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedAbout) {
      return sendErrorResponse(res, 404, 'About not found.')
    }
    return res
      .status(200)
      .json({ message: 'About updated successfully', data: updatedAbout })
  } catch (error) {
    if (error.name === 'CastError') {
      return sendErrorResponse(res, 400, 'Invalid about ID.', error)
    }
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Update about err:59',
      error
    )
  }
}

export const DeleteAbout = async (req, res) => {
  const { id } = req.params
  try {
    const deletedAbout = await About.findByIdAndDelete(id)
    if (!deletedAbout) {
      return sendErrorResponse(res, 404, 'About not found.')
    }
    return res
      .status(200)
      .json({ message: 'About has been deleted successfully.' })
  } catch (error) {
    if (error.name === 'CastError') {
      return sendErrorResponse(res, 400, 'Invalid about ID.', error)
    }
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Delete about err:82',
      error
    )
  }
}
