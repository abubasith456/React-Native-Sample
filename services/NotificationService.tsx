// import React, { useEffect } from 'react';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

export const NotificationService = () => {
    // useEffect(() => {
    //     configureNotificationSettings();
    //     registerForPushNotificationsAsync();

    //     // Add notification listeners
    //     const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    //         console.log('Notification Received:', notification);
    //     });

    //     const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log('Notification Response:', response);
    //     });

    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener);
    //         Notifications.removeNotificationSubscription(responseListener);
    //     };
    // }, []);

    // const configureNotificationSettings = () => {
    //     Notifications.setNotificationHandler({
    //         handleNotification: async () => ({
    //             shouldShowAlert: true, // Show the notification alert
    //             shouldPlaySound: true, // Play sound for notification
    //             shouldSetBadge: true, // Set app badge count
    //         }),
    //     });
    // };

    // const registerForPushNotificationsAsync = async () => {
    //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    //     let finalStatus = existingStatus;

    //     if (existingStatus !== 'granted') {
    //         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //         finalStatus = status;
    //     }

    //     if (finalStatus !== 'granted') {
    //         console.log('Failed to get push token for push notification!');
    //         return;
    //     }

    //     const token = (await Notifications.getExpoPushTokenAsync()).data;
    //     console.log('Push Token:', token);
    // };

    return null; // This component doesn't render anything visually
};
