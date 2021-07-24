import './Navbar.scss'
import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import penguin from '../../assests/Penguin_Big.png';
import logo from '../../assests/logo-with-text.svg'


export default function Navbar(){
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);

    const [reason, setReason] = useState('class-completed');
    const [subReason, setSubReason] = useState('disconnected');

    const handleReason = (event) => {
        setReason(event.target.value);
    };

    const handleSubReason = (event) => {
        setSubReason(event.target.value);
    };

    const [minute, setMinute] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [stop, setStop] = useState(false);

    useEffect(() => {
        if (seconds > 0 && !stop) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else if(seconds === 0 && minute > 0 && !stop) {
            setSeconds(59);
            setMinute(prev => prev - 1);
        } else {
        
        }
    });

    const [otherReason, setOtherReason] = useState('');

    return(
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <div className='container'>
                    <a className="navbar-brand penguin" href="/"><img src={penguin} alt='penguin' className='img-fluid' style={{
                        width: '50px'
                    }} /></a>
                    <a className="navbar-brand logo" href="/"><img src={logo} alt='logo' className='img-fluid' style={{
                        height: '44px'
                    }}/></a>
                    <span className='trial-lesson'>Trial Lesson [Grade 1-3]</span>
                    <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{color: 'black'}}>
                        <MenuIcon style={{
                            fontSize: '2rem'
                        }}/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/posts">Posts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/passengers">Passengers</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span style={{
                                        marginRight: '30px'
                                    }}>{minute} : {seconds}s</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Button variant="contained" color="primary" disableElevation style={{
                                    textTransform: 'none',
                                    background: '#ff5d22',
                                }} onClick={toggleModal}>
                                    End Class
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal isOpen={modal}>
                <ModalHeader toggle={toggleModal} style={{
                    borderBottom: 'none'
                }}/>
                <ModalBody className='modal-body'>
                    <p className='end-header'>Select a reason to end class</p>
                    <div>
                            <FormControl>
                                <RadioGroup aria-label="reason" value={reason} onChange={handleReason}>
                                    <FormControlLabel value="class-completed" control={
                                        <Radio style={{
                                            color: reason === 'class-completed' ? '#ff5d22' : ''
                                        }} />
                                    } label="Class completed"/>
                                    <FormControlLabel value="class-interrupted" control={
                                    <Radio style={{
                                        color: reason === 'class-interrupted' ? '#ff5d22' : ''
                                    }} />
                                    } label="Class interrupted/aborted" />
                                </RadioGroup>
                            </FormControl>

                            <div className='sub-reasons' style={{
                                display: reason === 'class-interrupted' ? 'block' : 'none'
                            }}>
                                <FormControl style={{
                                    width: '100%'
                                }}>
                                    <RadioGroup aria-label="reason" value={subReason} onChange={handleSubReason} style={{
                                        // border: '2px solid black'
                                    }}>
                                        <FormControlLabel value="showUp" control={
                                        <Radio style={{
                                            color: subReason === 'showUp' ? '#ff5d22' : ''
                                        }} />
                                        } label="Student didn't show up in the class"/>
                                        <FormControlLabel value="interest" control={
                                        <Radio style={{
                                            color: subReason === 'interest' ? '#ff5d22' : ''
                                        }} />
                                        } label="Student didn't show any interest"/>
                                        <FormControlLabel value="Sdisconnected" control={
                                        <Radio style={{
                                            color: subReason === 'Sdisconnected' ? '#ff5d22' : ''
                                        }} />
                                        } label="Student got disconnected"/>
                                        <FormControlLabel value="disconnected" control={
                                        <Radio style={{
                                            color: subReason === 'disconnected' ? '#ff5d22' : ''
                                        }} />
                                        } label="I got disconnected"/>
                                        <FormControlLabel value="other" control={
                                        <Radio  style={{
                                            color: subReason === 'other' ? '#ff5d22' : ''
                                        }} />
                                        } label="Other reason" />
                                        <textarea rows={4} className='reason-textarea' type='text' value={otherReason} onChange={(e)=>setOtherReason(e.target.value)} style={{
                                            display: subReason === 'other' ? 'block' : 'none'
                                        }} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                    </div>

                    <div className='btn-grp'>
                        <Button variant="contained" color="primary" disableElevation style={{
                            textTransform: 'none',
                            background: '#ff5d22',
                            marginRight: '10px',
                            cursor: otherReason==='' && subReason === 'other' ? 'not-allowed' : 'default'
                        }} onClick={()=>{
                            if((otherReason!=='' && subReason === 'other') || subReason !== 'other') {
                                setModal(!modal);
                                setStop(true);
                            }
                        }}>
                            End Class
                        </Button>
                        <Button color="secondary" onClick={toggleModal} style={{
                            textTransform: 'none',
                        }}>Cancel</Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}