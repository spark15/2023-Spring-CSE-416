import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackEnd from '../config.js'

function Recent_review() {
    const [ recent, setRecent ] = useState();
    const [ html, setHTML ] = useState();

    useEffect(() => {
        async function fetchData() {
            var rec = await axios({
            url: BackEnd.recentReview,
            method: 'Get'
        })
        setRecent(rec.data);}
        fetchData();
    }, []);

    useEffect(() => {
        if (!recent) {
            return;
        }
        var html = recent.map((review, idx) => {
            return (
            <div className='Review1'>
            <p className='courseinfo'>Course Name: {review.relatedCourse} - {review.courseName}, Instructor: {review.professor}</p>
                <div className='Rate'> {review.rating}</div>
                <div className='comment_box'>
                <p className='comments'> Comments:</p>
                <p className='comments_text'>{review.comment}</p>
                </div>
        </div>)
        })
        setHTML(html);
    }, [recent])

    return(
        <div className='Recent_background'>
           <p className='Recent_Review'>Recent Reviews</p>
           <div className='Recent_box'>
                {html}
           </div>
        </div>
    )
  } export default Recent_review;