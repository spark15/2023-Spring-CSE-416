import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Nav from '../Component/nav';
import ProfNav from '../Component/prof_nav';
import cookie from 'react-cookies';
import axios from 'axios';
import BackEnd from '../config.js'

function Prof_review() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    console.log(state.reviews)
    const [ reviews, setReviews ] = useState();
    console.log(reviews)
    function deleteReview (id){
        alert(id)
        axios({
            method: 'delete',
            url: BackEnd.reviewDelete,
            data: {
                _id: id,
              }
        }).then((response) => {
            document.getElementById(id).remove();
        })
    }
    useEffect(()=>{
        var result = state.reviews.map((review, idx) => {
        if(cookie.load('login').moderator === 0){
            return (
                <div className='Revieww'>
                    <p className='courseinfo'>
                        Course Name:  {review.name}
                    </p>
                    <div className='Rate'>{review.rating}</div>
                    <div className='comment_boxx'>{review.comment}</div>
                </div>)
        }
        else if(cookie.load('login').moderator === 1){
            return (
                <div className='Revieww' id={review._id} >
                    <p className='courseinfo'>
                        Course Name:  {review.name}
                        <button className='deleteButton' onClick={()=>deleteReview(review._id)}><img style = {{width:'25px'}}src='delete_icon.svg'></img></button>
                    </p>
                    <div className='Rate'>{review.rating}</div>
                    <div className='comment_boxx'>{review.comment}</div>
                </div>)
        } 
    })
        setReviews(result)
    }, [reviews])

    function RateProfessor() {
        navigate('/RateProf', {state: state.professor} );
    }

    
    return(
        <div>
            <Nav></Nav>
            <ProfNav></ProfNav>
            <div className='Rating_background'>
                <div className='Rating'>
                    <p className='overall'>{state.rating[0]}/5</p>
                    <p className='prof_name'>{state.professor}</p>
                </div>
                <div className='Rate_button'>
                    <button className='rate_btn' onClick={RateProfessor}>Rate Professor</button>
                </div>
            </div>
            <div className='Prof_comments'>
                <div className='comments_prof'>
                    {reviews}
                </div>
            </div>
        </div>
    )
} export default Prof_review;