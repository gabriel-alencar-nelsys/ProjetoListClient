'use client'


import React from 'react';

import { GlobalStyle } from '../app/styles/global';
import {Initial} from '../components/home/index';


export default function Home() {
  return (
    <div >
      <GlobalStyle/>
      <Initial/>
    </div>
  );
}
