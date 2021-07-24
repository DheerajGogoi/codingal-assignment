import './Posts.scss';
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Posts() {

    const [posts, setPosts] = useState([]);
    const url = "https://jsonplaceholder.typicode.com/posts";
    const [isLoading, setIsloading] = useState(false);
    const [error,setError] = useState();
    useEffect(() => {
        const fetchPostsData = async () => {
            setIsloading(true);
            try {
                const result = await fetch(url);
                const response = await result.json();
                setPosts(response);
                setIsloading(false);
            }
            catch (e) {
                setError(e);
            }
        }
        fetchPostsData();
    }, []);
    
    if (isLoading) return <CircularProgress size={50} style={{
        marginTop: '5rem',
        marginLeft: '46%',
        color: '#ff5d22'
    }} />;
    if (error) return <p>Error!</p>;

    return(
        <div className='posts'>
            <div className='container'>
                <h1 className='posts-header'>Posts</h1>
                <div className='row'>
                    {posts.map((item) => {
                        return(
                            <div className='col-lg-3 col-md-4' key={item.id}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {item.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}