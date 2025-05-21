
import React from 'react';
import TeamWork from '../assets/teamWork.svg';
import '../assets/global.css';


const Team = () => {
  return (
    <div>
        <article>
            <section>
                <img src={TeamWork}  />
            </section>
             <section>
                <p>Emilie Caverne</p>
                <p>Arthur Guillemin</p>
                <p>Rayan</p>
                <p>Saad</p>
                <p>Kelly Goncalves Gama</p>
            </section>
        </article>
    </div>
    
  );
};

export default Team;
