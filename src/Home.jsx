import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa'; // ✅ Import WhatsApp icon

import Topnavigationbar from './Navigationbar.jsx';
import Carousel from './Carossel';
import Mission from './Mission';
import Footer from './footer.jsx';
import Chooseus from './ Chooseus'; // ✅ remove the space in filename
import Programs from './Program.jsx';
import AchievementsSection from './Achievementsection.jsx';
import Anniversary from './Anniversary.jsx';
import ManagersReport from './Managersreport.jsx';
import Pictorials from './Pictorials.jsx';
import Slide from './slidepic.jsx';

function Home() {
  return (
   <div className="relative">
    
      <Carousel />
      <Slide />
      <Mission />
      <Chooseus />
      <Anniversary />
      <AchievementsSection />
      <ManagersReport />
      <Programs />
    
      
      
   
    </div>
  );
}

export default Home;
