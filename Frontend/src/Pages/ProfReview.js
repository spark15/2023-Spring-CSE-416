import React from 'react';
import Nav from '../Component/nav';
import ProfNav from '../Component/prof_nav'
import RReviews from '../Component/Recent_review'

function ProfReview() {
      return (
        <div>
          <Nav></Nav>
          <ProfNav ></ProfNav>
          <RReviews></RReviews>
        </div>
      );
    
  }
  
  export default ProfReview;