import Post from '../models/post.js'
import Client from '../models/client.js'

export const addPost = async (req, res) => {
  try {
    const { clientId, sms } = req.body

    if (!clientId || !sms) {
      return res
        .status(400)
        .json({ message: 'Please fill in all required fields!' })
    }

    const client_ = await Client.findById(clientId)
    if (!client_) {
      return res.status(404).json({ message: 'Client not found!' })
    }

    const newPost = new Post({
      clientId: client_._id,
      firstName: client_.firstName,
      avatar: client_.avatar,
      sms
    })

    await newPost.save()
    res.status(201).json({ message: 'Post saved successfully!', post: newPost })
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred!', error })
  }
}

export const getPosts = async (_, res) => {
  try {
    const Posts = await Post.find()
    res.status(200).json(Posts)
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred!', error })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const deletedPost = await Post.findByIdAndDelete(id)

    if (!deletedPost) {
      return res.status(404).json({ message: 'Location not found!' })
    }

    res
      .status(200)
      .json({ message: 'Location deleted successfully!', data: deletedPost })
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred!', error })
  }
}

export const toggleLike = async (req, res) => {
  try {
    const { clientId, postId } = req.body
    const post = await Post.findById(postId)
    const client = await Client.findById(clientId)

    if (!post || !client) {
      return res.status(404).json({ message: 'Post or Client not found' })
    }

    const alreadyLiked = client.liked.includes(postId)
    const alreadyDisliked = client.disliked.includes(postId)

    if (alreadyLiked) {
      client.liked.pull(postId)
      post.likes -= 1
    } else {
      client.liked.push(postId)
      post.likes += 1
      if (alreadyDisliked) {
        client.disliked.pull(postId)
        post.dislikes -= 1
      }
    }

    await client.save()
    await post.save()

    res.json({ message: 'Like toggled', post })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const toggleDislike = async (req, res) => {
  try {
    const { clientId, postId } = req.body
    const post = await Post.findById(postId)
    const client = await Client.findById(clientId)

    if (!post || !client) {
      return res.status(404).json({ message: 'Post or Client not found' })
    }

    const alreadyDisliked = client.disliked.includes(postId)
    const alreadyLiked = client.liked.includes(postId)

    if (alreadyDisliked) {
      client.disliked.pull(postId)
      post.dislikes -= 1
    } else {
      client.disliked.push(postId)
      post.dislikes += 1
      if (alreadyLiked) {
        client.liked.pull(postId)
        post.likes -= 1
      }
    }

    await client.save()
    await post.save()

    res.json({ message: 'Dislike toggled', post })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const toggleShow = async (req, res) => {
  try {
    const { postId } = req.body
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    post.show = !post.show
    await post.save()

    res.json({ message: 'Post updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
