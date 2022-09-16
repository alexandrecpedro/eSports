import { useState } from 'react';
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';

import { Heading } from '../Heading';
import React from 'react';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    /** REACT HOOK **/
    // useState
    // Ps.: while device is memoryzing Discord name, it will be showed a Loading status (ActivityIndicator)
    const [isCoppying, setIsCoppying] = useState(false);

    // Manage user device memory to keep Discord name at clipboard (transfer area)
    // Ps.: handle => functions that occurs based on user touches
    const handleCopyDiscordToClipboard = async () => {
        setIsCoppying(true);
        await Clipboard.setStringAsync(discord);
        // Usability Principle = feedback for user
        Alert.alert('Discord copied!', 'Copied user for you to search on Discord');
        setIsCoppying(false);
    }

    return (
        <Modal
            transparent
            // Modal starts from StatusBar (covers all screen)
            statusBarTranslucent
            // Choose an animation type (default = slide)
            animationType='fade'
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading
                        style={{ marginTop: 24, alignItems: 'center' }}
                        title="Let's play!"
                        subtitle='Now is just start playing!'
                    />

                    <Text style={styles.label}>
                        Add on Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        // Disabled property avoid user clicking at
                        disabled={isCoppying}
                        onPress={handleCopyDiscordToClipboard}
                    >
                        <Text style={styles.discord}>
                            {isCoppying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}