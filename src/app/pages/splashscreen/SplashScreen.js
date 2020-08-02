import React, { useRef, useEffect } from 'react';
import anime from 'animejs/lib/anime.es';
import './SpashScreen.css';
import { useDispatch } from 'react-redux';
import { useInjectReducer } from '../../../_core/utils/injectReducer';
import { MODULE_STATE_NAME, reducer, setInit } from './reducer';
import * as authService from '../../modules/auth/pages/auth.service';
import { login } from '../../modules/auth/pages/reducer';
import { LOCAL_STORAGE, get } from '../../../_core/utils/localStorage';

const SplashScreen = () => {
  const textInput = useRef(null);

  useInjectReducer({ key: MODULE_STATE_NAME, reducer });

  const dispatch = useDispatch();

  async function loadInformation() {
    const token = get(LOCAL_STORAGE.TOKEN);
    try {
      if (token) {
        const user = await authService.getInfo(token);
        dispatch(login(token, user, window.location.href));
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadInformation().then(() => dispatch(setInit()));
  });

  useEffect(() => {
    console.log(textInput.current);
    const textWrapper = textInput.current.querySelector('.ml3');
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>",
    );

    const letterEls = textWrapper.querySelectorAll('.letter');

    anime
      .timeline({ loop: true })
      .add({
        targets: letterEls,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2250,
        delay: (el, i) => 150 * (i + 1),
      })
      .add({
        targets: textWrapper,
        opacity: 0,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 500,
      });
    return () => {
      anime.remove(letterEls);
      anime.remove(textWrapper);
    };
  });

  return (
    <div
      style={{ height: '100vh', background: 'white', display: 'flex' }}
      ref={textInput}
    >
      <h1 className="ml3">Yocto ERP</h1>
    </div>
  );
};

export default SplashScreen;
