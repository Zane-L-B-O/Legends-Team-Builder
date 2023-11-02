//imports
import { Card } from '@mui/material'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
//define helper functions and variables here

function CharacterDetails(props) {

  const {
  } = props

  //define state
  const [data, setData] = useState(null)
  const {name} = useParams()

  useEffect(() => {
    fetch(`http://localhost:1000/api/v1/`)
      .then(response => {
        if(!response.ok) {
          throw new Error("Failed to fetch")
        }
        return response.json() // parse the response data
      })
      .then(json => setData(json)) // set state when the data received
      .catch(err => err) // return the error
    }, [])

  //component logic

  return (
    <>
      {!data ? (<div> Loading... </div>) : (
      <Card className="character-details">
         <CardMedia
            sx={{ height: 140 }}
            image={data.image_url}
            title={data.name}
        />
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                {data.name}
            </Typography>
            <Typography>
                data:{data.color} Rarity: {data.rarity} 
            </Typography>
        </CardContent>
      </Card>
      ) 
    }
    </>
  )
}
export default CharacterDetails