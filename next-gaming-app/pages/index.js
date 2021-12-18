import { useState } from 'react'
import Layout from '../components/Layout';
import SearchBox from '../components/SearchBox';
import GameList from '../components/GameList';
import styles from '../styles/Home.module.css'


export default function Home({filteredGames}) {

  const [search, setSearch] = useState('');
  const handleChange = (e)=>{
    e.preventDefault();
    setSearch(e.target.value.toLowerCase())
  };

  const filterGames = filteredGames.filter((game)=>{
    return game.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
     <Layout>
       <div className={styles.container}>
         <SearchBox 
         type='text' 
         placeholder='Search new game'
         onChange={handleChange} 
         />
        <div>
       
          <GameList filteredGames={filterGames} />
       </div> 


       </div>
     </Layout>
  )
}

export const getServerSideProps = async ()=>{
  const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games`,{
    methods: 'GET',
    headers: {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "2f38357328msh897085dc58b7fb1p170b67jsn9fe8508d29c2"
    }
  });

  const filteredGames = await res.json();
  return {
    props: {filteredGames}
  }


};