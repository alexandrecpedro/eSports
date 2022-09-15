import { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  /** REACT HOOKS **/
  // useState
  const [games, setGames] = useState<GameCardProps[]>([]);

  // useNavigation
  const navigation = useNavigation();

  // useEffect
  useEffect(() => {
    // Search for game information from Backend
    fetch(`http://192.168.0.243:3333/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data);
      });
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Find your duo!"
          subtitle="Choose the game you wanna play..."
        />

        <FlatList
          data={games}
          // Identificator (necessary for a list)
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          // Disable HorizontalScroll Indicator
          showsHorizontalScrollIndicator={false}
          // It should be a horizontal list (boolean property horizontal)
          horizontal
          // End list item indicator
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
