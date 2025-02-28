import Map from '../models/map.js'

export const addMap = async (req, res) => {
  try {
    const { name, mapsName, coordinates } = req.body

    if (!name || !mapsName || !coordinates || coordinates.length === 0) {
      return res
        .status(400)
        .json({ message: 'Please fill in all required fields!' })
    }

    const newMap = new Map({
      name,
      mapsName,
      coordinates
    })

    await newMap.save()
    res
      .status(201)
      .json({ message: 'Locations saved successfully!', data: newMap })
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred!', error })
  }
}

export const getMaps = async (_, res) => {
  try {
    const maps = await Map.find()
    res.status(200).json(maps)
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred!', error })
  }
}

export const deleteMap = async (req, res) => {
  try {
    const { id } = req.params
    const deletedMap = await Map.findByIdAndDelete(id)

    if (!deletedMap) {
      return res.status(404).json({ message: 'Location not found!' })
    }

    res
      .status(200)
      .json({ message: 'Location deleted successfully!', data: deletedMap })
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred!', error })
  }
}
