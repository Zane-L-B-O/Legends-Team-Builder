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
  const {id} = useParams()
 useEffect(() => {
        fetch(`http://localhost:1000/api/v1/?id=${id}`)
        .then((response) => {
          if(!response.ok) {
            throw new Error('error fetching data!')
          }
          return response.json() // parse the response data
        })
        .then((result) => setData(result)) // set state when the data received
        .catch((err) => err) // return the error
      }, []) //replace dependencies with the state variable names you want to trigger a re-run
      //component logic
  if (!data) { // guard clause to prevent runtime errors
    return ( 
      <div>
        <h1>Getting Character Data</h1>
        <div>Loading...</div>
      </div>
      )
  }
  
  return (
      <Card className="character-details">
         <CardMedia
            sx={{ height: 300 }}
            image={data.image_url}
            title={data.name}
        />
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                {data.name} ({data.id})
            </Typography>
            <Typography >
                Color: {data.color} Rarity: {data.rarity} 
            </Typography>
            <br/>
            <Typography variant="body2" >
              Base Power: {data.base_stats.power} Base Health: {data.base_stats.health
              } Base Strike ATK: {data.base_stats.strike_atk} Base Strike DEF: {data.base_stats.stike_def
              } Base Blast ATK: {data.base_stats.blast_atk} Base Blast DEF: {data.base_stats.blast_def
              } Max Power: {data.max_stats.power} Max Health: {data.max_stats.health
              } Max Strike ATK: {data.max_stats.strike_atk} Max Strike DEF: {data.max_stats.stike_def
              } Max Blast ATK: {data.max_stats.blast_atk} Max Blast DEF: {data.max_stats.blast_def}
            </Typography>
            <Typography variant="body" color={'darkgoldenrod'}>
                Tags: {data.tags + ","} 
            </Typography>
            <br/>
            <Typography variant="body2" >
              Base Z-Ability: {data.z_ability.one.effect} 
              <br/>
              Max Z-Ability: {data.z_ability.four.effect}
            </Typography>
            <Typography  variant="body2" color={'red'}>
              {data.rarity === "ULTRA" ? data.ultra_ability.name + ": " : ""}
              {data.rarity === "ULTRA" ? data.ultra_ability.effect : ""}
            </Typography>
            <Typography>
              {data.unique_ability.unique_start_abilities.map((element) => {
                return(
                  <Typography variant='body2' color={'blueviolet'}> 
                  {element.ability_name}: {element.ability_effect} 
                  </Typography>
                )
              })}
            </Typography>
            <Typography>
            {data.unique_ability.unique_zenkai_abilities ? data.unique_ability.unique_zenkai_abilities.map((element) => {
                return(
                  <Typography variant='body2' color={'darkcyan'}> 
                  {element.ability_name}: {element.ability_effect} 
                  </Typography>
                )
              }) 
              : "" }
            </Typography>
            <Typography>
              Strike Card: {data.strike} Blast Card: {data.shot} Special Move
              : {data.special_move.name}: {data.special_move.effect} Special Skill
              : {data.special_skill.name}: {data.special_skill.effect} 
              <br/>
              {data.ultimate_skill ? "Ultimate Skill: " + data.ultimate_skill.name + ": " : ""}
              {data.ultimate_skill ? data.ultimate_skill.effect : ""}
            </Typography>
        </CardContent>
      </Card> 
  )
}
export default CharacterDetails