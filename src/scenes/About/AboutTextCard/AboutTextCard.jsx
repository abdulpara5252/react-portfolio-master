import s from './AboutTextCard.module.scss';
import { ImPointRight } from 'react-icons/im';

const AboutTextCard = () => {
  return (
    <div className={s.card}>
      <p style={{ textAlign: 'justify' }}>
        Hi Everyone, I am{' '}
        <span className={s.purple}>Abdul Parawala </span>
        from <span className={s.purple}> Ahmedabad,Gujarat</span>
        <br />
        Software engineer with expertise in cross-platform development{' '}
        <br />
        using ReactJs.
        <br />
        <br />
        I have a Bachelor's degree in Bachlor of Computer Application and
        <br />
        Master's degree in Master of Computer Application from Charusat University.
        <br />
        <br />
        <span className={s.purple}>Meta Certification</span> Course in  <span className={s.purple}>React Advance And Basics</span> for Coursera Academy 
        <br />
        <br />
        Apart from coding, some other activities that I love to do!
      </p>

      <ul>
        <li className={s.aboutActivity}>
          <ImPointRight /> Playing Games
        </li>
        <li className={s.aboutActivity}>
          <ImPointRight /> Reading
        </li>
        <li className={s.aboutActivity}>
          <ImPointRight /> Travelling
        </li>
      </ul>
    </div>
  );
};

export default AboutTextCard;
