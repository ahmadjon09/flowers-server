import Product from '../models/product.js'
import Client from '../models/client.js'
import bcrypt from 'bcrypt'
import generateAvatar from '../middlewares/generateAvatar.js'
import generateToken from '../middlewares/generateToken.js'

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export const ClientRegister = async (req, res) => {
  const { phoneNumber, firstName, lastName, avatar, password } = req.body

  try {
    const existingClient = await Client.findOne({ phoneNumber })

    if (existingClient) {
      return sendErrorResponse(
        res,
        409,
        'User with this phone number already exists. Please use another number.'
      )
    }

    const hashedPassword = await bcrypt.hash(password, 20)
    const avatarPhoto = avatar ? avatar : generateAvatar(firstName)
    const newClient = new Client({
      phoneNumber,
      firstName,
      lastName,
      avatar: avatarPhoto,
      password: hashedPassword
    })

    await newClient.save()

    const token = generateToken({ _id: newClient._id, role: 'client' })

    return res.status(201).json({
      message: 'New user successfully created!',
      data: newClient,
      token
    })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Client register err:10'
    )
  }
}

export const ClientLogin = async (req, res) => {
  const { phoneNumber, password } = req.body

  try {
    const client = await Client.findOne({ phoneNumber })

    if (!client) {
      return sendErrorResponse(
        res,
        401,
        'User with this phone number does not exist.'
      )
    }

    const isPasswordValid = await bcrypt.compare(password, client.password)

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, 'Incorrect phone number or password.')
    }

    const token = generateToken({ _id: client._id, role: 'client' })

    return res.status(200).json({
      message: 'Success!',
      client,
      token
    })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Client login err:48'
    )
  }
}

export const GetAllClients = async (_, res) => {
  try {
    const clients = await Client.find()
    return res.json(clients)
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal server error. Get all err:80')
  }
}

export const UpdateClient = async (req, res) => {
  const userId = req.params.id
  const { phoneNumber, firstName, lastName, avatar, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 20)
    const avatarPhoto = avatar ? avatar : generateAvatar(firstName)
    const updatedClient = {
      phoneNumber,
      lastName,
      firstName,
      avatar: avatarPhoto,
      password: hashedPassword
    }
    const client = await Client.findByIdAndUpdate(userId, updatedClient, {
      new: true
    })
    if (!client) {
      return sendErrorResponse(res, 409, 'Client not found.')
    }
    return res.status(201).json({ data: client })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Update client err:89'
    )
  }
}

export const DeleteClient = async (req, res) => {
  const { id } = req.params

  try {
    const deletedClient = await Client.findByIdAndDelete(id)
    if (!deletedClient) {
      return sendErrorResponse(res, 404, 'Client not found.')
    }
    return res
      .status(201)
      .json({ message: 'Client has been deleted successfully.' })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Delete client err:114'
    )
  }
}

export const GetOneClient = async (req, res) => {
  const { id } = req.params
  try {
    const OneClient = await Client.findById(id)
    if (!OneClient) {
      return res.status(404).json({ message: 'Client not found.' })
    }
    return res.status(200).json({ data: OneClient })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error. Get one client err:147',
      error: error.message
    })
  }
}

export const GetMe = async (req, res) => {
  try {
    const foundClient = await Client.findById(req.userInfo.userId).populate(
      'favorites'
    )
    if (!foundClient)
      return res.status(404).json({ message: 'Client not found!' })
    return res.status(200).json({ data: foundClient })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const toggleFavorite = async (req, res) => {
  try {
    const { clientId, productId } = req.body

    const client = await Client.findById(clientId)
    if (!client) return res.status(404).json({ message: 'Client not found' })

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const index = client.favorites.indexOf(productId)
    if (index === -1) {
      client.favorites.push(productId)
      await client.save()
    } else {
      return res.status(409).json({ message: 'You already liked this product' })
    }

    const updatedProduct = await Product.findById(productId)

    return res.json({ message: 'Favorites updated', product: updatedProduct })
  } catch (error) {
    return res.status(500).json({ message: 'Server error ', error })
  }
}

export const removeFavorite = async (req, res) => {
  try {
    const { clientId, productId } = req.body

    const client = await Client.findById(clientId)
    if (!client) return res.status(404).json({ message: 'Client not found' })

    client.favorites = client.favorites.filter(
      fav => fav.toString() !== productId
    )

    await client.save()
    res.json({
      message: 'Product removed from favorites',
      favorites: client.favorites
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
