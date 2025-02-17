import Carousel from '../models/carousel.js'

const sendErrorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({ message, error: error?.message })
}

export const CreateNewcarousel = async (req, res) => {
  try {
    const newcarousel = new Carousel(req.body)
    await newcarousel.save()
    return res
      .status(201)
      .json({ message: 'carousel created successfully', data: newcarousel })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Create new carousel err:7',
      error
    )
  }
}

export const GetAllcarousel = async (_, res) => {
  try {
    const Allcarousel = await Carousel.find()
    if (Allcarousel.length === 0) {
      return res.status(404).json({ message: 'No carousel found.' })
    }
    return res.status(200).json({ data: Allcarousel })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Get all carousel err:24',
      error
    )
  }
}

export const GetOnecarousel = async (req, res) => {
  const { id } = req.params
  try {
    const carousel = await Carousel.findById(id)
    if (!carousel) {
      return res.status(404).json({ message: 'carousel not found.' })
    }
    return res.status(200).json({ data: carousel })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error. Get one carousel err:41',
      error: error.message
    })
  }
}

export const Updatecarousel = async (req, res) => {
  const { id } = req.params
  try {
    const updatedcarousel = await Carousel.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedcarousel) {
      return sendErrorResponse(res, 404, 'carousel not found.')
    }
    return res
      .status(200)
      .json({ message: 'carousel updated successfully', data: updatedcarousel })
  } catch (error) {
    if (error.name === 'CastError') {
      return sendErrorResponse(res, 400, 'Invalid carousel ID.', error)
    }
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Update carousel err:59',
      error
    )
  }
}

export const Deletecarousel = async (req, res) => {
  const { id } = req.params
  try {
    const deletedcarousel = await Carousel.findByIdAndDelete(id)
    if (!deletedcarousel) {
      return sendErrorResponse(res, 404, 'carousel not found.')
    }
    return res
      .status(200)
      .json({ message: 'carousel has been deleted successfully.' })
  } catch (error) {
    if (error.name === 'CastError') {
      return sendErrorResponse(res, 400, 'Invalid carousel ID.', error)
    }
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Delete carousel err:82',
      error
    )
  }
}
