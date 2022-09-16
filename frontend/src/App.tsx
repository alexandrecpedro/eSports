import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from './components/CreateAdBanner';

import { GameBanner } from './components/GameBanner';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from './components/CreateAdModal';

import axios from 'axios';

/** INTERFACE **/
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

/** LANDIND PAGE **/
function App() {
  /** REACT HOOKS **/
  // useState => when some content changes
  const [games, setGames] = useState<Game[]>([]);

  // useEffect
  useEffect(() => {
    /** BACKEND CONNECTION **/
    axios(`http://localhost:3333/games`).then(response => {
        setGames(response.data);
      });
  }, []);

  return (
    /** TAILWIND PROPERTIES **/
    // Tailwind uses related measures from 4px
    // Inside brackets [] is a value that is not default
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your <span className="text-transparent bg-nlw-gradient bg-clip-text">DUO</span> is here.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
