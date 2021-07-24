import './Passengers.scss';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import useInfiniteScroll from '../../useInfiniteScroll';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import useFetch from '../hooks/useFetch';



export default function Passengers() {

    const [page, setPage] = useState(0);
    const { loading, error, list } = useFetch('10', page);
    const loader = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
        setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    return(
        <div className='passengers'>
            <div className='container'>
                <h1 className='passengers-header'>Passengers</h1>
                <div className='row'>
                    {
                        list.slice(1).map((item, index) => {
                            return(
                                <div className='col-lg-3 col-md-4' key={index}>
                                    <Card>
                                        <CardContent>
                                            <Typography color="textSecondary" gutterBottom>
                                                <span style={{
                                                    fontWeight: 'bolder',
                                                    color: 'black'
                                                }}>Name:</span> {item.name}
                                            </Typography>
                                            <Typography gutterBottom>
                                                <span style={{
                                                    fontWeight: 'bolder',
                                                    color: 'black'
                                                }}>Airline:</span>
                                                <br />
                                                <img src={item.airline[0].logo} className='img-fluid air-line-logo' />
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                <span style={{
                                                    fontWeight: 'bolder',
                                                    color: 'black'
                                                }}>Airline Head Quarters: </span>
                                                {item.airline[0].head_quaters}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                onClick={()=>window.open('https://'+item.airline[0].website)}
                                                size="small" style={{
                                                    textTransform: 'none'}}
                                                >
                                                    Website
                                                </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
                {loading && <CircularProgress size={50} style={{
                    textAlign: 'center',
                    marginLeft: '46%',
                    color: '#ff5d22'
                }}/>}
                {error && <p>Error!</p>}
                <div ref={loader} />
                
                {/* {isFetching && <CircularProgress size={50} style={{
                    textAlign: 'center',
                    marginLeft: '46%',
                    color: '#ff5d22'
                }}/>} */}

            </div>
        </div>
    )
}