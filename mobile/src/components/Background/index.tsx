import { ImageBackground } from 'react-native';
import backgroundImg from '../../assets/background-galaxy.png';
import { styles } from './styles';

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      // Source = always search and load a new image (delay on background)
      source={backgroundImg}
      // Default Source = memorizes an image as default (avoid loading delays)
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
