import { useEffect, useState } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import Modal from './components/Modal';
import { zodiacSignsList, zodiacSignsLogo } from './utils/constants';

const App = () => {
  // States
  const [sign, setSign] = useState(null);
  const [lang, setLang] = useState('ru');

  // Vars
  const isRussian = lang == 'ru' ? true : false;
  const lp = useLaunchParams();

  // First render
  useEffect(() => {
    setLang(lp.initData.user.languageCode);
  }, []);

  return (
    <div className="App">
      <button className='langBtn' onClick={() => isRussian ? setLang('en') : setLang('ru')}>
        {isRussian ? "Русский" : "English"}
      </button>

      {sign && <Modal sign={sign} setSign={setSign} lang={lang} />}

      <div className="container">
        {Object.keys(zodiacSignsList).map((sign) => (
          <div key={sign} className='container__item' onClick={() => setSign(sign)}>
            <span>{zodiacSignsLogo[sign]}</span>
            <span>{isRussian ? zodiacSignsList[sign] : sign} </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;