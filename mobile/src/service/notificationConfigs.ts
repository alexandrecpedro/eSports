import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        // Show alert dialog
        shouldShowAlert: true,
        // Send an play sound alert
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});