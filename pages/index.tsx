
import {useState} from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {editUser} from "../redux//actions/user"
import {useSelector, useDispatch} from "react-redux"

export default function Home() {
  const [email, setEmail] = useState<string>("")
  const [name, setname] = useState<string>("")

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log({email, name})
    dispatch(editUser({name, email})) 

  }
  return (
    <div className={styles.container}>
        {JSON.stringify(state)}
        <form onSubmit={handleSubmit}>

        <input onChange={e=> setname(e.target.value)} name="name"/>
        <input name="email" onChange={e=> setEmail(e.target.value)}/>
        <button type="submit"> test</button>
        </form>
    </div>
  )
}
