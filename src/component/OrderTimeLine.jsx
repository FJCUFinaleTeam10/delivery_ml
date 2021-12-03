import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import TimerIcon from '@mui/icons-material/Timer';
import Typography from '@mui/material/Typography';
import {useEffect} from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function  timeLineIcon(orderStatus,require){
    return(
        <React.Fragment>
            {
                parseInt(orderStatus)>require?
                    <CheckCircleIcon
                        color={'success'}
                    />
                    :parseInt(orderStatus)==require?
                        <RotateRightIcon
                            color={'warning'}
                        />:
                        <TimerIcon
                            color={'disabled'}
                        />
            }
        </React.Fragment>
    );
}
function  timeLineStatus(orderStatus,require,time){
    return(
        <React.Fragment>
            {
                parseInt(orderStatus)>require?(
                    <React.Fragment>
                        <Typography>Completed at:</Typography>
                        <Typography>{time}</Typography>
                    </React.Fragment>
                ):(
                    parseInt(orderStatus)==require?(
                        <Typography>Executing</Typography>
                    ):(
                        <Typography>waiting</Typography>
                    )
                )
            }
        </React.Fragment>
    );
}

export default function OrderTimeline(props) {
    const {orderInfo} = props;
    useEffect(() => {
        return () => {
            console.log(orderInfo);
        };
    }, [orderInfo]);

    return (
        <Timeline position="right">
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                    {
                        timeLineStatus(orderInfo.order_status,parseInt(-1),orderInfo.order_request_time)
                    }
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                        {timeLineIcon(orderInfo.order_status,-1)}
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Request Time
                    </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                    align="right"
                >{
                    timeLineStatus(orderInfo.order_status,-1,orderInfo.order_approved_at)
                }

                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        {timeLineIcon(orderInfo.order_status,1)}
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography>Assigned to Driver Time</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                    align="right"
                >
                    {timeLineStatus(orderInfo.order_status,3,orderInfo.order_restaurant_carrier_date)}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined">
                        {timeLineIcon(orderInfo.order_status,1)}
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography>Arriverd Restaurant Time</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                    align="right"
                >
                    {timeLineStatus(orderInfo.order_status,parseInt(3),orderInfo.order_delivered_customer_date)}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined">
                        {timeLineIcon(orderInfo.order_status,parseInt(3))}
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography>Arriverd Customer Time</Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}
