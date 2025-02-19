import Team from '../models/team.js'

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const CreateNewTeam = async (req, res) => {
  try {
    const { fsblink, twtlink, inslink, name, position, photos } = req.body

    if (!fsblink || !twtlink || !inslink || !name || !position) {
      return sendErrorResponse(
        res,
        400,
        'All fields except photos are required.'
      )
    }

    const newTeam = new Team({
      fsblink,
      twtlink,
      inslink,
      name,
      position,
      photos
    })

    await newTeam.save()

    return res.status(201).json({
      message: 'Team created successfully',
      Team: newTeam
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const GetAllTeams = async (_, res) => {
  try {
    const Teams = await Team.find()
    return res.status(200).json({ data: Teams })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const GetOneTeam = async (req, res) => {
  const { id } = req.params
  try {
    const Team = await Team.findById(id)
    if (!Team) {
      return sendErrorResponse(res, 404, 'Team not found.')
    }
    return res.status(200).json({ Team })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const UpdateTeam = async (req, res) => {
  const { id } = req.params
  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedTeam) {
      return sendErrorResponse(res, 404, 'Team not found.')
    }
    return res.status(200).json({
      message: 'Team updated successfully',
      data: updatedTeam
    })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}

export const DeleteTeam = async (req, res) => {
  const { id } = req.params
  try {
    const deletedTeam = await Team.findByIdAndDelete(id)
    if (!deletedTeam) {
      return sendErrorResponse(res, 404, 'Team not found.')
    }
    return res.status(200).json({ message: 'Team deleted successfully.' })
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error.')
  }
}
