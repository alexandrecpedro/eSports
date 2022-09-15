import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';
import { THEME } from '../../theme';

// Create a Type to receive dynamic information
export interface DuoCardProps {
    id: string;
    name: string;
    yearsPlaying: number;
    weekDays: string[];
    hourStart: string;
    hourEnd: string;
    useVoiceChannel: boolean;
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label='Name'
                value={data.name}
            />

            <DuoInfo
                label='Game Time'
                value={`${data.yearsPlaying} years`}
            />

            <DuoInfo
                label='Availability'
                value={`${data.weekDays.length} days \u2022 ${data.hourStart} - ${data.hourEnd}`}
            />

            <DuoInfo
                label='Voice Call'
                value={data.useVoiceChannel ? 'Yes' : 'No'}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={onConnect}
            >
                <GameController 
                    color={THEME.COLORS.TEXT}
                    size={20}
                />

                <Text style={styles.buttonTitle}>
                    Connect
                </Text>
            </TouchableOpacity>
        </View>
    );
}