import * as Notifications from 'expo-notifications';

export const getPushNotificationToken = async () => {
    /** Find all permissions **/
    // granted = if device is allowed
    const { granted } = await Notifications.getPermissionsAsync();

    if (!granted) {
        await Notifications.requestPermissionsAsync();
    } else {
        const pushToken = await Notifications.getExpoPushTokenAsync();
        return pushToken.data;
    }
}