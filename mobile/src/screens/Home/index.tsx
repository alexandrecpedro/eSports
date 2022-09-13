import { FlatList, Image, InteractionManager, View } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading
        title="Find your duo!"
        subtitle="Choose the game you wanna play..."
      />

      <FlatList
        data={GAMES}
        // Identificator (necessary for a list)
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard
            data={item}
          />
        )}
        // Disable HorizontalScroll Indicator
        showsHorizontalScrollIndicator={false}
        // It should be a horizontal list (boolean property horizontal)
        horizontal
        // End list item indicator
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
