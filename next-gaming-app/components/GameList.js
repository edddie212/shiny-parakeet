import Games from './Games';

export default function GameList({ filteredGames }) {
  return (
    <>
      {filteredGames.map((game) => {
        return (
          <div key={game.id}>
            <Games
              id={game.id}
              title={game.title}
              genre={game.genre}
              thumbnail={game.thumbnail}
              description={game.short_description}
            />
          </div>
        );
      })}
    </>
  );
}
