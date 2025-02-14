import Product from '../models/product.js'

const sendErrorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({ message, error: error?.message })
}

export const CreateNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    return res
      .status(201)
      .json({ message: 'Product created successfully', product: newProduct })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Create new product err:7',
      error
    )
  }
}

export const GetAllProducts = async (_, res) => {
  try {
    const products = await Product.find()
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found.' })
    }
    return res.status(200).json({ data: products })
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Get all product err:24',
      error
    )
  }
}

export const GetOneProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }
    return res.status(200).json({ data: product })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error. Get one product err:41',
      error: error.message
    })
  }
}

export const UpdateProduct = async (req, res) => {
  const { id } = req.params
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedProduct) {
      return sendErrorResponse(res, 404, 'Product not found.')
    }
    return res
      .status(200)
      .json({ message: 'Product updated successfully', data: updatedProduct })
  } catch (error) {
    if (error.name === 'CastError') {
      return sendErrorResponse(res, 400, 'Invalid product ID.', error)
    }
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Update product err:59',
      error
    )
  }
}

export const DeleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return sendErrorResponse(res, 404, 'Product not found.')
    }
    return res
      .status(200)
      .json({ message: 'Product has been deleted successfully.' })
  } catch (error) {
    if (error.name === 'CastError') {
      return sendErrorResponse(res, 400, 'Invalid product ID.', error)
    }
    return sendErrorResponse(
      res,
      500,
      'Internal server error. Delete product err:82',
      error
    )
  }
}
