import { action } from 'typesafe-actions';
import { ADD_NOTIFICATION, CLEAR_NOTIFICATION, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants';

export type NotificationType = 'ERROR' | 'SUCCESS' | 'INFO' | 'WARNING';

export const wait = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

export const addNotification = (id: string, text: string, notificationType: NotificationType) =>
    action(ADD_NOTIFICATION, { id, text, notificationType });

export const clearNotification = (id: string) => action(CLEAR_NOTIFICATION, { id });

export const successMessage = (text: string, timeout?: number) => action(SUCCESS_MESSAGE, { text, timeout });

export const errorMessage = (text: string, timeout?: number) => action(ERROR_MESSAGE, { text, timeout });
