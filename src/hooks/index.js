import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createAxios } from '../services';
import _ from 'lodash';

export function useNativeSelect(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = event => {setValue(event.target.value);};
    return {
        value,
        onChange
    };
}

export function useDateTimePicker(initialValue) {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        onChange: setValue
    };
}

export function useTrans() {
    const lang = useSelector(state => state.lang);
    const t = (eng, cn) => lang === 'en' ? eng: cn;
    return t;
}

export function useVehicleData(grouping = false) {
    const axios = createAxios();
    const [data, setData] = useState(undefined);
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`/vehicles?include=device`);
                if (grouping) {
                    const groupByFleetId = _(response.data).groupBy('fleetId').map(
                        value => {
                            let fleetName = value[0].fleet?.name || 'Unset';
                            const vehicles = value;
                            return { fleetName, vehicles };
                        }
                    ).value();
                    setData(groupByFleetId);
                } else {
                    setData(response.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchVehicles();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return data;
}

export function useInterval(callback, delay) {

    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
        function tick() {savedCallback.current();}
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
// https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
