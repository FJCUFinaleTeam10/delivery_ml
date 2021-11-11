import axios from 'axios';
import { useSnackbar } from 'notistack';

export const createAxios = () => axios.create({
    baseURL: '/api',
    headers: { 'authorization': localStorage.getItem('token') },
});

export function useNoti() {
    const { enqueueSnackbar } = useSnackbar();
    return (variant, message) => {
        enqueueSnackbar(message, { variant });
    }
}
