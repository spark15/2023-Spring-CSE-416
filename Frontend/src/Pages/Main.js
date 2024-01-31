import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../Component/nav';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
function Main(){
    const location = useLocation();
    {/*Main page sliding images*/}
    const items = [ 
        { src: 'SUNYKorea_AcBldg.jpg' },
        { src: 'sunyK.png' },
      ];
    return(
        <div>
          <Nav/>{/*Narbar Component*/}
    <>
      <Swiper
        effect={'fade'}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination,Autoplay]}
        className='mySwiper'
        loop={true}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
             <div>
             <img className = 'image' src={item.src}/>
             </div>
           </SwiperSlide>
          );
        })}
      </Swiper>
    </>
    </div>
        )
    }
export default Main;