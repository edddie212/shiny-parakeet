import Layout from '../../components/Layout';
import Link from 'next/link';
import styles from './Game.module.css';

const Game = ({ game }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Link href="/" passHref>
          Go back
        </Link>
        <br />
        <br />
        <div className={styles.gameDetail}>
          <img
            src={game.thumbnail}
            alt={game.title}
            className={styles.game_image}
          />
          <h1>{game.title}</h1>
          <div className={styles.bulletInfo}>
            <span>Platform: {game.platform}</span> &nbsp;
            <span>Released on: {game.release_date}</span>
          </div>
          <br />
          <br />
          <div>
            <h3>{game.short_description}</h3>
          </div>
          <br />
          <p>{game.description}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Game;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}
	`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPID_API_HOST,
        'x-rapidapi-key': process.env.RAPID_API_KEY,

      },
    }
  );
  const data = await res.json();
  return {
    props: {
      game: data,
    },
  };
}
